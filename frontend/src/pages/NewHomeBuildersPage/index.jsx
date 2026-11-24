
import SEO, {
  breadcrumbSchema,
  localBusiness,
  faqSchema,
} from "@/components/SEO";

import NewHomeBuildersHero from "./NewHomeBuildersHero";
import GroundUpPlanning from "./GroundUpPlanning";
import NewHomeSolutions from "./NewHomeSolutions";
import NewHomeBuildingProcess from "./NewHomeBuildingProcess";
import MelbourneNewHomeAreas from "./MelbourneNewHomeAreas";
import RelatedBuildingServices from "./RelatedBuildingServices";
import NewHomeBuildersFAQ from "./NewHomeBuildersFAQ";
import NewHomeBuildersCTA from "./NewHomeBuildersCTA";

export default function NewHomeBuildersMelbourne() {
  const canonical = "/new-home-builders-melbourne/";

  const faqs = [
    {
      q: "How much does it cost to build a new home in Melbourne?",
      a: "There is no single price because construction costs depend on the design, size, materials, site and specifications.",
    },
    {
      q: "How long does building a new home take?",
      a: "The timeline varies according to design, approvals, construction requirements and project size.",
    },
    {
      q: "Can I build a custom-designed home?",
      a: "Yes. A custom approach allows the home to be developed around your lifestyle and requirements.",
    },
    {
      q: "Does Apollo build two-storey homes?",
      a: "Apollo's portfolio includes a completed two-storey new home in Berwick.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        {
          name: "New Home Builders Melbourne",
          path: canonical,
        },
      ]),
      localBusiness(),
      faqSchema(faqs),
    ],
  };

  const planningItems = [
    "Bedrooms",
    "Bathrooms",
    "Kitchen",
    "Living areas",
    "Storage",
    "Outdoor areas",
    "Natural light",
    "Internal flow",
    "Entertaining spaces",
    "Future requirements",
  ];

  const builderChecklist = [
    "Previous projects",
    "Quality of workmanship",
    "Communication",
    "Project planning",
    "Experience",
    "Construction approach",
    "Ability to understand your requirements",
  ];

  const process = [
    {
      title: "Consultation",
      text: "Understand the site, requirements and intended outcome.",
    },
    {
      title: "Design and planning",
      text: "Develop the proposed home around the property and lifestyle.",
    },
    {
      title: "Preparation",
      text: "Prepare the project for construction.",
    },
    {
      title: "Construction",
      text: "Build the home according to the agreed project requirements.",
    },
    {
      title: "Completion",
      text: "Complete the final stages and prepare the home for occupation.",
    },
  ];

  return (
    <div data-testid="new-home-builders-melbourne-page">
      <SEO
        title="New Home Builders Melbourne | Apollo Builders"
        description="Build your new home in Melbourne with Apollo Builders. Explore modern family homes, two-storey builds and new residential construction across Melbourne's south-east."
        path={canonical}
        canonicalPath="/new-home-builds/"
        jsonLd={jsonLd}
      />

      {/* Section 01 - Hero */}
      <NewHomeBuildersHero />

      {/* Section 02 - Ground Up Planning */}
      <GroundUpPlanning planningItems={planningItems} />

      {/* Sections 03-05 - New Home Solutions */}
      <NewHomeSolutions builderChecklist={builderChecklist} />

      {/* Section 06 - Building Process */}
      <NewHomeBuildingProcess process={process} />

      {/* Section 07 - Melbourne South-East */}
      <MelbourneNewHomeAreas />

      {/* Section 08 - Related Services */}
      <RelatedBuildingServices />

      {/* Section 09 - FAQs */}
      <NewHomeBuildersFAQ faqs={faqs} />

      {/* Section 10 - Final CTA */}
      <NewHomeBuildersCTA />
    </div>
  );
}
