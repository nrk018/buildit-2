"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function StartBuildingPage() {
  const formLink =
    "https://docs.google.com/forms/d/16xrcXdGfdbzu0yuAfhaJijhSR5V8Qi1bnVLhc6L0qA8/viewform?edit_requested=true"
  // Use env if present, otherwise fall back to the provided Razorpay link
  const paymentLink = process.env.NEXT_PUBLIC_RAZORPAY_LINK || "https://rzp.io/rzp/a3UPCPt"
  const hasPayment = paymentLink && paymentLink !== "#"

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 pb-24 md:pb-12">
      <header className="mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Register Now!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Scan the QR or use the button to open the membership form. Follow the instructions carefully to complete your registration.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start [content-visibility:auto] [contain-intrinsic-size:1px_500px]">
        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md md:backdrop-blur-xl p-6"
        >
          <h2 className="text-2xl font-semibold">Instructions</h2>
          <ol className="mt-4 space-y-3 list-decimal pl-5 text-muted-foreground">
            <li>
              Scan the QR code on the right or click the button below to open the membership form.
            </li>
            <li>
              Fill the Google Form fully.
            </li>
            {/* Removed previous club-name entry point as requested */}
            <li>
              Open the Razorpay link (below) and pay <span className="font-semibold text-foreground">₹250</span>.
            </li>
            <li>
              <div className="rounded-lg border border-white/30 bg-white/10 p-4">
                <p className="text-sm md:text-base">On Razorpay, ensure to write the club name as</p>
                <p className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">PHI PHENOMENON</p>
                <p className="text-sm md:text-base">Do not write “BuildIt”. Proceed only if the page looks official. This is because our parent club name is <span className="font-semibold">Phi Phenomenon</span>.</p>
              </div>
            </li>
            <li>
              After paying, upload the transaction receipt/screenshot on the Google Form and also enter the transaction/reference number, then submit the form.
            </li>
          </ol>

          <div className="mt-6 hidden md:flex flex-wrap items-center gap-3">
            <Link
              href={formLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-5 py-3 text-sm font-medium text-white hover:bg-white/30 transition-colors shadow-lg"
            >
              Open Membership Form
            </Link>

            {hasPayment ? (
              <Link
                href={paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-5 py-3 text-sm font-medium text-white hover:bg-white/30 transition-colors shadow-lg"
              >
                Open Razorpay (₹250)
              </Link>
            ) : (
              <button
                disabled
                className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-5 py-3 text-sm font-medium text-white/70 cursor-not-allowed"
                title="Set NEXT_PUBLIC_RAZORPAY_LINK to enable the Razorpay button"
              >
                Razorpay Link Unavailable
              </button>
            )}

            {/* Copy buttons removed as requested */}
          </div>
        </motion.div>

        {/* QR Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-md md:backdrop-blur-xl p-6 flex flex-col items-center justify-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Scan this QR</h2>
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/form%20qr.jpeg"
              alt="Membership form QR code"
              fill
              sizes="(max-width: 768px) 80vw, 400px"
              className="object-contain rounded-lg"
              priority
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground text-center">
            Use your camera or any QR scanner app to open the membership form.
          </p>
        </motion.div>
      </div>

      {/* Mobile fixed action bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/20 bg-card/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-2 gap-3">
          <Link
            href={formLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-4 py-3 text-sm font-medium text-white hover:bg-white/30 transition-colors shadow-lg"
          >
            Open Form
          </Link>
          {hasPayment ? (
            <Link
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-4 py-3 text-sm font-medium text-white hover:bg-white/30 transition-colors shadow-lg"
            >
              Pay ₹250
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 backdrop-blur-md px-4 py-3 text-sm font-medium text-white/70 cursor-not-allowed"
              title="Set NEXT_PUBLIC_RAZORPAY_LINK to enable the Razorpay button"
            >
              Razorpay N/A
            </button>
          )}
        </div>
      </div>
    </div>
  )
}


