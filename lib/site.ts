// The one place the site's origin is defined.
// When the custom domain goes live, change this single line and nothing else.
// metadataBase, the sitemap, robots.txt, and every canonical and og:url on the
// site derive from it, so they all move together.
export const SITE_URL = "https://nc-designs.vercel.app";

// Next merges `openGraph` per top-level key, not deeply: a page that declares
// its own openGraph object REPLACES the root one wholesale, silently dropping
// og:site_name and og:locale. Every page that overrides openGraph has to spread
// these back in — hence one shared pair rather than six hardcoded copies.
export const SITE_NAME = "Neha Chhillar Portfolio";
export const SITE_LOCALE = "en_US";

// Contact + social, shared by the Connect section, the overlay, and the footer.
// LinkedIn URL matches the one published on the resume PDF.
export const CONTACT_EMAIL = "nehachhillar07@gmail.com";
export const LINKEDIN_URL = "https://linkedin.com/in/neha-chhillar";
