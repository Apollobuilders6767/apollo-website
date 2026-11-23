
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function KitchenWhyApollo({ data }) {
  if (!data?.whyChooseHeading) return null;

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-20 lg:py-24">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full border border-[#E6D8C4]/50"
      />

      <div className="relative mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <Reveal>
          <div className="mx-auto mb-10 max-w-[850px] text-center md:mb-14">

            {/* Original eyebrow */}
            <div className="mb-5 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[#B78A3E]"
              />

              <span className="tracking-eyebrow text-[#A47B34]">
                Why Apollo
              </span>

              <span
                aria-hidden="true"
                className="h-px w-8 bg-[#B78A3E]"
              />
            </div>

            {/* Original heading */}
            <h2 className="font-display text-[32px] leading-[1.1] tracking-[-0.025em] text-[#172A3A] sm:text-[38px] md:text-[44px] lg:text-[48px]">
              {data.whyChooseHeading}
            </h2>

            {/* Gold divider */}
            <div
              aria-hidden="true"
              className="mx-auto mt-6 h-[2px] w-14 bg-[#B78A3E]"
            />

            {/* Original introduction */}
            <p className="mx-auto mt-7 max-w-[780px] text-[15px] leading-[1.85] text-[#536170] sm:text-[16px] md:text-[17px]">
              {data.whyChooseIntro}
            </p>

          </div>
        </Reveal>

        {/* Why Choose Apollo feature cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
          {(data.whyChoose || []).map((item, index) => (
            <Reveal
              key={`${item}-${index}`}
              delay={Math.min(index * 0.05, 0.2)}
              className="h-full"
            >
              <div className="group flex h-full items-start gap-5 rounded-2xl border border-[#E6D8C4] bg-[#FFFCF8] p-6 shadow-[0_5px_20px_rgba(23,42,58,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B78A3E] hover:shadow-[0_14px_32px_rgba(23,42,58,0.09)] sm:p-7">

                {/* Gold check icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E6D8C4] bg-[#F7F3EC] transition-colors duration-300 group-hover:border-[#B78A3E] group-hover:bg-[#F0E5D2]">
                  <CheckCircle2
                    className="h-5 w-5 text-[#B78A3E]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </div>

                {/* Original feature text */}
                <p className="pt-2 text-[15px] leading-[1.75] text-[#273746] sm:text-[16px]">
                  {item}
                </p>

              </div>
            </Reveal>
          ))}
        </div>

        {/* Original closing paragraph */}
        {data.whyChooseOutro && (
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-2xl border border-[#E6D8C4] border-l-[3px] border-l-[#B78A3E] bg-[#F7F3EC] px-6 py-6 sm:mt-10 sm:px-9 sm:py-8">
              <p className="mx-auto max-w-[950px] text-[15px] leading-[1.85] text-[#536170] sm:text-[16px]">
                {data.whyChooseOutro}
              </p>
            </div>
          </Reveal>
        )}

      </div>
    </section>
  );
}
