import { Cpu, Plane, Shield, Zap } from 'lucide-react'

export function CompanyHero() {
    return (
        <section className="relative min-h-[60vh] flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
                <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-sm animate-pulse">Vision 2045</span>
                <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter italic">
                    COMPANY
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light">
                    Progress for Humanity through <span className="text-white font-medium">Infinite Motion.</span>
                </p>
            </div>
        </section>
    )
}

export function BrandPhilosophy() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            Inspiration <br />
                            through <span className="text-blue-600">Movement.</span>
                        </h2>
                        <p className="text-xl text-gray-600 font-light leading-relaxed">
                            At AntiGravity, motion is the core of our brand. We believe that movement
                            brings new inspiration, and inspiration drives human progress.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-3xl space-y-8">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Innovation</h4>
                                <p className="text-gray-500 text-sm">Challenging the physical limits of mobility.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Trust</h4>
                                <p className="text-gray-500 text-sm">Building a future that is safe for everyone.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function BusinessAreas() {
    return (
        <section className="py-24 bg-[#0a0a0a] text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl font-black italic tracking-tight">STRATEGIC PILLARS</h2>
                    <p className="text-gray-400 font-light">The core technologies shaping our tomorrow.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="group p-10 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-500">
                        <Cpu className="text-blue-500 mb-8 group-hover:scale-110 transition-transform" size={48} />
                        <h3 className="text-2xl font-bold mb-4 tracking-tight">Intelligent Robotics</h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                            Developing AI-driven humanoid and service robots that collaborate with humans
                            in manufacturing, logistics, and healthcare.
                        </p>
                    </div>

                    <div className="group p-10 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-500">
                        <Plane className="text-blue-500 mb-8 group-hover:scale-110 transition-transform" size={48} />
                        <h3 className="text-2xl font-bold mb-4 tracking-tight">UAM (Urban Air Mobility)</h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                            Creating the next dimension of transport through clean, autonomous
                            electric vertical take-off and landing (eVTOL) aircraft.
                        </p>
                    </div>

                    <div className="group p-10 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-500">
                        <Zap className="text-blue-500 mb-8 group-hover:scale-110 transition-transform" size={48} />
                        <h3 className="text-2xl font-bold mb-4 tracking-tight">Smart Mobility</h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                            Redefining the car as a living space through software-defined vehicles
                            and zero-emission propulsion systems.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

