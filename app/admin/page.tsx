"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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
    FileText,
    Bell,
    AlertCircle,
    CheckCircle2,
    XCircle,
    TrendingUp,
    PieChart,
    AlertTriangle,
    Clock,
    Activity,
    UserX,
    RefreshCw,
    LogOut
} from 'lucide-react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend
} from 'recharts'
import { Application } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { JobModal } from '@/components/admin/job-modal'
import { supabase } from '@/lib/supabase-client'
import { User } from '@supabase/supabase-js'

export default function AdminDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [authLoading, setAuthLoading] = useState(true)
    const [applications, setApplications] = useState<Application[]>([])
    const [jobs, setJobs] = useState<any[]>([])
    const [notifications, setNotifications] = useState<any[]>([])
    const [notificationStats, setNotificationStats] = useState({ total: 0, sent: 0, failed: 0 })
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'dashboard' | 'applicants' | 'jobs' | 'notifications'>('dashboard')
    const [dashboardSubTab, setDashboardSubTab] = useState<'overview' | 'diagnosis' | 'activation'>('overview')
    const [dashboardData, setDashboardData] = useState<any>(null)
    const [selectedJobId, setSelectedJobId] = useState<string>('all')
    const [selectedStatus, setSelectedStatus] = useState<string>('all')
    const [selectedNotificationStatus, setSelectedNotificationStatus] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [isJobModalOpen, setIsJobModalOpen] = useState(false)
    const [editingJob, setEditingJob] = useState<any>(null)

    // 인증 상태 확인
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session?.user) {
                router.push('/admin/login')
                return
            }
            setUser(session.user)
            setAuthLoading(false)
        }

        checkAuth()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (!session?.user) {
                    router.push('/admin/login')
                    return
                }
                setUser(session.user)
                setAuthLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [router])

    // 로그아웃 핸들러
    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    useEffect(() => {
        if (!authLoading && user) {
            fetchData()
        }
    }, [authLoading, user])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [appsRes, jobsRes, notiRes, dashRes] = await Promise.all([
                fetch('/api/admin/applications'),
                fetch('/api/admin/jobs'),
                fetch('/api/admin/notifications'),
                fetch('/api/admin/dashboard')
            ])

            if (appsRes.ok) {
                const data = await appsRes.json()
                setApplications(Array.isArray(data) ? data : [])
            }

            if (jobsRes.ok) {
                const data = await jobsRes.json()
                setJobs(Array.isArray(data) ? data : [])
            }

            if (notiRes.ok) {
                const data = await notiRes.json()
                setNotifications(data.logs || [])
                setNotificationStats(data.stats || { total: 0, sent: 0, failed: 0 })
            }

            if (dashRes.ok) {
                const data = await dashRes.json()
                setDashboardData(data)
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

    // 검색 + 필터링 로직
    const filteredApps = applications.filter(app => {
        // 직무 필터
        const jobMatch = selectedJobId === 'all' || app.job_id === selectedJobId || (app.payload as any)?.job_id === selectedJobId
        // 상태 필터
        const statusMatch = selectedStatus === 'all' || app.status === selectedStatus
        // 검색어 필터 (이름, 이메일)
        const searchMatch = searchQuery === '' ||
            app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.email.toLowerCase().includes(searchQuery.toLowerCase())

        return jobMatch && statusMatch && searchMatch
    })

    const stats = [
        { label: 'Total Applicants', value: applications.length.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Active Jobs', value: jobs.filter(j => j.status === 'open').length.toString(), icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Interviews', value: applications.filter(a => a.status === 'interview').length.toString(), icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Hires', value: applications.filter(a => a.status === 'hired').length.toString(), icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    ]

    // 인증 로딩 중
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                    <p className="mt-4 text-slate-400">인증 확인 중...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 min-h-screen p-6 hidden lg:block sticky top-0 h-screen overflow-y-auto">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">G</div>
                    <span className="text-xl font-bold tracking-tight text-white">HR Console</span>
                </div>

                {/* 로그인 사용자 정보 */}
                {user && (
                    <div className="mb-6 p-3 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-3">
                            {user.user_metadata?.avatar_url ? (
                                <img
                                    src={user.user_metadata.avatar_url}
                                    alt="프로필"
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">
                                    {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">
                                    {user.user_metadata?.full_name || '관리자'}
                                </p>
                                <p className="text-slate-400 text-xs truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-300 text-xs rounded-lg transition-colors"
                        >
                            <LogOut size={14} />
                            로그아웃
                        </button>
                    </div>
                )}

                <nav className="space-y-1">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <BarChart3 size={18} /> Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('applicants')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'applicants' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Users size={18} /> Applicants
                    </button>
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'jobs' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <FileText size={18} /> Job Postings
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'notifications' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Bell size={18} /> Email Logs
                        {notificationStats.failed > 0 && (
                            <span className="ml-auto bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {notificationStats.failed}
                            </span>
                        )}
                    </button>
                </nav>

                <div className="mt-10 border-t border-slate-700/50 pt-10">
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
                            {activeTab === 'dashboard' ? 'Recruitment Dashboard' : activeTab === 'applicants' ? 'Applicant Tracking' : activeTab === 'jobs' ? 'Job Postings' : 'Email Logs'}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            {activeTab === 'dashboard' ? 'Overview of your recruitment metrics and trends' : activeTab === 'applicants' ? 'Review and manage your candidate pipeline' : activeTab === 'jobs' ? 'Create and manage recruitment openings' : 'Track email notifications sent to applicants'}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2" onClick={fetchData}>
                            Refresh
                        </Button>
                        {activeTab === 'jobs' && (
                            <Button className="gap-2" onClick={() => {
                                setEditingJob(null)
                                setIsJobModalOpen(true)
                            }}>
                                <UserPlus size={18} /> Create Job
                            </Button>
                        )}
                    </div>
                </header>

                <JobModal
                    isOpen={isJobModalOpen}
                    onClose={() => {
                        setIsJobModalOpen(false)
                        setEditingJob(null)
                    }}
                    onSuccess={fetchData}
                    editJob={editingJob}
                />

                {/* Stats Grid - 대시보드 탭이 아닐 때만 표시 */}
                {activeTab !== 'dashboard' && (
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
                )}

                {activeTab === 'dashboard' && (
                    <>
                        {loading ? (
                            <div className="space-y-6">
                                {/* Loading skeleton */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="bg-gray-100 animate-pulse p-4 rounded-2xl h-24"></div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="bg-gray-100 animate-pulse rounded-2xl h-80"></div>
                                    ))}
                                </div>
                            </div>
                        ) : !dashboardData ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="text-center">
                                    <AlertCircle size={48} className="mx-auto mb-4 text-gray-300" />
                                    <p className="text-gray-500">대시보드 데이터를 불러올 수 없습니다</p>
                                    <Button onClick={fetchData} className="mt-4">다시 시도</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* 대시보드 서브탭 네비게이션 */}
                                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit">
                                    <button
                                        onClick={() => setDashboardSubTab('overview')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${dashboardSubTab === 'overview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <span className="flex items-center gap-2"><BarChart3 size={16} /> Overview</span>
                                    </button>
                                    <button
                                        onClick={() => setDashboardSubTab('diagnosis')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${dashboardSubTab === 'diagnosis' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <span className="flex items-center gap-2"><Activity size={16} /> 운영 진단</span>
                                    </button>
                                    <button
                                        onClick={() => setDashboardSubTab('activation')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${dashboardSubTab === 'activation' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <Users size={16} /> Talent Pool
                                        {(dashboardData.talentPoolStats?.highPotential || 0) > 0 && (
                                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-1.5 py-0.5 rounded-full">
                                                {dashboardData.talentPoolStats?.highPotential}
                                            </span>
                                        )}
                                    </button>
                                </div>

                                {/* ===== Tab 1: Overview ===== */}
                                {dashboardSubTab === 'overview' && (
                                    <>
                                        {/* 핵심 지표 카드 */}
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="text-xs text-gray-400 uppercase tracking-wider">채용 중 포지션</div>
                                                <div className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.highlights?.activePositions || 0}</div>
                                            </div>
                                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="text-xs text-gray-400 uppercase tracking-wider">총 지원자</div>
                                                <div className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.highlights?.totalApplications || 0}</div>
                                            </div>
                                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="text-xs text-gray-400 uppercase tracking-wider">이번 주 지원</div>
                                                <div className="text-2xl font-bold text-blue-600 mt-1">{dashboardData.highlights?.weeklyApplications || 0}</div>
                                            </div>
                                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="text-xs text-gray-400 uppercase tracking-wider">평균 채용 기간</div>
                                                <div className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.highlights?.avgDaysToHire || 0}<span className="text-sm font-normal text-gray-400 ml-1">일</span></div>
                                            </div>
                                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="text-xs text-gray-400 uppercase tracking-wider">전체 전환율</div>
                                                <div className="text-2xl font-bold text-teal-600 mt-1">{dashboardData.highlights?.conversionRate || 0}%</div>
                                            </div>
                                            <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-4 rounded-2xl text-white">
                                                <div className="text-xs font-medium opacity-90 uppercase tracking-wider">이번 주 채용</div>
                                                <div className="text-2xl font-bold mt-1">{dashboardData.highlights?.weeklyHires || 0}<span className="text-sm font-normal opacity-75 ml-1">명</span></div>
                                            </div>
                                        </div>

                                        {/* 차트 그리드 */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* 일별 지원 추이 라인 차트 */}
                                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <TrendingUp size={20} className="text-blue-600" />
                                                    <h3 className="font-semibold text-gray-900">일별 지원 추이</h3>
                                                    <span className="text-xs text-gray-400 ml-auto">최근 30일</span>
                                                </div>
                                                <div className="h-[280px]">
                                                    {dashboardData.dailyTrend && dashboardData.dailyTrend.length > 0 ? (
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <LineChart data={dashboardData.dailyTrend}>
                                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                                <XAxis
                                                                    dataKey="date"
                                                                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                                                                    interval="preserveStartEnd"
                                                                />
                                                                <YAxis
                                                                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                                                                    allowDecimals={false}
                                                                />
                                                                <Tooltip
                                                                    contentStyle={{
                                                                        backgroundColor: '#fff',
                                                                        border: '1px solid #e5e7eb',
                                                                        borderRadius: '12px',
                                                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                                                    }}
                                                                />
                                                                <Line
                                                                    type="monotone"
                                                                    dataKey="count"
                                                                    stroke="#3B82F6"
                                                                    strokeWidth={2}
                                                                    dot={false}
                                                                    activeDot={{ r: 6, fill: '#3B82F6' }}
                                                                />
                                                            </LineChart>
                                                        </ResponsiveContainer>
                                                    ) : (
                                                        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                                                            데이터가 없습니다
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 직무별 지원 비율 도넛 차트 */}
                                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <PieChart size={20} className="text-blue-600" />
                                                    <h3 className="font-semibold text-gray-900">직무별 지원 비율</h3>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    {dashboardData.jobDistribution && dashboardData.jobDistribution.length > 0 ? (
                                                        <>
                                                            {/* 차트 영역 */}
                                                            <div className="h-[200px] w-[200px] flex-shrink-0">
                                                                <ResponsiveContainer width="100%" height="100%">
                                                                    <RechartsPieChart>
                                                                        <Pie
                                                                            data={dashboardData.jobDistribution}
                                                                            cx="50%"
                                                                            cy="50%"
                                                                            innerRadius={50}
                                                                            outerRadius={80}
                                                                            paddingAngle={2}
                                                                            dataKey="value"
                                                                        >
                                                                            {dashboardData.jobDistribution.map((entry: any, index: number) => (
                                                                                <Cell
                                                                                    key={`cell-${index}`}
                                                                                    fill={['#3B82F6', '#0D9488', '#6366F1', '#0EA5E9', '#14B8A6', '#8B5CF6'][index % 6]}
                                                                                />
                                                                            ))}
                                                                        </Pie>
                                                                        <Tooltip
                                                                            contentStyle={{
                                                                                backgroundColor: '#fff',
                                                                                border: '1px solid #e5e7eb',
                                                                                borderRadius: '12px'
                                                                            }}
                                                                        />
                                                                    </RechartsPieChart>
                                                                </ResponsiveContainer>
                                                            </div>
                                                            {/* 범례 영역 */}
                                                            <div className="flex-1 space-y-2">
                                                                {dashboardData.jobDistribution.slice(0, 5).map((item: any, index: number) => {
                                                                    const colors = ['#3B82F6', '#0D9488', '#6366F1', '#0EA5E9', '#14B8A6', '#8B5CF6']
                                                                    const total = dashboardData.jobDistribution.reduce((acc: number, i: any) => acc + i.value, 0)
                                                                    const pct = total > 0 ? ((item.value / total) * 100).toFixed(0) : 0
                                                                    return (
                                                                        <div key={index} className="flex items-center gap-2 text-sm">
                                                                            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: colors[index % 6] }} />
                                                                            <span className="text-gray-600 truncate flex-1">{item.name}</span>
                                                                            <span className="text-gray-900 font-medium">{pct}%</span>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="w-full h-[200px] flex items-center justify-center text-gray-400 text-sm">
                                                            데이터가 없습니다
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 채용 퍼널 차트 */}
                                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <Target size={20} className="text-teal-600" />
                                                    <h3 className="font-semibold text-gray-900">채용 퍼널</h3>
                                                </div>
                                                <div className="h-[280px]">
                                                    {dashboardData.funnelData && dashboardData.funnelData.length > 0 ? (
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <BarChart
                                                                data={dashboardData.funnelData}
                                                                layout="vertical"
                                                                margin={{ left: 20 }}
                                                            >
                                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                                                                <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                                                                <YAxis
                                                                    type="category"
                                                                    dataKey="stage"
                                                                    tick={{ fontSize: 12, fill: '#374151' }}
                                                                    width={80}
                                                                />
                                                                <Tooltip
                                                                    contentStyle={{
                                                                        backgroundColor: '#fff',
                                                                        border: '1px solid #e5e7eb',
                                                                        borderRadius: '12px'
                                                                    }}
                                                                />
                                                                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                                                                    {dashboardData.funnelData.map((entry: any, index: number) => {
                                                                        const funnelColors = ['#3B82F6', '#0D9488', '#14B8A6', '#10B981']
                                                                        return <Cell key={`cell-${index}`} fill={funnelColors[index] || '#3B82F6'} />
                                                                    })}
                                                                </Bar>
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    ) : (
                                                        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                                                            데이터가 없습니다
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 채널별 전환율 */}
                                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <TrendingUp size={20} className="text-teal-600" />
                                                    <h3 className="font-semibold text-gray-900">채널별 전환율</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    {(dashboardData.channelConversionData || []).slice(0, 6).map((channel: any, index: number) => (
                                                        <div key={index} className="flex items-center gap-3">
                                                            <span className="text-sm text-gray-600 w-24 truncate">{channel.name}</span>
                                                            <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                                                                <div
                                                                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-full rounded-full transition-all duration-500"
                                                                    style={{ width: `${Math.min(channel.rate * 5, 100)}%` }}
                                                                />
                                                                <span className="absolute inset-0 flex items-center justify-end pr-3 text-xs font-semibold text-gray-700">
                                                                    {channel.rate}%
                                                                </span>
                                                            </div>
                                                            <span className="text-xs text-gray-400 w-16 text-right">{channel.hired}/{channel.total}명</span>
                                                        </div>
                                                    ))}
                                                    {(!dashboardData.channelConversionData || dashboardData.channelConversionData.length === 0) && (
                                                        <p className="text-center text-gray-400 py-8">데이터가 없습니다</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 직무별 전형 단계 분포 - 전체 너비 */}
                                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="flex items-center gap-2 mb-6">
                                                <FileText size={20} className="text-indigo-600" />
                                                <h3 className="font-semibold text-gray-900">직무별 전형 단계 분포</h3>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="border-b border-gray-100">
                                                            <th className="text-left py-3 px-4 font-medium text-gray-500">직무</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">서류</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">심사</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">면접</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">합격</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">불합격</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">전환율</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(dashboardData.jobStageData || []).map((job: any, index: number) => {
                                                            const total = job.applied + job.screening + job.interview + job.hired
                                                            const convRate = total > 0 ? ((job.hired / total) * 100).toFixed(1) : '0'
                                                            return (
                                                                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                                                                    <td className="py-3 px-4 font-medium text-gray-900">{job.title}</td>
                                                                    <td className="py-3 px-4 text-center">
                                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-semibold text-xs">
                                                                            {job.applied}
                                                                        </span>
                                                                    </td>
                                                                    <td className="py-3 px-4 text-center">
                                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-xs">
                                                                            {job.screening}
                                                                        </span>
                                                                    </td>
                                                                    <td className="py-3 px-4 text-center">
                                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-teal-50 text-teal-700 font-semibold text-xs">
                                                                            {job.interview}
                                                                        </span>
                                                                    </td>
                                                                    <td className="py-3 px-4 text-center">
                                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs">
                                                                            {job.hired}
                                                                        </span>
                                                                    </td>
                                                                    <td className="py-3 px-4 text-center">
                                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-500 font-semibold text-xs">
                                                                            {job.rejected}
                                                                        </span>
                                                                    </td>
                                                                    <td className="py-3 px-4 text-center">
                                                                        <span className={`font-semibold ${parseFloat(convRate) > 0 ? 'text-emerald-600' : 'text-gray-400'}`}>
                                                                            {convRate}%
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                        {(!dashboardData.jobStageData || dashboardData.jobStageData.length === 0) && (
                                                            <tr>
                                                                <td colSpan={7} className="py-8 text-center text-gray-400">데이터가 없습니다</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* ===== Tab 2: 운영 진단 ===== */}
                                {dashboardSubTab === 'diagnosis' && (
                                    <div className="space-y-6">
                                        {/* 병목 히트맵 */}
                                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="flex items-center gap-2 mb-6">
                                                <Activity size={20} className="text-orange-600" />
                                                <h3 className="font-semibold text-gray-900">병목 히트맵</h3>
                                                <span className="text-xs text-gray-400 ml-2">직무 × 단계별 정체 현황</span>
                                            </div>

                                            {/* 히트맵 범례 */}
                                            <div className="flex items-center gap-4 mb-4 text-xs">
                                                <span className="text-gray-500">병목 수준:</span>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-4 h-4 rounded bg-emerald-100 border border-emerald-200" />
                                                    <span className="text-gray-600">양호</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-4 h-4 rounded bg-amber-100 border border-amber-200" />
                                                    <span className="text-gray-600">주의</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-4 h-4 rounded bg-red-100 border border-red-200" />
                                                    <span className="text-gray-600">병목</span>
                                                </div>
                                            </div>

                                            {/* 히트맵 그리드 */}
                                            {(() => {
                                                // 직무 목록 추출 (중복 제거)
                                                const heatmapData = dashboardData.bottleneckHeatmapData || []
                                                const jobTitles = [...new Set(heatmapData.map((d: any) => d.jobTitle))] as string[]
                                                const stages = ['서류', '심사', '면접']

                                                // 병목 점수에 따른 색상 결정
                                                const getHeatColor = (score: number) => {
                                                    if (score === 0) return 'bg-gray-50 border-gray-100 text-gray-400'
                                                    if (score < 2) return 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                                    if (score < 5) return 'bg-amber-50 border-amber-200 text-amber-700'
                                                    return 'bg-red-50 border-red-200 text-red-700'
                                                }

                                                // 셀 데이터 찾기
                                                const getCellData = (jobTitle: string, stageLabel: string) => {
                                                    return heatmapData.find((d: any) =>
                                                        d.jobTitle === jobTitle && d.stageLabel === stageLabel
                                                    ) || { count: 0, avgDays: 0, bottleneckScore: 0 }
                                                }

                                                if (jobTitles.length === 0) {
                                                    return (
                                                        <div className="py-8 text-center text-gray-400">
                                                            <Activity size={40} className="mx-auto mb-3 text-gray-300" />
                                                            <p>진행 중인 지원자가 없습니다</p>
                                                        </div>
                                                    )
                                                }

                                                return (
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 w-40">직무</th>
                                                                    {stages.map(stage => (
                                                                        <th key={stage} className="text-center py-2 px-3 text-xs font-medium text-gray-500 w-28">
                                                                            {stage}
                                                                        </th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {jobTitles.map((jobTitle, idx) => (
                                                                    <tr key={idx}>
                                                                        <td className="py-2 px-3 text-sm font-medium text-gray-900 truncate max-w-[160px]">
                                                                            {jobTitle}
                                                                        </td>
                                                                        {stages.map(stage => {
                                                                            const cell = getCellData(jobTitle, stage)
                                                                            return (
                                                                                <td key={stage} className="py-2 px-3">
                                                                                    <div
                                                                                        className={`rounded-lg border p-3 text-center transition-all hover:shadow-md cursor-default ${getHeatColor(cell.bottleneckScore)}`}
                                                                                        title={`인원: ${cell.count}명\n평균 체류: ${cell.avgDays}일\n병목 점수: ${cell.bottleneckScore}`}
                                                                                    >
                                                                                        <div className="text-lg font-bold">{cell.count}</div>
                                                                                        <div className="text-[10px] opacity-75">
                                                                                            {cell.count > 0 ? `${cell.avgDays}일` : '-'}
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            )
                                                                        })}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )
                                            })()}
                                        </div>

                                        {/* 단계별 체류 기간 */}
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                            {(dashboardData.stageDelayData || []).map((stage: any, index: number) => (
                                                <div key={index} className={`bg-white p-5 rounded-2xl border shadow-sm ${stage.risk === 'high' ? 'border-amber-200' : 'border-gray-100'}`}>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <Clock size={18} className="text-gray-400" />
                                                            <span className="font-medium text-gray-900">{stage.stage} 단계</span>
                                                        </div>
                                                        {stage.risk === 'high' && (
                                                            <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                                                                <AlertTriangle size={12} /> 지연
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-3xl font-bold text-gray-900">{stage.avgDays}<span className="text-sm font-normal text-gray-400 ml-1">일</span></div>
                                                    <div className="text-xs text-gray-500 mt-1">{stage.count}명 대기 중</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* 직무별 리스크 지표 */}
                                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="flex items-center gap-2 mb-6">
                                                <AlertTriangle size={20} className="text-amber-600" />
                                                <h3 className="font-semibold text-gray-900">직무별 리스크 지표</h3>
                                                <span className="text-xs text-gray-400 ml-2">진행 중 많고 전환율 낮으면 위험</span>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="border-b border-gray-100">
                                                            <th className="text-left py-3 px-4 font-medium text-gray-500">직무</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">진행 중</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">채용</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">불합격</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">전환율</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">리스크</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(dashboardData.jobRiskData || []).map((job: any, index: number) => (
                                                            <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                                                                <td className="py-3 px-4 font-medium text-gray-900">{job.title}</td>
                                                                <td className="py-3 px-4 text-center text-gray-600">{job.inProgress}</td>
                                                                <td className="py-3 px-4 text-center text-emerald-600 font-medium">{job.hired}</td>
                                                                <td className="py-3 px-4 text-center text-gray-400">{job.rejected}</td>
                                                                <td className="py-3 px-4 text-center font-medium text-gray-900">{job.conversionRate}%</td>
                                                                <td className="py-3 px-4 text-center">
                                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${job.riskLevel === 'high' ? 'bg-red-50 text-red-700' :
                                                                        job.riskLevel === 'medium' ? 'bg-amber-50 text-amber-700' :
                                                                            'bg-emerald-50 text-emerald-700'
                                                                        }`}>
                                                                        {job.riskLevel === 'high' ? '높음' : job.riskLevel === 'medium' ? '주의' : '양호'}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {(!dashboardData.jobRiskData || dashboardData.jobRiskData.length === 0) && (
                                                            <tr>
                                                                <td colSpan={6} className="py-8 text-center text-gray-400">데이터가 없습니다</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* 퍼널 차트 (진단용) */}
                                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="flex items-center gap-2 mb-6">
                                                <Target size={20} className="text-teal-600" />
                                                <h3 className="font-semibold text-gray-900">채용 퍼널 분석</h3>
                                            </div>
                                            <div className="h-[200px]">
                                                {dashboardData.funnelData && dashboardData.funnelData.length > 0 ? (
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <BarChart data={dashboardData.funnelData} layout="vertical" margin={{ left: 20 }}>
                                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                                                            <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                                                            <YAxis type="category" dataKey="stage" tick={{ fontSize: 12, fill: '#374151' }} width={80} />
                                                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' }} />
                                                            <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                                                                {dashboardData.funnelData.map((entry: any, index: number) => (
                                                                    <Cell key={`cell-${index}`} fill={['#3B82F6', '#0D9488', '#14B8A6', '#10B981'][index] || '#3B82F6'} />
                                                                ))}
                                                            </Bar>
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                ) : (
                                                    <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                                                        데이터가 없습니다
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ===== Tab 3: Talent Pool (인재풀 재발굴) ===== */}
                                {dashboardSubTab === 'activation' && (
                                    <div className="space-y-6">
                                        {/* Talent Pool 통계 카드 */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="text-xs text-gray-400 uppercase tracking-wider">전체 Talent Pool</div>
                                                <div className="text-3xl font-bold text-gray-900 mt-1">{dashboardData.talentPoolStats?.total || 0}</div>
                                                <div className="text-xs text-gray-500 mt-1">재발굴 가능 인재</div>
                                            </div>
                                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100">
                                                <div className="text-xs text-blue-600 uppercase tracking-wider font-medium">High Potential</div>
                                                <div className="text-3xl font-bold text-blue-700 mt-1">{dashboardData.talentPoolStats?.highPotential || 0}</div>
                                                <div className="text-xs text-blue-600 mt-1">우선 연락 추천</div>
                                            </div>
                                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="text-xs text-gray-400 uppercase tracking-wider">매칭 가능</div>
                                                <div className="text-3xl font-bold text-teal-600 mt-1">{dashboardData.talentPoolStats?.withMatchingJobs || 0}</div>
                                                <div className="text-xs text-gray-500 mt-1">현재 오픈 포지션 매칭</div>
                                            </div>
                                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="text-xs text-gray-400 uppercase tracking-wider">이번 달 추가</div>
                                                <div className="text-3xl font-bold text-purple-600 mt-1">{dashboardData.talentPoolStats?.recentlyAdded || 0}</div>
                                                <div className="text-xs text-gray-500 mt-1">최근 30일</div>
                                            </div>
                                        </div>

                                        {/* 탈락 단계별 분포 + 직무별 분포 */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* 탈락 단계별 분포 */}
                                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Target size={20} className="text-blue-600" />
                                                    <h3 className="font-semibold text-gray-900">탈락 단계별 분포</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    {(dashboardData.talentPoolByStage || []).map((stage: any, index: number) => {
                                                        const total = dashboardData.talentPoolStats?.total || 1
                                                        const pct = Math.round((stage.count / total) * 100)
                                                        const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500']
                                                        return (
                                                            <div key={index} className="flex items-center gap-3">
                                                                <span className="text-sm text-gray-600 w-20">{stage.stage}</span>
                                                                <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                                                                    <div
                                                                        className={`${colors[index]} h-full rounded-full transition-all duration-500`}
                                                                        style={{ width: `${Math.max(pct, 5)}%` }}
                                                                    />
                                                                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
                                                                        {stage.count}명 ({pct}%)
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            {/* 직무별 Talent Pool */}
                                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <FileText size={20} className="text-teal-600" />
                                                    <h3 className="font-semibold text-gray-900">직무별 인재풀</h3>
                                                </div>
                                                <div className="space-y-2">
                                                    {(dashboardData.talentPoolJobDistribution || []).map((item: any, index: number) => (
                                                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                                            <span className="text-sm text-gray-700 truncate flex-1">{item.job}</span>
                                                            <span className="text-sm font-semibold text-gray-900 ml-2">{item.count}명</span>
                                                        </div>
                                                    ))}
                                                    {(!dashboardData.talentPoolJobDistribution || dashboardData.talentPoolJobDistribution.length === 0) && (
                                                        <p className="text-center text-gray-400 py-4">데이터가 없습니다</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Talent Pool 테이블 */}
                                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-2">
                                                    <Users size={20} className="text-blue-600" />
                                                    <h3 className="font-semibold text-gray-900">추천 인재 목록</h3>
                                                </div>
                                                <span className="text-xs text-gray-400">누구를 다시 연락하면 좋을까요?</span>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="border-b border-gray-100">
                                                            <th className="text-left py-3 px-4 font-medium text-gray-500">인재</th>
                                                            <th className="text-left py-3 px-4 font-medium text-gray-500">과거 지원 직무</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">탈락 단계</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">지원일</th>
                                                            <th className="text-left py-3 px-4 font-medium text-gray-500">매칭 포지션</th>
                                                            <th className="text-center py-3 px-4 font-medium text-gray-500">추천도</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(dashboardData.talentPoolCandidates || []).slice(0, 10).map((candidate: any, index: number) => (
                                                            <tr key={index} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                                                                <td className="py-3 px-4">
                                                                    <div className="font-medium text-gray-900">{candidate.name}</div>
                                                                    <div className="text-xs text-gray-400">{candidate.email}</div>
                                                                </td>
                                                                <td className="py-3 px-4 text-gray-600">{candidate.lastAppliedJob}</td>
                                                                <td className="py-3 px-4 text-center">
                                                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${candidate.exitStage === 'final' ? 'bg-purple-50 text-purple-700' :
                                                                        candidate.exitStage === 'interview' ? 'bg-indigo-50 text-indigo-700' :
                                                                            'bg-blue-50 text-blue-700'
                                                                        }`}>
                                                                        {candidate.exitStageLabel}
                                                                    </span>
                                                                </td>
                                                                <td className="py-3 px-4 text-center text-gray-500">
                                                                    {candidate.lastAppliedDate}
                                                                </td>
                                                                <td className="py-3 px-4">
                                                                    {candidate.matchingPositions.length > 0 ? (
                                                                        <div className="flex flex-wrap gap-1">
                                                                            {candidate.matchingPositions.map((pos: string, i: number) => (
                                                                                <span key={i} className="inline-flex px-2 py-0.5 rounded bg-teal-50 text-teal-700 text-xs">
                                                                                    {pos}
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-gray-400 text-xs">-</span>
                                                                    )}
                                                                </td>
                                                                <td className="py-3 px-4 text-center">
                                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${candidate.potentialLevel === 'high' ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700' :
                                                                        candidate.potentialLevel === 'medium' ? 'bg-teal-50 text-teal-700' :
                                                                            'bg-gray-100 text-gray-600'
                                                                        }`}>
                                                                        {candidate.potentialLevel === 'high' ? 'High Potential' :
                                                                            candidate.potentialLevel === 'medium' ? 'Potential' : 'Consider'}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {(!dashboardData.talentPoolCandidates || dashboardData.talentPoolCandidates.length === 0) && (
                                                            <tr>
                                                                <td colSpan={6} className="py-12 text-center text-gray-400">
                                                                    <Users size={40} className="mx-auto mb-3 text-gray-300" />
                                                                    <p>Talent Pool이 비어 있습니다</p>
                                                                    <p className="text-xs mt-1">과거 지원자가 없거나 모두 채용되었습니다</p>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'applicants' && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                        <div className="p-6 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input
                                    type="text"
                                    placeholder="이름 또는 이메일로 검색..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
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
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="bg-white border rounded-xl px-4 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="applied">Applied</option>
                                    <option value="screening">Screening</option>
                                    <option value="interview">Interview</option>
                                    <option value="hired">Hired</option>
                                    <option value="rejected">Rejected</option>
                                </select>
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
                                        <tr><td colSpan={5} className="px-6 py-20 text-center text-gray-600">Loading applicants...</td></tr>
                                    ) : filteredApps.length === 0 ? (
                                        <tr><td colSpan={5} className="px-6 py-20 text-center text-gray-600">No applicants found matching criteria.</td></tr>
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
                                                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
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
                )}

                {activeTab === 'jobs' && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-4">Job Title</th>
                                        <th className="px-6 py-4">Department</th>
                                        <th className="px-6 py-4">Location</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Created At</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <tr><td colSpan={6} className="px-6 py-20 text-center text-gray-600">Loading jobs...</td></tr>
                                    ) : jobs.length === 0 ? (
                                        <tr><td colSpan={6} className="px-6 py-20 text-center text-gray-600">No jobs posted yet.</td></tr>
                                    ) : jobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{job.title}</div>
                                                {job.employment_type && (
                                                    <div className="text-xs text-gray-500 mt-0.5">{job.employment_type}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{job.department}</td>
                                            <td className="px-6 py-4 text-gray-600">{job.location || '-'}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${job.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {job.status === 'open' ? '채용 중' : '채용 완료'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                {new Date(job.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-blue-600 hover:text-blue-700"
                                                    onClick={() => {
                                                        setEditingJob(job)
                                                        setIsJobModalOpen(true)
                                                    }}
                                                >
                                                    수정
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        {/* 이메일 통계 카드 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{notificationStats.total}</div>
                                        <div className="text-sm text-gray-500">Total Emails</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-50 p-2.5 rounded-lg text-green-600">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{notificationStats.sent}</div>
                                        <div className="text-sm text-gray-500">Sent Successfully</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600">
                                        <XCircle size={20} />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{notificationStats.failed}</div>
                                        <div className="text-sm text-gray-500">Failed</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 로그 테이블 */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                <h3 className="font-semibold text-gray-900">Recent Email Logs</h3>
                                <select
                                    value={selectedNotificationStatus}
                                    onChange={(e) => setSelectedNotificationStatus(e.target.value)}
                                    className="bg-white border rounded-xl px-4 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="sent">Sent</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            <th className="px-6 py-4">Recipient</th>
                                            <th className="px-6 py-4">Type</th>
                                            <th className="px-6 py-4">Subject</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Sent At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {loading ? (
                                            <tr><td colSpan={5} className="px-6 py-20 text-center text-gray-600">Loading logs...</td></tr>
                                        ) : notifications.filter(n => selectedNotificationStatus === 'all' || n.status === selectedNotificationStatus).length === 0 ? (
                                            <tr><td colSpan={5} className="px-6 py-20 text-center text-gray-600">No email logs found.</td></tr>
                                        ) : notifications
                                            .filter(n => selectedNotificationStatus === 'all' || n.status === selectedNotificationStatus)
                                            .map((log) => (
                                                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-xs">
                                                                {log.to_email?.charAt(0).toUpperCase() || '?'}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {log.applications?.name || 'Unknown'}
                                                                </div>
                                                                <div className="text-xs text-gray-500">{log.to_email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${log.event_type === 'hired' ? 'bg-green-100 text-green-700' :
                                                            log.event_type === 'rejected' ? 'bg-red-100 text-red-700' :
                                                                log.event_type === 'interview_invite' ? 'bg-blue-100 text-blue-700' :
                                                                    'bg-gray-100 text-gray-700'
                                                            }`}>
                                                            {log.event_type?.toUpperCase().replace('_', ' ') || 'UNKNOWN'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-600 max-w-xs truncate">
                                                            {log.subject}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`flex items-center gap-1.5 text-xs font-medium ${log.status === 'sent' ? 'text-green-600' : 'text-red-600'
                                                            }`}>
                                                            {log.status === 'sent' ? (
                                                                <CheckCircle2 size={14} />
                                                            ) : (
                                                                <AlertCircle size={14} />
                                                            )}
                                                            {log.status === 'sent' ? 'Sent' : 'Failed'}
                                                        </span>
                                                        {log.error && (
                                                            <div className="text-[10px] text-red-600 mt-1 max-w-xs truncate">
                                                                {log.error}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-600">
                                                            {new Date(log.created_at).toLocaleString('ko-KR', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
