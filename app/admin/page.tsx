"use client"

import { useEffect, useState } from 'react'
import {
    Users,
    UserPlus,
    CheckCircle,
    ArrowUpRight,
    BarChart3,
    Search,
    Filter,
    Mail,
    Zap,
    ChevronRight,
    Target,
    FileText
} from 'lucide-react'
import { Application } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { JobModal } from '@/components/admin/job-modal'

export default function AdminDashboard() {
    const [applications, setApplications] = useState<Application[]>([])
    const [jobs, setJobs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'applicants' | 'jobs'>('applicants')
    const [selectedJobId, setSelectedJobId] = useState<string>('all')
    const [isJobModalOpen, setIsJobModalOpen] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [appsRes, jobsRes] = await Promise.all([
                fetch('/api/admin/applications'),
                fetch('/api/admin/jobs')
            ])

            if (appsRes.ok) {
                const data = await appsRes.json()
                setApplications(Array.isArray(data) ? data : [])
            }

            if (jobsRes.ok) {
                const data = await jobsRes.json()
                setJobs(Array.isArray(data) ? data : [])
            }
        } catch (error) {
            console.error('Failed to fetch data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/admin/applications/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
            if (response.ok) {
                setApplications(prev => prev.map(app =>
                    app.id === id ? { ...app, status: newStatus as any } : app
                ))

                // Fetch data again to update notified_status and other server-side fields
                fetchData()
            }
        } catch (error) {
            console.error('Failed to update status:', error)
        }
    }

    const filteredApps = applications.filter(app =>
        selectedJobId === 'all' || app.job_id === selectedJobId || (app.payload as any)?.job_id === selectedJobId
    )

    const stats = [
        { label: 'Total Applicants', value: applications.length.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Active Jobs', value: jobs.filter(j => j.status === 'open').length.toString(), icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Interviews', value: applications.filter(a => a.status === 'interview').length.toString(), icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Hires', value: applications.filter(a => a.status === 'hired').length.toString(), icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    ]

    return (
        <div className="min-h-screen bg-gray-50/50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r min-h-screen p-6 hidden lg:block sticky top-0 h-screen overflow-y-auto">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
                    <span className="text-xl font-bold tracking-tight">HR Console</span>
                </div>

                <nav className="space-y-1">
                    <button
                        onClick={() => setActiveTab('applicants')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'applicants' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Users size={18} /> Applicants
                    </button>
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'jobs' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <FileText size={18} /> Job Postings
                    </button>
                </nav>

                <div className="mt-10 border-t pt-10">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5 rounded-2xl text-white">
                        <div className="flex items-center gap-2 mb-3">
                            <Target size={16} />
                            <span className="text-[10px] font-semibold opacity-90 uppercase tracking-wider">Hiring Goal</span>
                        </div>
                        <div className="text-xl font-bold mb-1">{stats[3].value} / 12</div>
                        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-white h-full transition-all duration-1000" style={{ width: `${(parseInt(stats[3].value) / 12) * 100}%` }}></div>
                        </div>
                        <p className="text-[10px] opacity-70 mt-3 leading-tight font-medium">
                            Real-time progress towards your quarterly target.
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {activeTab === 'applicants' ? 'Applicant Tracking' : 'Job Postings'}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            {activeTab === 'applicants' ? 'Review and manage your candidate pipeline' : 'Create and manage recruitment openings'}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2" onClick={fetchData}>
                            Refresh
                        </Button>
                        {activeTab === 'jobs' && (
                            <Button className="gap-2" onClick={() => setIsJobModalOpen(true)}>
                                <UserPlus size={18} /> Create Job
                            </Button>
                        )}
                    </div>
                </header>

                <JobModal
                    isOpen={isJobModalOpen}
                    onClose={() => setIsJobModalOpen(false)}
                    onSuccess={fetchData}
                />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`${stat.bg} p-2.5 rounded-xl ${stat.color}`}>
                                    <stat.icon size={22} />
                                </div>
                                <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    <ArrowUpRight size={12} className="mr-0.5" /> +12%
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {activeTab === 'applicants' ? (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                        <div className="p-6 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search candidates..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <select
                                    value={selectedJobId}
                                    onChange={(e) => setSelectedJobId(e.target.value)}
                                    className="bg-white border rounded-xl px-4 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Jobs</option>
                                    {jobs.map(job => (
                                        <option key={job.id} value={job.id}>{job.title}</option>
                                    ))}
                                </select>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Filter size={16} /> Filter
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-4">Candidate</th>
                                        <th className="px-6 py-4">Job / Source</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Applied At</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <tr><td colSpan={5} className="px-6 py-20 text-center text-gray-400">Loading applicants...</td></tr>
                                    ) : filteredApps.length === 0 ? (
                                        <tr><td colSpan={5} className="px-6 py-20 text-center text-gray-400">No applicants found matching criteria.</td></tr>
                                    ) : filteredApps.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                                                        {app.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-gray-900">{app.name}</div>
                                                        <div className="text-xs text-gray-500">{app.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 font-medium">
                                                    {jobs.find(j => j.id === app.job_id)?.title || (app.payload as any)?.jobTitle || 'General Application'}
                                                </div>
                                                <div className="text-xs text-gray-500">{app.source || 'Website'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={app.status}
                                                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                    className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full border outline-none cursor-pointer transition-all ${app.status === 'hired' ? 'bg-green-50 border-green-200 text-green-700' :
                                                        app.status === 'rejected' ? 'bg-red-50 border-red-200 text-red-700' :
                                                            app.status === 'interview' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                                                                'bg-gray-50 border-gray-200 text-gray-700'
                                                        }`}
                                                >
                                                    <option value="applied">APPLIED</option>
                                                    <option value="screening">SCREENING</option>
                                                    <option value="interview">INTERVIEW</option>
                                                    <option value="hired">HIRED</option>
                                                    <option value="rejected">REJECTED</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600">
                                                    {new Date(app.created_at || (app as any).appliedAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link href={`/admin/applications/${app.id}`}>
                                                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-600">
                                                        <ChevronRight size={18} />
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-4">Job Title</th>
                                        <th className="px-6 py-4">Department</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Created At</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <tr><td colSpan={5} className="px-6 py-20 text-center text-gray-400">Loading jobs...</td></tr>
                                    ) : jobs.length === 0 ? (
                                        <tr><td colSpan={5} className="px-6 py-20 text-center text-gray-400">No jobs posted yet.</td></tr>
                                    ) : jobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-900">{job.title}</td>
                                            <td className="px-6 py-4 text-gray-600">{job.department}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${job.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {job.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                {new Date(job.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="sm">Manage</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
