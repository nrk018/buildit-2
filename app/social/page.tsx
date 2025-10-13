"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Instagram, Github, Linkedin, Youtube } from "lucide-react"

// Mock data for posts
const instagramPosts = [
  { id: 1, title: "Coming Soon", description: "Our Instagram posts will appear here", image: "/placeholder.svg", link: "#" },
  { id: 2, title: "Coming Soon", description: "Follow us for updates", image: "/placeholder.svg", link: "#" },
  { id: 3, title: "Coming Soon", description: "Latest BuildIt moments", image: "/placeholder.svg", link: "#" },
  { id: 4, title: "Coming Soon", description: "Behind the scenes", image: "/placeholder.svg", link: "#" },
  { id: 5, title: "Coming Soon", description: "Project highlights", image: "/placeholder.svg", link: "#" },
]

const linkedinPosts = [
  { id: 1, title: "Coming Soon", description: "Professional updates and insights", image: "/placeholder.svg", link: "#" },
  { id: 2, title: "Coming Soon", description: "Industry connections", image: "/placeholder.svg", link: "#" },
  { id: 3, title: "Coming Soon", description: "Career opportunities", image: "/placeholder.svg", link: "#" },
  { id: 4, title: "Coming Soon", description: "Alumni network", image: "/placeholder.svg", link: "#" },
  { id: 5, title: "Coming Soon", description: "Professional development", image: "/placeholder.svg", link: "#" },
]

const eventNames = [
  "TechFest 2024",
  "Hackathon Winners",
  "Workshop Series",
  "Alumni Meet",
  "Project Showcase",
  "Industry Visit"
]

const eventPhotos = [
  { id: 1, event: "TechFest 2024", title: "Coming Soon", description: "Event photos will be updated here", image: "/placeholder.svg" },
  { id: 2, event: "TechFest 2024", title: "Coming Soon", description: "More photos coming soon", image: "/placeholder.svg" },
  { id: 3, event: "TechFest 2024", title: "Coming Soon", description: "Stay tuned for updates", image: "/placeholder.svg" },
  { id: 4, event: "TechFest 2024", title: "Coming Soon", description: "Event highlights", image: "/placeholder.svg" },
  { id: 5, event: "TechFest 2024", title: "Coming Soon", description: "Memories in the making", image: "/placeholder.svg" },
]

const socialApps = [
  { name: "Instagram", icon: Instagram, url: "#", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { name: "LinkedIn", icon: Linkedin, url: "#", color: "bg-blue-600" },
  { name: "GitHub", icon: Github, url: "#", color: "bg-gray-800" },
  { name: "YouTube", icon: Youtube, url: "#", color: "bg-red-600" },
  { name: "Discord", logo: "💬", url: "#", color: "bg-indigo-600" },
]

function PostCard({ post, className }: { post: any; className?: string }) {
  return (
    <motion.div
      className={cn("flex-shrink-0 w-80 rounded-lg border bg-card overflow-hidden", className)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-video bg-muted/30 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-2 flex items-center justify-center">
            <Instagram className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Image placeholder</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1">{post.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{post.description}</p>
        <a 
          href={post.link}
          className="inline-flex items-center text-xs text-primary hover:underline"
        >
          View Post →
        </a>
      </div>
    </motion.div>
  )
}

function EventPhotoCard({ photo, className }: { photo: any; className?: string }) {
  return (
    <motion.div
      className={cn("flex-shrink-0 w-72 rounded-lg border bg-card overflow-hidden", className)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-square bg-muted/30 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-2 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📸</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Photo placeholder</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1">{photo.title}</h3>
        <p className="text-xs text-muted-foreground">{photo.description}</p>
      </div>
    </motion.div>
  )
}

function SocialAppCard({ app }: { app: any }) {
  const IconComponent = app.icon || (() => <span className="text-2xl">{app.logo}</span>)
  
  return (
    <motion.a
      href={app.url}
      className={cn("flex items-center gap-3 p-4 rounded-lg border bg-card hover:shadow-md transition-all", app.color)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-2xl">
        <IconComponent className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-semibold text-sm">{app.name}</h3>
        <p className="text-xs text-muted-foreground">Follow us</p>
      </div>
    </motion.a>
  )
}

export default function SocialPage() {
  const [selectedEvent, setSelectedEvent] = useState("TechFest 2024")

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Our Social Media
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Stay connected with BuildIt through our social media channels and event galleries
        </motion.p>
      </div>

      {/* Contact Us Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            Connect with us on our social media platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {socialApps.map((app) => (
            <SocialAppCard key={app.name} app={app} />
          ))}
        </div>
      </motion.section>

      {/* Instagram Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <Instagram className="w-8 h-8 text-pink-500" />
          <h2 className="text-2xl font-bold">Instagram</h2>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 w-max">
            {instagramPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* LinkedIn Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <Linkedin className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold">LinkedIn</h2>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 w-max">
            {linkedinPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Event Photobooth Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">📸</span>
          </div>
          <h2 className="text-2xl font-bold">Event Photobooth</h2>
        </div>
        
        {/* Event Selection Bar */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {eventNames.map((event) => (
              <button
                key={event}
                onClick={() => setSelectedEvent(event)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  selectedEvent === event
                    ? "bg-white/30 backdrop-blur-md border border-white/50 text-white"
                    : "bg-white/10 backdrop-blur-sm border border-white/20 text-muted-foreground hover:text-foreground hover:bg-white/20"
                )}
              >
                {event}
              </button>
            ))}
          </div>
        </div>

        {/* Event Photos Carousel */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 w-max">
            {eventPhotos.map((photo) => (
              <EventPhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
