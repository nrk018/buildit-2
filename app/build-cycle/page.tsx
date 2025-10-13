"use client"

import { motion } from "framer-motion"
import { Calendar, Users, Code, TestTube, Rocket, Award } from "lucide-react"

const steps = [
  {
    step: 1,
    title: "Ideation & Problem Definition",
    duration: "Week 1–2",
    icon: Users,
    color: "bg-blue-500",
    content: {
      description: "Students form teams and brainstorm real-world tech problems aligned with BuildIt's focus areas.",
      activities: [
        "Students form teams and brainstorm real-world tech problems aligned with BuildIt's focus areas.",
        "Conduct problem validation through short surveys or user research.",
        "Create a 1-page problem statement document that includes:",
        "• The problem and target users",
        "• Proposed solution idea", 
        "• Tech stack overview",
        "• Roles of team members"
      ],
      mentorReview: "Mentors (GSOC/JPMC placed seniors) give feedback and approve ideas."
    }
  },
  {
    step: 2,
    title: "Requirement Analysis & System Design",
    duration: "Week 3–4",
    icon: Code,
    color: "bg-green-500",
    content: {
      description: "Teams break down the idea into functional and non-functional requirements.",
      activities: [
        "Teams break down the idea into functional and non-functional requirements.",
        "Draw flow diagrams, wireframes, and data models using tools like Figma, Lucidchart, or Excalidraw.",
        "Finalize tech stack choices (frontend, backend, database, APIs, etc.).",
        "Set up GitHub repository, Kanban board (Trello/Notion), and project structure."
      ],
      mentorReview: "Review of design documentation and architecture."
    }
  },
  {
    step: 3,
    title: "Prototype Development",
    duration: "Week 5–6",
    icon: Code,
    color: "bg-yellow-500",
    content: {
      description: "Build a minimum viable product (MVP) or working prototype covering the core functionality.",
      activities: [
        "Build a minimum viable product (MVP) or working prototype covering the core functionality.",
        "Implement basic UI, backend connection, and at least one working feature.",
        "Conduct internal testing and team code reviews.",
        "Submit MVP demo for mentor feedback."
      ],
      mentorReview: "MVP demo for mentor feedback."
    }
  },
  {
    step: 4,
    title: "Full-Scale Implementation",
    duration: "Week 7–9",
    icon: Code,
    color: "bg-purple-500",
    content: {
      description: "Expand on the MVP to develop the complete version of the project.",
      activities: [
        "Expand on the MVP to develop the complete version of the project.",
        "Integrate additional modules, authentication, APIs, and databases.",
        "Optimize performance and ensure scalability.",
        "Maintain consistent commits and documentation."
      ],
      mentorReview: "Code review and progress evaluation."
    }
  },
  {
    step: 5,
    title: "Testing, Debugging & Optimization",
    duration: "Week 10–11",
    icon: TestTube,
    color: "bg-orange-500",
    content: {
      description: "Conduct unit, integration, and user testing.",
      activities: [
        "Conduct unit, integration, and user testing.",
        "Fix bugs, improve UI/UX, and ensure data integrity.",
        "Collect user feedback or simulated test data for evaluation.",
        "Prepare project documentation, including:",
        "• README",
        "• API references", 
        "• Setup instructions",
        "• Deployment guide"
      ],
      mentorReview: "Final testing and documentation review."
    }
  },
  {
    step: 6,
    title: "Final Presentation & Deployment",
    duration: "Week 12",
    icon: Rocket,
    color: "bg-red-500",
    content: {
      description: "Deploy the project and prepare final presentation.",
      activities: [
        "Deploy the project (on Vercel, Netlify, or cloud platforms).",
        "Prepare a final presentation + demo video.",
        "Present to mentors and BuildIt coordinators.",
        "Receive feedback + certification + potential incubation support for the best projects."
      ],
      mentorReview: "Final presentation and project evaluation."
    }
  }
]

export default function BuildCyclePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-16 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-balance text-4xl font-bold md:text-5xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          The Build Cycle
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground"
        >
          A comprehensive 12-week journey from ideation to deployment, designed to help you build real-world projects with industry mentorship.
        </motion.p>
      </header>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 via-yellow-500 via-purple-500 via-orange-500 to-red-500 transform md:-translate-x-0.5"></div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
              className="relative flex items-start md:items-center"
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-border">
                <div className={`h-4 w-4 rounded-full ${step.color}`}></div>
              </div>

              {/* Content card */}
              <div className="ml-6 md:ml-8 flex-1">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
                  className="rounded-xl border border-border/50 bg-card p-6 shadow-lg"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${step.color} bg-opacity-10`}>
                        <step.icon className={`w-5 h-5 ${step.color.replace('bg-', 'text-')}`} />
                      </div>
              <div>
                        <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                          Step {step.step}: {step.title}
                </h3>
                        <p className="text-sm text-muted-foreground font-medium">{step.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {step.content.description}
                  </p>

                  {/* Activities */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">Key Activities:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {step.content.activities.map((activity, activityIndex) => (
                        <li key={activityIndex} className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mentor Review */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                    <h4 className="font-semibold mb-1 text-sm uppercase tracking-wide text-primary">Mentor Review:</h4>
                    <p className="text-sm text-muted-foreground">{step.content.mentorReview}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
              </div>
            </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        className="mt-16 text-center"
      >
        <div className="rounded-xl border border-border/50 bg-card p-8">
          <Award className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Ready to Start Your Build Journey?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the first BuildIt cycle and transform your ideas into real-world projects with industry mentorship and peer collaboration.
          </p>
          <a
            href="/social"
            className="inline-flex items-center justify-center rounded-md bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/30 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ color: '#ffffff' }}
          >
            Join the First Cycle
        </a>
      </div>
      </motion.div>
    </div>
  )
}
