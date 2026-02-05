'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ApplyModal } from '@/components/jobs/apply-modal'
import { MapPin, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { ALL_JOBS } from '@/lib/jobs'
import { useParams } from 'next/navigation'

export default function JobDetailPage() {
    const params = useParams()
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
    const [job, setJob] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('/api/jobs')
            .then(res => res.json())
            .then(data => {
                const allJobs = Array.isArray(data) ? data : ALL_JOBS
                // Merge with ALL_JOBS if not present (simple dedupe by ID if needed, but here simple find is ok)
                let found = allJobs.find((j: any) => j.id === params.id)

                if (!found) {
                    found = ALL_JOBS.find(j => j.id === params.id)
                }
                setJob(found)
            })
            .catch((err) => {
                console.error('Failed to fetch jobs', err)
                setJob(ALL_JOBS.find(j => j.id === params.id))
            })
            .finally(() => setLoading(false))
    }, [params.id])

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col font-sans bg-[#FFFDF9]">
                <Header />
                <main className="flex-1 pt-20 flex items-center justify-center">
                    <p className="text-stone-400 font-light">Loading...</p>
                </main>
                <Footer />
            </div>
        )
    }

    if (!job) {
        return (
            <div className="flex min-h-screen flex-col font-sans bg-[#FFFDF9]">
                <Header />
                <main className="flex-1 pt-20 flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-medium text-stone-900 mb-4">Role not found</h1>
                    <Link href="/careers" className="text-stone-500 hover:text-stone-900 transition-colors">
                        ← Back to careers
                    </Link>
                </main>
                <Footer />
            </div>
        )
    }

    // 문자열을 배열로 변환하는 헬퍼 함수
    const parseList = (data: string | string[] | undefined): string[] => {
        if (!data) return []
        if (Array.isArray(data)) return data
        return data.split('\n').map(s => s.trim()).filter(s => s.length > 0)
    }

    const responsibilities = parseList(job.responsibilities)
    const requirements = parseList(job.requirements)

    return (
        <div className="flex min-h-screen flex-col font-sans bg-[#FFFDF9]">
            <Header />
            <main className="flex-1 pt-20">
                {/* Header */}
                <section className="py-16 border-b border-stone-100">
                    <div className="container mx-auto px-6">
                        <Link
                            href="/careers"
                            className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-900 mb-8 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Back to careers
                        </Link>
                        <div className="max-w-3xl">
                            <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-3">
                                {job.department}
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 mb-6">
                                {job.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-stone-500 font-light">
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    {job.location}
                                </div>
                                <div className="text-stone-300">•</div>
                                <div>{job.type}</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-5xl">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-12">
                                {job.description && (
                                    <div>
                                        <h2 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-4">
                                            About the role
                                        </h2>
                                        <div className="text-stone-600 font-light leading-relaxed whitespace-pre-line">
                                            {job.description}
                                        </div>
                                    </div>
                                )}

                                {responsibilities.length > 0 && (
                                    <div>
                                        <h2 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-4">
                                            What you'll do
                                        </h2>
                                        <ul className="space-y-3">
                                            {responsibilities.map((item: string, index: number) => (
                                                <li key={index} className="flex items-start gap-3 text-stone-600 font-light">
                                                    <span className="text-stone-300 mt-1">—</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {requirements.length > 0 && (
                                    <div>
                                        <h2 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-4">
                                            What we're looking for
                                        </h2>
                                        <ul className="space-y-3">
                                            {requirements.map((item: string, index: number) => (
                                                <li key={index} className="flex items-start gap-3 text-stone-600 font-light">
                                                    <span className="text-stone-300 mt-1">—</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-28 bg-white border border-stone-100 rounded-2xl p-8">
                                    <h3 className="text-lg font-medium text-stone-900 mb-3">
                                        Interested in this role?
                                    </h3>
                                    <p className="text-sm text-stone-500 font-light mb-6 leading-relaxed">
                                        We'd love to hear from you. Send us your application and let's start a conversation.
                                    </p>
                                    <button
                                        onClick={() => setIsApplyModalOpen(true)}
                                        className="w-full py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors"
                                    >
                                        Apply now
                                    </button>
                                    <p className="mt-4 text-xs text-center text-stone-400">
                                        We'll review your application and get back to you soon.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            <ApplyModal
                jobId={job.id}
                jobTitle={job.title}
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
            />
        </div>
    )
}

