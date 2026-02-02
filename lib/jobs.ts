export interface Job {
    id: string
    title: string
    department: string
    location: string
    type: string
    description: string
    responsibilities: string[]
    requirements: string[]
}

export const ALL_JOBS: Job[] = [
    {
        id: '1',
        title: 'Robotics AI Researcher',
        department: 'Engineering',
        location: 'Seoul, KR',
        type: 'Full-time',
        description: 'Lead our efforts in developing intelligent, embodied AI systems for future mobility solutions.',
        responsibilities: [
            'Research and implement DRL algorithms for mobile robotics',
            'Optimize AI models for real-time execution on edge hardware',
            'Publish findings at top-tier conferences'
        ],
        requirements: [
            'Ph.D. in Robotics, AI, or related field',
            'Expertise in PyTorch and C++',
            'Experience with ROS2'
        ]
    },
    {
        id: '5',
        title: 'Data Scientist (Recruitment Analytics)',
        department: 'Data',
        location: 'Seoul, KR',
        type: 'Full-time',
        description: 'Analyze recruitment funnels and develop models to identify top talent from our talent pool.',
        responsibilities: [
            'Build models to predict candidate success based on historical data',
            'Develop real-time recruitment funnel dashboards in Tableau',
            'Automate reporting pipelines using n8n and Python'
        ],
        requirements: [
            'Master\'s or equivalent in Data Science, Statistics, or related field',
            'Strong proficiency in Python, SQL, and Tableau',
            'Experience with automation tools (e.g., n8n, Zapier)'
        ]
    },
    {
        id: '3',
        title: 'Autonomous Systems Engineer',
        department: 'Engineering',
        location: 'Seoul, KR',
        type: 'Full-time',
        description: 'Design and implement perception and planning systems for autonomous transit robots.',
        responsibilities: [
            'Develop SLAM and sensor fusion algorithms',
            'Implement path planning and obstacle avoidance logic',
            'Test systems in simulated and real-world environments'
        ],
        requirements: [
            'Degree in Aerospace, Mechanical, or Computer Engineering',
            'Strong background in Lidar and Computer Vision',
            'Proficiency in C++ and Python'
        ]
    }
]
