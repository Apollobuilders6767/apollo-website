
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/Reveal";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function KitchenFAQ({ data, faqs = [] }) {
  if (!faqs?.length) return null;

  return (
    <section
      data-testid={`service-faqs-${data.slug}`}
      className="relative overflow-hidden border-y border-[#E6D8C4] bg-[#F7F3EC] py-14 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="relative mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <Reveal>
          <div className="mb-9 text-center md:mb-12">

            {/* Original eyebrow */}
            <div className="mb-4 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />

              <span className="tracking-eyebrow text-[#A47B34]">
                FAQ
              </span>

              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />
            </div>

            {/* Original heading */}
            <h2 className="font-display text-[34px] leading-[1.08] tracking-[-0.025em] text-[#172A3A] sm:text-[40px] md:text-[46px] lg:text-[50px]">
              Frequently asked questions.
            </h2>

            {/* Gold underline */}
            <div
              aria-hidden="true"
              className="mx-auto mt-6 h-[2px] w-14 bg-[#B78A3E]"
            />

            {/* Original description */}
            <p className="mx-auto mt-6 max-w-[750px] text-[15px] leading-[1.85] text-[#536170] sm:text-[16px]">
              Straight answers to the questions we hear most often
              from Melbourne south-east homeowners planning a{" "}
              {data.h1.toLowerCase()} project.
            </p>
          </div>
        </Reveal>

        {/* FAQ accordion */}
        <Reveal delay={0.05}>
          <Accordion
            type="single"
            collapsible
            className="w-full overflow-hidden rounded-2xl border border-[#E5D8C5] bg-[#FFFCF8] shadow-[0_8px_30px_rgba(23,42,58,0.04)]"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`svc-faq-${data.slug}-${index}`}
                data-testid={`service-faq-item-${data.slug}-${index}`}
                className="group border-b border-[#E5D8C5] last:border-b-0"
              >
                <AccordionTrigger className="flex items-center gap-4 px-5 py-5 text-left transition-colors duration-300 hover:bg-[#F5F0E8] hover:no-underline data-[state=open]:bg-[#EDE3D3] sm:px-7 sm:py-6 [&>svg]:hidden">

                  {/* Question number */}
                  <span className="w-8 shrink-0 font-display text-[21px] text-[#B78A3E]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Original question */}
                  <span className="flex-1 font-display text-[19px] leading-[1.25] text-[#172A3A] sm:text-[22px]">
                    {faq.q}
                  </span>

                  {/* Plus / Minus icon */}
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E0D0B9] bg-white text-[#A47B34] transition-all duration-300 group-data-[state=open]:border-[#B78A3E] group-data-[state=open]:bg-[#B78A3E] group-data-[state=open]:text-white">

                    <Plus
                      className="h-4 w-4 group-data-[state=open]:hidden"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />

                    <Minus
                      className="hidden h-4 w-4 group-data-[state=open]:block"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>
                </AccordionTrigger>

                <AccordionContent className="bg-[#EDE3D3] px-5 pb-6 pt-0 sm:px-7 sm:pb-7">
                  <div className="pl-12">
                    {/* Original answer */}
                    <p className="max-w-[850px] text-[14px] leading-[1.85] text-[#536170] sm:text-[16px]">
                      {faq.a}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        {/* Original CTA */}
        <Reveal delay={0.1}>
          <div className="mt-9 flex justify-center">
            <Link
              to="/contact-us/"
              data-testid={`service-faq-cta-${data.slug}`}
              className="group inline-flex min-h-[48px] items-center justify-center gap-3 rounded-lg border border-[#172A3A] bg-[#172A3A] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#30485B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B78A3E] sm:text-[13px]"
            >
              Have another question?

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
