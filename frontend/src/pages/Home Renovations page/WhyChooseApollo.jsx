
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function WhyChooseApollo({ reasons = [] }) {
  return (
    <section className="relative overflow-hidden bg-[#F5F0E8] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 md:px-10 lg:px-12">

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-12 lg:gap-14">

          {/* Left: Original heading and descriptions */}
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">

              {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-[7px] w-[7px] rotate-45 bg-[#B78A3E]"
                />

                <span className="tracking-eyebrow text-[#A47B34]">
                  Why Apollo Builders
                </span>
              </div>

              {/* Original heading */}
              <h2 className="font-display text-[34px] leading-[1.1] tracking-[-0.025em] text-[#172A3A] sm:text-[40px] lg:text-[44px]">
                Why Renovate With Apollo Builders?
              </h2>

              {/* Original paragraph 1 */}
              <p className="mt-5 text-[16px] font-medium leading-[1.75] text-[#273746] md:text-[17px]">
                A renovation is a significant investment in your home.
              </p>

              {/* Original paragraph 2 */}
              <p className="mt-4 text-[15px] leading-[1.85] text-[#536170] md:text-[16px]">
                The builder you choose needs to understand both
                the construction requirements and the outcome
                you&apos;re trying to achieve.
              </p>

              {/* Original paragraph 3 */}
              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#B78A3E]" />

                <p className="text-[14px] font-semibold text-[#172A3A] md:text-[15px]">
                  Apollo Builders focuses on:
                </p>
              </div>

            </div>
          </Reveal>

          {/* Right: Architectural numbered feature list */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="border-t border-[#D8C7AE]">
              <ul>
                {reasons.map((item, index) => (
                  <li
                    key={item}
                    className="group flex items-center gap-4 border-b border-[#D8C7AE] py-4 transition-colors duration-300 hover:border-[#B78A3E] sm:py-[18px]"
                  >
                    {/* Gold number */}
                    <span className="w-9 shrink-0 font-display text-[21px] leading-none text-[#B78A3E]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Original benefit */}
                    <span className="flex-1 text-[16px] font-medium leading-[1.5] text-[#172A3A] transition-colors duration-300 group-hover:text-[#A47B34] md:text-[17px]">
                      {item}
                    </span>

                    {/* Decorative check icon */}
                    <CheckCircle2
                      className="h-5 w-5 shrink-0 text-[#B78A3E] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>

        {/* Original portfolio statement */}
        <Reveal delay={0.08}>
          <div className="mt-9 flex items-start gap-4 rounded-xl border border-[#E2D3BE] bg-[#FFFCF8] px-5 py-5 sm:px-7">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F2E6D4]">
              <ArrowUpRight
                className="h-5 w-5 text-[#B78A3E]"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </div>

            <p className="self-center text-[14px] leading-[1.8] text-[#344054] md:text-[15px]">
              Our portfolio demonstrates our experience across
              both renovations and new residential construction.
            </p>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
