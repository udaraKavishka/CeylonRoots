type JsonLdObject = Record<string, unknown>;

interface SeoJsonLdProps {
  data: JsonLdObject | JsonLdObject[];
}

export default function SeoJsonLd({ data }: SeoJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
