"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        // 현재 세션 확인
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
            setLoading(false)
        }

        checkSession()

        // 인증 상태 변경 리스너
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null)
                setLoading(false)

                if (event === 'SIGNED_IN' && session?.user) {
                    // 로그인 성공 시 잠시 후 관리자 페이지로 이동
                    setTimeout(() => {
                        router.push('/admin')
                    }, 2000)
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [router])

    // Google 로그인 핸들러
    const handleGoogleLogin = async () => {
        setError(null)
        setLoading(true)

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    // 로그아웃 핸들러
    const handleLogout = async () => {
        setLoading(true)
        await supabase.auth.signOut()
        setUser(null)
        setLoading(false)
    }

    // 관리자 페이지로 이동
    const goToAdmin = () => {
        router.push('/admin')
    }

    // 로딩 중
    if (loading && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600">
                <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">로딩 중...</p>
                </div>
            </div>
        )
    }

    // 로그인 완료 상태
    if (user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600">
                <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
                    {/* 로그인 완료 배지 */}
                    <div className="flex justify-center mb-6">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            로그인 완료
                        </span>
                    </div>

                    {/* 프로필 사진 */}
                    <div className="flex justify-center mb-4">
                        {user.user_metadata?.avatar_url ? (
                            <img
                                src={user.user_metadata.avatar_url}
                                alt="프로필"
                                className="w-24 h-24 rounded-full border-4 border-purple-200 shadow-lg"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center text-purple-600 text-3xl font-bold">
                                {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                            </div>
                        )}
                    </div>

                    {/* 이름 */}
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
                        {user.user_metadata?.full_name || '사용자'}
                    </h2>

                    {/* 이메일 */}
                    <p className="text-center text-gray-500 mb-6">
                        {user.email}
                    </p>

                    {/* 버튼들 */}
                    <div className="space-y-3">
                        <button
                            onClick={goToAdmin}
                            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors duration-200"
                        >
                            관리자 대시보드로 이동
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors duration-200"
                        >
                            로그아웃
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // 로그인 전 상태
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600">
            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
                {/* G 로고 */}
                <div className="flex justify-center mb-4">
                    <span className="text-7xl font-bold text-gray-800">G</span>
                </div>

                {/* 로그인 텍스트 */}
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    로그인
                </h1>

                {/* 에러 메시지 */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm text-center">{error}</p>
                    </div>
                )}

                {/* Google 로그인 버튼 */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-blue-200 rounded-xl hover:bg-blue-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {/* Google 로고 */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    <span className="text-gray-700 font-medium">Google로 계속하기</span>
                </button>

                {/* 안내 텍스트 */}
                <p className="mt-6 text-center text-gray-400 text-sm">
                    관리자 전용 로그인 페이지입니다
                </p>
            </div>
        </div>
    )
}
