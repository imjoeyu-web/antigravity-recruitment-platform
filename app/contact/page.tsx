'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Loader2, CheckCircle, Mail, MapPin, Briefcase } from 'lucide-react'

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                setStatus('success')
                setFormData({ name: '', email: '', message: '' })
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="flex min-h-screen flex-col font-sans bg-zinc-900">
            <Header />
            <main className="flex-1 pt-20">
                {/* Hero */}
                <section className="py-20 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl">
                            <span className="inline-block text-sm font-medium text-violet-400 uppercase tracking-widest mb-4">
                                Contact
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                Let's talk.
                            </h1>
                            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
                                궁금한 점이 있거나 함께 이야기하고 싶다면
                                언제든 연락주세요.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Left - Contact Details */}
                            <div className="space-y-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-2">
                                            Email
                                        </h2>
                                        <a
                                            href="mailto:hello@antigravity.kr"
                                            className="text-xl text-white hover:text-violet-400 transition-colors"
                                        >
                                            hello@antigravity.kr
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-2">
                                            For careers
                                        </h2>
                                        <a
                                            href="mailto:careers@antigravity.kr"
                                            className="text-xl text-white hover:text-blue-400 transition-colors"
                                        >
                                            careers@antigravity.kr
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-2">
                                            Location
                                        </h2>
                                        <p className="text-lg text-zinc-300 leading-relaxed">
                                            Seoul, South Korea<br />
                                            <span className="text-zinc-500">Working with teams worldwide</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Message Form */}
                            <div className="bg-zinc-900 p-8 md:p-10 rounded-2xl border border-zinc-800">
                                {status === 'success' ? (
                                    <div className="text-center py-8 space-y-4">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-400 mb-2">
                                            <CheckCircle size={32} />
                                        </div>
                                        <h3 className="text-2xl font-medium text-white">메시지가 전송되었습니다</h3>
                                        <p className="text-zinc-400 leading-relaxed">
                                            빠른 시일 내에 답변 드리겠습니다.
                                        </p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="mt-4 text-violet-400 hover:text-violet-300 transition-colors"
                                        >
                                            새 메시지 작성
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-xl font-medium text-white mb-8">
                                            메시지 보내기
                                        </h2>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-sm text-zinc-400 mb-2">이름</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                                                    placeholder="홍길동"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-zinc-400 mb-2">이메일</label>
                                                <input
                                                    required
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-zinc-400 mb-2">메시지</label>
                                                <textarea
                                                    required
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                                                    placeholder="무엇을 도와드릴까요?"
                                                />
                                            </div>

                                            {status === 'error' && (
                                                <p className="text-sm text-red-400">오류가 발생했습니다. 다시 시도해주세요.</p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={status === 'submitting'}
                                                className="w-full py-4 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {status === 'submitting' ? (
                                                    <>
                                                        <Loader2 className="animate-spin" size={18} />
                                                        전송 중...
                                                    </>
                                                ) : '메시지 보내기'}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Teaser */}
                <section className="py-20 border-t border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl">
                            <span className="inline-block text-sm font-medium text-blue-400 uppercase tracking-widest mb-8">
                                자주 묻는 질문
                            </span>
                            <div className="space-y-8">
                                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                                    <h3 className="text-lg font-medium text-white mb-3">
                                        어떤 회사와 협업하나요?
                                    </h3>
                                    <p className="text-zinc-400 leading-relaxed">
                                        스타트업부터 대기업까지 다양한 규모의 팀과 함께합니다.
                                        팀의 일하는 방식을 개선하고 싶다면 언제든 연락주세요.
                                    </p>
                                </div>
                                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                                    <h3 className="text-lg font-medium text-white mb-3">
                                        협업은 어떻게 시작되나요?
                                    </h3>
                                    <p className="text-zinc-400 leading-relaxed">
                                        먼저 대화를 통해 필요한 것을 파악합니다.
                                        이후 상황에 맞는 범위와 방식을 제안드립니다.
                                    </p>
                                </div>
                                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                                    <h3 className="text-lg font-medium text-white mb-3">
                                        원격 근무가 가능한가요?
                                    </h3>
                                    <p className="text-zinc-400 leading-relaxed">
                                        네, 서울에 기반을 두고 있지만 전 세계 팀과 협업합니다.
                                        시간대를 넘어 원활하게 일할 수 있도록 프로세스를 설계했습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
