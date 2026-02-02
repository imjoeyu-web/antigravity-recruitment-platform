import { Search, UserPlus, Code2, ClipboardCheck, Sparkles } from 'lucide-react'

const PROCESS_STEPS = [
    {
        icon: Search,
        title: "Search & Apply",
        desc: "Find a role that matches your passion and submit your story."
    },
    {
        icon: UserPlus,
        title: "Initial Interview",
        desc: "A brief conversation to align on vision and expectations."
    },
    {
        icon: Code2,
        title: "Technical Review",
        desc: "Showcase your expertise through a deep dive session."
    },
    {
        icon: ClipboardCheck,
        title: "Culture Fit",
        desc: "Meeting with the team to see if our values harmonize."
    },
    {
        icon: Sparkles,
        title: "Joining",
        desc: "Onboarding into the AntiGravity mission."
    }
]

export function RecruitProcess() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Our Recruitment Process</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
                        We value transparency and speed. Here's how we find and welcome our newest members.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Connection lines (visible on desktop) */}
                    <div className="hidden md:block absolute top-[40px] left-0 right-0 h-px bg-gray-200 z-0"></div>

                    {PROCESS_STEPS.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center text-center space-y-6">
                            <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-blue-600">
                                <step.icon size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                            <div className="md:hidden w-px h-8 bg-gray-200"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
