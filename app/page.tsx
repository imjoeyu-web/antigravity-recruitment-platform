import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { JobCard } from '@/components/jobs/job-card'

const FEATURED_JOBS = [
  { id: '1', title: 'Robotics AI Researcher', department: 'Robotics', location: 'Seoul, KR', type: 'Full-time' },
  { id: '2', title: 'UAM Systems Engineer', department: 'Mobility', location: 'Remote / Seoul', type: 'Full-time' },
  { id: '3', title: 'Autonomous Driving Expert', department: 'Autonomous Tech', location: 'Seoul, KR', type: 'Full-time' },
  { id: '4', title: 'Human-Robot Interaction Designer', department: 'Design', location: 'Seoul, KR', type: 'Full-time' },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-white">
      <Header />
      <main className="flex-1">
        <Hero />

        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Careers</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                  Design the Move <br />
                  <span className="text-gray-400">that Inspires the World.</span>
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-md font-light leading-relaxed">
                Join our visionary team in Seoul and build the next generation of smart mobility and intelligent robotics.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
              {FEATURED_JOBS.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>

            <div className="mt-16 text-center">
              <a href="/jobs" className="group inline-flex items-center gap-2 text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
                Explore all 50+ Open Roles
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

