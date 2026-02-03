import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

interface JobCardProps {
    id: string
    title: string
    department: string
    location: string
    type: string
}

export function JobCard({ id, title, department, location, type }: JobCardProps) {
    return (
        <Link href={`/jobs/${id}`}>
            <div className="group bg-white border border-stone-100 rounded-xl p-6 hover:border-stone-300 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">
                            {department}
                        </div>
                        <h3 className="text-lg font-medium text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-stone-500 font-light">
                            <div className="flex items-center gap-1.5">
                                <MapPin size={14} />
                                {location}
                            </div>
                            <div className="text-stone-300">•</div>
                            <div>{type}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-stone-400 group-hover:text-stone-900 group-hover:gap-3 transition-all duration-300">
                        <span className="text-sm font-medium">View role</span>
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </Link>
    )
}
