
import {
  Bath,
  ChefHat,
  Sofa,
  PanelsTopLeft,
  Layers,
  Grid2X2,
  Trees,
  Sun,
  Hammer,
  House,
  Check,
  MapPin,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";

const serviceIcons = [
  ChefHat,
  Bath,
  Sofa,
  PanelsTopLeft,
  Layers,
  Grid2X2,
  Trees,
  Sun,
  Hammer,
  House,
];

export default function HomeRenovationsIntro({
  renovationServices = [],
}) {
  return (
    <section className="relative overflow-hidden bg-[#F7F3EC] py-14 md:py-18 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 md:px-10 lg:px-12">

        {/* Section heading */}
        <Reveal>
          <div className="mx-auto max-w-[900px] text-center">

            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-7 bg-[#B78A3E]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A47B34]">
                Complete Renovations
              </span>

              <span className="h-px w-7 bg-[#B78A3E]" />
            </div>

            <h2 className="font-display text-[34px] leading-[1.08] tracking-[-0.025em] text-[#172A3A] sm:text-[40px] md:text-[46px] lg:text-[50px]">
              Complete Home Renovations in Melbourne
            </h2>

            <p className="mx-auto mt-5 max-w-[750px] text-[17px] font-medium leading-[1.75] text-[#273746] md:text-[18px]">
              A full home renovation is about much more than
              replacing finishes.
            </p>

            <p className="mx-auto mt-4 max-w-[850px] text-[15px] leading-[1.85] text-[#536170] md:text-[16px]">
              The most successful renovations consider how the
              entire home connects. Rooms need to flow naturally
              into one another, living areas need to suit everyday
              use, storage needs to be practical and the finished
              design should feel cohesive rather than like a
              collection of individual upgrades.
            </p>

            <p className="mx-auto mt-4 max-w-[850px] text-[15px] leading-[1.85] text-[#536170] md:text-[16px]">
              Apollo Builders can help coordinate the construction
              of comprehensive renovation projects, including:
            </p>
          </div>
        </Reveal>

        {/* Service cards */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {renovationServices.map((item, index) => {
            const Icon =
              serviceIcons[index] || Check;

            return (
              <Reveal key={item} delay={0.03}>
                <div className="group flex h-full min-h-[145px] flex-col items-center justify-center rounded-2xl border border-[#E6D8C4] bg-[#FFFCF8] px-3 py-5 text-center shadow-[0_4px_18px_rgba(31,42,55,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A05B] hover:shadow-[0_12px_28px_rgba(31,42,55,0.09)] sm:min-h-[155px] sm:px-4">

                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8D9C1] bg-[#F7F0E5] transition-colors duration-300 group-hover:border-[#D5B47C] group-hover:bg-[#F2E4CF]">
                    <Icon
                      className="h-6 w-6 text-[#B78A3E]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Original service name */}
                  <h3 className="max-w-[170px] text-[13px] font-semibold leading-[1.45] text-[#172A3A] sm:text-[14px]">
                    {item}
                  </h3>

                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Portfolio information */}
        <Reveal delay={0.05}>
          <div className="mt-9 rounded-2xl border border-[#E6D8C4] bg-[#F0E7D9] px-5 py-6 sm:px-7 md:px-9">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">


              <div>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A47B34]">
                  Our Renovation Experience
                </div>

                <p className="text-[14px] leading-[1.85] text-[#344054] md:text-[15px]">
                  Our portfolio includes completed renovation work
                  in areas including Bentleigh East, Endeavour Hills
                  and Altona Meadows. These projects demonstrate
                  the different ways an existing home can be
                  transformed depending on the property&apos;s
                  structure, the homeowner&apos;s requirements
                  and the desired outcome.
                </p>
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
