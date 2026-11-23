
import {
  House,
  PanelsTopLeft,
  BedDouble,
  ChefHat,
  Bath,
  Sofa,
  Sun,
  Trees,
  Layers,
  Grid2X2,
  Ruler,
  Check,
  ClipboardList,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";

const planningIcons = [
  House,
  PanelsTopLeft,
  BedDouble,
  ChefHat,
  Bath,
  Sofa,
  Sun,
  Trees,
  Layers,
  Grid2X2,
  Ruler,
];

export default function GroundUpPlanning({ planningItems = [] }) {
  return (
    <section className="relative overflow-hidden bg-[#F7F3EC] py-14 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 md:px-10 lg:px-12">

        {/* Section heading */}
        <Reveal>
          <div className="mx-auto max-w-[900px] text-center">

            {/* Eyebrow */}
            <div className="mb-4 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A47B34]">
                Start From The Ground Up
              </span>

              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />
            </div>

            {/* Main heading */}
            <h2 className="font-display text-[34px] leading-[1.08] tracking-[-0.025em] text-[#172A3A] sm:text-[40px] md:text-[46px] lg:text-[50px]">
              Building a New Home From the Ground Up
            </h2>

            {/* Featured introduction */}
            <p className="mx-auto mt-5 max-w-[750px] text-[17px] font-medium leading-[1.75] text-[#273746] md:text-[18px]">
              A new home gives you the opportunity to consider
              the property as a complete system.
            </p>

            {/* Supporting description */}
            <p className="mx-auto mt-4 max-w-[850px] text-[15px] leading-[1.85] text-[#536170] md:text-[16px]">
              Rather than adapting an existing building, you can plan:
            </p>
          </div>
        </Reveal>

        {/* Planning cards */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {planningItems.map((item, index) => {
            const Icon = planningIcons[index] || Check;

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

                  {/* Original planning item */}
                  <h3 className="max-w-[170px] text-[13px] font-semibold leading-[1.45] text-[#172A3A] sm:text-[14px]">
                    {item}
                  </h3>

                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom highlighted information */}
        <Reveal delay={0.05}>
          <div className="mt-9 rounded-2xl border border-[#E6D8C4] bg-[#F0E7D9] px-5 py-6 sm:px-7 md:px-9">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#DCC8A8] bg-[#F7F0E5]">
                <ClipboardList
                  className="h-6 w-6 text-[#B78A3E]"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A47B34]">
                  Designed Around Your Needs
                </div>

                <p className="text-[14px] leading-[1.85] text-[#344054] md:text-[15px]">
                  The result is a home designed around your needs
                  from the beginning.
                </p>
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
