
import { Reveal } from "@/components/Reveal";
import {
  MessageSquare,
  ClipboardList,
  Ruler,
  HardHat,
  House,
  Check,
} from "lucide-react";

const stepIcons = [
  MessageSquare,
  ClipboardList,
  Ruler,
  HardHat,
  House,
];

export default function HouseExtensionProcess({ process = [] }) {
  return (
    <section className="relative overflow-hidden bg-[#F5F0E8] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6 lg:px-10">
        {/* Section heading */}
        <Reveal>
          <div className="mb-7 text-center lg:mb-8">
            <div className="tracking-eyebrow text-[#A47B34]">
              Our Process
            </div>

            <h2 className="mt-3 font-display text-[32px] leading-[1.08] tracking-[-0.025em] text-[#172A3A] sm:text-[38px] lg:text-[44px]">
              The House Extension Process
            </h2>
          </div>
        </Reveal>

        {/* Compact alternating timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-1/2 top-6 hidden w-px -translate-x-1/2 bg-[#D9C3A2] md:block"
          />

          <div className="space-y-2 sm:space-y-3">
            {process.map((step, index) => {
              const Icon = stepIcons[index] || ClipboardList;
              const isRight = index % 2 === 1;
              const isLast = index === process.length - 1;

              return (
                <Reveal key={`${step.title}-${index}`} delay={0.03}>
                  <div
                    className={`relative flex w-full ${
                      isRight
                        ? "md:justify-end"
                        : "md:justify-start"
                    }`}
                  >
                    {/* Connector line */}
                    <div
                      aria-hidden="true"
                      className={`absolute top-1/2 hidden h-px w-[4%] bg-[#C5A05B] md:block ${
                        isRight ? "left-1/2" : "right-1/2"
                      }`}
                    />

                    {/* Center timeline marker */}
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 z-10 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#F5F0E8] bg-[#B78A3E] ring-1 ring-[#B78A3E] md:block"
                    />

                    {/* Step card */}
                    <div
                      className={`relative w-full rounded-xl border px-4 py-3.5 transition-all duration-300 sm:px-5 md:w-[46%] ${
                        isLast
                          ? "border-[#172A3A] bg-[#172A3A] shadow-[0_8px_22px_rgba(23,42,58,0.12)]"
                          : "border-[#E2D3BE] bg-[#FFFCF8] shadow-sm hover:border-[#C5A05B] hover:shadow-md"
                      }`}
                    >
                      {/* Icon and number */}
                      <div className="mb-2.5 flex items-center justify-between">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                            isLast
                              ? "bg-[#30485B]"
                              : "border border-[#E8D9C1] bg-[#F7F0E5]"
                          }`}
                        >
                          <Icon
                            className={`h-[18px] w-[18px] ${
                              isLast
                                ? "text-[#E4BE7D]"
                                : "text-[#B78A3E]"
                            }`}
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                        </div>

                        <span
                          className={`font-display text-[23px] leading-none ${
                            isLast
                              ? "text-[#D4AD70]"
                              : "text-[#C8AD82]"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Original step title */}
                      <h3
                        className={`font-display text-[20px] leading-[1.15] sm:text-[21px] ${
                          isLast
                            ? "text-white"
                            : "text-[#172A3A]"
                        }`}
                      >
                        {step.title.replace(/^\d+\.\s*/, "")}
                      </h3>

                      {/* Original step description */}
                      <p
                        className={`mt-2 text-[13px] leading-[1.6] sm:text-[14px] ${
                          isLast
                            ? "text-[#E2E8F0]"
                            : "text-[#536170]"
                        }`}
                      >
                        {step.text}
                      </p>

                      {/* Final stage */}
                      {isLast && (
                        <div className="mt-3 flex items-center gap-2 border-t border-[#405466] pt-2.5">
                          <Check
                            className="h-3.5 w-3.5 text-[#D4AD70]"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />

                          <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#D4AD70]">
                            Final Stage
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
