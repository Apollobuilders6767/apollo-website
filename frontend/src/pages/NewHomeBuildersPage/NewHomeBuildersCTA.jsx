
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function NewHomeBuildersCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[#172A3A] py-16 text-white sm:py-20 lg:py-24">
      {/* Decorative background elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Subtle architectural grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Gold glow effects */}
        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#C8A75E]/10 blur-[100px]" />

        <div className="absolute -bottom-40 -left-32 h-[360px] w-[360px] rounded-full bg-[#C8A75E]/5 blur-[100px]" />

        {/* Decorative border */}
        <div className="absolute inset-5 border border-white/[0.06] sm:inset-8" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 text-center sm:px-8 lg:px-12">
        <Reveal>
          {/* Original eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#C8A75E]"
            />

            <span className="tracking-eyebrow text-[#D4AD70]">
              Start Your New Home
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#C8A75E]"
            />
          </div>

          {/* Original heading */}
          <h2 className="mx-auto max-w-[900px] font-display text-[36px] leading-[1.08] tracking-[-0.025em] text-white sm:text-[44px] md:text-[54px] lg:text-[60px]">
            Start Your New Home Project
          </h2>

          {/* Gold accent */}
          <div
            aria-hidden="true"
            className="mx-auto mt-6 h-[2px] w-14 bg-[#C8A75E]"
          />

          {/* Original paragraph */}
          <p className="mx-auto mt-7 max-w-[760px] text-[15px] leading-[1.85] text-white/80 sm:text-[16px] md:text-[17px]">
            If you&apos;re planning a new home in Melbourne,
            speak with Apollo Builders about your site, your
            requirements and the type of home you want to create.
          </p>

          {/* Contact CTA */}
          <div className="mt-9 flex justify-center">
            <Link
              to="/contact-us/"
              className="group inline-flex w-full max-w-[480px] items-center justify-center gap-3 rounded-lg border border-[#C8A75E] bg-[#C8A75E] px-6 py-4 text-center text-[12px] font-semibold leading-[1.5] text-[#172A3A] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E0BF7D] hover:bg-[#E0BF7D] hover:shadow-[0_14px_30px_rgba(0,0,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0BF7D] sm:w-auto sm:text-[14px]"
            >
              <span>
                Start Your New Home Project
              </span>

              <ArrowUpRight
                className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
