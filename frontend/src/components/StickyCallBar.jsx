import { Phone } from "lucide-react";
import { brand } from "@/lib/data";

// The header phone link is hidden below the lg breakpoint. This bar keeps
// click-to-call available on phones. The tel: href is tracked as phone_click.
export default function StickyCallBar() {
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--paper)]/15 bg-[color:var(--ink-black)]">
      <a
        href={`tel:${brand.phoneRaw}`}
        className="flex items-center justify-center gap-2 min-h-[52px] text-[12px] tracking-[0.18em] uppercase font-semibold text-[color:var(--paper)]"
      >
        <Phone className="h-4 w-4" strokeWidth={1.5} />
        Call {brand.phone}
      </a>
    </div>
  );
}
