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
    Phone,
    Send,
    UserCheck,
    UserX,
    MessageSquare
} from 'lucide-react'
import { Application } from '@/lib/storage'

export default function ApplicantDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [app, setApp] = useState<Application | null>(null)
    const [job, setJob] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

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

    // 상태 변경 (올바른 API 경로 사용)
    const handleStatusChange = async (newStatus: string) => {
        if (!app) return
        setActionLoading(true)
        setNotification(null)

        try {
            const res = await fetch(`/api/admin/applications/${app.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })

            const data = await res.json()

            if (res.ok) {
                setApp({ ...app, status: newStatus as any })

                // 알림 트리거 여부에 따른 메시지
                if (data.notification_triggered) {
                    if (data.notification_failed) {
                        setNotification({ type: 'error', message: `상태가 ${newStatus}로 변경되었지만 이메일 발송에 실패했습니다.` })
                    } else {
                        setNotification({ type: 'success', message: `상태가 ${newStatus}로 변경되고 이메일이 발송되었습니다.` })
                    }
                } else {
                    setNotification({ type: 'success', message: `상태가 ${newStatus}로 변경되었습니다.` })
                }
            } else {
                setNotification({ type: 'error', message: data.error || '상태 변경에 실패했습니다.' })
            }
        } catch (e) {
            console.error(e)
            setNotification({ type: 'error', message: '네트워크 오류가 발생했습니다.' })
        } finally {
            setActionLoading(false)
        }
    }

    // 수동 이메일 발송
    const handleSendEmail = async () => {
        if (!app) return
        setActionLoading(true)
        setNotification(null)

        try {
            const res = await fetch(`/api/admin/applications/${app.id}/notify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ event_type: app.status === 'interview' ? 'interview_invite' : app.status })
            })

            const data = await res.json()

            if (res.ok && data.success) {
                setNotification({ type: 'success', message: '이메일이 성공적으로 발송되었습니다.' })
            } else {
                setNotification({ type: 'error', message: data.error || '이메일 발송에 실패했습니다.' })
            }
        } catch (e) {
            console.error(e)
            setNotification({ type: 'error', message: '네트워크 오류가 발생했습니다.' })
        } finally {
            setActionLoading(false)
        }
    }

    if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-700">Loading...</div>
    if (!app) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-700">Applicant not found.</div>

    const payload = app.payload || {}

    const statusConfig: Record<string, { color: string, bg: string, label: string }> = {
        applied: { color: 'text-gray-700', bg: 'bg-gray-100', label: '지원 완료' },
        screening: { color: 'text-yellow-700', bg: 'bg-yellow-100', label: '서류 검토 중' },
        interview: { color: 'text-blue-700', bg: 'bg-blue-100', label: '면접 진행' },
        hired: { color: 'text-green-700', bg: 'bg-green-100', label: '최종 합격' },
        rejected: { color: 'text-red-700', bg: 'bg-red-100', label: '불합격' },
    }

    const currentStatus = statusConfig[app.status] || statusConfig.applied

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
                    >
                        <ArrowLeft size={18} /> 목록으로
                    </button>
                    <div className={`px-4 py-1.5 rounded-full text-sm font-bold ${currentStatus.bg} ${currentStatus.color}`}>
                        {currentStatus.label}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Notification */}
                {notification && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                        notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                        {notification.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                        {notification.message}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl border p-8">
                            <div className="flex items-start gap-5">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                                    {app.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-3">{app.name}</h1>
                                    <div className="space-y-2 text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <Mail size={16} className="text-gray-500" />
                                            <span>{app.email}</span>
                                        </div>
                                        {(payload as any).phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone size={16} className="text-gray-500" />
                                                <span>{(payload as any).phone}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Tag size={16} className="text-gray-500" />
                                            <span>{job?.title || (payload as any).jobTitle || 'General Application'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-gray-500" />
                                            <span>{new Date(app.created_at || (app as any).appliedAt).toLocaleDateString('ko-KR')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resume / Portfolio */}
                        <div className="bg-white rounded-2xl border p-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText size={20} className="text-blue-600" />
                                이력서 / 포트폴리오
                            </h2>
                            {(payload as any).resume ? (
                                <a
                                    href={(payload as any).resume}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium hover:bg-blue-100 transition-colors"
                                >
                                    <ExternalLink size={16} />
                                    문서 보기
                                </a>
                            ) : (
                                <p className="text-gray-600">제출된 이력서가 없습니다.</p>
                            )}
                        </div>

                        {/* Cover Letter */}
                        <div className="bg-white rounded-2xl border p-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <MessageSquare size={20} className="text-blue-600" />
                                자기소개
                            </h2>
                            <div className="bg-gray-50 p-6 rounded-xl text-gray-700 leading-relaxed whitespace-pre-line">
                                {(payload as any).coverLetter || "자기소개가 작성되지 않았습니다."}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Actions */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl border p-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                                채용 결정
                            </h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleStatusChange('interview')}
                                    disabled={actionLoading || app.status === 'interview'}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                                        app.status === 'interview'
                                            ? 'bg-blue-100 text-blue-700 cursor-default'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    <Clock size={18} />
                                    면접 진행
                                </button>
                                <button
                                    onClick={() => handleStatusChange('hired')}
                                    disabled={actionLoading || app.status === 'hired'}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                                        app.status === 'hired'
                                            ? 'bg-green-100 text-green-700 cursor-default'
                                            : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                                >
                                    <UserCheck size={18} />
                                    최종 합격
                                </button>
                                <button
                                    onClick={() => handleStatusChange('rejected')}
                                    disabled={actionLoading || app.status === 'rejected'}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                                        app.status === 'rejected'
                                            ? 'bg-red-100 text-red-700 cursor-default'
                                            : 'bg-red-600 text-white hover:bg-red-700'
                                    }`}
                                >
                                    <UserX size={18} />
                                    불합격 처리
                                </button>
                            </div>
                            {actionLoading && (
                                <div className="mt-4 text-center text-sm text-gray-700 font-medium">
                                    처리 중...
                                </div>
                            )}
                        </div>

                        {/* Status Change */}
                        <div className="bg-white rounded-2xl border p-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                                상태 직접 변경
                            </h3>
                            <select
                                value={app.status}
                                onChange={(e) => handleStatusChange(e.target.value)}
                                disabled={actionLoading}
                                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="applied">지원 완료</option>
                                <option value="screening">서류 검토 중</option>
                                <option value="interview">면접 진행</option>
                                <option value="hired">최종 합격</option>
                                <option value="rejected">불합격</option>
                            </select>
                        </div>

                        {/* Manual Email */}
                        <div className="bg-white rounded-2xl border p-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                                이메일 발송
                            </h3>
                            <p className="text-sm text-gray-700 mb-4">
                                현재 상태({currentStatus.label})에 맞는 이메일을 수동으로 발송합니다.
                            </p>
                            <button
                                onClick={handleSendEmail}
                                disabled={actionLoading || !['interview', 'hired', 'rejected'].includes(app.status)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} />
                                이메일 발송
                            </button>
                            {!['interview', 'hired', 'rejected'].includes(app.status) && (
                                <p className="text-xs text-gray-600 mt-2 text-center">
                                    면접/합격/불합격 상태에서만 발송 가능
                                </p>
                            )}
                        </div>

                        {/* Timeline */}
                        <div className="bg-white rounded-2xl border p-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                                진행 이력
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5"></div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">지원서 접수</p>
                                        <p className="text-xs text-gray-600">
                                            {new Date(app.created_at || (app as any).appliedAt).toLocaleString('ko-KR')}
                                        </p>
                                    </div>
                                </div>
                                {app.status !== 'applied' && (
                                    <div className="flex gap-3">
                                        <div className={`w-3 h-3 rounded-full mt-1.5 ${
                                            app.status === 'hired' ? 'bg-green-500' :
                                            app.status === 'rejected' ? 'bg-red-500' :
                                            'bg-blue-500'
                                        }`}></div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{currentStatus.label}</p>
                                            <p className="text-xs text-gray-600">현재 상태</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
