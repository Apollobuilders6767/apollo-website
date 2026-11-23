
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  Shield,
  ChevronDown,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Bath,
  Sparkles,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";

/* ---------------------------------------------
   Shared premium heading
--------------------------------------------- */

function SectionHeading({ eyebrow, heading, centered = true }) {
  return (
    <div
      className={
        centered
          ? "mx-auto max-w-[900px] text-center"
          : "max-w-[900px]"
      }
    >
      <div
        className={`mb-4 flex items-center gap-3 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-7 bg-[#B78A3E]" />

        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A47B34]">
          {eyebrow}
        </span>

        <span className="h-px w-7 bg-[#B78A3E]" />
      </div>

      <h2 className="font-display text-[34px] leading-[1.08] tracking-[-0.025em] text-[#172A3A] sm:text-[40px] md:text-[46px] lg:text-[50px]">
        {heading}
      </h2>

      <div
        className={`mt-6 h-[2px] w-14 bg-[#C5A05B] ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}

/* ---------------------------------------------
   Shared premium paragraph styling
--------------------------------------------- */

function Paragraphs({ paragraphs = [] }) {
  return (
    <div className="space-y-5">
      {paragraphs.map((paragraph, index) => (
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
    </div>
  );
}

/* ---------------------------------------------
   Image lightbox
--------------------------------------------- */

function ImageLightbox({ images, activeIndex, onClose, onChange }) {
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();

      if (event.key === "ArrowRight") {
        onChange((activeIndex + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        onChange(
          (activeIndex - 1 + images.length) % images.length
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, images.length, onClose, onChange]);

  if (activeIndex === null || !images.length) return null;

  const image = images[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bathroom image gallery"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#101820]/95 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              onChange(
                (activeIndex - 1 + images.length) %
                  images.length
              );
            }}
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              onChange((activeIndex + 1) % images.length);
            }}
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div
        className="flex max-h-full w-full max-w-[1100px] flex-col items-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt || "Bathroom renovation"}
          className="max-h-[78vh] w-full rounded-xl object-contain"
        />

        {image.alt && (
          <p className="max-w-[850px] text-center text-[13px] leading-[1.6] text-white/75">
            {image.alt}
          </p>
        )}

        {images.length > 1 && (
          <span className="text-[12px] font-semibold tracking-[0.15em] text-[#D5B47C]">
            {activeIndex + 1} / {images.length}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Specialisation image card
--------------------------------------------- */

function FocusCard({ item, index, isActive, onToggle }) {
  return (
    <Reveal delay={(index % 3) * 0.05}>
      <button
        type="button"
        aria-expanded={isActive}
        aria-controls={`bathroom-focus-${index}`}
        onClick={onToggle}
        className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-[#FFFCF8] text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B78A3E] ${
          isActive
            ? "border-[#C5A05B] shadow-[0_12px_30px_rgba(20,25,30,0.12)]"
            : "border-[#E6D8C4] shadow-[0_4px_18px_rgba(20,25,30,0.06)] hover:-translate-y-1 hover:border-[#C5A05B] hover:shadow-[0_12px_30px_rgba(20,25,30,0.10)]"
        }`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F0E7D9]">
          {item.image && (
            <img
              src={item.image}
              alt={item.imageAlt || item.heading}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
          )}

          {isActive && (
            <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#A47B34]">
              Viewing Details
            </span>
          )}
        </div>

        <div className="flex w-full flex-1 items-start justify-between gap-4 p-5">
          <div>
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A47B34]">
              Specialisation
            </span>

            <h3 className="font-display text-[22px] leading-[1.2] text-[#172A3A] md:text-[24px]">
              {item.heading}
            </h3>
          </div>

          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              isActive
                ? "rotate-180 border-[#B78A3E] bg-[#B78A3E] text-white"
                : "border-[#E6D8C4] text-[#536170]"
            }`}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>
      </button>
    </Reveal>
  );
}

function FocusDetails({ item, index }) {
  return (
    <div
      id={`bathroom-focus-${index}`}
      role="region"
      aria-label={item.heading}
      className="overflow-hidden rounded-2xl border border-[#C5A05B] bg-[#FFFCF8] shadow-[0_12px_35px_rgba(20,25,30,0.08)]"
    >
      <div className="h-[3px] bg-gradient-to-r from-[#B78A3E] via-[#D5B47C] to-[#E8D9C1]" />

      <div className="mx-auto max-w-[1000px] px-5 py-8 sm:px-8 md:px-10 md:py-10">
        <div className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A47B34]">
            Specialisation
          </span>

          <h3 className="mx-auto mt-4 max-w-[850px] font-display text-[28px] leading-[1.12] text-[#172A3A] sm:text-[34px] md:text-[40px]">
            {item.heading}
          </h3>

          <div className="mx-auto mt-5 h-[2px] w-14 bg-[#C5A05B]" />
        </div>

        <div className="mt-8">
          <Paragraphs paragraphs={item.body || []} />

          {item.bullets?.length ? (
            <ul className="mt-7 grid grid-cols-1 gap-4 border-t border-[#E9DDCC] pt-7 sm:grid-cols-2">
              {item.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-[15px] leading-[1.7] text-[#536170]"
                >
                  <CheckCircle2
                    className="mt-1 h-5 w-5 shrink-0 text-[#B78A3E]"
                    strokeWidth={1.75}
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}

          {item.bodyAfter?.length ? (
            <div className="mt-7 space-y-5">
              {item.bodyAfter.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-[1.9] text-[#536170] md:text-[16px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function FocusGallery({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCard = (index) => {
    setActiveIndex((current) =>
      current === index ? null : index
    );
  };

  const renderRows = (columns) => {
    const rows = [];

    for (let start = 0; start < items.length; start += columns) {
      const rowItems = items.slice(start, start + columns);

      const rowActive =
        activeIndex !== null &&
        activeIndex >= start &&
        activeIndex < start + columns;

      rows.push(
        <div key={start} className="min-w-0">
          <div
            className={`grid items-stretch gap-4 ${
              columns === 3
                ? "grid-cols-3"
                : columns === 2
                  ? "grid-cols-2"
                  : "grid-cols-1"
            }`}
          >
            {rowItems.map((item, offset) => {
              const index = start + offset;

              return (
                <FocusCard
                  key={index}
                  item={item}
                  index={index}
                  isActive={activeIndex === index}
                  onToggle={() => toggleCard(index)}
                />
              );
            })}
          </div>

          {rowActive && (
            <div className="mt-4">
              <FocusDetails
                item={items[activeIndex]}
                index={activeIndex}
              />
            </div>
          )}
        </div>
      );
    }

    return rows;
  };

  return (
    <>
      <div className="mt-10 hidden flex-col gap-4 lg:flex">
        {renderRows(3)}
      </div>

      <div className="mt-10 hidden flex-col gap-4 sm:flex lg:hidden">
        {renderRows(2)}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:hidden">
        {renderRows(1)}
      </div>
    </>
  );
}

/* ---------------------------------------------
   Main BathroomSolutions component
--------------------------------------------- */

export default function BathroomSolutions({ data }) {
  const [galleryIndex, setGalleryIndex] = useState(null);

  const galleryImages = data.collage || [];

  return (
    <>
      {/* BEFORE & AFTER */}
      {data.beforeAfter && (
        <section className="bg-[#F7F3EC] py-14 md:py-20 lg:py-24">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 px-5 sm:px-6 md:px-10 lg:grid-cols-12 lg:gap-14 lg:px-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Before & After"
                heading={data.beforeAfter.heading}
                centered={false}
              />

              <p className="mt-7 text-[16px] leading-[1.85] text-[#536170] md:text-[17px]">
                {data.beforeAfter.body}
              </p>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={0.05}>
              <div className="overflow-hidden rounded-2xl border border-[#E6D8C4] bg-[#FFFCF8] p-2 shadow-[0_12px_35px_rgba(20,25,30,0.07)]">
                <div className="aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src={data.beforeAfter.image}
                    alt={data.beforeAfter.imageAlt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* IMAGE COLLAGE */}
      {galleryImages.length > 0 && (
        <section className="bg-[#FFFCF8] py-14 md:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 md:px-10 lg:px-12">
            <Reveal>
              <SectionHeading
                eyebrow="Bathroom Gallery"
                heading="Explore Bathroom Renovation Details"
              />
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((img, index) => (
                <Reveal key={index} delay={(index % 3) * 0.05}>
                  <button
                    type="button"
                    onClick={() => setGalleryIndex(index)}
                    aria-label={`View image: ${img.alt || `Bathroom ${index + 1}`}`}
                    className="group relative block w-full overflow-hidden rounded-2xl border border-[#E6D8C4] bg-[#F0E7D9] text-left shadow-[0_4px_18px_rgba(20,25,30,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A05B] hover:shadow-[0_12px_30px_rgba(20,25,30,0.12)]"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    </div>

                    <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFCF8]/95 text-[#172A3A] shadow-md transition-colors group-hover:bg-[#B78A3E] group-hover:text-white">
                      <ZoomIn className="h-5 w-5" />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BATHROOM DESIGN */}
      {data.designSection && (
        <section className="bg-[#F7F3EC] py-14 md:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 md:px-10 lg:px-12">
            <Reveal>
              <SectionHeading
                eyebrow="Approach"
                heading={data.designSection.heading}
              />
            </Reveal>

            <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
              <Reveal>
                <div className="flex h-full flex-col justify-center overflow-hidden rounded-2xl border border-[#E6D8C4] bg-[#FFFCF8] shadow-[0_8px_35px_rgba(31,42,55,0.045)]">
                  <div className="h-[3px] bg-gradient-to-r from-[#B78A3E] via-[#D5B47C] to-[#E8D9C1]" />

                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="mb-7 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8D9C1] bg-[#F7F0E5]">
                        <Bath
                          className="h-6 w-6 text-[#B78A3E]"
                          strokeWidth={1.5}
                        />
                      </div>

                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A47B34]">
                        Our Approach
                      </span>
                    </div>

                    <Paragraphs
                      paragraphs={data.designSection.body}
                    />

                    <div className="mt-9">
                      <Link
                        to="/contact-us/"
                        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#172A3A] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#B78A3E]"
                      >
                        Get A Free Quote
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>

              {data.designSection.image && (
                <Reveal delay={0.05}>
                  <div className="h-full min-h-[300px] overflow-hidden rounded-2xl border border-[#E6D8C4] bg-[#F0E7D9] shadow-[0_8px_35px_rgba(31,42,55,0.045)]">
                    <img
                      src={data.designSection.image}
                      alt={data.designSection.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* BATHROOM SERVICES */}
      <section className="bg-[#FFFCF8] py-14 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 md:px-10 lg:px-12">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              heading={data.inclusionsHeading}
            />

            <p className="mx-auto mt-7 max-w-[850px] text-center text-[16px] leading-[1.85] text-[#536170] md:text-[17px]">
              {data.inclusionsIntro}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.inclusions.map((service, index) => (
              <Reveal key={service} delay={(index % 3) * 0.04}>
                <div className="group flex h-full min-h-[115px] items-center gap-4 rounded-2xl border border-[#E6D8C4] bg-[#FFFCF8] p-5 shadow-[0_4px_18px_rgba(31,42,55,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A05B] hover:shadow-[0_12px_28px_rgba(31,42,55,0.09)]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E8D9C1] bg-[#F7F0E5]">
                    <CheckCircle2
                      className="h-5 w-5 text-[#B78A3E]"
                      strokeWidth={1.7}
                    />
                  </span>

                  <span className="text-[15px] font-medium leading-[1.55] text-[#172A3A]">
                    {service}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {data.inclusionsOutro && (
            <Reveal delay={0.05}>
              <div className="mx-auto mt-9 max-w-[1050px] rounded-2xl border border-[#E6D8C4] bg-[#F0E7D9] px-6 py-7 sm:px-9">
                <div className="mb-3 flex items-center gap-3">
                  <Sparkles
                    className="h-5 w-5 text-[#B78A3E]"
                    strokeWidth={1.5}
                  />

                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A47B34]">
                    Apollo Builders
                  </span>
                </div>

                <p className="text-[15px] leading-[1.85] text-[#536170] md:text-[16px]">
                  {data.inclusionsOutro}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>


      {/* COMPLIANCE */}
      {data.complianceSection && (
        <section className="bg-[#FFFCF8] py-14 md:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 md:px-10">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-[#263D50] bg-[#172A3A] shadow-[0_15px_45px_rgba(20,25,30,0.12)]">
                <div className="h-[3px] bg-gradient-to-r from-[#B78A3E] via-[#D5B47C] to-[#E8D9C1]" />

                <div className="px-6 py-10 sm:px-10 md:px-14 md:py-14">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C5A05B]/30 bg-white/5">
                      <Shield
                        className="h-6 w-6 text-[#D5B47C]"
                        strokeWidth={1.5}
                      />
                    </span>

                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D5B47C]">
                      Compliance
                    </span>
                  </div>

                  <h2 className="font-display text-[32px] leading-[1.08] tracking-[-0.025em] text-white sm:text-[40px] md:text-[48px]">
                    {data.complianceSection.heading}
                  </h2>

                  <div className="mt-6 h-[2px] w-14 bg-[#C5A05B]" />

                  <div className="mt-8 space-y-5">
                    {data.complianceSection.body.map(
                      (paragraph, index) => (
                        <p
                          key={index}
                          className="text-[15px] leading-[1.9] text-white/80 md:text-[17px]"
                        >
                          {paragraph}
                        </p>
                      )
                    )}
                  </div>

                  {data.complianceSection.quote && (
                    <blockquote className="mt-9 border-l-[3px] border-[#C5A05B] bg-white/5 px-6 py-5 font-display text-[22px] leading-[1.4] text-white sm:text-[26px] md:text-[29px]">
                      {data.complianceSection.quote}
                    </blockquote>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* GALLERY LIGHTBOX */}
      <ImageLightbox
        images={galleryImages}
        activeIndex={galleryIndex}
        onClose={() => setGalleryIndex(null)}
        onChange={setGalleryIndex}
      />
    </>
  );
}
