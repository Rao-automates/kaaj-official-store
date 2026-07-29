import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/cart',
          '/checkout',
          '/search',
          '/_next/',
        ],
      },
    ],
    sitemap: 'https://kaajofficial.com/sitemap.xml',
    host: 'https://kaajofficial.com',
  }
}
