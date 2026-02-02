"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Loader2 } from 'lucide-react'

interface JobModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export function JobModal({ isOpen, onClose, onSuccess }: JobModalProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        description: '',
        status: 'open'
    })

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('/api/admin/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                onSuccess()
                onClose()
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-8 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Create New Job Posting</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Job Title</label>
                            <input
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. AI Researcher"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Department</label>
                            <input
                                required
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Engineering"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                            required
                            rows={5}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Describe the role and requirements..."
                        />
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="flex-1 rounded-2xl py-6">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="flex-[2] rounded-2xl py-6 bg-blue-600 hover:bg-blue-700">
                            {loading ? <Loader2 className="animate-spin" /> : 'Create Posting'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
