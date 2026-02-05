import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// 직무 상세 조회
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        if (supabaseAdmin) {
            const { data, error } = await supabaseAdmin
                .from('jobs')
                .select('*')
                .eq('id', id)
                .single()

            if (!error && data) {
                return NextResponse.json(data)
            }
            console.warn('⚠️ Supabase job fetch error:', error?.message)
        }

        return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    } catch (error: any) {
        console.error('Job fetch error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// 직무 수정
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await req.json()

        // 허용된 필드만 추출
        const allowedFields = [
            'title', 'department', 'description', 'location',
            'employment_type', 'responsibilities', 'requirements', 'status'
        ]
        const updateData: Record<string, any> = {}
        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                updateData[field] = body[field]
            }
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
        }

        if (supabaseAdmin) {
            const { data, error } = await supabaseAdmin
                .from('jobs')
                .update(updateData)
                .eq('id', id)
                .select()
                .single()

            if (!error && data) {
                return NextResponse.json(data)
            }
            console.error('⚠️ Supabase job update error:', error?.message)
            return NextResponse.json({ error: error?.message || 'Update failed' }, { status: 500 })
        }

        return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    } catch (error: any) {
        console.error('Job update error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// 직무 삭제
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        if (supabaseAdmin) {
            const { error } = await supabaseAdmin
                .from('jobs')
                .delete()
                .eq('id', id)

            if (!error) {
                return NextResponse.json({ success: true })
            }
            console.error('⚠️ Supabase job delete error:', error?.message)
            return NextResponse.json({ error: error?.message || 'Delete failed' }, { status: 500 })
        }

        return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    } catch (error: any) {
        console.error('Job delete error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
