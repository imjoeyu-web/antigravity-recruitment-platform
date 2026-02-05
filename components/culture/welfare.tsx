import { Check } from 'lucide-react'

const BENEFITS = [
    'Top-tier salary and equity package',
    'Flexible working hours & Remote-first culture',
    'Unlimited paid time off (we trust you)',
    'Latest MacBook Pro + Apple Display',
    'Comprehensive health & dental insurance',
    'Annual learning & development budget ($2k)',
    'Free lunch & dinner (when in office)',
    'Wellness programs & gym membership support',
]

export function Welfare() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                            We take care of you,<br />
                            so you can focus on <br />
                            <span className="text-blue-600">Great Work.</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            We believe that the best work happens when people feel supported, valued, and free from worry.
                            That's why we offer industry-leading benefits designed to support your life, not just your work.
                        </p>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                            <div className="space-y-6">
                                {BENEFITS.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check size={14} className="text-white" />
                                        </div>
                                        <span className="text-lg font-medium text-gray-800">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
