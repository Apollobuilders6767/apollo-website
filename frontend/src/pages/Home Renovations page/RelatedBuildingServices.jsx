
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import OptimizedImage from "@/components/OptimizedImage";


const relatedServices = [
  {
    title: "House Extensions Melbourne",
    path: "/house-extensions-melbourne/",
    image: "/images/related-services/house-extensions-melbourne.png",
    alt: "Contemporary house extension in Melbourne",
    label: "Explore Service",
  },
  {
    title: "Kitchen Renovations",
    path: "/kitchen-renovations/",
    image: "/images/related-services/kitchen-renovations-melbourne.png",
    alt: "Premium modern kitchen renovation in Melbourne",
    label: "Explore Service",
  },
  {
    title: "Design & Build Melbourne",
    path: "/design-build-melbourne/",
    image: "/images/related-services/design-build-melbourne.png",
    alt: "Contemporary custom-designed residential home in Melbourne",
    label: "Explore Service",
  },
  {
    title: "View Our Projects",
    path: "/our-projects/",
    image: "/images/related-services/apollo-completed-projects.png",
    alt: "AI-generated architectural visualisation of a contemporary residential home",
    label: "View Portfolio",
  },
];


export default function RelatedBuildingServices() {
  return (
    <section className="relative overflow-hidden bg-[#F7F3EC] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 md:px-10 lg:px-12">

        {/* Section heading */}
        <Reveal>
          <div className="mb-9 text-center sm:mb-11">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-7 bg-[#B78A3E]" />

              <span className="tracking-eyebrow text-[#A47B34]">
                Related Services
              </span>

              <span className="h-px w-7 bg-[#B78A3E]" />
            </div>

            <h2 className="font-display text-[32px] leading-[1.1] tracking-[-0.025em] text-[#172A3A] sm:text-[38px] md:text-[44px] lg:text-[48px]">
              Explore Related Building Services
            </h2>
          </div>
        </Reveal>

        {/* Image cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedServices.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.05}
              className="h-full"
            >
              <Link
                to={item.path}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5D8C5] bg-white shadow-[0_4px_18px_rgba(23,42,58,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B78A3E] hover:shadow-[0_14px_32px_rgba(23,42,58,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B78A3E]"
              >
                {/* Card image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EDE6DA]">
                  <OptimizedImage
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Subtle bottom gradient */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#172A3A]/15 via-transparent to-transparent"
                  />
                </div>

                {/* Card content */}
                <div className="flex min-h-[145px] flex-1 flex-col justify-between gap-5 px-5 py-5">
                  <h3 className="font-display text-[22px] leading-[1.15] tracking-[-0.015em] text-[#172A3A] sm:text-[23px]">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between gap-3 border-t border-[#E9DFD1] pt-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A47B34]">
                      {item.label}
                    </span>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5D8C5] text-[#A47B34] transition-all duration-300 group-hover:border-[#B78A3E] group-hover:bg-[#B78A3E] group-hover:text-white">
                      <ArrowUpRight
                        className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
