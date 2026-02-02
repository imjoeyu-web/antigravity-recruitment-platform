export function VisionSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <div className="space-y-4">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Our Mission</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            Movement that Defines <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">The Next Era of Humanity</span>
                        </h2>
                    </div>

                    <p className="text-xl text-gray-600 leading-relaxed font-light">
                        AntiGravity is not just about technology; it's about shifting the paradigm of how we live, move, and connect.
                        Inspired by the philosophy of "Inspiration through Movement," we are building solutions that transcend physical limits.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                        <div className="p-8 border-l border-gray-100 text-left space-y-4">
                            <h3 className="text-4xl font-black text-blue-100">01</h3>
                            <h4 className="text-xl font-bold text-gray-900">Innovation</h4>
                            <p className="text-gray-500 text-sm">Beyond the conventional, we seek gravity-defying solutions.</p>
                        </div>
                        <div className="p-8 border-l border-gray-100 text-left space-y-4">
                            <h3 className="text-4xl font-black text-blue-100">02</h3>
                            <h4 className="text-xl font-bold text-gray-900">Inspiration</h4>
                            <p className="text-gray-500 text-sm">Creating moments that spark creativity in everyone.</p>
                        </div>
                        <div className="p-8 border-l border-gray-100 text-left space-y-4">
                            <h3 className="text-4xl font-black text-blue-100">03</h3>
                            <h4 className="text-xl font-bold text-gray-900">Sustainability</h4>
                            <p className="text-gray-500 text-sm">Building a future that lasts for generations to come.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
