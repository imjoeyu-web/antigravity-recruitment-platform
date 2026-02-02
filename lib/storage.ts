import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data/applications.json')
const JOBS_PATH = path.join(process.cwd(), 'data/jobs.json')

export interface Application {
    id: string
    name: string
    email: string
    jobTitle: string
    resume: string
    coverLetter: string
    status: 'applied' | 'screening' | 'reviewed' | 'interview' | 'rejected' | 'hired'
    appliedAt: string // Fallback for local storage
    created_at?: string // Supabase field
    source?: string // Supabase field
    job_id?: string // [NEW] Link to jobs table
    result_mail_sent?: boolean // [NEW] Track automation
    payload?: any
    score?: number // Talent Insight Score from the model
    insights?: string[] // Insights from the analysis
}

export interface Job {
    id: string
    title: string
    department: string
    description: string
    status: 'open' | 'closed'
    created_at: string
}

export function getApplications(): Application[] {
    if (!fs.existsSync(DB_PATH)) {
        const dir = path.dirname(DB_PATH)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        fs.writeFileSync(DB_PATH, JSON.stringify([]))
        return []
    }
    const data = fs.readFileSync(DB_PATH, 'utf8')
    return JSON.parse(data)
}

export function saveApplication(app: Application) {
    const apps = getApplications()
    apps.push(app)
    fs.writeFileSync(DB_PATH, JSON.stringify(apps, null, 2))
}

export function updateApplication(id: string, updates: Partial<Application>) {
    const apps = getApplications()
    const index = apps.findIndex(a => a.id === id)
    if (index !== -1) {
        apps[index] = { ...apps[index], ...updates }
        fs.writeFileSync(DB_PATH, JSON.stringify(apps, null, 2))
    }
}

export function getJobs(): Job[] {
    if (!fs.existsSync(JOBS_PATH)) {
        const dir = path.dirname(JOBS_PATH)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(JOBS_PATH, JSON.stringify([]))
        return []
    }
    return JSON.parse(fs.readFileSync(JOBS_PATH, 'utf8'))
}

export function saveJob(job: Job) {
    const jobs = getJobs()
    jobs.push(job)
    fs.writeFileSync(JOBS_PATH, JSON.stringify(jobs, null, 2))
}
