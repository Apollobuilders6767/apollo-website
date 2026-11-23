
import { ChefHat, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function KitchenOverview({ data }) {
  return (
    <section className="relative overflow-hidden bg-[#F7F3EC] py-14 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 md:px-10 lg:px-12">

        {/* Section heading */}
        <Reveal>
          <div className="mx-auto max-w-[900px] text-center">

            {/* Gold eyebrow */}
            <div className="mb-4 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A47B34]">
                Kitchen Renovations
              </span>

              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />
            </div>

            {/* Original heading */}
            <h2 className="font-display text-[34px] leading-[1.08] tracking-[-0.025em] text-[#172A3A] sm:text-[40px] md:text-[46px] lg:text-[50px]">
              {data.intro.heading}
            </h2>

            {/* Decorative divider */}
            <div
              aria-hidden="true"
              className="mx-auto mt-6 h-[2px] w-14 bg-[#C5A05B]"
            />
          </div>
        </Reveal>

        {/* Main overview panel */}
        <Reveal delay={0.05}>
          <div className="relative mx-auto mt-10 max-w-[1050px] overflow-hidden rounded-2xl border border-[#E6D8C4] bg-[#FFFCF8] shadow-[0_8px_35px_rgba(31,42,55,0.045)]">

            {/* Top gold accent */}
            <div
              aria-hidden="true"
              className="h-[3px] w-full bg-gradient-to-r from-[#B78A3E] via-[#D5B47C] to-[#E8D9C1]"
            />

            <div className="px-6 py-8 sm:px-9 sm:py-10 md:px-12 md:py-12">

              {/* Kitchen icon and label */}
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8D9C1] bg-[#F7F0E5]">
                  <ChefHat
                    className="h-6 w-6 text-[#B78A3E]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A47B34]">
                    Our Approach
                  </span>

                  <span className="mt-1 block text-[14px] font-medium text-[#172A3A]">
                    Thoughtfully Designed Kitchens
                  </span>
                </div>
              </div>

              {/* Original overview paragraphs */}
              <div className="space-y-5">
                {data.intro.body.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index === 0
                        ? "border-l-[3px] border-[#C5A05B] bg-[#F7F0E5]/70 py-3 pl-5 pr-4 text-[16px] font-medium leading-[1.85] text-[#273746] md:text-[17px]"
                        : "text-[15px] leading-[1.9] text-[#536170] md:text-[16px]"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Bottom brand detail */}
              <div className="mt-9 flex items-center gap-3 border-t border-[#E9DDCC] pt-6">
                <Sparkles
                  className="h-4 w-4 text-[#B78A3E]"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#A47B34]">
                  Apollo Builders
                </span>
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
