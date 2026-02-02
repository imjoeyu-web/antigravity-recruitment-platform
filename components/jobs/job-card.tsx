import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, Clock } from 'lucide-react'

interface JobCardProps {
    id: string
    title: string
    department: string
    location: string
    type: string
}

export function JobCard({ id, title, department, location, type }: JobCardProps) {
    return (
        <div className="group relative bg-white border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="text-sm font-medium text-blue-600 mb-2">{department}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            {location}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={16} />
                            {type}
                        </div>
                    </div>
                </div>
                <div>
                    <Link href={`/jobs/${id}`}>
                        <Button variant="outline" className="w-full md:w-auto">Apply Now</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
