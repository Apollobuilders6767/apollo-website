
import { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ImageIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

/* -----------------------------------------
   AI kitchen images
----------------------------------------- */

const KITCHEN_IMAGES = {
  "kitchen-design": "/images/kitchen-charcoal-luxury.png",
  "kitchen-services": "/images/kitchen-modern-marble.png",
  "specialisation-0": "/images/kitchen-walnut-gold.png",
  "specialisation-1": "/images/kitchen-bright-modern.png",
  "fully-managed": "/images/kitchen-fully-managed.png",
};

/* -----------------------------------------
   Gallery descriptions
   Conceptual descriptions, not verified
   project-specific construction details
----------------------------------------- */

const GALLERY_CONTENT = [
  {
    intro:
      "Explore this kitchen renovation in Endeavour Hills and discover how thoughtful design can bring together everyday functionality, comfortable living and a refined contemporary style.",
    bullets: [
      "Practical kitchen layouts designed around daily routines.",
      "Considered cabinetry and storage solutions.",
      "A balanced approach to finishes, materials and functionality.",
      "Design inspiration for a welcoming family kitchen.",
    ],
    outro:
      "Discover ideas for creating a kitchen that feels connected to the way you live, cook and entertain.",
  },
  {
    intro:
      "Take a closer look at this kitchen renovation in Berwick, with inspiration for creating a welcoming, efficient and contemporary kitchen environment.",
    bullets: [
      "Clean and practical kitchen design inspiration.",
      "Smart use of available kitchen space.",
      "Cabinetry and finishes that complement the surrounding home.",
      "A focus on comfort, accessibility and everyday usability.",
    ],
    outro:
      "Explore how a considered renovation approach can help create a kitchen that is both functional and visually appealing.",
  },
  {
    intro:
      "Explore this kitchen renovation in Bentleigh East and find inspiration for combining contemporary styling with the practical needs of a modern household.",
    bullets: [
      "Bright and welcoming kitchen design ideas.",
      "Thoughtful planning for preparation and cooking areas.",
      "Storage and cabinetry inspiration for organised living.",
      "A contemporary balance of form and function.",
    ],
    outro:
      "A well-planned kitchen can become a comfortable and inviting part of everyday home life.",
  },
];

function asParagraphs(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return value ? [value] : [];
}

/* -----------------------------------------
   Image with fallback
----------------------------------------- */

function KitchenCardImage({ src, alt, fallbackSrc }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  const useFallback = !src || failedSrc === src;

  const imageSrc =
    useFallback && !fallbackFailed
      ? fallbackSrc
      : useFallback
        ? null
        : src;

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F0E7D9]">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt || ""}
          loading="lazy"
          decoding="async"
          onError={() => {
            if (imageSrc === src) {
              setFailedSrc(src);
            } else {
              setFallbackFailed(true);
            }
          }}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <ImageIcon
            className="h-7 w-7 text-[#B78A3E]/60"
            strokeWidth={1.3}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

/* -----------------------------------------
   Compact solution card
----------------------------------------- */

function KitchenSolutionCard({
  item,
  index,
  active,
  onClick,
}) {
  return (
    <Reveal
      delay={(index % 4) * 0.04}
      className="h-full"
    >
      <button
        type="button"
        aria-expanded={active}
        aria-controls={`kitchen-details-${item.id}`}
        onClick={onClick}
        className={`group flex h-full w-full flex-col overflow-hidden rounded-lg border bg-[#FFFCF8] text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B78A3E] ${
          active
            ? "border-[#B78A3E] shadow-[0_6px_18px_rgba(23,42,58,0.12)]"
            : "border-[#E6D8C4] shadow-[0_2px_10px_rgba(23,42,58,0.04)] hover:-translate-y-0.5 hover:border-[#B78A3E] hover:shadow-[0_8px_20px_rgba(23,42,58,0.10)]"
        }`}
      >
        <KitchenCardImage
          key={item.image}
          src={item.image}
          fallbackSrc={item.fallbackImage}
          alt={item.imageAlt || item.heading}
        />

        <div className="flex w-full flex-1 items-center justify-between gap-1.5 px-2.5 py-2.5 sm:gap-2 sm:px-3 sm:py-3">
          <div className="min-w-0">
            <span className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.08em] text-[#A47B34] sm:text-[9px] sm:tracking-[0.12em]">
              {item.eyebrow}
            </span>

            <h3 className="font-display text-[14px] leading-[1.2] text-[#172A3A] sm:text-[16px] lg:text-[18px]">
              {item.heading}
            </h3>
          </div>

          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-6 sm:w-6 ${
              active
                ? "rotate-180 border-[#B78A3E] bg-[#B78A3E] text-white"
                : "border-[#E6D8C4] text-[#536170]"
            }`}
          >
            <ChevronDown
              className="h-3 w-3"
              aria-hidden="true"
            />
          </span>
        </div>
      </button>
    </Reveal>
  );
}

/* -----------------------------------------
   Expanded details
----------------------------------------- */

function KitchenSolutionDetails({ item }) {
  return (
    <div
      id={`kitchen-details-${item.id}`}
      role="region"
      aria-label={item.heading}
      className="overflow-hidden rounded-xl border border-[#C5A05B] bg-[#FFFCF8] shadow-[0_8px_25px_rgba(23,42,58,0.06)]"
    >
      <div className="h-[2px] bg-[#B78A3E]" />

      <div className="mx-auto max-w-[1000px] px-4 py-5 sm:px-6 sm:py-7 md:px-9">
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-px w-5 bg-[#B78A3E]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#A47B34]">
              {item.eyebrow}
            </span>

            <span className="h-px w-5 bg-[#B78A3E]" />
          </div>

          <h3 className="mx-auto max-w-[850px] font-display text-[23px] leading-[1.15] text-[#172A3A] sm:text-[29px] md:text-[34px]">
            {item.heading}
          </h3>

          <div className="mx-auto mt-4 h-[2px] w-10 bg-[#C5A05B]" />
        </div>

        {/* Gallery project image */}
        {item.isGallery && (
          <div className="mx-auto mt-6 max-w-[750px] overflow-hidden rounded-lg border border-[#E6D8C4]">
            <KitchenCardImage
              src={item.image}
              alt={item.imageAlt || item.heading}
            />
          </div>
        )}

        {/* Original or gallery description */}
        {item.paragraphs?.length > 0 && (
          <div className="mt-6 space-y-4">
            {item.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "border-l-[3px] border-[#C5A05B] bg-[#F7F0E5]/70 px-3 py-3 text-[14px] leading-[1.75] text-[#273746] sm:px-4 sm:text-[15px]"
                    : "text-[14px] leading-[1.8] text-[#536170] sm:text-[15px]"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Project highlights / original bullets */}
        {item.bullets?.length > 0 && (
          <ul className="mt-5 grid grid-cols-1 gap-x-7 gap-y-3 border-t border-[#E9DDCC] pt-5 sm:grid-cols-2">
            {item.bullets.map((bullet, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-[14px] leading-[1.7] text-[#536170]"
              >
                <CheckCircle2
                  className="mt-1 h-4 w-4 shrink-0 text-[#B78A3E]"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {item.bodyAfter?.length > 0 && (
          <div className="mt-5 space-y-4">
            {item.bodyAfter.map((paragraph, index) => (
              <p
                key={index}
                className="text-[14px] leading-[1.8] text-[#536170] sm:text-[15px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* -----------------------------------------
   Responsive expandable rows
----------------------------------------- */

function KitchenCardsGrid({
  items,
  columns,
  activeId,
  onToggle,
}) {
  const rows = [];

  for (let start = 0; start < items.length; start += columns) {
    const rowItems = items.slice(start, start + columns);

    const activeItem = rowItems.find(
      (item) => item.id === activeId
    );

    rows.push(
      <div key={start} className="min-w-0">
        <div
          className={`grid items-stretch gap-2.5 sm:gap-3 ${
            columns === 4
              ? "grid-cols-4"
              : columns === 3
                ? "grid-cols-3"
                : "grid-cols-2"
          }`}
        >
          {rowItems.map((item, index) => (
            <KitchenSolutionCard
              key={item.id}
              item={item}
              index={start + index}
              active={activeId === item.id}
              onClick={() => onToggle(item.id)}
            />
          ))}
        </div>

        {activeItem && (
          <div className="mt-3">
            <KitchenSolutionDetails item={activeItem} />
          </div>
        )}
      </div>
    );
  }

  return <div className="flex flex-col gap-3">{rows}</div>;
}

/* -----------------------------------------
   Main component
----------------------------------------- */

export default function KitchenSolutions({
  data,
  imageOverrides = {},
}) {
  const [activeId, setActiveId] = useState(null);

  const toggleCard = (id) => {
    setActiveId((current) =>
      current === id ? null : id
    );
  };

  if (!data) return null;

  const items = [];

  const addItem = (item) => {
    items.push({
      ...item,
      image:
        imageOverrides[item.id] ||
        KITCHEN_IMAGES[item.id] ||
        item.image,
      fallbackImage: item.image,
    });
  };

  /* Gallery cards with new descriptions */
  if (data.collage?.length) {
    data.collage.forEach((image, index) => {
      const content = GALLERY_CONTENT[index];

      addItem({
        id: `gallery-${index}`,
        eyebrow: "Kitchen Gallery",
        heading: image.alt || `Kitchen Image ${index + 1}`,
        image: image.src,
        imageAlt: image.alt,
        isGallery: true,
        paragraphs: content ? [content.intro] : [],
        bullets: content?.bullets || [],
        bodyAfter: content ? [content.outro] : [],
      });
    });
  }

  /* Original design content */
  if (data.designSection) {
    addItem({
      id: "kitchen-design",
      eyebrow: "Approach",
      heading: data.designSection.heading,
      image:
        data.designSection.image ||
        data.collage?.[0]?.src,
      imageAlt: data.designSection.imageAlt,
      paragraphs: asParagraphs(data.designSection.body),
    });
  }

  /* Original services content */
  addItem({
    id: "kitchen-services",
    eyebrow: "Services",
    heading: data.inclusionsHeading,
    image:
      data.collage?.[1]?.src ||
      data.collage?.[0]?.src,
    imageAlt: data.inclusionsHeading,
    paragraphs: [
      data.inclusionsIntro,
      data.inclusionsOutro,
    ].filter(Boolean),
    bullets: data.inclusions || [],
  });

  /* Original specialisation content */
  if (data.focusBlocks?.length) {
    data.focusBlocks.forEach((focus, index) => {
      addItem({
        id: `specialisation-${index}`,
        eyebrow: "Specialisation",
        heading: focus.heading,
        image: focus.image,
        imageAlt: focus.imageAlt,
        paragraphs: asParagraphs(focus.body),
        bullets: focus.bullets || [],
        bodyAfter: asParagraphs(focus.bodyAfter),
      });
    });
  }

  /* Original fully managed content */
  if (data.fullyManagedHeading) {
    addItem({
      id: "fully-managed",
      eyebrow: "Fully Managed",
      heading: data.fullyManagedHeading,
      image: data.fullyManagedImage,
      imageAlt: `${data.h1} — fully managed build`,
      paragraphs: asParagraphs(data.fullyManagedIntro),
      bullets: data.fullyManaged || [],
      bodyAfter: asParagraphs(data.fullyManagedOutro),
    });
  }

  return (
    <section
      id="kitchen-solutions"
      className="w-full overflow-x-clip bg-[#F7F3EC] py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1120px] px-3 sm:px-5 lg:px-7">
        <Reveal>
          <div className="mx-auto max-w-[850px] text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-px w-6 bg-[#B78A3E]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#A47B34] sm:text-[10px]">
                Kitchen Renovations
              </span>

              <span className="h-px w-6 bg-[#B78A3E]" />
            </div>

            <h2 className="font-display text-[27px] leading-[1.1] tracking-[-0.025em] text-[#172A3A] sm:text-[34px] md:text-[40px]">
              Explore Our Kitchen Renovation Solutions
            </h2>

            <div className="mx-auto mt-4 h-[2px] w-11 bg-[#C5A05B]" />
          </div>
        </Reveal>

        {/* Desktop */}
        <div className="mt-6 hidden lg:block">
          <KitchenCardsGrid
            items={items}
            columns={4}
            activeId={activeId}
            onToggle={toggleCard}
          />
        </div>

        {/* Tablet */}
        <div className="mt-6 hidden sm:block lg:hidden">
          <KitchenCardsGrid
            items={items}
            columns={3}
            activeId={activeId}
            onToggle={toggleCard}
          />
        </div>

        {/* Mobile */}
        <div className="mt-6 block sm:hidden">
          <KitchenCardsGrid
            items={items}
            columns={2}
            activeId={activeId}
            onToggle={toggleCard}
          />
        </div>
      </div>
    </section>
  );
}
