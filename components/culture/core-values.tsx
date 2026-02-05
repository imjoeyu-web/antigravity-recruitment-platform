import { Cpu, Globe, Rocket, Sparkles } from 'lucide-react'

const VALUES = [
    {
        icon: Rocket,
        title: 'Progressive Innovation',
        description: 'We don’t just improve; we leap. We challenge the laws of physics to build what others call impossible.',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        icon: Globe,
        title: 'Universal Mobility',
        description: 'Mobility is a human right. We are expanding human reach beyond roads to every corner of the world.',
        color: 'bg-indigo-50 text-indigo-600',
    },
    {
        icon: Cpu,
        title: 'Collaborative Robotics',
        description: 'The future is not robots replacing humans, but robotics empowering humanity to achieve more.',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        icon: Sparkles,
        title: 'Sustainable Impact',
        description: 'Every move we make is a commitment to a carbon-neutral planet and a thriving future.',
        color: 'bg-emerald-50 text-emerald-600',
    },
]

export function CoreValues() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-20 space-y-4">
                    <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-sm block">Our DNA</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Core Values</h2>
                    <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
                        The principles that drive our vision for the next era of humanity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {VALUES.map((value, index) => (
                        <div
                            key={index}
                            className="group p-12 bg-gray-50 rounded-[40px] transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 border border-transparent hover:border-gray-100"
                        >
                            <div className={`w-16 h-16 rounded-3xl ${value.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <value.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{value.title}</h3>
                            <p className="text-lg text-gray-500 leading-relaxed font-light">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

