'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { JobCard } from '@/components/jobs/job-card'
import { Search } from 'lucide-react'

import { ALL_JOBS } from '@/lib/jobs'

export default function JobsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [department, setDepartment] = useState('')
    const [jobs, setJobs] = useState<any[]>([])

    useEffect(() => {
        fetch('/api/jobs')
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

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1 bg-gray-50 min-h-screen">
                <div className="bg-white border-b py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Openings</h1>
                        <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by role or keyword..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <option value="">All Departments</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Data">Data</option>
                                <option value="HR">HR</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col gap-4 max-w-4xl">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <JobCard key={job.id} {...job} />
                            ))
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                No jobs found matching your criteria.
                            </div>
                        )}
                    </div>

                    <div className="mt-8 text-center text-gray-500 text-sm">
                        Showing {filteredJobs.length} positions
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
