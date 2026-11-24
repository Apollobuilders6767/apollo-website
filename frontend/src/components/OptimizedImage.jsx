import { Helmet } from "react-helmet-async";
import manifest from "@/lib/imageManifest.json";

// Picture + WebP srcset for images produced by scripts/optimize_images.py.
// `display: contents` keeps the img in the same layout slot as a plain <img>.
export default function OptimizedImage({
  src,
  alt = "",
  className,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, 80vw",
  loading,
  fetchPriority,
  decoding = "async",
  priority = false,
  onError,
  ...rest
}) {
  const meta = src ? manifest[src] : null;
  if (!meta) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading || "lazy"}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onError={onError}
        {...rest}
      />
    );
  }

  const eager = priority || fetchPriority === "high" || loading === "eager";
  return (
    <>
      {eager ? (
        <Helmet>
          <link
            rel="preload"
            as="image"
            href={meta.webp}
            imageSrcSet={meta.webpSrcSet}
            imageSizes={sizes}
            type="image/webp"
          />
        </Helmet>
      ) : null}
      <picture className="contents">
        <source type="image/webp" srcSet={meta.webpSrcSet} sizes={sizes} />
        <img
          src={meta.fallback}
          alt={alt}
          className={className}
          width={width || meta.width}
          height={height || meta.height}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          decoding={decoding}
          fetchPriority={eager ? "high" : undefined}
          onError={onError}
          {...rest}
        />
      </picture>
    </>
  );
}
