'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Loader2, CheckCircle } from 'lucide-react'

interface ApplyModalProps {
    jobId: string
    jobTitle: string
    isOpen: boolean
    onClose: () => void
}

export function ApplyModal({ jobId, jobTitle, isOpen, onClose }: ApplyModalProps) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        resume: '',
        coverLetter: ''
    })

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')

        try {
            const response = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, jobTitle, job_id: jobId })
            })

            if (response.ok) {
                setStatus('success')
            } else {
                setStatus('error')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Apply for {jobTitle}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    {status === 'success' ? (
                        <div className="text-center py-8 space-y-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-2">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Application Sent!</h3>
                            <p className="text-gray-600">
                                Thank you for applying. We've sent a confirmation email to <strong>{formData.email}</strong>.
                            </p>
                            <Button onClick={onClose} className="w-full mt-6">Close</Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Phone (Optional)</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="+82 10-0000-0000"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Resume Link</label>
                                <input
                                    required
                                    type="url"
                                    name="resume"
                                    value={formData.resume}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="https://linkedin.com/in/johndoe"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Cover Letter (Optional)</label>
                                <textarea
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                    placeholder="Tell us why you are a great fit..."
                                />
                            </div>

                            {status === 'error' && (
                                <p className="text-sm text-red-600 font-medium">Something went wrong. Please try again.</p>
                            )}

                            <div className="pt-4">
                                <Button
                                    disabled={status === 'submitting'}
                                    type="submit"
                                    className="w-full py-6 text-lg"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <Loader2 className="mr-2 animate-spin" size={20} />
                                            Sending...
                                        </>
                                    ) : 'Submit Application'}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
