
import { MapPin, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function MelbourneServiceAreas({ areas = [] }) {
  return (
   <section className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-6 md:px-10 lg:px-12">

        {/* Section heading */}
        <Reveal>
          <div className="mx-auto max-w-[900px] text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-7 bg-[#B78A3E]" />

              <span className="tracking-eyebrow text-[#A47B34]">
                Areas We Serve
              </span>

              <span className="h-px w-7 bg-[#B78A3E]" />
            </div>

            <h2 className="font-display text-[32px] leading-[1.1] tracking-[-0.025em] text-[#172A3A] sm:text-[38px] md:text-[44px] lg:text-[48px]">
              Home Renovations Across Melbourne&apos;s South
              and South-East
            </h2>

            <p className="mx-auto mt-5 max-w-[750px] text-[15px] leading-[1.8] text-[#536170] md:text-[16px]">
              Apollo Builders works with homeowners across
              Melbourne&apos;s south and south-eastern suburbs.
            </p>
          </div>
        </Reveal>

        {/* Directory */}
        <Reveal delay={0.05}>
          <div className="mx-auto mt-9 max-w-[1000px] sm:mt-11">

            <div className="mb-5 flex items-center gap-3">
              <MapPin
                className="h-5 w-5 text-[#B78A3E]"
                strokeWidth={1.6}
                aria-hidden="true"
              />

              <p className="text-[14px] font-medium leading-[1.7] text-[#344054] md:text-[15px]">
                Our existing project portfolio includes work in:
              </p>
            </div>

            {/* Numbered locations */}
            <ul className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              {areas.map((item, index) => (
                <li
                  key={item}
                  className="group flex items-center justify-between gap-4 border-b border-[#DCCDB8] py-4 transition-colors duration-300 hover:border-[#B78A3E]"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="w-7 shrink-0 font-display text-[19px] leading-none text-[#B78A3E]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-[16px] font-medium text-[#172A3A] transition-colors duration-300 group-hover:text-[#A47B34] md:text-[17px]">
                      {item}
                    </span>
                  </div>

                  <MapPin
                    className="h-[17px] w-[17px] shrink-0 text-[#B78A3E] opacity-65 transition-opacity duration-300 group-hover:opacity-100"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Closing message */}
        <Reveal delay={0.08}>
          <div className="mx-auto mt-9 max-w-[1000px] border-l-[3px] border-[#B78A3E] bg-[#EFE5D6] px-5 py-4 sm:px-6">
            <div className="flex items-start gap-3">
              <ArrowUpRight
                className="mt-1 h-5 w-5 shrink-0 text-[#A47B34]"
                strokeWidth={1.6}
                aria-hidden="true"
              />

              <p className="text-[14px] leading-[1.8] text-[#344054] md:text-[15px]">
                If you&apos;re planning a renovation in
                Melbourne&apos;s south or south-east, speak with
                Apollo Builders about your project.
              </p>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
