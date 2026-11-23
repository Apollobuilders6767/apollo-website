
import { Reveal } from "@/components/Reveal";

export default function BathroomCost({ data }) {
  // Preserve the original conditional rendering
  if (!data?.costSection) return null;

  const {
    heading,
    intro,
    bullets = [],
    outro,
  } = data.costSection;

  return (
    <section className="relative overflow-hidden bg-[#F7F3EC] py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="relative mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-[#E6D8C4] bg-[#FFFCF8] shadow-[0_12px_40px_rgba(23,42,58,0.05)]">

            {/* Editorial content */}
            <div className="px-6 py-8 sm:px-9 sm:py-10 md:px-12 md:py-12 lg:px-14 lg:py-14">

              {/* Original section label and heading */}
              <div className="flex items-start gap-4 sm:gap-6">
                {/* Gold vertical accent */}
                <span
                  aria-hidden="true"
                  className="mt-1 h-14 w-[3px] shrink-0 rounded-full bg-[#B78A3E] sm:h-16"
                />

                <div className="min-w-0">
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A47B34]">
                    Cost
                  </div>

                  <h2 className="font-display text-[32px] leading-[1.08] tracking-[-0.025em] text-[#172A3A] sm:text-[38px] md:text-[44px] lg:text-[48px]">
                    {heading}
                  </h2>
                </div>
              </div>

              {/* Original introduction */}
              <p className="mt-8 max-w-[920px] text-[15px] leading-[1.9] text-[#536170] sm:text-[16px] md:mt-10 md:text-[17px]">
                {intro}
              </p>

              {/* Elegant divider */}
              <div
                aria-hidden="true"
                className="my-9 h-px w-full bg-[#E6D8C4] md:my-11"
              />

              {/* Original cost factors */}
              <ul className="grid grid-cols-1 gap-x-12 gap-y-7 sm:grid-cols-2 md:gap-y-9">
                {bullets.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="group flex items-start gap-4"
                  >
                    {/* Gold number */}
                    <span className="w-9 shrink-0 font-display text-[24px] leading-[1.2] text-[#B78A3E] transition-colors duration-300 group-hover:text-[#8F672A]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Original bullet text */}
                    <span className="border-l border-[#E6D8C4] pl-4 text-[15px] leading-[1.8] text-[#273746] transition-colors duration-300 group-hover:border-[#B78A3E] sm:text-[16px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Original closing paragraph */}
              {outro && (
                <div className="mt-10 rounded-xl border-l-[3px] border-[#B78A3E] bg-[#F7F3EC] px-5 py-5 sm:px-7 sm:py-6 md:mt-12">
                  <p className="max-w-[900px] text-[15px] leading-[1.9] text-[#536170] sm:text-[16px]">
                    {outro}
                  </p>
                </div>
              )}

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
