import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import SiteNav from "@/components/site-nav" // fix SiteNav import path to point to the actual component with default export
import { TransitionProvider } from "@/components/transition-provider" // new
// sound provider removed

const bitcount = localFont({
  src: "./fonts/BitcountPropSingleInk.ttf",
  variable: "--font-bitcount",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "BuildIt — MUJ Builder Club | Student Development Platform",
    template: "%s | BuildIt — MUJ Builder Club"
  },
  description: "BuildIt is a comprehensive student development platform at Manipal University Jaipur. Join our builder club for project-centric learning, mentorship from industry experts, and hands-on experience in AI, Robotics, Web Development, and more.",
  keywords: [
    "BuildIt",
    "MUJ Builder Club", 
    "Manipal University Jaipur",
    "Student Development",
    "Project Learning",
    "Tech Mentorship",
    "AI Data Science",
    "Robotics Automation",
    "Web Development",
    "Student Projects",
    "Tech Community",
    "Builder Club",
    "Student Platform",
    "Tech Education",
    "Project Management"
  ],
  authors: [{ name: "BuildIt — MUJ Builder Club" }],
  creator: "BuildIt — MUJ Builder Club",
  publisher: "Manipal University Jaipur",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://buildit-muj.vercel.app'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buildit-muj.vercel.app', // Replace with your actual domain
    title: 'BuildIt — MUJ Builder Club | Student Development Platform',
    description: 'Join BuildIt, the premier student development platform at Manipal University Jaipur. Experience project-centric learning with industry mentorship in AI, Robotics, Web Development, and more.',
    siteName: 'BuildIt — MUJ Builder Club',
    images: [
      {
        url: '/images/builditlogo.png',
        width: 1200,
        height: 630,
        alt: 'BuildIt — MUJ Builder Club Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildIt — MUJ Builder Club | Student Development Platform',
    description: 'Join BuildIt, the premier student development platform at Manipal University Jaipur. Experience project-centric learning with industry mentorship.',
    images: ['/images/builditlogo.png'],
    creator: '@buildit_muj', // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BuildIt — MUJ Builder Club",
    "description": "A comprehensive student development platform at Manipal University Jaipur focused on project-centric learning and industry mentorship.",
    "url": "https://buildit-muj.vercel.app",
    "logo": "https://buildit-muj.vercel.app/images/builditlogo.png",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "addressCountry": "India"
    },
    "parentOrganization": {
      "@type": "EducationalOrganization",
      "name": "Manipal University Jaipur"
    },
    "sameAs": [
      "https://github.com/buildit-muj",
      "https://twitter.com/buildit_muj",
      "https://linkedin.com/company/buildit-muj"
    ],
    "offers": {
      "@type": "EducationalOccupationalProgram",
      "name": "Student Development Program",
      "description": "Project-centric learning with mentorship in AI, Robotics, Web Development, and more",
      "provider": {
        "@type": "Organization",
        "name": "BuildIt — MUJ Builder Club"
      }
    }
  }

  return (
    <html lang="en" className={`${bitcount.variable} dark antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="min-h-dvh bg-background text-foreground font-sans">
        <TransitionProvider>
            <div className="relative flex min-h-dvh flex-col">
              <Suspense fallback={<div>Loading...</div>}>
                <SiteNav />
              </Suspense>
              <main className="flex-1">{children}</main>
              <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
                <p className="px-4">© {new Date().getFullYear()} BuildIt — Manipal University Jaipur</p>
              </footer>
            </div>
        </TransitionProvider>
        <Analytics />
      </body>
    </html>
  )
}
