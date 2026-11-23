
import HomeRenovationsHero from "./HomeRenovationsHero";
import HomeRenovationsIntro from "./HomeRenovationsIntro";
import RenovationSolutions from "./RenovationSolutions";
import HomeRenovationProcess from "./HomeRenovationProcess";
import MelbourneServiceAreas from "./MelbourneServiceAreas";
import WhyChooseApollo from "./WhyChooseApollo";
import RelatedBuildingServices from "./RelatedBuildingServices";
import HomeRenovationsFAQ from "./HomeRenovationsFAQ";
import HomeRenovationsCTA from "./HomeRenovationsCTA";

import SEO, {
  breadcrumbSchema,
  localBusiness,
  faqSchema,
} from "@/components/SEO";

export default function HomeRenovationsMelbourne() {
  const canonical = "/home-renovations-melbourne/";

  // Frequently Asked Questions
  // Used in both the FAQ section and SEO structured data.
  const faqs = [
    {
      q: "How much does a home renovation cost in Melbourne?",
      a: "The cost depends on the size of the property, structural changes, materials, finishes and scope of construction. A detailed project assessment is required before an accurate price can be established.",
    },
    {
      q: "How long does a home renovation take?",
      a: "Project duration varies depending on the scope and complexity of the renovation. Larger renovations naturally require more planning and construction time.",
    },
    {
      q: "Can I renovate my entire house?",
      a: "Yes. A whole-home renovation can combine multiple areas and construction requirements into one coordinated project.",
    },
    {
      q: "Can I renovate and extend my home at the same time?",
      a: "Yes. Combining renovation and extension works can be an effective way to improve both the existing areas and overall footprint of a property.",
    },
    {
      q: "Do you work in Melbourne's south-east?",
      a: "Apollo Builders' existing portfolio includes projects across Melbourne's south and south-east, including Bentleigh East, Endeavour Hills and other surrounding areas.",
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
          name: "Home Renovations Melbourne",
          path: canonical,
        },
      ]),
      localBusiness(),
      faqSchema(faqs),
    ],
  };

  // Home Renovation Services
  const renovationServices = [
    "Kitchen renovations",
    "Bathroom renovations",
    "Living area renovations",
    "Open-plan transformations",
    "Internal alterations",
    "Flooring and finishes",
    "Outdoor living areas",
    "Alfresco spaces",
    "Structural changes",
    "Whole-home renovations",
  ];

  // Renovation Benefits
  const renovationBenefits = [
    "Create a larger kitchen",
    "Connect the kitchen and living areas",
    "Improve natural light",
    "Create better storage",
    "Modernise bathrooms",
    "Improve the relationship between indoor and outdoor spaces",
    "Reconfigure unsuitable rooms",
    "Update outdated finishes",
    "Create more functional living areas",
  ];

  // Home Renovation Process
  const process = [
    {
      title: "1. Initial consultation",
      text: "We begin by understanding your property, your goals and what you want to achieve.",
    },
    {
      title: "2. Understanding the project",
      text: "The existing property and proposed renovation are considered so the project can be approached realistically.",
    },
    {
      title: "3. Planning and design",
      text: "The proposed works are developed around your requirements and the property.",
    },
    {
      title: "4. Construction",
      text: "Once the project is ready to proceed, construction begins with the focus on quality workmanship and careful coordination.",
    },
    {
      title: "5. Completion",
      text: "The final stage is about completing the project and delivering a home that is ready for you to enjoy.",
    },
  ];

  // Melbourne Service Areas
  const areas = [
    "Bentleigh East",
    "Endeavour Hills",
    "Altona Meadows",
    "Berwick",
    "Clyde",
    "Drouin",
  ];

  // Why Choose Apollo Builders
  const reasons = [
    "Quality craftsmanship",
    "Thoughtful design",
    "Practical spaces",
    "Clear communication",
    "Detailed project planning",
    "Individual project requirements",
    "Complete renovation solutions",
  ];

  return (
    <div data-testid="home-renovations-melbourne-page">
      {/* SEO Metadata and Structured Data */}
      <SEO
        title="Home Renovations Melbourne | Apollo Builders"
        description="Transform your Melbourne home with Apollo Builders. We deliver complete home renovations, thoughtful design, quality construction and tailored renovation solutions."
        path={canonical}
        jsonLd={jsonLd}
      />

      {/* Section 01: Hero */}
      <HomeRenovationsHero />

      {/* Section 02: Complete Home Renovations */}
      <HomeRenovationsIntro
        renovationServices={renovationServices}
      />

      {/* Section 03: Renovation Solutions */}
      <RenovationSolutions
        renovationBenefits={renovationBenefits}
      />

      {/* Section 04: Home Renovation Process */}
      <HomeRenovationProcess process={process} />

      {/* Section 05: Melbourne Service Areas */}
      <MelbourneServiceAreas areas={areas} />

      {/* Section 06: Why Choose Apollo Builders */}
      <WhyChooseApollo reasons={reasons} />

      {/* Section 07: Related Building Services */}
      <RelatedBuildingServices />

      {/* Section 08: Frequently Asked Questions */}
      <HomeRenovationsFAQ faqs={faqs} />

      {/* Section 09: Final Renovation CTA */}
      <HomeRenovationsCTA />
    </div>
  );
}
