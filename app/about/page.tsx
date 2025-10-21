import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About BuildIt — MUJ Builder Club",
  description: "Learn about BuildIt, the premier student development platform at Manipal University Jaipur. Discover our mission, team, and commitment to student growth through project-centric learning.",
  keywords: [
    "About BuildIt",
    "MUJ Builder Club Mission",
    "Student Development Platform",
    "Manipal University Jaipur",
    "Tech Education",
    "Project Learning",
    "Student Mentorship"
  ],
  openGraph: {
    title: "About BuildIt — MUJ Builder Club",
    description: "Learn about BuildIt, the premier student development platform at Manipal University Jaipur. Discover our mission, team, and commitment to student growth.",
    type: "website",
  },
  twitter: {
    title: "About BuildIt — MUJ Builder Club",
    description: "Learn about BuildIt, the premier student development platform at Manipal University Jaipur. Discover our mission and commitment to student growth.",
  },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About BuildIt</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-muted-foreground mb-8">
          BuildIt is a comprehensive student development platform at Manipal University Jaipur, 
          designed to foster innovation, collaboration, and hands-on learning through project-centric education.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-6">
          To create a dynamic ecosystem where students can develop real-world skills through 
          collaborative projects, industry mentorship, and practical application of technology.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Project-centric learning cycles every 3-4 months</li>
          <li>Industry mentorship from recognized experts</li>
          <li>Multi-domain focus: AI, Robotics, Web Development, and more</li>
          <li>Integrated digital platform for seamless collaboration</li>
          <li>Real-world project experience and portfolio building</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
        <p className="mb-6">
          BuildIt has helped students develop practical skills, build impressive portfolios, 
          and connect with industry professionals, leading to successful placements and career growth.
        </p>
      </div>
    </div>
  )
}