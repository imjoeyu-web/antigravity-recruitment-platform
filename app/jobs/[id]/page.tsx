'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { ApplyModal } from '@/components/jobs/apply-modal'
import { MapPin, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

import { ALL_JOBS } from '@/lib/jobs'
import { useParams } from 'next/navigation'

export default function JobDetailPage() {
    const params = useParams()
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
    const [job, setJob] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/admin/jobs')
            .then(res => res.json())
            .then(data => {
                const allJobs = Array.isArray(data) ? [...data, ...ALL_JOBS] : ALL_JOBS
                const found = allJobs.find((j: any) => j.id === params.id)
                setJob(found)
            })
            .catch(() => {
                setJob(ALL_JOBS.find(j => j.id === params.id))
            })
            .finally(() => setLoading(false))
    }, [params.id])

    if (loading) return <div className="p-20 text-center">Loading job details...</div>

    if (!job) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Job not found</h1>
                <Link href="/jobs" className="text-blue-500 hover:underline">Back to all jobs</Link>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1 bg-white">
                <div className="bg-gray-50 border-b py-8">
                    <div className="container mx-auto px-4">
                        <Link href="/jobs" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
                            <ArrowLeft size={16} className="mr-1" /> Back to Jobs
                        </Link>
                        <div className="max-w-4xl">
                            <div className="text-sm font-medium text-blue-600 mb-2">{job.department}</div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
                            <div className="flex flex-wrap items-center gap-6 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} />
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={18} />
                                    {job.type}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        <div className="lg:col-span-2 space-y-10">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Role</h2>
                                <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                                    {job.description}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
                                <ul className="space-y-3">
                                    {(job.responsibilities || []).map((item: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-600">
                                            <CheckCircle2 className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
                                <ul className="space-y-3">
                                    {(job.requirements || []).map((item: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-600">
                                            <CheckCircle2 className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-gray-50 border rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Apply for this position</h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    Ready to join the team? Send us your application and let's build something amazing together.
                                </p>
                                <Button
                                    onClick={() => setIsApplyModalOpen(true)}
                                    className="w-full text-lg py-6"
                                    size="lg"
                                >
                                    Apply Now
                                </Button>
                                <p className="mt-4 text-xs text-center text-gray-500">
                                    By applying, you agree to our privacy policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
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

