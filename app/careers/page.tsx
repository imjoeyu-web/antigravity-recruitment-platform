'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { JobCard } from '@/components/jobs/job-card'
import { Search } from 'lucide-react'
import { ALL_JOBS } from '@/lib/jobs'

export default function CareersPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [department, setDepartment] = useState('')
    const [jobs, setJobs] = useState<any[]>([])

    useEffect(() => {
        fetch('/api/admin/jobs')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setJobs(data)
                } else {
                    setJobs(ALL_JOBS)
                }
            })
            .catch(() => setJobs(ALL_JOBS))
    }, [])

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = (job.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (job.department || '').toLowerCase().includes(searchTerm.toLowerCase())
        const matchesDept = department ? job.department === department : true
        return matchesSearch && matchesDept
    })

    const departments = [...new Set(jobs.map(job => job.department).filter(Boolean))]

    return (
        <div className="flex min-h-screen flex-col font-sans bg-[#FFFDF9]">
            <Header />
            <main className="flex-1 pt-20">
                {/* Hero */}
                <section className="py-24 md:py-32 border-b border-stone-100">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-900 mb-8">
                                Join us in making<br />
                                <span className="text-stone-400">work feel good.</span>
                            </h1>
                            <p className="text-xl text-stone-600 font-light leading-relaxed max-w-2xl">
                                We're looking for thoughtful people who care about
                                creating calmer, clearer experiences for teams everywhere.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Search & Filter */}
                <section className="py-8 border-b border-stone-100">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search roles..."
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-full text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-5 py-3 bg-white border border-stone-200 rounded-full text-sm focus:outline-none focus:border-stone-400 transition-colors min-w-[180px] text-stone-600"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <option value="">All teams</option>
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Job Listings */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <p className="text-sm text-stone-400 mb-8">
                            {filteredJobs.length} {filteredJobs.length === 1 ? 'position' : 'positions'} available
                        </p>
                        <div className="flex flex-col gap-4 max-w-4xl">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <JobCard key={job.id} {...job} />
                                ))
                            ) : (
                                <div className="text-center py-16 text-stone-500 font-light">
                                    No positions match your search. Try adjusting your filters.
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Culture CTA */}
                <section className="py-24 border-t border-stone-100">
                    <div className="container mx-auto px-6">
                        <div className="max-w-2xl">
                            <h2 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-6">
                                Life at Golden Hours
                            </h2>
                            <p className="text-2xl md:text-3xl text-stone-900 font-light leading-relaxed mb-8">
                                We believe great work happens when people feel supported,
                                trusted, and free to do their best thinking.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-stone-100 text-stone-600 rounded-full text-sm font-light">Remote-friendly</span>
                                <span className="px-4 py-2 bg-stone-100 text-stone-600 rounded-full text-sm font-light">Flexible hours</span>
                                <span className="px-4 py-2 bg-stone-100 text-stone-600 rounded-full text-sm font-light">Learning budget</span>
                                <span className="px-4 py-2 bg-stone-100 text-stone-600 rounded-full text-sm font-light">Health & wellness</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
