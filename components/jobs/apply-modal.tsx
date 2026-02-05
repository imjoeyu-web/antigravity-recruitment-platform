'use client'

import { useState } from 'react'
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
            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    jobTitle,
                    job_id: jobId,
                    source: 'Web Application'
                })
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
            <div className="bg-[#FFFDF9] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-stone-100">
                    <div>
                        <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Apply for</p>
                        <h2 className="text-lg font-medium text-stone-900">{jobTitle}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {status === 'success' ? (
                        <div className="text-center py-8 space-y-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 text-stone-600 mb-2">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-2xl font-medium text-stone-900">Application sent</h3>
                            <p className="text-stone-500 font-light leading-relaxed">
                                Thank you for your interest. We've sent a confirmation to{' '}
                                <span className="text-stone-900">{formData.email}</span>
                            </p>
                            <button
                                onClick={onClose}
                                className="w-full mt-6 py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-stone-600">Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-400 transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-stone-600">Email</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-400 transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-stone-600">Phone <span className="text-stone-400">(optional)</span></label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-400 transition-colors"
                                    placeholder="+82 10-0000-0000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-stone-600">Resume or LinkedIn</label>
                                <input
                                    required
                                    type="url"
                                    name="resume"
                                    value={formData.resume}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-400 transition-colors"
                                    placeholder="https://linkedin.com/in/you"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-stone-600">Cover letter <span className="text-stone-400">(optional)</span></label>
                                <textarea
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-400 transition-colors resize-none"
                                    placeholder="Tell us a bit about yourself and why you're interested..."
                                />
                            </div>

                            {status === 'error' && (
                                <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
                            )}

                            <div className="pt-2">
                                <button
                                    disabled={status === 'submitting'}
                                    type="submit"
                                    className="w-full py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <Loader2 className="animate-spin" size={18} />
                                            Sending...
                                        </>
                                    ) : 'Submit application'}
                                </button>
                            </div>

                            <p className="text-xs text-center text-stone-400">
                                We'll review your application and get back to you soon.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
