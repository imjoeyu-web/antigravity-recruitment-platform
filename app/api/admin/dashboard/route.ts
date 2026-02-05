import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
    try {
        if (!supabaseAdmin) {
            return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
        }

        // 1. 전체 지원자 데이터 가져오기
        const { data: applications, error: appError } = await supabaseAdmin
            .from('applications')
            .select('*')
            .order('created_at', { ascending: true })

        if (appError) throw appError

        // 2. 직무 데이터 가져오기
        const { data: jobs, error: jobError } = await supabaseAdmin
            .from('jobs')
            .select('id, title, department, status')

        if (jobError) throw jobError

        const apps = applications || []
        const jobList = jobs || []

        // === 일별 지원자 추이 (최근 30일) ===
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const dailyData: { [key: string]: number } = {}

        // 최근 30일 날짜 초기화
        for (let i = 0; i < 30; i++) {
            const date = new Date()
            date.setDate(date.getDate() - i)
            const dateStr = date.toISOString().split('T')[0]
            dailyData[dateStr] = 0
        }

        // 지원자 카운트
        apps.forEach((app: any) => {
            const dateStr = new Date(app.created_at).toISOString().split('T')[0]
            if (dailyData[dateStr] !== undefined) {
                dailyData[dateStr]++
            }
        })

        const dailyTrend = Object.entries(dailyData)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, count]) => ({
                date: new Date(date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
                count
            }))

        // === 직무별 지원 비율 ===
        const jobCounts: { [key: string]: number } = {}
        apps.forEach((app: any) => {
            const jobId = app.job_id || (app.payload as any)?.job_id
            if (jobId) {
                jobCounts[jobId] = (jobCounts[jobId] || 0) + 1
            } else {
                jobCounts['general'] = (jobCounts['general'] || 0) + 1
            }
        })

        const jobDistribution = Object.entries(jobCounts).map(([jobId, count]) => {
            const job = jobList.find((j: any) => j.id === jobId)
            return {
                name: job?.title || (jobId === 'general' ? 'General' : 'Unknown'),
                value: count
            }
        }).sort((a, b) => b.value - a.value)

        // === 채용 퍼널 데이터 ===
        const statusCounts = {
            applied: 0,
            screening: 0,
            interview: 0,
            hired: 0,
            rejected: 0
        }

        apps.forEach((app: any) => {
            const status = app.status as keyof typeof statusCounts
            if (statusCounts[status] !== undefined) {
                statusCounts[status]++
            }
        })

        const funnelData = [
            { stage: 'Applied', count: statusCounts.applied + statusCounts.screening + statusCounts.interview + statusCounts.hired, color: '#3B82F6' },
            { stage: 'Screening', count: statusCounts.screening + statusCounts.interview + statusCounts.hired, color: '#8B5CF6' },
            { stage: 'Interview', count: statusCounts.interview + statusCounts.hired, color: '#F59E0B' },
            { stage: 'Hired', count: statusCounts.hired, color: '#10B981' }
        ]

        // === 지원 소스별 분포 ===
        const sourceCounts: { [key: string]: number } = {}
        apps.forEach((app: any) => {
            const source = app.source || 'Website'
            sourceCounts[source] = (sourceCounts[source] || 0) + 1
        })

        const sourceDistribution = Object.entries(sourceCounts).map(([source, count]) => ({
            name: source,
            value: count
        })).sort((a, b) => b.value - a.value)

        // === 주간 하이라이트 ===
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

        const weeklyApps = apps.filter((app: any) => new Date(app.created_at) >= oneWeekAgo)
        const weeklyHires = weeklyApps.filter((app: any) => app.status === 'hired').length
        const weeklyInterviews = weeklyApps.filter((app: any) => app.status === 'interview').length

        // === 채널별 전환율 ===
        const sourceConversion: { [key: string]: { total: number; hired: number } } = {}
        apps.forEach((app: any) => {
            const source = app.source || 'Website'
            if (!sourceConversion[source]) {
                sourceConversion[source] = { total: 0, hired: 0 }
            }
            sourceConversion[source].total++
            if (app.status === 'hired') {
                sourceConversion[source].hired++
            }
        })

        const channelConversionData = Object.entries(sourceConversion)
            .map(([source, data]) => ({
                name: source,
                total: data.total,
                hired: data.hired,
                rate: data.total > 0 ? parseFloat(((data.hired / data.total) * 100).toFixed(1)) : 0
            }))
            .sort((a, b) => b.rate - a.rate)

        // === 직무별 단계 분포 ===
        const jobStageMatrix: { [jobId: string]: { title: string; applied: number; screening: number; interview: number; hired: number; rejected: number } } = {}
        apps.forEach((app: any) => {
            const jobId = app.job_id || (app.payload as any)?.job_id || 'general'
            if (!jobStageMatrix[jobId]) {
                const job = jobList.find((j: any) => j.id === jobId)
                jobStageMatrix[jobId] = {
                    title: job?.title || (jobId === 'general' ? 'General' : 'Unknown'),
                    applied: 0,
                    screening: 0,
                    interview: 0,
                    hired: 0,
                    rejected: 0
                }
            }
            const status = app.status as string
            if (jobStageMatrix[jobId][status as keyof typeof jobStageMatrix[typeof jobId]] !== undefined) {
                (jobStageMatrix[jobId] as any)[status]++
            }
        })

        const jobStageData = Object.values(jobStageMatrix)
            .filter(job => job.applied + job.screening + job.interview + job.hired > 0)
            .sort((a, b) => (b.applied + b.screening + b.interview + b.hired) - (a.applied + a.screening + a.interview + a.hired))

        // === 평균 채용 소요 기간 (hired된 지원자 기준) ===
        const hiredApps = apps.filter((app: any) => app.status === 'hired' && app.created_at && app.status_updated_at)
        let avgDaysToHire = 0
        if (hiredApps.length > 0) {
            const totalDays = hiredApps.reduce((acc: number, app: any) => {
                const start = new Date(app.created_at)
                const end = new Date(app.status_updated_at)
                return acc + Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
            }, 0)
            avgDaysToHire = Math.round(totalDays / hiredApps.length)
        }

        // === 활성 포지션 수 ===
        const activePositions = jobList.filter((j: any) => j.status === 'open').length

        // === Tab 2: 운영 진단 데이터 ===
        // 단계별 평균 체류 기간
        const now = new Date()
        const stageDelays: { [stage: string]: { total: number; count: number } } = {
            applied: { total: 0, count: 0 },
            screening: { total: 0, count: 0 },
            interview: { total: 0, count: 0 }
        }

        // 진행 중인 지원자들의 현재 단계 체류 기간
        apps.forEach((app: any) => {
            if (['applied', 'screening', 'interview'].includes(app.status)) {
                const startDate = new Date(app.status_updated_at || app.created_at)
                const days = Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
                stageDelays[app.status].total += days
                stageDelays[app.status].count++
            }
        })

        const stageDelayData = Object.entries(stageDelays).map(([stage, data]) => ({
            stage: stage === 'applied' ? '서류' : stage === 'screening' ? '심사' : '면접',
            avgDays: data.count > 0 ? Math.round(data.total / data.count) : 0,
            count: data.count,
            // 7일 이상이면 경고
            risk: data.count > 0 && (data.total / data.count) > 7 ? 'high' : 'normal'
        }))

        // === 병목 히트맵 데이터 ===
        // 직무별 × 단계별 병목 점수 계산
        const bottleneckHeatmapData: {
            jobId: string
            jobTitle: string
            stage: string
            stageLabel: string
            count: number
            avgDays: number
            bottleneckScore: number
        }[] = []

        // 직무별로 각 단계의 인원수와 평균 체류일 계산
        Object.entries(jobStageMatrix).forEach(([jobId, job]) => {
            const stages = ['applied', 'screening', 'interview'] as const
            const stageLabels = { applied: '서류', screening: '심사', interview: '면접' }

            stages.forEach(stage => {
                // 해당 직무 + 단계의 지원자들
                const stageApps = apps.filter((app: any) => {
                    const appJobId = app.job_id || (app.payload as any)?.job_id || 'general'
                    return appJobId === jobId && app.status === stage
                })

                const count = stageApps.length
                if (count === 0) {
                    bottleneckHeatmapData.push({
                        jobId,
                        jobTitle: job.title,
                        stage,
                        stageLabel: stageLabels[stage],
                        count: 0,
                        avgDays: 0,
                        bottleneckScore: 0
                    })
                    return
                }

                // 평균 체류일 계산
                const totalDays = stageApps.reduce((acc: number, app: any) => {
                    const startDate = new Date(app.status_updated_at || app.created_at)
                    return acc + Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
                }, 0)
                const avgDays = Math.round(totalDays / count)

                // 병목 점수: 인원수 × (평균체류일 / 7일)
                const bottleneckScore = parseFloat((count * (avgDays / 7)).toFixed(1))

                bottleneckHeatmapData.push({
                    jobId,
                    jobTitle: job.title,
                    stage,
                    stageLabel: stageLabels[stage],
                    count,
                    avgDays,
                    bottleneckScore
                })
            })
        })

        // 직무별 리스크 지표
        const jobRiskData = Object.entries(jobStageMatrix).map(([jobId, job]) => {
            const total = job.applied + job.screening + job.interview + job.hired
            const inProgress = job.applied + job.screening + job.interview
            const convRate = total > 0 ? (job.hired / total) * 100 : 0

            // 리스크 판단: 진행 중이 많고 전환율이 낮으면 위험
            let riskLevel: 'low' | 'medium' | 'high' = 'low'
            if (inProgress >= 5 && convRate < 10) riskLevel = 'high'
            else if (inProgress >= 3 && convRate < 20) riskLevel = 'medium'

            return {
                title: job.title,
                inProgress,
                hired: job.hired,
                rejected: job.rejected,
                conversionRate: parseFloat(convRate.toFixed(1)),
                riskLevel
            }
        }).filter(j => j.inProgress > 0 || j.hired > 0)
          .sort((a, b) => {
              const riskOrder = { high: 0, medium: 1, low: 2 }
              return riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
          })

        // === Tab 3: Talent Pool (인재풀 재발굴) ===
        // Talent Pool 정의: rejected 상태인 과거 지원자 중 재접촉 가치가 있는 인재
        const openJobs = jobList.filter((j: any) => j.status === 'open')

        const talentPoolCandidates = apps
            .filter((app: any) => app.status === 'rejected')
            .map((app: any) => {
                const appliedDate = new Date(app.created_at)
                const daysSinceApplied = Math.ceil((now.getTime() - appliedDate.getTime()) / (1000 * 60 * 60 * 24))
                const monthsSinceApplied = Math.floor(daysSinceApplied / 30)
                const job = jobList.find((j: any) => j.id === app.job_id)

                // 탈락 단계 추정 (payload에 저장된 정보 또는 추정)
                // 실제로는 status 변경 이력이 필요하지만, 현재는 payload 기반으로 추정
                const exitStage = (app.payload as any)?.exitStage ||
                    (daysSinceApplied < 14 ? 'screening' :
                     daysSinceApplied < 30 ? 'interview' : 'final')

                // 추천 우선순위 계산
                // High Potential: 면접 이상 진행 + 6개월 이내
                // Potential: 서류 통과 OR 1년 이내
                // Consider: 그 외
                let potentialLevel: 'high' | 'medium' | 'low' = 'low'
                if ((exitStage === 'interview' || exitStage === 'final') && monthsSinceApplied <= 6) {
                    potentialLevel = 'high'
                } else if (exitStage !== 'screening' || monthsSinceApplied <= 12) {
                    potentialLevel = 'medium'
                }

                // 현재 오픈된 포지션 중 매칭 가능한 직무 (같은 부서 기준)
                const appliedJobDept = job?.department || ''
                const matchingPositions = openJobs
                    .filter((oj: any) => oj.department === appliedJobDept || oj.id === app.job_id)
                    .map((oj: any) => oj.title)
                    .slice(0, 2)

                return {
                    id: app.id,
                    name: app.name,
                    email: app.email,
                    lastAppliedJob: job?.title || (app.payload as any)?.jobTitle || 'General',
                    lastAppliedDate: appliedDate.toISOString().split('T')[0],
                    daysSinceApplied,
                    exitStage,
                    exitStageLabel: exitStage === 'screening' ? '서류' : exitStage === 'interview' ? '면접' : '최종',
                    potentialLevel,
                    matchingPositions
                }
            })
            .sort((a, b) => {
                // High > Medium > Low 순, 같은 레벨이면 최근 지원자 우선
                const levelOrder = { high: 0, medium: 1, low: 2 }
                if (levelOrder[a.potentialLevel] !== levelOrder[b.potentialLevel]) {
                    return levelOrder[a.potentialLevel] - levelOrder[b.potentialLevel]
                }
                return a.daysSinceApplied - b.daysSinceApplied
            })

        // Talent Pool 통계
        const talentPoolStats = {
            total: talentPoolCandidates.length,
            highPotential: talentPoolCandidates.filter(c => c.potentialLevel === 'high').length,
            potential: talentPoolCandidates.filter(c => c.potentialLevel === 'medium').length,
            withMatchingJobs: talentPoolCandidates.filter(c => c.matchingPositions.length > 0).length,
            recentlyAdded: talentPoolCandidates.filter(c => c.daysSinceApplied <= 30).length
        }

        // 탈락 단계별 분포
        const talentPoolByStage = [
            { stage: '서류 탈락', count: talentPoolCandidates.filter(c => c.exitStage === 'screening').length },
            { stage: '면접 탈락', count: talentPoolCandidates.filter(c => c.exitStage === 'interview').length },
            { stage: '최종 탈락', count: talentPoolCandidates.filter(c => c.exitStage === 'final').length }
        ]

        // 직무별 Talent Pool 현황
        const talentPoolByJob: { [key: string]: number } = {}
        talentPoolCandidates.forEach(c => {
            talentPoolByJob[c.lastAppliedJob] = (talentPoolByJob[c.lastAppliedJob] || 0) + 1
        })
        const talentPoolJobDistribution = Object.entries(talentPoolByJob)
            .map(([job, count]) => ({ job, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)

        const highlights = {
            weeklyApplications: weeklyApps.length,
            weeklyHires,
            weeklyInterviews,
            totalApplications: apps.length,
            conversionRate: apps.length > 0 ? ((statusCounts.hired / apps.length) * 100).toFixed(1) : '0',
            avgDaysToHire,
            activePositions,
            talentPoolCount: talentPoolCandidates.length
        }

        return NextResponse.json({
            // Tab 1: Overview
            dailyTrend,
            jobDistribution,
            funnelData,
            sourceDistribution,
            channelConversionData,
            highlights,
            statusCounts,
            // Tab 2: Operational Diagnosis
            stageDelayData,
            jobRiskData,
            jobStageData,
            bottleneckHeatmapData,
            // Tab 3: Talent Pool
            talentPoolCandidates,
            talentPoolStats,
            talentPoolByStage,
            talentPoolJobDistribution
        })

    } catch (error: any) {
        console.error('Dashboard API error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
