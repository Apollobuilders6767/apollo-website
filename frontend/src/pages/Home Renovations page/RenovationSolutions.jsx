
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown, ImageIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import OptimizedImage from "@/components/OptimizedImage";

const paragraphClass =
  "text-[15px] leading-[1.8] text-[color:var(--ink)] md:text-[16px]";

const solutions = [
  {
    id: "renovate-instead-of-moving",
    title: "Renovate Instead of Moving",
    subtitle: "Benefits of improving your existing home",
    heading: "Renovate Your Existing Home Instead of Moving",
    image: "/images/renovation-solutions/renovate-instead-of-moving.png",
  },
  {
    id: "lifestyle-renovations",
    title: "Lifestyle Renovations",
    subtitle: "Spaces designed around everyday living",
    heading: "Melbourne Home Renovations Designed Around Your Lifestyle",
    image: "/images/renovation-solutions/lifestyle-renovations.png",
  },
  {
    id: "kitchen-renovations",
    title: "Kitchen Renovations",
    subtitle: "Layout, storage, lighting and functionality",
    heading: "Kitchen Renovations",
    image: "/images/renovation-solutions/kitchen-renovations.png",
  },
  {
    id: "bathroom-renovations",
    title: "Bathroom Renovations",
    subtitle: "Modern finishes and practical layouts",
    heading: "Bathroom Renovations",
    image: "/images/renovation-solutions/bathroom-renovations.png",
  },
  {
    id: "open-plan-living",
    title: "Open-Plan Living",
    subtitle: "Connecting kitchen, dining and living areas",
    heading: "Open-Plan Home Renovations",
    image: "/images/renovation-solutions/open-plan-living.png",
  },
  {
    id: "indoor-outdoor-living",
    title: "Indoor-Outdoor Living",
    subtitle: "Connecting interiors with alfresco spaces",
    heading: "Indoor-Outdoor Living",
    image: "/images/renovation-solutions/indoor-outdoor-living.png",
  },
];

function SolutionContent({ index, renovationBenefits }) {
  switch (index) {
    case 0:
      return (
        <>
          <p className={paragraphClass}>
            Moving isn&apos;t always the best solution when your home
            no longer works for you.
          </p>

          <p className={paragraphClass}>
            You may already love your location, your street, your
            garden or your connection to the local community.
            The problem may simply be the house itself.
          </p>

          <p className={paragraphClass}>
            A renovation can allow you to retain the things you love
            about your property while changing the parts that no
            longer suit your lifestyle.
          </p>

          <p className={paragraphClass}>
            For example, a renovation could:
          </p>

          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-[color:var(--hair)] pt-5 sm:grid-cols-2">
            {renovationBenefits.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px] leading-[1.7] text-[color:var(--ink)]"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--gold)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className={paragraphClass}>
            The right renovation doesn&apos;t necessarily mean
            changing everything. Sometimes the best result comes
            from identifying what already works and improving
            what doesn&apos;t.
          </p>
        </>
      );

    case 1:
      return (
        <>
          <p className={paragraphClass}>
            Every home renovation is different.
          </p>

          <p className={paragraphClass}>
            A young family may need more open living space and
            practical storage. A growing family may need additional
            bedrooms or better separation between living zones.
            Other homeowners may want to modernise an older property
            while retaining elements of its original character.
          </p>

          <p className={paragraphClass}>
            Apollo Builders approaches each project around the
            individual property and the people who will live there.
          </p>

          <p className={paragraphClass}>
            Rather than applying the same renovation formula to every
            home, the objective is to create a result that makes
            sense for the property and its intended use.
          </p>
        </>
      );

    case 2:
      return (
        <>
          <p className={paragraphClass}>
            The kitchen is often one of the most important areas
            of a renovation.
          </p>

          <p className={paragraphClass}>
            A successful kitchen needs to look good, but it also
            needs to work.
          </p>

          <p className={paragraphClass}>
            Layout, storage, preparation space, appliance placement,
            lighting and connection to adjoining living areas all
            influence how useful the finished kitchen will be.
          </p>

          <p className={paragraphClass}>
            Apollo&apos;s renovation portfolio includes kitchen
            transformations as part of larger whole-home renovation
            projects. The Bentleigh East renovation, for example,
            involved the transformation of the kitchen, bathroom
            and living areas.
          </p>

          <div className="pt-3">
            <Link
              to="/kitchen-renovations/"
              className="btn-navy"
            >
              Explore Kitchen Renovations
              <ArrowUpRight
                className="h-4 w-4"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </div>
        </>
      );

    case 3:
      return (
        <>
          <p className={paragraphClass}>
            Bathrooms experience significant daily use, making
            functionality particularly important.
          </p>

          <p className={paragraphClass}>
            A renovation provides an opportunity to improve the
            layout, finishes, storage and overall usability
            of the space.
          </p>

          <p className={paragraphClass}>
            Whether the bathroom needs a modern update or forms
            part of a larger renovation, Apollo Builders can
            incorporate the bathroom into the wider design
            and construction process.
          </p>

          <div className="pt-3">
            <Link
              to="/bathroom-renovations/"
              className="btn-navy"
            >
              Explore Bathroom Renovations
              <ArrowUpRight
                className="h-4 w-4"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </div>
        </>
      );

    case 4:
      return (
        <>
          <p className={paragraphClass}>
            Many older homes contain separate kitchens, dining
            rooms and living rooms that don&apos;t reflect how
            modern families use their homes.
          </p>

          <p className={paragraphClass}>
            Opening these areas can create a stronger connection
            between spaces and make the home feel larger
            and more usable.
          </p>

          <p className={paragraphClass}>
            However, an open-plan renovation needs to consider
            more than simply removing walls.
          </p>

          <p className={paragraphClass}>
            The new layout needs to account for structural
            requirements, circulation, natural light, kitchen
            positioning, furniture placement and the relationship
            between living areas.
          </p>
        </>
      );

    case 5:
      return (
        <>
          <p className={paragraphClass}>
            Melbourne homeowners increasingly want their living
            spaces to connect naturally with the outdoors.
          </p>

          <p className={paragraphClass}>
            An extension or renovation can create a stronger
            relationship between the kitchen, dining
            and outdoor areas.
          </p>

          <p className={paragraphClass}>
            Apollo&apos;s Endeavour Hills renovation included
            a new kitchen, bathroom and decked alfresco area,
            creating a more connected indoor-outdoor
            living environment.
          </p>
        </>
      );

    default:
      return null;
  }
}

function SolutionDetails({
  solution,
  index,
  renovationBenefits,
}) {
  return (
    <div
      id={`solution-details-${solution.id}`}
      role="region"
      aria-label={solution.heading}
      className="relative w-full min-w-0 overflow-hidden rounded-2xl border border-[color:var(--gold)] bg-white px-5 py-7 shadow-[0_12px_35px_rgba(20,25,30,0.08)] sm:px-8 md:px-10 md:py-9"
    >
      <div className="mx-auto w-full max-w-[1000px]">
        <div className="text-center">
          <span className="tracking-eyebrow text-[color:var(--gold-dark)]">
            {solution.title}
          </span>

          <h3 className="mx-auto mt-3 max-w-[850px] font-display text-[27px] leading-[1.15] tracking-[-0.02em] text-[color:var(--ink-black)] sm:text-[32px] md:text-[38px]">
            {solution.heading}
          </h3>

          <div className="mx-auto mt-5 h-[2px] w-12 rounded-full bg-[color:var(--gold)]" />
        </div>

        <div className="mx-auto mt-7 flex max-w-[900px] flex-col gap-4">
          <SolutionContent
            index={index}
            renovationBenefits={renovationBenefits}
          />
        </div>
      </div>
    </div>
  );
}

function SolutionCard({
  solution,
  index,
  isActive,
  onToggle,
}) {
  return (
    <div className="relative min-w-0">
      <Reveal delay={index * 0.04}>
        <button
          type="button"
          aria-expanded={isActive}
          aria-controls={`solution-details-${solution.id}`}
          onClick={onToggle}
          className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--gold)] ${
            isActive
              ? "border-[color:var(--gold)] bg-white shadow-[0_12px_30px_rgba(20,25,30,0.12)]"
              : "border-black/5 bg-white shadow-[0_4px_18px_rgba(20,25,30,0.06)] hover:-translate-y-1 hover:border-[color:var(--gold)] hover:shadow-[0_12px_30px_rgba(20,25,30,0.10)]"
          }`}
        >
          {/* Compact image */}
          <div className="relative h-[130px] w-full shrink-0 overflow-hidden bg-[color:var(--cream)] sm:h-[145px] lg:h-[140px]">
            <OptimizedImage
              src={solution.image}
              alt={`${solution.title} architectural design concept`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              onError={(event) => {
                event.currentTarget.style.display = "none";

                const placeholder =
                  event.currentTarget.nextElementSibling;

                if (placeholder) {
                  placeholder.style.display = "flex";
                }
              }}
            />

            <div
              className="absolute inset-0 hidden items-center justify-center text-[color:var(--gold-dark)]"
              aria-hidden="true"
            >
              <ImageIcon
                className="h-8 w-8 opacity-50"
                strokeWidth={1}
              />
            </div>

            {isActive && (
              <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[color:var(--gold-dark)] shadow-sm">
                Viewing Details
              </div>
            )}
          </div>

          {/* Compact content */}
          <div className="flex w-full flex-1 flex-col justify-between p-4 lg:p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="min-w-0 font-display text-[20px] leading-[1.2] tracking-[-0.015em] text-[color:var(--ink-black)] lg:text-[22px]">
                {solution.title}
              </h3>

              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isActive
                    ? "rotate-180 border-[color:var(--gold)] bg-[color:var(--gold)] text-white"
                    : "border-[color:var(--hair)] text-[color:var(--ink)] group-hover:border-[color:var(--gold)]"
                }`}
              >
                <ChevronDown
                  className="h-4 w-4"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </span>
            </div>

            <p className="mt-2 text-[13px] leading-[1.5] text-[color:var(--ink)]">
              {solution.subtitle}
            </p>
          </div>
        </button>
      </Reveal>

      {isActive && (
        <div
          className="absolute -bottom-4 left-1/2 z-10 h-4 w-[2px] -translate-x-1/2 bg-[color:var(--gold)]"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default function RenovationSolutions({
  renovationBenefits = [],
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCard = (index) => {
    setActiveIndex((current) =>
      current === index ? null : index
    );
  };

  const renderDetails = (index) => (
    <SolutionDetails
      solution={solutions[index]}
      index={index}
      renovationBenefits={renovationBenefits}
    />
  );

  const renderCard = (solution, index) => (
    <SolutionCard
      key={solution.id}
      solution={solution}
      index={index}
      isActive={activeIndex === index}
      onToggle={() => toggleCard(index)}
    />
  );

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
          <div
            className={`grid items-stretch gap-3 lg:gap-4 ${
              columns === 3
                ? "grid-cols-3"
                : columns === 2
                  ? "grid-cols-2"
                  : "grid-cols-1"
            }`}
          >
            {rowSolutions.map((solution, offset) =>
              renderCard(solution, start + offset)
            )}
          </div>

          {isRowActive && (
            <div className="mt-4">
              {renderDetails(activeIndex)}
            </div>
          )}
        </div>
      );
    }

    return rows;
  };

  return (
    <section
      id="renovation-solutions"
      className="w-full overflow-x-clip bg-[color:var(--cream)] py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* Centered heading */}
        <Reveal>
          <div className="mx-auto flex w-full max-w-[850px] flex-col items-center text-center">
            <div className="tracking-eyebrow text-[color:var(--gold-dark)]">
              Our Renovation Solutions
            </div>

            <h2 className="mx-auto mt-4 max-w-[850px] font-display text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.12] tracking-[-0.025em] text-[color:var(--ink-black)]">
              Transform Your Home Around Your Lifestyle
            </h2>

            <div className="mx-auto mt-4 h-[2px] w-14 rounded-full bg-[color:var(--gold)]" />

            <p className="mx-auto mt-4 max-w-[650px] text-center text-[14px] leading-[1.7] text-[color:var(--ink)] sm:text-[15px]">
              Explore renovation options designed to make your
              existing home more functional, comfortable
              and connected.
            </p>
          </div>
        </Reveal>

        {/* Desktop: 3 cards per row */}
        <div className="mt-8 hidden w-full flex-col gap-4 lg:flex">
          {renderRows(3)}
        </div>

        {/* Tablet: 2 cards per row */}
        <div className="mt-8 hidden w-full flex-col gap-4 sm:flex lg:hidden">
          {renderRows(2)}
        </div>

        {/* Mobile: 1 card per row */}
        <div className="mt-8 flex w-full flex-col gap-4 sm:hidden">
          {renderRows(1)}
        </div>
      </div>
    </section>
  );
}
