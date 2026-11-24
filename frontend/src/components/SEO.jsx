import { Helmet } from "react-helmet-async";

/**
 * Per-page SEO — unique title, meta description, canonical, OG,
 * Twitter, and structured data. All copy passed in from the page —
 * never fabricates data.
 */
export default function SEO({
  title,
  description,
  path = "/",
  image = "/images/apollo/drouin-new-build-3.jpg",
  jsonLd = null,
  noindex = false,
  ogTitle,
  ogDescription,
  canonicalPath,
}) {
  const base = "https://www.apollobuilders.com.au";
  const canonicalInput = canonicalPath || path;

  // Normalise path: ensure leading slash + trailing slash
  let normalised = canonicalInput.startsWith("/") ? canonicalInput : `/${canonicalInput}`;

  if (normalised !== "/" && !normalised.endsWith("/")) {
    normalised = `${normalised}/`;
  }

  const canonical = `${base}${normalised}`;
  const socialTitle = ogTitle || title;
  const socialDescription = ogDescription || description;

  // Make relative image URLs absolute for OG/Twitter sharing
  const absoluteImage = image.startsWith("http")
    ? image
    : `${base}${image.startsWith("/") ? image : `/${image}`}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      {noindex && (
        <meta name="robots" content="noindex,nofollow" />
      )}

      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Apollo Builders" />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={socialDescription} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={canonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={socialDescription} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* Structured data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}

      {/* GTM lives once in public/index.html. Do not inject it here —
          Helmet would add a second container on every route. */}
    </Helmet>
  );
}

/* ─────────────────────────────────────────────────────────────
   Structured data helpers
   ───────────────────────────────────────────────────────────── */

export const localBusiness = () => ({
  "@context": "https://schema.org",
  "@type": [
    "GeneralContractor",
    "LocalBusiness",
    "HomeAndConstructionBusiness",
    "Organization",
  ],
  "@id": "https://www.apollobuilders.com.au/#business",

  name: "Apollo Builders",
  legalName: "Apollo Builders",
  url: "https://www.apollobuilders.com.au/",

  logo:
    "https://www.apollobuilders.com.au/images/apollo/photo_2025-12-03_10-38-14-e1764907039294.png",

  image:
    "https://www.apollobuilders.com.au/images/apollo/photo_2025-12-03_10-38-14-e1764907039294.png",

  telephone: "+61422339622",
  email: "info@apollobuilders.com.au",

  priceRange: "$$$",

  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },

  areaServed: [
    "Brighton",
    "Mentone",
    "Cheltenham",
    "Hampton",
    "Altona Meadows",
    "Bentleigh",
    "Bentleigh East",
    "Mordialloc",
    "Clayton",
    "Glen Waverley",
    "Endeavour Hills",
    "Berwick",
    "Clyde",
    "Drouin",
    "Bayside",
    "Melbourne CBD",
    "Melbourne South-East",
  ],

  knowsAbout: [
    "New Home Builds",
    "Custom Home Builders",
    "Home Renovations",
    "Kitchen Renovations",
    "Bathroom Renovations",
    "Home Extensions",
    "Knockdown Rebuild",
    "Outdoor Living",
  ],
});

export const serviceSchema = (svc) => ({
  "@context": "https://schema.org",
  "@type": "Service",

  serviceType: svc.title,

  provider: {
    "@type": "GeneralContractor",
    "@id": "https://www.apollobuilders.com.au/#business",
    name: "Apollo Builders",
  },

  areaServed: {
    "@type": "Place",
    name: "Melbourne South-East, VIC, Australia",
  },

  description: svc.body,
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,

    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
});

export const breadcrumbSchema = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",

  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `https://www.apollobuilders.com.au${c.path}`,
  })),
});