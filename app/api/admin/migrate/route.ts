import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getApplications } from '@/lib/storage'

export async function POST() {
    try {
        if (!supabaseAdmin) {
            return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
        }

        const localApps = getApplications()
        console.log(`[MIGRATE] Found ${localApps.length} local applications`)

        const results = {
            success: 0,
            skipped: 0,
            failed: 0,
            errors: [] as any[]
        }

        for (const app of localApps) {
            // 이미 Supabase에 있는지 확인 (이메일과 이름으로 간단히 체크하거나 ID로 체크)
            const { data: existing } = await supabaseAdmin
                .from('applications')
                .select('id')
                .eq('email', app.email)
                .eq('name', app.name)
                .single()

            if (existing) {
                results.skipped++
                continue
            }

            // Supabase에 삽입
            const { error: insertError } = await supabaseAdmin
                .from('applications')
                .insert([{
                    name: app.name,
                    email: app.email,
                    source: 'Migrated (Local)',
                    status: app.status || 'applied',
                    payload: app.payload || { ...app },
                    created_at: app.created_at || (app as any).appliedAt || new Date().toISOString()
                }])

            if (insertError) {
                results.failed++
                results.errors.push({ name: app.name, error: insertError.message })
            } else {
                results.success++
            }
        }

        return NextResponse.json({
            message: 'Migration complete',
            results
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
