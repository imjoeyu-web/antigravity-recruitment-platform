"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Loader2, Trash2 } from 'lucide-react'

interface Job {
    id: string
    title: string
    department: string
    location?: string
    employment_type?: string
    description?: string
    responsibilities?: string
    requirements?: string
    status: string
}

interface JobModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    editJob?: Job | null // 수정 모드일 때 기존 직무 데이터
}

export function JobModal({ isOpen, onClose, onSuccess, editJob }: JobModalProps) {
    const [loading, setLoading] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        location: '',
        employment_type: 'full-time',
        description: '',
        responsibilities: '',
        requirements: '',
        status: 'open'
    })

    const isEditMode = !!editJob

    // 수정 모드일 때 기존 데이터로 폼 초기화
    useEffect(() => {
        if (editJob) {
            setFormData({
                title: editJob.title || '',
                department: editJob.department || '',
                location: editJob.location || '',
                employment_type: editJob.employment_type || 'full-time',
                description: editJob.description || '',
                responsibilities: editJob.responsibilities || '',
                requirements: editJob.requirements || '',
                status: editJob.status || 'open'
            })
        } else {
            // 새 직무 등록 모드일 때 폼 초기화
            setFormData({
                title: '',
                department: '',
                location: '',
                employment_type: 'full-time',
                description: '',
                responsibilities: '',
                requirements: '',
                status: 'open'
            })
        }
        setDeleteConfirm(false)
    }, [editJob, isOpen])

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const url = isEditMode
                ? `/api/admin/jobs/${editJob.id}`
                : '/api/admin/jobs'
            const method = isEditMode ? 'PATCH' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                onSuccess()
                onClose()
            } else {
                const data = await res.json()
                alert(data.error || '저장에 실패했습니다.')
            }
        } catch (e) {
            console.error(e)
            alert('네트워크 오류가 발생했습니다.')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!editJob) return

        if (!deleteConfirm) {
            setDeleteConfirm(true)
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`/api/admin/jobs/${editJob.id}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                onSuccess()
                onClose()
            } else {
                const data = await res.json()
                alert(data.error || '삭제에 실패했습니다.')
            }
        } catch (e) {
            console.error(e)
            alert('네트워크 오류가 발생했습니다.')
        } finally {
            setLoading(false)
            setDeleteConfirm(false)
        }
    }

    const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
    const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">
                        {isEditMode ? '직무 수정' : '새 직무 등록'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* 기본 정보 */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>직무명 *</label>
                            <input
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className={inputClass}
                                placeholder="예: Robotics AI Researcher"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>부서 *</label>
                            <input
                                required
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                                className={inputClass}
                                placeholder="예: Engineering"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>근무지</label>
                            <input
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                className={inputClass}
                                placeholder="예: Seoul, KR"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>고용 형태</label>
                            <select
                                value={formData.employment_type}
                                onChange={e => setFormData({ ...formData, employment_type: e.target.value })}
                                className={inputClass}
                            >
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>
                    </div>

                    {/* 채용 상태 (수정 모드에서만 표시) */}
                    {isEditMode && (
                        <div>
                            <label className={labelClass}>채용 상태</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                                className={inputClass}
                            >
                                <option value="open">채용 중 (Open)</option>
                                <option value="closed">채용 완료 (Closed)</option>
                            </select>
                        </div>
                    )}

                    {/* About the Role */}
                    <div>
                        <label className={labelClass}>About the Role</label>
                        <textarea
                            rows={3}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className={inputClass + " resize-none"}
                            placeholder="직무에 대한 간략한 설명을 입력하세요..."
                        />
                    </div>

                    {/* What You'll Do */}
                    <div>
                        <label className={labelClass}>What You'll Do (담당 업무)</label>
                        <textarea
                            rows={4}
                            value={formData.responsibilities}
                            onChange={e => setFormData({ ...formData, responsibilities: e.target.value })}
                            className={inputClass + " resize-none"}
                            placeholder="각 항목을 줄바꿈으로 구분하세요"
                        />
                        <p className="text-xs text-gray-400 mt-1">각 항목을 줄바꿈으로 구분해 주세요</p>
                    </div>

                    {/* What We're Looking For */}
                    <div>
                        <label className={labelClass}>What We're Looking For (자격 요건)</label>
                        <textarea
                            rows={4}
                            value={formData.requirements}
                            onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                            className={inputClass + " resize-none"}
                            placeholder="각 항목을 줄바꿈으로 구분하세요"
                        />
                        <p className="text-xs text-gray-400 mt-1">각 항목을 줄바꿈으로 구분해 주세요</p>
                    </div>

                    {/* 버튼 */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        {isEditMode && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleDelete}
                                disabled={loading}
                                className={`rounded-xl py-3 ${deleteConfirm ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100' : 'text-red-500 hover:text-red-600 hover:border-red-300'}`}
                            >
                                <Trash2 size={16} className="mr-2" />
                                {deleteConfirm ? '정말 삭제?' : '삭제'}
                            </Button>
                        )}
                        <div className="flex-1" />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="rounded-xl py-3 text-gray-700"
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl py-3 px-8 bg-gray-900 hover:bg-gray-800 text-white"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : (isEditMode ? '저장' : '직무 등록')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
