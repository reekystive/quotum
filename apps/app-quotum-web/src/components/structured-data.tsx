import { Quote } from '@quotum/app-quotum-server/shared-types';
import type { Organization, Person, Quotation, WebPage, WebSite } from 'schema-dts';

export function WebsiteStructuredData() {
  const structuredData: WebSite = {
    '@type': 'WebSite',
    name: 'Quotum',
    description: 'A powerful quote management platform for organizing, sharing, and discovering inspiring quotes.',
    url: 'https://dev.quotum.me',
    publisher: {
      '@type': 'Organization',
      name: 'Quotum',
      url: 'https://dev.quotum.me',
    } satisfies Organization,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}

interface QuoteStructuredDataProps {
  quote: Quote;
}

export function QuoteStructuredData({ quote }: QuoteStructuredDataProps) {
  const structuredData: Quotation = {
    '@id': quote.id,
    '@type': 'Quotation',
    text: quote.content,
    url: quote.url,
    creator: {
      '@type': 'Person',
      name: 'Unknown',
    } satisfies Person,
    isBasedOn: {
      '@type': 'WebPage',
      name: quote.title,
      url: quote.url,
    } satisfies WebPage,
    publisher: {
      '@type': 'Organization',
      name: 'Quotum',
      url: 'https://dev.quotum.me',
    } satisfies Organization,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
