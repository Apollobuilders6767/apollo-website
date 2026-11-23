
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function BathroomServiceArea({ data }) {
  if (!data?.serviceArea) return null;

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <Reveal>
          <div className="mb-10 flex items-center justify-center gap-3 md:mb-12">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#B78A3E]"
            />

            <span className="tracking-eyebrow text-[#A47B34]">
              Service Area
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#B78A3E]"
            />
          </div>
        </Reveal>

        {/* Premium split layout */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">

          {/* Left: Navy visual card */}
          <Reveal className="lg:col-span-4">
            <div className="relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl bg-[#172A3A] p-7 sm:p-9 lg:min-h-[350px]">

              {/* Decorative circles */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#C5A05B]/25"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#C5A05B]/20"
              />

              {/* Location icon */}
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border border-[#C5A05B]/40 bg-white/[0.06]">
                <MapPin
                  className="h-7 w-7 text-[#E4BE7D]"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </div>

              {/* Decorative map illustration */}
              <div
                aria-hidden="true"
                className="pointer-events-none relative z-10 my-8 flex items-center justify-center"
              >
                <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-[#C5A05B]/20">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#C5A05B]/30">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C5A05B]/15">
                      <MapPin
                        className="h-6 w-6 text-[#E4BE7D]"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <span className="absolute left-2 top-5 h-2 w-2 rounded-full bg-[#C5A05B]/60" />
                  <span className="absolute bottom-5 right-3 h-2 w-2 rounded-full bg-[#C5A05B]/60" />
                  <span className="absolute right-2 top-9 h-1.5 w-1.5 rounded-full bg-[#C5A05B]/40" />
                </div>
              </div>

              {/* Original section label */}
              <div className="relative z-10 border-t border-white/15 pt-5">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#C5A05B]" />

                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E4BE7D]">
                    Service Area
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Original content */}
          <Reveal className="lg:col-span-8" delay={0.08}>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-[#E6D8C4] bg-[#FFFCF8] p-7 shadow-[0_6px_24px_rgba(23,42,58,0.04)] sm:p-9 lg:p-12">

              {/* Gold accent */}
              <div className="mb-6 h-[3px] w-12 rounded-full bg-[#B78A3E]" />

              {/* Original heading */}
              <h2 className="max-w-[720px] font-display text-[32px] leading-[1.12] tracking-[-0.025em] text-[#172A3A] sm:text-[38px] md:text-[44px] lg:text-[48px]">
                {data.serviceArea.heading}
              </h2>

              {/* Original description */}
              <p className="mt-7 max-w-[720px] text-[15px] leading-[1.9] text-[#536170] sm:text-[16px] md:text-[17px]">
                {data.serviceArea.body}
              </p>

              {/* Bottom decorative line */}
              <div
                aria-hidden="true"
                className="mt-9 h-px w-full max-w-[200px] bg-[#E6D8C4]"
              />

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
