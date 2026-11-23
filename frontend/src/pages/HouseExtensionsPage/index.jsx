
import SEO, {
  breadcrumbSchema,
  localBusiness,
  faqSchema,
} from "@/components/SEO";

// Section 01 - Hero
import HouseExtensionsHero from "./HouseExtensionsHero";

// Section 02 - Why Extend
import WhyExtendHome from "./WhyExtendHome";

// Sections 03-07 - Extension Solutions
import ExtensionSolutions from "./ExtensionSolutions";

// Section 08 - Extension Process
import HouseExtensionProcess from "./HouseExtensionProcess";

// Section 09 - Melbourne Service Areas
import MelbourneExtensionAreas from "./MelbourneExtensionAreas";

// Section 10 - Related Building Services
import RelatedBuildingServices from "./RelatedBuildingServices";

// Section 11 - Frequently Asked Questions
import HouseExtensionsFAQ from "./HouseExtensionsFAQ";

// Section 12 - Final CTA
import HouseExtensionsCTA from "./HouseExtensionsCTA";

export default function HouseExtensionsMelbourne() {
  // Canonical Page URL
  const canonical = "/house-extensions-melbourne/";

  // Frequently Asked Questions
  const faqs = [
    {
      q: "How much does a house extension cost in Melbourne?",
      a: "Costs vary significantly according to size, structural requirements, materials, finishes and project complexity.",
    },
    {
      q: "Is a rear extension better than a second storey?",
      a: "It depends on your property. Available land, planning considerations, the existing structure and your desired floor area all influence the best option.",
    },
    {
      q: "Can an extension include a kitchen?",
      a: "Yes. Many extension projects incorporate larger kitchens and connected living areas.",
    },
    {
      q: "Can I renovate my existing house while extending it?",
      a: "Yes. Combining both works can create a more cohesive result.",
    },
    {
      q: "How long does a house extension take?",
      a: "The timeline depends on the project's size, design, approvals and construction complexity.",
    },
  ];

  // SEO Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema([
        {
          name: "Home",
          path: "/",
        },
        {
          name: "House Extensions Melbourne",
          path: canonical,
        },
      ]),
      localBusiness(),
      faqSchema(faqs),
    ],
  };

  // Section 02 - Home Extension Needs
  const needs = [
    "Another bedroom",
    "A larger kitchen",
    "More living space",
    "A second bathroom",
    "A dedicated home office",
    "Better outdoor entertaining space",
    "More storage",
    "A larger dining area",
    "Better connection to the backyard",
  ];

  // Section 08 - House Extension Process
  const process = [
    {
      title: "Initial consultation",
      text: "We discuss what you're trying to achieve and how you currently use the property.",
    },
    {
      title: "Property assessment",
      text: "The existing house and proposed works are considered before progressing.",
    },
    {
      title: "Design and planning",
      text: "The proposed extension is developed around the property and project requirements.",
    },
    {
      title: "Construction",
      text: "Construction begins once the project is ready to proceed.",
    },
    {
      title: "Completion",
      text: "The finished extension is integrated into the existing home and prepared for use.",
    },
  ];

  return (
    <div data-testid="house-extensions-melbourne-page">


      {/* SEO Metadata and Structured Data */}
      <SEO
        title="House Extensions Melbourne | Apollo Builders"
        description="Extend your Melbourne home with Apollo Builders. Create additional living space, improve your layout and transform your existing property with a professionally planned extension."
        path={canonical}
        jsonLd={jsonLd}
      />

      {/* Section 01 - Hero */}
      <HouseExtensionsHero />

      {/* Section 02 - Why Extend Your Melbourne Home */}
      <WhyExtendHome needs={needs} />

      {/* Sections 03-07 - Combined Extension Solutions */}
      <ExtensionSolutions />

      {/* Section 08 - The House Extension Process */}
      <HouseExtensionProcess process={process} />

      {/* Section 09 - House Extensions Across Melbourne */}
      <MelbourneExtensionAreas />

      {/* Section 10 - Related Building Services */}
      <RelatedBuildingServices />

      {/* Section 11 - House Extensions FAQs */}
      <HouseExtensionsFAQ faqs={faqs} />

      {/* Section 12 - Final CTA */}
      <HouseExtensionsCTA />

    </div>
  );
}
