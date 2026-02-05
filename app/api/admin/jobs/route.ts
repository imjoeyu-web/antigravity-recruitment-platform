import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
    try {
        if (supabaseAdmin) {
            const { data, error } = await supabaseAdmin
                .from('jobs')
                .select('*')
                .order('created_at', { ascending: false })

            if (!error) return NextResponse.json(data)
            console.warn('⚠️ Supabase jobs fetch error, fallback to local:', error.message)
        }

        const { getJobs } = await import('@/lib/storage')
        return NextResponse.json(getJobs())
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const {
            title,
            department,
            description,
            location,
            employment_type,
            responsibilities,
            requirements,
            status
        } = body

        const jobData = {
            title,
            department,
            description,
            location,
            employment_type,
            responsibilities,
            requirements,
            status: status || 'open'
        }

        if (supabaseAdmin) {
            const { data, error } = await supabaseAdmin
                .from('jobs')
                .insert([jobData])
                .select()

            if (!error && data && data[0]) {
                return NextResponse.json(data[0])
            }
            console.warn('⚠️ Supabase jobs insert error, fallback to local:', error?.message)
        }

        const { saveJob } = await import('@/lib/storage')
        const newJob = {
            id: `job_${Math.random().toString(36).substring(7)}`,
            ...jobData,
            created_at: new Date().toISOString()
        }
        saveJob(newJob as any)
        return NextResponse.json(newJob)
    } catch (error: any) {
        console.error('Job creation error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
