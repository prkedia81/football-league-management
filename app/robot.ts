import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://ifa.kickoffonline.in'; // Updated URL

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/league-table','/match'],
        disallow: ['/','/admin/','/sign-me-abc-up','/login'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}