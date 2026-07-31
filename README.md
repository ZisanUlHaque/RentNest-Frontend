<div align="center">

# 🏠 RentNest — Rental Property Platform

### *Find & List Rental Properties with Ease*

A modern, full-stack rental marketplace connecting landlords with tenants through secure payments, real-time analytics, and role-based dashboards.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Stripe](https://img.shields.io/badge/Stripe-Integrated-635BFF?style=for-the-badge&logo=stripe)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)

[🌐 Live Demo](https://rent-nest-frontend.vercel.app) • [📘 API Docs](./API_INTEGRATION.md) • [🔗 Backend Repo](https://github.com/yourusername/rent-nest-backend)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [User Roles](#-user-roles)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Key Routes](#-key-routes)
- [User Journeys](#-user-journeys)
- [API Integration](#-api-integration)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**RentNest** is a modern, responsive Next.js 16 application for a rental property marketplace. It provides:

- **For Tenants:** Browse and rent properties with advanced filters and secure Stripe payments
- **For Landlords:** List properties, manage requests, and track earnings with analytics dashboards
- **For Admins:** Full platform oversight with user management and content moderation

Built with a focus on **performance**, **UX**, and **enterprise-level design patterns**.

---

## ✨ Features

### 🌍 Public Features
- ✅ **Responsive property grid** with optimized images (`next/image`)
- ✅ **Advanced search & filters** — location, price range, property type, amenities, availability
- ✅ **Real-time URL-based filtering** with debounced search
- ✅ **Property details page** with image gallery lightbox
- ✅ **Landlord info card** with contact options
- ✅ **Reviews & ratings** section per property
- ✅ **Loading skeletons** & graceful error states
- ✅ **Fully responsive** design across all devices
- ✅ **Dark mode support** with automatic theme switching

### 🏘️ Tenant Features
- ✅ Registration and login with **validation**
- ✅ Interactive **"Request to Rent" modal** with cost calculator
- ✅ **Stripe Checkout** integration for secure payments
- ✅ Dedicated `/payment/success` and `/payment/cancel` pages
- ✅ **Tenant dashboard** with:
  - Rental request history with status badges
  - Payment history table
  - Reviews management
- ✅ **Star rating review form** with password strength meter
- ✅ Real-time status updates via cache revalidation

### 🏢 Landlord Features
- ✅ **Premium analytics dashboard** with:
  - Revenue trends chart (Recharts)
  - Occupancy rate gauge
  - Top performing properties leaderboard
  - Recent activity timeline
- ✅ **Property CRUD** with image URL uploads
- ✅ **Availability toggle** switch
- ✅ **Incoming requests table** with Approve/Reject actions
- ✅ **Earnings tracker** with monthly filtering
- ✅ Toast notifications for all actions

### 🛡️ Admin Features
- ✅ **Platform-wide analytics** dashboard with:
  - Revenue analytics chart
  - User growth trends
  - Role distribution pie chart
  - Rental funnel visualization
  - Platform health metrics
  - Top landlords leaderboard
- ✅ **User management** with search, filter, pagination
- ✅ **Ban/Unban** users with confirmation
- ✅ **Content moderation** — view all properties and rentals
- ✅ **Real-time activity feed**

---

## 🛠️ Tech Stack

### Frontend
| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui + Radix UI |
| **State Management** | React Server Components + useActionState |
| **Charts** | Recharts |
| **Forms** | React Hook Form + Zod (optional) |
| **Icons** | Lucide React |
| **Toasts** | Sonner |
| **Payment** | Stripe Checkout |
| **JWT** | jsonwebtoken |

### Backend (Consumed)
| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js + Express |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Auth** | JWT (Cookie-based) |
| **Payment** | Stripe + Webhooks |

---

## 👥 User Roles

| Role | Description | Frontend Capabilities |
|------|-------------|----------------------|
| **🏠 Tenant** | Users looking for rental properties | Browse listings, submit requests, make payments, write reviews, view rental history |
| **🏢 Landlord** | Property owners who list rentals | Create/manage properties, approve/reject requests, track earnings, view analytics |
| **🛡️ Admin** | Platform moderators | Full oversight, user management, content moderation, platform analytics |

**Role Selection:** Users choose their role during registration. UI dynamically adapts based on the authenticated user's role. Routes are protected using **Next.js Middleware**.

---

## 📸 Screenshots

<details>
<summary>Click to expand screenshots</summary>

### Home Page
![Home](./screenshots/home.png)

### Property Listings with Filters
![Properties](./screenshots/properties.png)

### Property Details
![Details](./screenshots/details.png)

### Landlord Analytics Dashboard
![Landlord Dashboard](./screenshots/landlord-dashboard.png)

### Admin Analytics Dashboard
![Admin Dashboard](./screenshots/admin-dashboard.png)

### Tenant Dashboard
![Tenant Dashboard](./screenshots/tenant-dashboard.png)

### Payment Flow
![Payment](./screenshots/payment.png)

</details>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0+ 
- **npm** or **yarn** or **pnpm**
- Access to the **RentNest Backend API** (running locally or deployed)
- **Stripe Account** for payment integration

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rent-nest-frontend.git
   cd rent-nest-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your values (see [Environment Variables](#-environment-variables))

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### First Time Setup

After running the app:

1. **Register** as a Tenant, Landlord, or Admin
2. **Login** to access role-specific dashboards
3. If registering as a **Landlord**, add your first property from the dashboard
4. If registering as a **Tenant**, browse properties and submit requests

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
# Backend API URL
BACKEND_API_URL=http://localhost:5000
# Production: https://rent-nest-backend.vercel.app

# App URL (for Stripe redirect callbacks)
APP_URL=http://localhost:3000

# Stripe (optional, for client-side features)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
```

**Backend `.env` (referenced):**

```env
PORT=5000
APP_URL=http://localhost:3000
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

---

## 📁 Project Structure

```
rent-nest-frontend/
├── app/
│   ├── (authGroup)/                  # Auth routes (login, register)
│   │   ├── login/
│   │   └── register/
│   │
│   ├── (publicGroup)/                # Public routes
│   │   ├── page.tsx                  # Home page
│   │   ├── properties/               # Property browsing
│   │   │   ├── page.tsx
│   │   │   ├── [id]/                 # Property details
│   │   │   ├── _actions/             # Server actions
│   │   │   └── _components/          # UI components
│   │   ├── contact/                  # Contact page
│   │   ├── services/                 # Services page
│   │   └── payment/                  # Payment pages
│   │       ├── success/
│   │       └── cancel/
│   │
│   ├── (dashboardGroup)/             # Protected dashboard routes
│   │   ├── layout.tsx                # Dashboard layout with sidebar
│   │   ├── _actions/                 # All server actions
│   │   │   ├── property.ts
│   │   │   ├── rentalRequest.ts
│   │   │   ├── payment.ts
│   │   │   ├── review.ts
│   │   │   ├── admin.ts
│   │   │   └── profile.ts
│   │   ├── _components/              # Dashboard components
│   │   ├── profile/                  # User profile page
│   │   ├── tenant-dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── requests/
│   │   │   ├── payments/
│   │   │   └── reviews/
│   │   ├── landlord-dashboard/
│   │   │   ├── page.tsx              # Analytics dashboard
│   │   │   ├── properties/
│   │   │   ├── requests/
│   │   │   ├── earnings/
│   │   │   └── _components/analytics/
│   │   └── admin-dashboard/
│   │       ├── page.tsx              # Platform analytics
│   │       ├── users/
│   │       ├── properties/
│   │       ├── rentals/
│   │       └── _components/analytics/
│   │
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles + theme
│
├── components/
│   ├── shared/
│   │   ├── navbar.tsx
│   │   └── DashboardSidebar.tsx
│   └── ui/                           # shadcn/ui components
│
├── lib/
│   ├── types.ts                      # TypeScript types
│   └── utils.ts                      # Utility functions
│
├── service/
│   ├── getMe.ts                      # Get current user
│   └── logout.ts                     # Logout action
│
├── public/                           # Static assets
│
├── middleware.ts                     # Route protection
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies
├── API_INTEGRATION.md                # API documentation
└── README.md                         # This file
```

---

## 🛣️ Key Routes

### Public Routes
| Route | Description |
|-------|-------------|
| `/` | Home page with featured properties |
| `/properties` | Browse & filter properties |
| `/properties/[id]` | Property details with reviews |
| `/services` | Services showcase |
| `/contact` | Contact form |
| `/payment/success` | Payment success page |
| `/payment/cancel` | Payment cancelled page |

### Auth Routes
| Route | Description |
|-------|-------------|
| `/login` | User login |
| `/register` | User registration with role selection |

### Tenant Routes (Protected)
| Route | Description |
|-------|-------------|
| `/tenant-dashboard` | Overview with stats |
| `/tenant-dashboard/requests` | Rental request history |
| `/tenant-dashboard/payments` | Payment history |
| `/tenant-dashboard/reviews` | Reviews given |

### Landlord Routes (Protected)
| Route | Description |
|-------|-------------|
| `/landlord-dashboard` | Analytics overview |
| `/landlord-dashboard/properties` | Manage properties |
| `/landlord-dashboard/requests` | Incoming requests |
| `/landlord-dashboard/earnings` | Earnings tracker |

### Admin Routes (Protected)
| Route | Description |
|-------|-------------|
| `/admin-dashboard` | Platform analytics |
| `/admin-dashboard/users` | User management |
| `/admin-dashboard/properties` | Content moderation |
| `/admin-dashboard/rentals` | All rentals view |

### Common Protected Route
| Route | Description |
|-------|-------------|
| `/profile` | User profile & settings |

---

## 🎯 User Journeys

### 🏠 Tenant Journey

```
1. Register/Login              → Role: TENANT selected
2. Browse Properties           → Apply filters
3. View Property Details       → Read description, view images
4. Submit Rental Request       → Fill form (dates, duration, message)
5. Wait for Approval           → Status: PENDING (Yellow badge)
6. Landlord Approves           → Status: APPROVED (Blue badge)
7. Click "Pay Now"             → Redirected to Stripe Checkout
8. Complete Payment            → Redirected to /payment/success
9. Rental Activated            → Status: ACTIVE (Green badge)
10. Leave Review               → Star rating + comment
```

### 🏢 Landlord Journey

```
1. Register/Login              → Role: LANDLORD selected
2. Dashboard Overview          → View stats & analytics
3. Add Property                → Fill form (title, images, rent)
4. Receive Requests            → Notification via dashboard
5. Approve/Reject              → Toast: "Request Approved"
6. Tenant Pays                 → Webhook updates status
7. Track Earnings              → Monthly revenue chart
8. Manage Properties           → Edit/Delete listings
```

### 🛡️ Admin Journey

```
1. Login as Admin              → Access full platform
2. View Platform Analytics     → Revenue, users, properties
3. Manage Users                → Search, filter, ban/unban
4. Moderate Content            → View all properties
5. Monitor Rentals             → Track all transactions
6. Handle Reports              → Take action on issues
```

---

## 🔌 API Integration

Complete API mapping is documented in **[API_INTEGRATION.md](./API_INTEGRATION.md)**.

### Backend Endpoints Consumed

**Auth:**
- `POST /api/auth/login`
- `POST /api/users/register`

**Users:**
- `GET /api/users/me`
- `PUT /api/users/my-profile`
- `GET /api/users/all-users` (Admin)
- `PATCH /api/users/users/:id` (Admin)

**Properties:**
- `GET /api/properties` (with filters)
- `GET /api/properties/:id`
- `POST /api/properties` (Landlord)
- `PUT /api/properties/:id` (Landlord)
- `DELETE /api/properties/:id` (Landlord)
- `GET /api/properties/landlord/my-properties`
- `GET /api/properties/admin/all` (Admin)

**Rentals:**
- `POST /api/rentals`
- `GET /api/rentals`
- `PATCH /api/rentals/landlord/requests/:id`
- `GET /api/rentals/admin/rentals` (Admin)

**Payments:**
- `POST /api/payments/create`
- `GET /api/payments`
- `POST /api/payments/webhook` (Stripe)

**Reviews:**
- `POST /api/reviews`
- `GET /api/reviews/property/:id`

**Categories:**
- `GET /api/categories`

---

## 💻 Development

### Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint
npm run lint

# Format with Prettier
npm run format
```

### Development Workflow

1. **Create a new feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the existing code patterns

3. **Test locally** with different user roles

4. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style

- Use **TypeScript** for all files
- Follow **Next.js App Router** conventions
- Use **Server Components** by default, `"use client"` only when needed
- Use **`revalidateTag`** for cache invalidation after mutations
- Use **shadcn/ui** components for consistency
- Follow **Tailwind CSS** utility-first approach

### Stripe Webhook Testing (Local)

For local development, use Stripe CLI:

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to your local backend
stripe listen --forward-to localhost:5000/api/payments/webhook
```

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel**
   ```
   https://vercel.com/new
   ```

3. **Import your repository**

4. **Add environment variables** in Vercel dashboard:
   - `BACKEND_API_URL`
   - `APP_URL`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

5. **Deploy!**

### Deploy Backend

Ensure your backend is deployed and accessible:
- Update `BACKEND_API_URL` in frontend `.env`
- Update `APP_URL` in backend `.env`
- Configure **Stripe webhook** endpoint to point to production URL:
  ```
  https://your-backend.vercel.app/api/payments/webhook
  ```

### Post-Deployment Checklist

- [ ] Test authentication flow
- [ ] Test property creation & listing
- [ ] Test complete payment flow with Stripe test cards
- [ ] Verify webhook is receiving events
- [ ] Test all 3 roles (Tenant, Landlord, Admin)
- [ ] Check responsive design on mobile
- [ ] Verify dark mode toggle
- [ ] Test image loading from external sources
- [ ] Check SEO metadata

---

## 🎨 Design System

### Color Palette

Primary theme uses **OKLCH color space** with:
- **Primary:** Warm orange (`oklch(0.553 0.195 38.402)`)
- **Background:** Pure white / dark mode adaptive
- **Success:** Emerald
- **Warning:** Amber
- **Destructive:** Red

### Typography

- **Font:** System sans-serif with Next.js font optimization
- **Headings:** Bold, tracking-tight
- **Body:** Regular weight, leading-relaxed

### Components

Built with **shadcn/ui** for consistency:
- Cards, Buttons, Inputs, Dialogs, Dropdowns
- Tables, Badges, Avatars
- Select, Switch, Checkbox, Textarea
- Toast (Sonner)

---

## 📊 Rental Request Status (UI Badges)

| Status | Badge Color | Meaning |
|--------|-------------|---------|
| **PENDING** | 🟡 Yellow | Awaiting landlord review |
| **APPROVED** | 🔵 Blue | Ready for payment (shows "Pay Now") |
| **PAYMENT_PENDING** | 🟠 Orange | Payment in progress |
| **REJECTED** | 🔴 Red | Request declined |
| **ACTIVE** | 🟢 Green | Rental active (shows "Leave Review") |
| **COMPLETED** | ⚫ Gray | Rental period ended |

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **"Route not found"** | Check `BACKEND_API_URL` in `.env.local` |
| **Not authenticated errors** | Clear cookies and login again |
| **Filter not working** | Verify frontend param names match backend |
| **Payment stuck in PENDING** | Check Stripe webhook configuration |
| **Images not loading** | Add hostname to `next.config.ts` `remotePatterns` |
| **Hydration errors** | Ensure no nested `<button>` elements |
| **Dark mode issues** | Use CSS variables, avoid hard-coded colors |
| **Cache not updating** | Verify `revalidateTag` calls in actions |

### Debug Mode

Add debug logs to server actions:

```ts
console.log("📤 Request:", payload)
console.log("📥 Response:", result)
```

Then check the **terminal (server console)** for output.

---

## 🎓 Learning Resources

- 📖 [Next.js 15 Documentation](https://nextjs.org/docs)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com)
- 🧩 [shadcn/ui Components](https://ui.shadcn.com)
- 💳 [Stripe Checkout Guide](https://stripe.com/docs/checkout)
- 📊 [Recharts Documentation](https://recharts.org)
- 🔷 [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Update documentation as needed
- Add tests for new features
- Ensure all TypeScript checks pass
- Test with all user roles

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 Author

**Zisan Ul Haque**

- 🌐 Portfolio: [yourportfolio.com](https://yourportfolio.com)
- 💼 LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- 🐦 Twitter: [@yourhandle](https://twitter.com/yourhandle)
- 📧 Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org) for the amazing framework
- [Vercel](https://vercel.com) for seamless deployment
- [shadcn](https://ui.shadcn.com) for beautiful components
- [Stripe](https://stripe.com) for payment infrastructure
- All the open-source contributors who made this possible

---

## 📈 Project Status

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Last Updated:** January 2026

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ using Next.js 16 and TypeScript

**[⬆ Back to Top](#-rentnest--rental-property-platform)**

</div>