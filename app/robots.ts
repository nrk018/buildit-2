import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/static/',
      ],
    },
    sitemap: 'https://buildit-muj.vercel.app/sitemap.xml', // Replace with your actual domain
  }
}
