import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { JobCard } from '@/components/jobs/job-card'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const FEATURED_JOBS = [
  { id: '1', title: 'Work Experience Designer', department: 'Design', location: 'Seoul / Remote', type: 'Full-time' },
  { id: '2', title: 'Systems Strategist', department: 'Strategy', location: 'Seoul, KR', type: 'Full-time' },
  { id: '3', title: 'Operations Analyst', department: 'Operations', location: 'Remote', type: 'Full-time' },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-[#FFFDF9]">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Featured Roles Section */}
        <section className="py-24 border-t border-stone-100">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              <div>
                <h2 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-6">
                  Join us
                </h2>
                <p className="text-3xl md:text-4xl text-stone-900 font-light leading-relaxed">
                  We're looking for people who believe work can be better.
                </p>
              </div>
              <div className="flex items-end">
                <p className="text-lg text-stone-500 font-light leading-relaxed">
                  Join a team that's designing the future of how people work—one system, one experience at a time.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 max-w-4xl">
              {FEATURED_JOBS.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>

            <div className="mt-12">
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 text-stone-900 font-medium hover:gap-3 transition-all duration-300"
              >
                View all open roles
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-24 border-t border-stone-100">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-6">
                  What we do
                </h2>
                <p className="text-3xl md:text-4xl text-stone-900 font-light leading-relaxed">
                  We design work systems that help teams run better.
                </p>
              </div>
              <div className="space-y-8">
                <p className="text-lg text-stone-500 font-light leading-relaxed">
                  From operations to daily workflows, we help organizations create
                  clearer, calmer experiences for everyone involved.
                </p>
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 text-stone-900 font-medium hover:gap-3 transition-all duration-300"
                >
                  Learn how we work
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

