"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
    ArrowLeft,
    Mail,
    FileText,
    Calendar,
    Tag,
    CheckCircle,
    XCircle,
    Clock,
    ExternalLink,
    Target,
    Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Application } from '@/lib/storage'

export default function ApplicantDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [app, setApp] = useState<Application | null>(null)
    const [job, setJob] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [params.id])

    const fetchData = async () => {
        try {
            const appRes = await fetch(`/api/admin/applications`)
            const apps = await appRes.json()
            const foundApp = apps.find((a: any) => a.id === params.id)

            if (foundApp) {
                setApp(foundApp)

                // Fetch job info if job_id exists
                const jobId = foundApp.job_id || (foundApp.payload as any)?.job_id
                if (jobId) {
                    const jobsRes = await fetch('/api/admin/jobs')
                    const jobs = await jobsRes.json()
                    const foundJob = jobs.find((j: any) => j.id === jobId)
                    setJob(foundJob)
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (newStatus: string) => {
        if (!app) return
        try {
            const res = await fetch('/api/applications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: app.id, status: newStatus })
            })
            if (res.ok) {
                setApp({ ...app, status: newStatus as any })
            }
        } catch (e) {
            console.error(e)
        }
    }

    if (loading) return <div className="p-20 text-center">Loading applicant details...</div>
    if (!app) return <div className="p-20 text-center">Applicant not found.</div>

    const payload = app.payload || {}
    const score = app.score || (payload as any).score || 0
    const insights = app.insights || (payload as any).insights || []

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={16} /> Back to Dashboard
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <header className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                <div className="flex gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                                        {app.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">{app.name}</h1>
                                        <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-500">
                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                <Mail size={16} /> {app.email}
                                            </div>
                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                <Tag size={16} /> {job?.title || (payload as any).jobTitle || 'General Application'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <select
                                        value={app.status}
                                        onChange={(e) => handleStatusChange(e.target.value)}
                                        className="bg-gray-100 border-none rounded-xl px-4 py-2 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="applied">APPLIED</option>
                                        <option value="screening">SCREENING</option>
                                        <option value="interview">INTERVIEW</option>
                                        <option value="hired">HIRED</option>
                                        <option value="rejected">REJECTED</option>
                                    </select>
                                </div>
                            </div>
                        </header>

                        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <FileText size={20} className="text-blue-600" /> Application Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Resume / Portfolio</h3>
                                    <a
                                        href={payload.resume || '#'}
                                        target="_blank"
                                        className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
                                    >
                                        View Document <ExternalLink size={14} />
                                    </a>
                                </div>
                                <div>
                                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Applied Date</h3>
                                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                                        <Calendar size={16} className="text-gray-400" />
                                        {new Date(app.created_at || (app as any).appliedAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Cover Letter / Message</h3>
                                <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 leading-relaxed whitespace-pre-line text-sm border border-gray-100/50">
                                    {payload.coverLetter || "No cover letter provided."}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Insights */}
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-lg shadow-blue-200">
                            <div className="flex items-center gap-2 mb-6 opacity-90">
                                <Zap size={20} />
                                <span className="text-xs font-bold uppercase tracking-widest">AI Talent Insight</span>
                            </div>
                            <div className="text-center mb-8">
                                <div className="text-6xl font-black mb-2">{score}</div>
                                <div className="text-sm font-medium opacity-80 uppercase tracking-widest">Match Score</div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold opacity-70 uppercase tracking-widest">Key Success Factors</h3>
                                <div className="flex flex-wrap gap-2">
                                    {insights.length > 0 ? insights.map((insight: string, idx: number) => (
                                        <span key={idx} className="bg-white/20 px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-sm">
                                            {insight}
                                        </span>
                                    )) : (
                                        <span className="text-sm opacity-60 italic">No automated insights available.</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Process Milestones</h3>
                            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                                <div className="flex gap-4 relative">
                                    <div className="w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-sm z-10"></div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Application Received</p>
                                        <p className="text-xs text-gray-400">Automated System • {new Date(app.created_at || (app as any).appliedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 relative opacity-50">
                                    <div className="w-4 h-4 rounded-full bg-gray-200 border-4 border-white shadow-sm z-10"></div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Initial Screening</p>
                                        <p className="text-xs text-gray-400">Waiting for review</p>
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full mt-8 gap-2" variant="outline">
                                <Mail size={16} /> Send Email
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
