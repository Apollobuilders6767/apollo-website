import SEO, {
  breadcrumbSchema,
  serviceSchema,
  localBusiness,
  faqSchema,
} from "@/components/SEO";

import { servicePages } from "@/lib/servicePages";

import {
  projects,
  services as siteServices,
} from "@/lib/data";

import BathroomHero from "./BathroomHero";
import BathroomOverview from "./BathroomOverview";
import BathroomSolutions from "./BathroomSolutions";
import BathroomCost from "./BathroomCost";
import BathroomWhyApollo from "./BathroomWhyApollo";
import BathroomProjects from "./BathroomProjects";
import BathroomServiceArea from "./BathroomServiceArea";
import BathroomFAQ from "./BathroomFAQ";
import BathroomCTA from "./BathroomCTA";

export default function BathroomRenovationsPage() {
  const data = servicePages["bathroom-renovations"];

  if (!data) return null;

  const canonical = `/${data.slug}/`;

  const related = (data.relatedProjects || [])
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);

  const serviceRecord = siteServices.find(
    (service) => service.slug === data.slug
  );

  const faqs = serviceRecord?.faqs || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services/" },
        { name: data.h1, path: canonical },
      ]),

      serviceSchema({
        slug: data.slug,
        title: data.h1,
        tagline: data.tagline,
        body: data.intro.body.join(" "),
      }),

      localBusiness(),

      ...(faqs.length ? [faqSchema(faqs)] : []),
    ],
  };

  return (
    <div data-testid={`service-page-${data.slug}`}>
      <SEO
        title={data.seoTitle}
        description={data.metaDescription}
        path={canonical}
        image={data.hero}
        jsonLd={jsonLd}
      />

      <BathroomHero data={data} />

      <BathroomOverview data={data} />

      <BathroomSolutions data={data} />

      <BathroomCost data={data} />

      <BathroomWhyApollo data={data} />

      <BathroomProjects related={related} />

      <BathroomServiceArea data={data} />

      <BathroomFAQ data={data} faqs={faqs} />

      <BathroomCTA data={data} />
    </div>
  );
}