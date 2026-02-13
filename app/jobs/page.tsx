'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
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

    const departments = [...new Set(jobs.map(job => job.department).filter(Boolean))]

    return (
        <div className="flex min-h-screen flex-col font-sans bg-zinc-900">
            <Header />
            <main className="flex-1 pt-20">
                {/* Hero Section */}
                <section className="py-20 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl">
                            <span className="inline-block text-sm font-medium text-violet-400 uppercase tracking-widest mb-4">
                                Careers
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Open Positions
                            </h1>
                            <p className="text-xl text-zinc-400 leading-relaxed">
                                함께 미래를 설계할 인재를 찾습니다.
                                중력을 거스르는 도전에 동참하세요.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters */}
                <section className="py-8 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                                <input
                                    type="text"
                                    placeholder="포지션 또는 키워드 검색..."
                                    className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 focus:outline-none focus:border-violet-500 transition-colors min-w-[200px] appearance-none cursor-pointer"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <option value="">All Departments</option>
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Job List */}
                <section className="py-12">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl space-y-4">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job, index) => (
                                    <Link
                                        key={job.id}
                                        href={`/jobs/${job.id}`}
                                        className="group flex items-center justify-between p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:bg-zinc-900"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                                index % 3 === 0 ? 'bg-violet-500/10 text-violet-400' :
                                                index % 3 === 1 ? 'bg-blue-500/10 text-blue-400' :
                                                'bg-cyan-500/10 text-cyan-400'
                                            }`}>
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors">
                                                    {job.title}
                                                </h3>
                                                <p className="text-sm text-zinc-500">
                                                    {job.department} · {job.location || 'Seoul'} · {job.type || 'Full-time'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-zinc-500 group-hover:text-white transition-colors">
                                            <span className="text-sm hidden sm:block">View role</span>
                                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-16">
                                    <p className="text-zinc-500">검색 결과가 없습니다.</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 text-center text-zinc-500 text-sm">
                            총 {filteredJobs.length}개의 포지션
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
