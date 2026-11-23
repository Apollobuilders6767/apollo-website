
import { Reveal } from "@/components/Reveal";
import {
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  House,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MelbourneExtensionAreas() {
  return (
    <section className="relative overflow-hidden bg-[#F7F3EC] py-14 md:py-20 lg:py-24">
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-0 h-[380px] w-[380px] rounded-full border border-[#E6D8C4]/60"
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <Reveal>
          <div className="mb-10 text-center md:mb-14">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-7 bg-[#B78A3E]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A47B34]">
                Melbourne South-East
              </span>

              <span className="h-px w-7 bg-[#B78A3E]" />
            </div>

            <h2 className="font-display text-[34px] leading-[1.08] tracking-[-0.025em] text-[#172A3A] sm:text-[40px] md:text-[46px] lg:text-[50px]">
              House Extensions Across Melbourne
            </h2>

            <div className="mx-auto mt-6 h-[2px] w-14 bg-[#C5A05B]" />
          </div>
        </Reveal>

        {/* Main content */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left visual card */}
          <Reveal className="lg:col-span-5">
            <div className="relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl border border-[#263D50] bg-[#172A3A] p-7 shadow-[0_12px_35px_rgba(23,42,58,0.12)] sm:p-9">
              {/* Decorative circles */}
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#C5A05B]/25"
              />

              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#C5A05B]/20"
              />

              <div className="relative z-10">
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
                    South & South-East
                  </span>
                </h3>

                <p className="mt-5 max-w-[330px] text-[15px] leading-[1.8] text-[#D5DEE5]">
                  Apollo Builders focuses on Melbourne&apos;s
                  south and south-east.
                </p>
              </div>

              <div className="relative z-10 mt-10 border-t border-white/15 pt-6">
                <div className="flex items-center gap-3">
                  <House
                    className="h-5 w-5 text-[#D4AD70]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />

                  <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#E2E8F0]">
                    Residential Building Projects
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right information card */}
          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="flex h-full flex-col rounded-2xl border border-[#E6D8C4] bg-[#FFFCF8] p-6 shadow-[0_5px_22px_rgba(20,25,30,0.05)] sm:p-8 md:p-10">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-7 bg-[#B78A3E]" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A47B34]">
                  Local Building Experience
                </span>
              </div>

              <h3 className="font-display text-[27px] leading-[1.2] text-[#172A3A] sm:text-[32px]">
                Building With Confidence Across Melbourne
              </h3>

              <div className="mt-6 space-y-6">
                {/* Original paragraph */}
                <div className="flex items-start gap-4">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 shrink-0 text-[#B78A3E]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                  <p className="text-[15px] leading-[1.85] text-[#536170] sm:text-[16px]">
                    Our existing portfolio demonstrates experience
                    across a range of residential projects, from
                    full renovations to new homes.
                  </p>
                </div>

                {/* Original paragraph */}
                <div className="flex items-start gap-4">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 shrink-0 text-[#B78A3E]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                  <p className="text-[15px] leading-[1.85] text-[#536170] sm:text-[16px]">
                    If you&apos;re considering extending your home
                    in Melbourne, contact Apollo Builders to
                    discuss your project.
                  </p>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="mt-auto pt-9">
                <div className="border-t border-[#E9DDCC] pt-7">
                  <Link
                    to="/contact-us/"
                    className="group inline-flex min-h-[48px] items-center justify-center gap-3 rounded-lg bg-[#172A3A] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#30485B]"
                  >
                    Discuss Your Project

                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.8}
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
