import { createCaller } from '@quotum/app-quotum-server/shared';
import type { MetadataRoute } from 'next';

const baseUrl = 'https://dev.quotum.me';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const quotes = await createCaller({}).quoteList();

    const quoteUrls = quotes.map((quote) => ({
      url: `${baseUrl}/q/${quote.id}`,
      lastModified: new Date(quote.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/quotes`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/create`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
      },
      ...quoteUrls,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/quotes`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/create`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
      },
    ];
  }
}
