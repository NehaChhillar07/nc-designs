import { notFound } from "next/navigation";

// Unknown /v2/* URLs would otherwise fall through to the site-wide 404 in the
// old design. Catching them here renders app/v2/not-found.tsx instead, inside
// the v2 shell. Real /v2 routes are more specific, so they always win.
export default function V2Missing() {
    notFound();
}
