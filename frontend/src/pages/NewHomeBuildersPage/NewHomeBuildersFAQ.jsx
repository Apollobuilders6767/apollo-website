
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function NewHomeBuildersFAQ({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 md:px-10 lg:px-12">

        {/* Section heading */}
        <Reveal>
          <div className="mb-9 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />

              <span className="tracking-eyebrow text-[#A47B34]">
                Frequently Asked Questions
              </span>

              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#B78A3E]"
              />
            </div>

            {/* Original SEO heading */}
            <h2 className="font-display text-[32px] leading-[1.1] tracking-[-0.025em] text-[#172A3A] sm:text-[38px] md:text-[44px] lg:text-[48px]">
              New Home Builders Melbourne FAQs
            </h2>
          </div>
        </Reveal>

        {/* FAQ Accordion */}
        <div className="overflow-hidden rounded-2xl border border-[#E5D8C5] bg-[#F5F0E8] shadow-[0_8px_30px_rgba(23,42,58,0.04)]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `new-home-faq-answer-${index}`;
            const questionId = `new-home-faq-question-${index}`;

            return (
              <div
                key={`${faq.q}-${index}`}
                className={
                  index !== faqs.length - 1
                    ? "border-b border-[#E0D3C1]"
                    : ""
                }
              >
                {/* FAQ Question */}
                <h3>
                  <button
                    type="button"
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() =>
                      setOpenIndex(isOpen ? -1 : index)
                    }
                    className={`group flex w-full items-center gap-4 px-5 py-5 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B78A3E] sm:px-7 sm:py-6 ${
                      isOpen
                        ? "bg-[#EDE3D3]"
                        : "bg-[#F5F0E8] hover:bg-[#EFE7DB]"
                    }`}
                  >
                    {/* Question number */}
                    <span className="w-8 shrink-0 font-display text-[21px] text-[#B78A3E]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Original question */}
                    <span className="flex-1 font-display text-[19px] leading-[1.25] text-[#172A3A] sm:text-[22px]">
                      {faq.q}
                    </span>

                    {/* Expand / Collapse icon */}
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-[#B78A3E] bg-[#B78A3E] text-white"
                          : "border-[#E0D0B9] bg-white text-[#A47B34] group-hover:border-[#B78A3E]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus
                          className="h-4 w-4"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      ) : (
                        <Plus
                          className="h-4 w-4"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </button>
                </h3>

                {/* Original FAQ Answer */}
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                  className="bg-[#EDE3D3]"
                >
                  <div className="px-5 pb-6 pl-[68px] sm:px-7 sm:pb-7 sm:pl-[84px]">
                    <p className="max-w-[850px] text-[14px] leading-[1.85] text-[#536170] sm:text-[16px]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
