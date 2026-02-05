import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { ALL_JOBS } from '@/lib/jobs'

// Public jobs API
// Prioritizes speed and public fields
export async function GET() {
    try {
        let jobs = []

        // Try to fetch from Supabase if available
        if (supabaseAdmin) {
            const { data, error } = await supabaseAdmin
                .from('jobs')
                .select('*')
                .eq('status', 'open') // Only open jobs
                .order('created_at', { ascending: false })

            if (!error && data) {
                jobs = data
            }
        }

        // If no jobs from Supabase, try local storage
        if (jobs.length === 0) {
            try {
                const { getJobs } = await import('@/lib/storage')
                const localJobs = getJobs().filter(j => j.status === 'open')
                jobs = localJobs
            } catch (e) {
                console.error('Local storage read error', e)
            }
        }

        // Always fallback to ALL_JOBS constants if empty (so the site is never empty)
        if (jobs.length === 0) {
            jobs = ALL_JOBS
        }

        // If we have local jobs/supabase jobs, allow merging with constant jobs if IDs don't conflict
        // (Optional: for now just return what we found or constants)

        return NextResponse.json(jobs)
    } catch (error: any) {
        // Fallback to constants on crash
        console.error('Public jobs API error', error)
        return NextResponse.json(ALL_JOBS)
    }
}
