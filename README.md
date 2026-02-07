# 🚀 Antigravity

**Simple and brand-focused recruitment platform for startups and SMBs**

An all-in-one hiring solution that handles job posting, applicant management, and automated email notifications without complex ATS systems.

## 📋 Overview

Antigravity is a modern recruitment platform designed for startups and small-to-medium businesses that need professional hiring capabilities without the overhead of traditional ATS systems. Built with Next.js 16 and powered by Supabase, it provides an elegant solution for companies without dedicated HR teams.

### Key Features

- 🎯 **Job Posting & Applications**: Clean job listing pages with one-click applications
- 📊 **Applicant Management**: Kanban-style dashboard for tracking candidates
- 📧 **Automated Notifications**: Trigger-based emails at every stage of the hiring process
- 📈 **Email Logs**: Track all communications with detailed logging
- 🎨 **Brand-Focused**: Company culture pages integrated with job listings

## 🛠 Tech Stack

| Layer | Technology | Why? |
|-------|-----------|------|
| **Frontend** | Next.js 16 (App Router) | RSC support, Vercel optimization, SEO-friendly |
| **UI** | Tailwind CSS 4 | Rapid prototyping, easy customization |
| **Backend** | Next.js API Routes | Full-stack integration, no separate server needed |
| **Database** | Supabase (PostgreSQL) | Free tier, RLS security, real-time features |
| **Email** | Resend | Next.js native integration, React Email support |
| **Hosting** | Vercel | Next.js optimization, Edge Functions, auto-deploy |
| **Language** | TypeScript | Type safety, developer experience |

## 📁 Project Structure

```
antigravity/
├── app/
│   ├── (public)/          # Public pages
│   │   ├── jobs/          # Job listings
│   │   ├── company/       # Company info
│   │   └── culture/       # Culture pages
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities
│   ├── supabase/         # Database client
│   └── email/            # Email templates
└── types/                # TypeScript types
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase account
- Resend account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/imjoeyu-web/antigravity.git
cd antigravity
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend
RESEND_API_KEY=your_resend_key
```

4. **Set up database**

Run the SQL migrations in Supabase:
```sql
-- See /supabase/migrations/ folder
```

5. **Run the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🎯 Core Functionality

### Application Workflow

```
Applied → Screening → Interview → Hired
                              ↘ Rejected
```

### Automated Email Triggers

| Status Change | Email Type | Trigger |
|--------------|------------|---------|
| → applied | Application confirmation | Immediate |
| → interview | Interview invitation | On status change |
| → hired | Congratulations | On status change |
| → rejected | Rejection notice | On status change |

## 📊 Database Schema

### Main Tables

**jobs**
- Job postings with title, department, location, requirements

**applications**
- Applicant data with status tracking and JSONB payload for flexibility

**notification_logs**
- Complete email history with success/failure tracking

## 🔐 Security

- Row Level Security (RLS) via Supabase
- Service role key for admin operations
- Environment variables for sensitive data
- DKIM/SPF authentication via Resend

## 📈 Success Metrics

| Metric | Target |
|--------|--------|
| Application conversion rate | 5%+ |
| Email delivery success rate | 99%+ |
| Average time to hire | < 14 days |
| Admin satisfaction (NPS) | 50+ |

## 🗺 Roadmap

### ✅ Phase 1: MVP (Current)
- [x] Job listing & application
- [x] Admin applicant management
- [x] Automated status-based emails
- [x] Email logging

### 📋 Phase 2: Enhancement (Planned)
- [ ] Admin authentication (Supabase Auth)
- [ ] Email log dashboard
- [ ] Advanced search & filters
- [ ] Analytics dashboard

### 🚀 Phase 3: Expansion (Future)
- [ ] Multi-language support
- [ ] Custom email template editor
- [ ] Team collaboration features
- [ ] ATS integration API

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for startups that deserve great hiring tools**
