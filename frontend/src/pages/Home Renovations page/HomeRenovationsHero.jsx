
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, MaskLines } from "@/components/Reveal";

const HERO_IMAGE = "/images/apollo/premium-renovation-hero (2).png";

export default function HomeRenovationsHero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#F3EBDD]">
      {/* Desktop background image — right side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[60%] lg:block"
      >
        <img
          src={HERO_IMAGE}
          alt="Modern home renovation in Melbourne featuring an open-plan living room, contemporary kitchen and indoor-outdoor living space"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Cream gradient — no white shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, #F3EBDD 0%, #F3EBDD 27%, rgba(243,235,221,0.98) 38%, rgba(243,235,221,0.88) 47%, rgba(243,235,221,0.55) 58%, rgba(243,235,221,0.12) 72%, rgba(243,235,221,0) 84%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20">
        <div className="max-w-[750px]">
          {/* Eyebrow — gold diamond instead of line */}
          <Reveal>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-[8px] w-[8px] rotate-45 bg-[#B38A42]"
              />

              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9B7436] md:text-[12px]">
                Melbourne Home Renovations
              </span>
            </div>
          </Reveal>

          {/* Main SEO heading */}
          <h1 className="mt-5 max-w-[720px] font-display text-[42px] leading-[1.04] tracking-[-0.035em] text-[#172A3A] sm:text-[52px] md:text-[64px] lg:text-[70px] xl:text-[76px]">
            <MaskLines
              lines={["Home Renovations", "Melbourne"]}
            />
          </h1>

          <Reveal delay={0.05}>
            {/* Featured introductory paragraph */}
            <div className="mt-7 max-w-[650px] rounded-r-xl border-l-[3px] border-[#C5A05B] bg-[#EAE0CF]/65 px-5 py-4">
              <p className="text-[16px] font-medium leading-[1.75] text-[#263747] md:text-[17px]">
                Your home should work for the way you live. When an
                existing property no longer provides the space,
                layout or functionality your family needs, a
                well-planned renovation can completely transform
                it without the need to leave the home and start
                again.
              </p>
            </div>

            {/* Original SEO content */}
            <div className="mt-6 max-w-[650px] space-y-4">
              <p className="text-[14px] leading-[1.8] text-[#475569] md:text-[15px]">
                Apollo Builders provides home renovation services
                across Melbourne&apos;s south and south-eastern
                suburbs, helping homeowners transform existing
                properties into functional, comfortable and
                beautifully finished spaces.
              </p>

              <p className="text-[14px] leading-[1.8] text-[#475569] md:text-[15px]">
                From individual areas such as kitchens and bathrooms
                through to complete home renovations, our approach
                is centred around understanding the property,
                understanding how you want to use it and delivering
                a finished result that feels considered from
                beginning to end.
              </p>

              <p className="text-[14px] leading-[1.8] text-[#475569] md:text-[15px]">
                Whether you have purchased an older property that
                needs a complete transformation, your family has
                outgrown the existing layout, or you simply want
                to modernise your home, Apollo Builders can help
                turn the existing property into a home that better
                suits your lifestyle.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                to="/contact-us/"
                className="btn-navy inline-flex items-center gap-3"
              >
                Start Your Renovation

                <ArrowUpRight
                  className="h-4 w-4"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Mobile / tablet image */}
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[380px] lg:hidden">
        <img
          src={HERO_IMAGE}
          alt="Premium home renovation showcasing contemporary living spaces by Apollo Builders"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />

        {/* Cream fade at the top */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-20"
          style={{
            background:
              "linear-gradient(180deg, #F3EBDD 0%, rgba(243,235,221,0) 100%)",
          }}
        />
      </div>
    </section>
  );
}
