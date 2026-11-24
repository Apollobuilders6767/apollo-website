"""Resize site photos, write WebP srcset variants, and build favicons.

Run from the repo root: python3 scripts/optimize_images.py
Photo PNGs are replaced by a JPEG fallback plus WebP siblings. The React
OptimizedImage component still accepts the original .png path and serves
the smaller files. The logo keeps its alpha channel.
"""
import json
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1] / "frontend" / "public"
MANIFEST_PATH = Path(__file__).resolve().parents[1] / "frontend" / "src" / "lib" / "imageManifest.json"
VARIANTS = (640, 960, 1280)
MAX_PHOTO = 1600
MAX_LOGO = 640
NAVY = (10, 15, 26, 255)


def url_for(path: Path) -> str:
    rel = path.relative_to(ROOT).as_posix()
    return "/" + "/".join(
        __import__("urllib.parse", fromlist=["quote"]).quote(part) for part in rel.split("/")
    )


def has_alpha(im: Image.Image) -> bool:
    if im.mode in ("RGBA", "LA"):
        return im.getextrema()[-1][0] < 255
    if im.mode == "P" and "transparency" in im.info:
        return True
    return False


def resize(im: Image.Image, max_edge: int) -> Image.Image:
    if max(im.size) <= max_edge:
        return im
    im = im.copy()
    im.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
    return im


def save_webp(im: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "WEBP", quality=76, method=6)


def save_jpeg(im: Image.Image, dest: Path) -> None:
    rgb = im.convert("RGB")
    dest.parent.mkdir(parents=True, exist_ok=True)
    rgb.save(dest, "JPEG", quality=80, optimize=True, progressive=True)


def save_png(im: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "PNG", optimize=True)


def icon_from_logo(logo: Image.Image, size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), NAVY)
    mark = logo.copy()
    mark.thumbnail((int(size * 0.78), int(size * 0.78)), Image.Resampling.LANCZOS)
    x = (size - mark.width) // 2
    y = (size - mark.height) // 2
    canvas.paste(mark, (x, y), mark if mark.mode == "RGBA" else None)
    return canvas


def write_favicons(logo: Image.Image) -> None:
    icons = {
        16: ROOT / "favicon-16x16.png",
        32: ROOT / "favicon-32x32.png",
        180: ROOT / "apple-touch-icon.png",
        192: ROOT / "logo192.png",
        512: ROOT / "logo512.png",
    }
    for size, dest in icons.items():
        icon_from_logo(logo, size).save(dest, "PNG", optimize=True)
    ico = [icon_from_logo(logo, s).convert("RGBA") for s in (16, 32, 48)]
    ico[0].save(ROOT / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)], append_images=ico[1:])
    manifest = {
        "name": "Apollo Builders",
        "short_name": "Apollo Builders",
        "description": "New home builds, renovations, kitchens and bathrooms in Melbourne's South-East.",
        "start_url": "/",
        "scope": "/",
        "display": "standalone",
        "background_color": "#0A0F1A",
        "theme_color": "#0A192F",
        "icons": [
            {"src": "/favicon-32x32.png", "sizes": "32x32", "type": "image/png"},
            {"src": "/logo192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "/logo512.png", "sizes": "512x512", "type": "image/png"},
        ],
    }
    (ROOT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    before = 0
    files = [
        p for p in ROOT.rglob("*")
        if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"} and p.is_file()
    ]
    # Skip variants this script already wrote, so a re-run does not nest them.
    files = [p for p in files if not any(p.stem.endswith(f"-{w}") for w in VARIANTS)]
    manifest = {}
    for path in files:
        before += path.stat().st_size
        im = ImageOps.exif_transpose(Image.open(path))
        is_logo = "logo" in path.name.lower()
        alpha = has_alpha(im)
        im = resize(im, MAX_LOGO if is_logo else MAX_PHOTO)
        if is_logo and path.name == "apollo-builders-logo.png":
            write_favicons(im)

        stem = path.with_suffix("")
        webp_full = stem.with_suffix(".webp")
        save_webp(im, webp_full)
        srcset = [f"{url_for(webp_full)} {im.width}w"]
        for width in VARIANTS:
            if im.width <= width + 40:
                continue
            variant = im.copy()
            variant.thumbnail((width, width * 4), Image.Resampling.LANCZOS)
            dest = Path(f"{stem}-{width}.webp")
            save_webp(variant, dest)
            srcset.append(f"{url_for(dest)} {variant.width}w")
        srcset.sort(key=lambda item: int(item.rsplit(" ", 1)[1][:-1]))

        original_url = "/" + path.relative_to(ROOT).as_posix()
        if alpha:
            save_png(im, path)
            fallback = original_url
        elif path.suffix.lower() in {".jpg", ".jpeg"}:
            encoded = BytesIO()
            im.convert("RGB").save(encoded, "JPEG", quality=80, optimize=True, progressive=True)
            if encoded.tell() < path.stat().st_size:
                path.write_bytes(encoded.getvalue())
            fallback = original_url
        else:
            jpg = stem.with_suffix(".jpg")
            save_jpeg(im, jpg)
            fallback = "/" + jpg.relative_to(ROOT).as_posix()
            if path.exists() and path.suffix.lower() == ".png":
                path.unlink()

        manifest[original_url] = {
            "width": im.width,
            "height": im.height,
            "fallback": fallback,
            "webp": url_for(webp_full),
            "webpSrcSet": ", ".join(srcset),
        }
        print(f"{original_url} -> {im.width}x{im.height} fallback {fallback}")

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    after = sum(p.stat().st_size for p in ROOT.rglob("*") if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".ico"})
    print(f"images {before/1024/1024:.1f}MB -> {after/1024/1024:.1f}MB ({len(manifest)} encoded)")


if __name__ == "__main__":
    main()
