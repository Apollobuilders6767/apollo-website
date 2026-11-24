import { servicePages } from "@/lib/servicePages";
import { projects, services as siteServices } from "@/lib/data";

import SEO, {
  breadcrumbSchema,
  serviceSchema,
  localBusiness,
  faqSchema,
} from "@/components/SEO";

import KitchenHero from "./KitchenHero";
import KitchenOverview from "./KitchenOverview";
import KitchenSolutions from "./KitchenSolutions";
import KitchenCost from "./KitchenCost";
import KitchenWhyApollo from "./KitchenWhyApollo";
import KitchenProjects from "./KitchenProjects";
import KitchenFAQ from "./KitchenFAQ";
import KitchenCTA from "./KitchenCTA";
import QuoteForm from "@/components/QuoteForm";

export default function KitchenRenovationsPage() {
  const data = servicePages["kitchen-renovations"];

  const canonical = `/${data.slug}/`;

  const related = (data.relatedProjects || [])
    .map((slug) => projects.find((project) => project.slug === slug))
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

      <KitchenHero data={data} />

      <KitchenOverview data={data} />

      <KitchenSolutions data={data} />

      <KitchenCost data={data} />

      <KitchenWhyApollo data={data} />

      <KitchenProjects related={related} />

      <KitchenFAQ data={data} faqs={faqs} />

      <KitchenCTA data={data} />
      <QuoteForm formName="kitchen-renovations" defaultProject="Kitchen" />
    </div>
  );
}