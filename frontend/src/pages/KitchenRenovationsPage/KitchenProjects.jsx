
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function KitchenProjects({ related = [] }) {
  if (!related?.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#F7F3EC] py-14 sm:py-16 md:py-20 lg:py-24">

      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full border border-[#E6D8C4]/60"
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-6 text-center md:mb-14">

            {/* Original eyebrow */}
            <div className="flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />

              <span className="tracking-eyebrow text-[#A47B34]">
                Recent Work
              </span>

              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />
            </div>

            {/* Original heading */}
            <h2 className="font-display text-[34px] leading-[1.08] tracking-[-0.025em] text-[#172A3A] sm:text-[40px] md:text-[46px] lg:text-[50px]">
              Related projects.
            </h2>

            {/* Gold underline */}
            <div
              aria-hidden="true"
              className="h-[2px] w-14 bg-[#B78A3E]"
            />

            {/* Original View All link */}
            <Link
              to="/our-projects/"
              className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-lg border border-[#172A3A] bg-[#172A3A] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#30485B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B78A3E]"
            >
              View All

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>

          </div>
        </Reveal>

        {/* Project cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {related.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={Math.min(index * 0.05, 0.2)}
              className="h-full"
            >
              <Link
                to={`/our-projects/${project.slug}/`}
                data-testid={`service-related-${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E6D8C4] bg-[#FFFCF8] shadow-[0_5px_20px_rgba(23,42,58,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#B78A3E] hover:shadow-[0_16px_36px_rgba(23,42,58,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B78A3E]"
              >

                {/* Project image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE7DD]">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Subtle image gradient */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#172A3A]/20 via-transparent to-transparent"
                  />

                  {/* Floating arrow */}
                  <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#172A3A] shadow-sm transition-all duration-300 group-hover:border-[#B78A3E] group-hover:bg-[#B78A3E] group-hover:text-white">
                    <ArrowUpRight
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>
                </div>

                {/* Project details */}
                <div className="flex flex-1 flex-col px-6 pb-7 pt-6">

                  {/* Original project type */}
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-px w-6 bg-[#B78A3E]"
                    />

                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#A47B34]">
                      {project.type}
                    </span>
                  </div>

                  {/* Original project name */}
                  <h3 className="font-display text-[23px] leading-[1.2] tracking-[-0.02em] text-[#172A3A] transition-colors duration-300 group-hover:text-[#A47B34] sm:text-[25px]">
                    {project.name}
                  </h3>

                </div>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
