// Structured data as a script tag in the page, the way Next 16 recommends
// (docs: guides/json-ld). "<" is escaped so no string can close the tag.
export function JsonLd({ data }: { data: object | object[] }) {
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
