"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-4"
        >
          To-Do AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-400 max-w-xl mb-8"
        >
          The intelligent, offline-ready task manager that adapts to your day.
        </motion.p>

        <div className="flex gap-4">
          <Link href="/tasks">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Features</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <Feature
              title="📱 Works Offline"
              description="Access and manage tasks anytime — even without internet."
            />
            <Feature
              title="🤖 AI Prioritization"
              description="Automatically ranks your tasks based on urgency and time."
            />
            <Feature
              title="⚡ Real-Time Sync"
              description="Stay up to date across all your devices instantly."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-900 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">About To-Do AI</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            To-Do AI was built to rethink productivity — blending intelligent
            task scheduling with an offline-first experience. Whether you’re on
            a plane, in a meeting, or juggling multiple deadlines, your tasks
            stay accessible, adaptive, and in sync.
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-blue-600 text-center">
        <h3 className="text-2xl font-semibold mb-4">Ready to boost your focus?</h3>
        <Link href="/tasks">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Open the App
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm bg-gray-950 border-t border-gray-800">
        <p>© {new Date().getFullYear()} To-Do AI PWA. Built with Next.js + Fastify.</p>
        <div className="mt-2">
          <a
            href="https://github.com/bewarb/to-do-ai-pwa"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300"
          >
            View on GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
