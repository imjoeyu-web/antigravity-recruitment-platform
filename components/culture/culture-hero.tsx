export function CultureHero() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
            {/* Immersive background decoration */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px] animate-pulse delay-700"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#0a0a0a]"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-white/5 backdrop-blur-md text-gray-300 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Join the Movement
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                        INSPIRATION <br />
                        <span className="text-gray-500">THROUGH MOTION.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                        We are looking for visionaries who want to redefine the limits of transport and physics.
                        Your journey to the future starts here.
                    </p>

                    <div className="pt-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700">
                        <div className="w-px h-24 bg-gradient-to-b from-blue-500 to-transparent mx-auto"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
