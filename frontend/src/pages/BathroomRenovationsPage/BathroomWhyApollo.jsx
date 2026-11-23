
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function BathroomWhyApollo({ data }) {
  if (!data?.whyChooseHeading) return null;

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <Reveal>
          <div className="mx-auto mb-10 max-w-[900px] text-center md:mb-14">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />

              <span className="tracking-eyebrow text-[#A47B34]">
                Why Apollo
              </span>

              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />
            </div>

            {/* Original heading */}
            <h2 className="font-display text-[34px] leading-[1.08] tracking-[-0.025em] text-[#172A3A] sm:text-[40px] md:text-[46px] lg:text-[50px]">
              {data.whyChooseHeading}
            </h2>

            <div
              aria-hidden="true"
              className="mx-auto mt-6 h-[2px] w-14 bg-[#B78A3E]"
            />
          </div>
        </Reveal>

        {/* Original introduction */}
        <Reveal delay={0.05}>
          <p className="mx-auto mb-10 max-w-[850px] text-center text-[15px] leading-[1.9] text-[#536170] sm:text-[16px] md:mb-12 md:text-[17px]">
            {data.whyChooseIntro}
          </p>
        </Reveal>

        {/* Original whyChoose items */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {(data.whyChoose || []).map((item, index) => (
            <Reveal
              key={`${item}-${index}`}
              delay={Math.min(index * 0.04, 0.2)}
            >
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-[#E6D8C4] bg-[#FFFCF8] px-5 py-6 shadow-[0_4px_18px_rgba(23,42,58,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B78A3E] hover:shadow-[0_12px_28px_rgba(23,42,58,0.08)] sm:px-6 sm:py-7">

                {/* Gold check icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E6D8C4] bg-[#F7F3EC] transition-colors duration-300 group-hover:border-[#B78A3E]/50 group-hover:bg-[#F2E6D2]">
                  <CheckCircle2
                    className="h-5 w-5 text-[#B78A3E]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </div>

                {/* Original item text */}
                <p className="pt-1.5 text-[15px] leading-[1.75] text-[#273746] sm:text-[16px]">
                  {item}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Original closing paragraph */}
        {data.whyChooseOutro && (
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-[900px] rounded-xl border-l-[3px] border-[#B78A3E] bg-[#F7F3EC] px-6 py-6 sm:px-8 md:mt-12">
              <p className="text-[15px] leading-[1.9] text-[#536170] sm:text-[16px]">
                {data.whyChooseOutro}
              </p>
            </div>
          </Reveal>
        )}

      </div>
    </section>
  );
}
