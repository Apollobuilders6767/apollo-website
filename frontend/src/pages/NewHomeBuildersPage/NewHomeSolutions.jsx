
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  ImageIcon,
  Check,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";

const solutions = [
  {
    id: "modern-family-homes",
    title: "Modern Living",
    subtitle: "Comfort, functionality and flexibility",
    heading: "Modern Family Homes",
    image: "/images/new-home-solutions/modern-family-homes.png",
    paragraphs: [
      "Modern homes need to balance comfort, functionality and flexibility.",
      "Open-plan living can provide a central family space while separate rooms provide privacy when required.",
      "Outdoor living can also play an important role in the overall design.",
      "Apollo's Drouin new home, for example, features open-plan living, high ceilings and premium finishes.",
    ],
  },
  {
    id: "two-storey-homes",
    title: "Two-Storey Homes",
    subtitle: "Making efficient use of available land",
    heading: "Two-Storey New Homes",
    image: "/images/new-home-solutions/two-storey-homes.png",
    paragraphs: [
      "Two-storey homes can make efficient use of available land while providing additional living space.",
      "Bedrooms can be located away from the main living areas, while kitchens, dining and family spaces can be positioned on the ground floor.",
      "Apollo's Berwick project demonstrates this approach with a two-storey home designed around modern family living.",
    ],
  },
  {
    id: "choosing-a-builder",
    title: "Choosing a Builder",
    subtitle: "Making the right decision for your new home",
    heading: "Choosing a New Home Builder",
    image: "/images/new-home-solutions/choosing-a-builder.png",
    paragraphs: [
      "Choosing a builder is one of the most important decisions in the process.",
      "You should look at:",
    ],
    hasChecklist: true,
    conclusion:
      "Apollo's project portfolio gives prospective clients an opportunity to see examples of completed work rather than relying solely on plans or descriptions.",
    link: "/our-projects/",
  },
];

function SolutionCard({
  solution,
  index,
  isActive,
  onToggle,
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative min-w-0">
      <Reveal delay={index * 0.04}>
        <button
          type="button"
          aria-expanded={isActive}
          aria-controls={`new-home-details-${solution.id}`}
          onClick={onToggle}
          className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B78A3E] ${
            isActive
              ? "border-[#C5A05B] bg-white shadow-[0_12px_30px_rgba(20,25,30,0.12)]"
              : "border-[#E6D8C4] bg-white shadow-[0_4px_18px_rgba(20,25,30,0.06)] hover:-translate-y-1 hover:border-[#C5A05B] hover:shadow-[0_12px_30px_rgba(20,25,30,0.10)]"
          }`}
        >
          {/* Card image */}
          <div className="relative h-[165px] w-full overflow-hidden bg-[#F0E7D9] sm:h-[180px] lg:h-[195px]">
            {!imageFailed ? (
              <img
                src={solution.image}
                alt={`${solution.title} architectural design concept`}
                loading="lazy"
                decoding="async"
                onError={() => setImageFailed(true)}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#F0E7D9]">
                <ImageIcon
                  className="h-9 w-9 text-[#B78A3E]/60"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
              </div>
            )}

            {isActive && (
              <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#A47B34] shadow-sm">
                Viewing Details
              </div>
            )}
          </div>

          {/* Card content */}
          <div className="flex w-full flex-1 flex-col justify-between p-4 lg:p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="min-w-0 font-display text-[21px] leading-[1.2] tracking-[-0.015em] text-[#172A3A] lg:text-[23px]">
                {solution.title}
              </h3>

              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isActive
                    ? "rotate-180 border-[#B78A3E] bg-[#B78A3E] text-white"
                    : "border-[#E6D8C4] text-[#536170] group-hover:border-[#B78A3E]"
                }`}
              >
                <ChevronDown
                  className="h-4 w-4"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </span>
            </div>

            <p className="mt-3 text-[13px] leading-[1.6] text-[#536170]">
              {solution.subtitle}
            </p>
          </div>
        </button>
      </Reveal>

      {isActive && (
        <div
          aria-hidden="true"
          className="absolute -bottom-4 left-1/2 z-10 h-4 w-[2px] -translate-x-1/2 bg-[#C5A05B]"
        />
      )}
    </div>
  );
}

function SolutionDetails({ solution, builderChecklist }) {
  return (
    <div
      id={`new-home-details-${solution.id}`}
      role="region"
      aria-label={solution.heading}
      className="relative w-full min-w-0 overflow-hidden rounded-2xl border border-[#C5A05B] bg-[#FFFCF8] shadow-[0_12px_35px_rgba(20,25,30,0.08)]"
    >
      {/* Top gold accent */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-gradient-to-r from-[#B78A3E] via-[#D5B47C] to-[#E8D9C1]"
      />

      <div className="mx-auto w-full max-w-[1000px] px-5 py-8 sm:px-8 md:px-10 md:py-10">
        {/* Details heading */}
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#B78A3E]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A47B34]">
              {solution.title}
            </span>

            <span className="h-px w-7 bg-[#B78A3E]" />
          </div>

          <h3 className="mx-auto max-w-[850px] font-display text-[28px] leading-[1.12] tracking-[-0.025em] text-[#172A3A] sm:text-[34px] md:text-[40px]">
            {solution.heading}
          </h3>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-[2px] w-14 bg-[#C5A05B]"
          />
        </div>

        {/* Original paragraphs */}
        <div className="mx-auto mt-8 max-w-[900px] space-y-5">
          {solution.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? "border-l-[3px] border-[#C5A05B] bg-[#F7F0E5]/70 px-5 py-4 text-[16px] font-medium leading-[1.85] text-[#273746] md:text-[17px]"
                  : "text-[15px] leading-[1.9] text-[#536170] md:text-[16px]"
              }
            >
              {paragraph}
            </p>
          ))}

          {/* Dynamic builder checklist */}
          {solution.hasChecklist && (
            <>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-4 border-t border-[#E9DDCC] pt-7 sm:grid-cols-2">
                {builderChecklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] leading-[1.7] text-[#536170] md:text-[16px]"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[#E8D9C1] bg-[#F7F0E5]">
                      <Check
                        className="h-3.5 w-3.5 text-[#B78A3E]"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="pt-3 text-[15px] leading-[1.9] text-[#536170] md:text-[16px]">
                {solution.conclusion}
              </p>

              {/* Original project link */}
              <div className="pt-4">
                <Link
                  to={solution.link}
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#172A3A] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#B78A3E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B78A3E]"
                >
                  View Our Projects

                  <ArrowUpRight
                    className="h-4 w-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NewHomeSolutions({
  builderChecklist = [],
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCard = (index) => {
    setActiveIndex((current) =>
      current === index ? null : index
    );
  };

  const renderRows = (columns) => {
    const rows = [];

    for (
      let start = 0;
      start < solutions.length;
      start += columns
    ) {
      const rowSolutions = solutions.slice(
        start,
        start + columns
      );

      const isRowActive =
        activeIndex !== null &&
        activeIndex >= start &&
        activeIndex < start + columns;

      rows.push(
        <div key={start} className="w-full min-w-0">
          {/* Cards row */}
          <div
            className={`grid items-stretch gap-4 ${
              columns === 3
                ? "grid-cols-3"
                : columns === 2
                  ? "grid-cols-2"
                  : "grid-cols-1"
            }`}
          >
            {rowSolutions.map((solution, offset) => {
              const index = start + offset;

              return (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  index={index}
                  isActive={activeIndex === index}
                  onToggle={() => toggleCard(index)}
                />
              );
            })}
          </div>

          {/* Expanded details */}
          {isRowActive && (
            <div className="mt-4">
              <SolutionDetails
                solution={solutions[activeIndex]}
                builderChecklist={builderChecklist}
              />
            </div>
          )}
        </div>
      );
    }

    return rows;
  };

  return (
    <section
      id="new-home-solutions"
      className="w-full overflow-x-clip bg-[#F7F3EC] py-14 md:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* Main heading */}
        <Reveal>
          <div className="mx-auto flex max-w-[850px] flex-col items-center text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-7 bg-[#B78A3E]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A47B34]">
                Our New Home Solutions
              </span>

              <span className="h-px w-7 bg-[#B78A3E]" />
            </div>

            <h2 className="font-display text-[34px] leading-[1.08] tracking-[-0.025em] text-[#172A3A] sm:text-[40px] md:text-[46px] lg:text-[50px]">
              Explore Our New Home Building Solutions
            </h2>

            <div className="mx-auto mt-5 h-[2px] w-14 bg-[#C5A05B]" />
          </div>
        </Reveal>

        {/* Desktop: 3 cards */}
        <div className="mt-10 hidden w-full flex-col gap-4 lg:flex">
          {renderRows(3)}
        </div>

        {/* Tablet: 2 cards */}
        <div className="mt-10 hidden w-full flex-col gap-4 sm:flex lg:hidden">
          {renderRows(2)}
        </div>

        {/* Mobile: 1 card */}
        <div className="mt-10 flex w-full flex-col gap-4 sm:hidden">
          {renderRows(1)}
        </div>
      </div>
    </section>
  );
}
