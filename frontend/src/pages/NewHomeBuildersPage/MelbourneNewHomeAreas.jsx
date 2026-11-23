
import { Link } from "react-router-dom";
import {
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  House,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function MelbourneNewHomeAreas() {
  return (
    <section className="relative overflow-hidden bg-[#F7F3EC] py-14 md:py-20 lg:py-24">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-0 h-[380px] w-[380px] rounded-full border border-[#E6D8C4]/60"
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <Reveal>
          <div className="mb-10 text-center md:mb-14">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A47B34]">
                Melbourne South-East
              </span>

              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />
            </div>

            {/* Original SEO heading */}
            <h2 className="font-display text-[34px] leading-[1.08] tracking-[-0.025em] text-[#172A3A] sm:text-[40px] md:text-[46px] lg:text-[50px]">
              New Home Builders Melbourne South-East
            </h2>

            <div
              aria-hidden="true"
              className="mx-auto mt-6 h-[2px] w-14 bg-[#C5A05B]"
            />
          </div>
        </Reveal>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left: Premium service area card */}
          <Reveal className="lg:col-span-5">
            <div className="relative flex h-full min-h-[350px] flex-col justify-between overflow-hidden rounded-2xl border border-[#263D50] bg-[#172A3A] p-7 shadow-[0_12px_35px_rgba(23,42,58,0.12)] sm:p-9">
              {/* Decorative circles */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#C5A05B]/25"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#C5A05B]/20"
              />

              <div className="relative z-10">
                {/* Location icon */}
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-[#C5A05B]/40 bg-[#30485B]">
                  <MapPin
                    className="h-6 w-6 text-[#E4BE7D]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>

                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AD70]">
                  Our Service Area
                </div>

                <h3 className="mt-4 font-display text-[32px] leading-[1.1] text-white sm:text-[38px]">
                  Melbourne&apos;s
                  <span className="block text-[#E4BE7D]">
                    South &amp; South-East
                  </span>
                </h3>

                <p className="mt-5 max-w-[340px] text-[15px] leading-[1.8] text-[#D5DEE5]">
                  Residential building experience across
                  Melbourne&apos;s south and south-east.
                </p>
              </div>

              {/* Location names from original content */}
              <div className="relative z-10 mt-9 border-t border-white/15 pt-6">
                <div className="mb-4 flex items-center gap-3">
                  <House
                    className="h-5 w-5 text-[#D4AD70]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />

                  <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#E2E8F0]">
                    Project Locations
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["Clyde", "Berwick", "Drouin"].map(
                    (area) => (
                      <span
                        key={area}
                        className="rounded-full border border-[#C5A05B]/35 bg-white/[0.06] px-4 py-2 text-[12px] font-medium text-[#E4BE7D]"
                      >
                        {area}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Information card */}
          <Reveal
            className="lg:col-span-7"
            delay={0.08}
          >
            <div className="flex h-full flex-col rounded-2xl border border-[#E6D8C4] bg-[#FFFCF8] p-6 shadow-[0_5px_22px_rgba(20,25,30,0.05)] sm:p-8 md:p-10">
              {/* Eyebrow */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-7 bg-[#B78A3E]" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A47B34]">
                  Local Building Experience
                </span>
              </div>

              <h3 className="font-display text-[27px] leading-[1.2] text-[#172A3A] sm:text-[32px]">
                Building New Homes Across Melbourne
              </h3>

              {/* Original SEO paragraphs */}
              <div className="mt-7 space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 shrink-0 text-[#B78A3E]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                  <p className="text-[15px] leading-[1.85] text-[#536170] sm:text-[16px]">
                    Apollo Builders has completed residential
                    projects across Melbourne&apos;s south and
                    south-east, with projects including Clyde,
                    Berwick and Drouin.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 shrink-0 text-[#B78A3E]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                  <p className="text-[15px] leading-[1.85] text-[#536170] sm:text-[16px]">
                    If you&apos;re planning a new home, speak
                    with Apollo Builders about your requirements.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-9">
                <div className="border-t border-[#E9DDCC] pt-7">
                  <Link
                    to="/contact-us/"
                    className="group inline-flex min-h-[48px] items-center justify-center gap-3 rounded-lg bg-[#172A3A] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#30485B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B78A3E]"
                  >
                    Discuss Your New Home

                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
