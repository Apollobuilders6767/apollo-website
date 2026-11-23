
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function BathroomCTA({ data }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#172A3A] py-16 text-white sm:py-20 lg:py-24">
      {/* Decorative background */}
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

        {/* Soft gold glow */}
        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#C8A75E]/10 blur-[100px]" />

        <div className="absolute -bottom-40 -left-32 h-[360px] w-[360px] rounded-full bg-[#C8A75E]/5 blur-[100px]" />

        {/* Decorative frame */}
        <div className="absolute inset-5 border border-white/[0.06] sm:inset-8" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 text-center sm:px-8 lg:px-12">
        <Reveal>
          {/* Original heading */}
          <h2 className="mx-auto max-w-[20ch] font-display text-[36px] leading-[1.08] tracking-[-0.03em] text-white sm:text-[44px] md:text-[54px] lg:text-[60px]">
            {data.finalCta.heading}
          </h2>

          {/* Gold underline */}
          <div
            aria-hidden="true"
            className="mx-auto mt-7 h-[2px] w-16 bg-[#C8A75E]"
          />

          {/* Original description */}
          <p className="mx-auto mt-8 max-w-[720px] text-[15px] leading-[1.85] text-white/80 sm:text-[16px] md:text-[17px]">
            {data.finalCta.body}
          </p>

          {/* Original CTA buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary gold button */}
            <Link
              to="/contact-us/"
              data-testid={`service-final-cta-${data.slug}`}
              className="group inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-lg border border-[#C8A75E] bg-[#C8A75E] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#172A3A] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E0BF7D] hover:bg-[#E0BF7D] hover:shadow-[0_14px_30px_rgba(0,0,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0BF7D] sm:w-auto sm:text-[13px]"
            >
              Get A Free Quote

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>

            {/* Secondary outline button */}
            <Link
              to="/our-projects/"
              className="group inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-lg border border-white/40 bg-white/[0.04] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#172A3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:text-[13px]"
            >
              View Our Projects
            </Link>
          </div>

          {/* Original service area text */}
          <p className="mx-auto mt-12 max-w-[850px] text-[12px] uppercase leading-[1.9] tracking-[0.14em] text-white/50 sm:text-[13px]">
            Serving{" "}
            <Link
              to="/builders-clayton/"
              data-testid={`service-clayton-link-${data.slug}`}
              className="font-semibold text-[#D4AD70] transition-colors duration-300 hover:text-white"
            >
              Clayton
            </Link>
            , Brighton, Glen Waverley &amp; Melbourne's south-east.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
