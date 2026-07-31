# 🔌 API Integration Documentation — RentNest

Complete mapping of frontend components/pages to backend API endpoints for the **RentNest** rental platform.

---

## 📌 Table of Contents

1. [Base Configuration](#-base-configuration)
2. [Auth Actions](#-auth-actions)
3. [Property Actions](#-property-actions)
4. [Rental Request Actions](#-rental-request-actions)
5. [Payment Actions](#-payment-actions)
6. [Review Actions](#-review-actions)
7. [Admin Actions](#-admin-actions)
8. [Cache Revalidation Strategy](#-cache-revalidation-strategy)
9. [Authentication Flow](#-authentication-flow)
10. [Role-Based Access](#-role-based-access)
11. [User Journeys](#-user-journeys)
12. [Environment Variables](#-environment-variables)

---

## 🌐 Base Configuration

**Backend Base URL:**
```env
BACKEND_API_URL=http://localhost:5000
# Production
BACKEND_API_URL=https://rent-nest-backend-sigma.vercel.app
```

**Authentication:** Cookie-based (`accessToken`, `refreshToken`)  
**Response Format:** JSON

### Standard Response Shapes

**Success:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description"
}
```

---

## 🔐 Auth Actions

**File:** `service/authActions.ts` (or similar)

### Endpoints Used

| Backend Endpoint | Method | Purpose |
|------------------|--------|---------|
| `/api/auth/login` | POST | User login (returns tokens) |
| `/api/users/register` | POST | User registration |

### Server Actions

| Function | Description | Redirects To |
|----------|-------------|--------------|
| `loginAction(prevState, formData)` | Logs in user, sets cookies, decodes JWT role | Role-based dashboard |
| `registerAction(payload)` | Registers user, auto-logins, redirects | Role-based dashboard |

### Frontend Mapping

| Component/Page | File | Action Used |
|----------------|------|-------------|
| Login Form | `app/(authGroup)/login/page.tsx` | `loginAction` |
| Register Form | `app/(authGroup)/register/page.tsx` | `registerAction` |

### Cookies Set

| Cookie Name | MaxAge | Purpose |
|-------------|--------|---------|
| `accessToken` | 24 hours | JWT for authentication |
| `refreshToken` | 7 days | Token refresh |

### Role-Based Redirection (post-login)

```typescript
if (decodedToken.role === "TENANT")   → redirect("/tenant-dashboard")
if (decodedToken.role === "LANDLORD") → redirect("/landlord-dashboard")
if (decodedToken.role === "ADMIN")    → redirect("/admin-dashboard")
```

---

## 🏠 Property Actions

**File:** `app/(dashboardGroup)/_actions/property.ts`

### Endpoints Used

| Backend Endpoint | Method | Purpose | Auth |
|------------------|--------|---------|------|
| `/api/properties` | POST | Create property | Landlord |
| `/api/properties/:id` | PUT | Update property | Landlord |
| `/api/properties/:id` | DELETE | Delete property | Landlord |
| `/api/properties/landlord/my-properties` | GET | Get landlord's properties | Landlord |

### Server Actions

| Function | Endpoint | Frontend Component |
|----------|----------|-------------------|
| `createProperty(prevState, formData)` | `POST /api/properties` | `PropertyFormDialog.tsx` (create mode) |
| `updateProperty(propertyId, prevState, formData)` | `PUT /api/properties/:id` | `PropertyFormDialog.tsx` (edit mode) |
| `deleteProperty(propertyId)` | `DELETE /api/properties/:id` | `DeletePropertyDialog.tsx` |
| `getMyProperties()` | `GET /api/properties/landlord/my-properties` | `landlord-dashboard/properties/page.tsx` |

### Payload Structure (Create/Update)

```typescript
{
  title: string
  description: string
  rentPerMonth: number
  location: string
  categoryId: string
  amenities: string[]     // comma-separated in form
  images: string[]        // comma-separated in form
  status: "AVAILABLE" | "PENDING" | "RENTED"
}
```

### Public Property Actions

**File:** `app/(publicGroup)/properties/_actions/`

| Function | Endpoint | Component |
|----------|----------|-----------|
| `getProperty({ query })` | `GET /api/properties?filters` | `PropertyList.tsx` |
| `getPropertyById(id)` | `GET /api/properties/:id` | `properties/[id]/page.tsx` |
| `getCategories()` | `GET /api/categories` | `PropertyFilters.tsx`, `PropertyFormDialog.tsx` |

### Query Filters Mapping

Frontend → Backend param names:

| Frontend Param | Backend Param |
|----------------|---------------|
| `searchTerm` | `searchTerm` |
| `location` | `location` |
| `type` | `categoryId` |
| `minPrice` | `minRent` |
| `maxPrice` | `maxRent` |
| `availability` | `status` (with value mapping) |

---

## 📋 Rental Request Actions

**File:** `app/(dashboardGroup)/_actions/rentalRequest.ts`

### Endpoints Used

| Backend Endpoint | Method | Purpose | Auth |
|------------------|--------|---------|------|
| `/api/rentals` | POST | Create rental request | Tenant |
| `/api/rentals` | GET | Get my rentals (role-aware) | Tenant/Landlord |
| `/api/rentals/:id` | GET | Get single rental | Tenant/Landlord |
| `/api/rentals/landlord/requests/:id` | PATCH | Approve/Reject | Landlord |
| `/api/rentals/admin/rentals` | GET | Admin: get all rentals | Admin |

### Server Actions

| Function | Endpoint | Frontend Component |
|----------|----------|-------------------|
| `createRentalRequest(payload)` | `POST /api/rentals` | `RequestToRentModal.tsx` |
| `getMyRentalRequests()` | `GET /api/rentals` | Landlord & Tenant dashboards |
| `getRentalRequestById(id)` | `GET /api/rentals/:id` | Single rental view |
| `updateRequestStatus(requestId, status)` | `PATCH /api/rentals/landlord/requests/:id` | `RequestActions.tsx` (Approve/Reject) |
| `adminGetAllRentals()` | `GET /api/rentals/admin/rentals` | Admin dashboard |

### Payload Structure

```typescript
{
  propertyId: string
  moveInDate: string        // ISO date
  durationMonths: number
  message?: string | null
}
```

### Status Flow

```
PENDING → APPROVED → PAYMENT_PENDING → ACTIVE → COMPLETED
                  → REJECTED
```

### Cache Tags

- `my-rental-requests`
- `landlord-requests`
- `admin-rentals`

---

## 💳 Payment Actions

**File:** `app/(dashboardGroup)/_actions/payment.ts`

### Endpoints Used

| Backend Endpoint | Method | Purpose | Auth |
|------------------|--------|---------|------|
| `/api/payments/create` | POST | Create Stripe checkout session | Tenant |
| `/api/payments` | GET | Get payments (role-aware) | Any |
| `/api/payments/:id` | GET | Get single payment | Any |
| `/api/payments/webhook` | POST | Stripe webhook | Stripe |

### Server Actions

| Function | Endpoint | Frontend Component |
|----------|----------|-------------------|
| `createCheckoutSession(rentalRequestId)` | `POST /api/payments/create` | `ProceedToPaymentButton.tsx` |
| `getMyPayments()` | `GET /api/payments` | Tenant, Landlord & Admin dashboards |
| `getPaymentById(paymentId)` | `GET /api/payments/:id` | Payment detail view |
| `refreshPayments()` | Cache revalidation only | `payment/success/page.tsx` |

### Payment Flow

```
1. Tenant clicks "Pay Now"
   → createCheckoutSession(rentalRequestId)
   → POST /api/payments/create
   → Backend returns { paymentUrl }
   
2. Frontend redirects to Stripe Checkout
   → window.location.href = paymentUrl

3. User pays on Stripe

4. Stripe redirects to /payment/success
   → refreshPayments() invalidates cache

5. Stripe fires webhook → POST /api/payments/webhook
   → Payment.status: PENDING → COMPLETED
   → Rental.status: PAYMENT_PENDING → ACTIVE
   → Property.status: PENDING → RENTED
```

### Cache Tags

- `my-payments`
- `my-rental-requests`

### Success/Cancel URLs

```typescript
success_url: `${APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`
cancel_url: `${APP_URL}/payment/cancel`
```

---

## ⭐ Review Actions

**File:** `app/(dashboardGroup)/_actions/review.ts`

### Endpoints Used

| Backend Endpoint | Method | Purpose | Auth |
|------------------|--------|---------|------|
| `/api/reviews` | POST | Create review | Tenant |
| `/api/reviews/property/:propertyId` | GET | Get property reviews | Public |

### Server Actions

| Function | Endpoint | Frontend Component |
|----------|----------|-------------------|
| `createReview(payload)` | `POST /api/reviews` | `ReviewFormDialog.tsx` |
| `getReviewsByProperty(propertyId)` | `GET /api/reviews/property/:id` | `PropertyReviews.tsx` |

### Payload Structure

```typescript
{
  propertyId: string
  rentalRequestId: string
  rating: number           // 1-5
  comment?: string | null
}
```

### Review Requirements (Backend Enforced)

- ✅ Rental status must be `ACTIVE` or `COMPLETED`
- ✅ Payment status must be `COMPLETED`
- ✅ Only one review per rental
- ✅ Only the tenant of that rental can review

### Response Structure (Get by Property)

```json
{
  "success": true,
  "data": {
    "reviews": [...],
    "averageRating": 4.5,
    "totalReviews": 10
  }
}
```

### Cache Tags

- `property-reviews-${propertyId}`
- `my-rental-requests`

---

## 🛡 Admin Actions

**File:** `app/(dashboardGroup)/_actions/admin.ts`

### Endpoints Used

| Backend Endpoint | Method | Purpose |
|------------------|--------|---------|
| `/api/admin/all-users` | GET | Get all users with filters |
| `/api/admin/users/:userId` | PATCH | Ban/Unban user |
| `/api/properties/admin/all` | GET | Get all properties |
| `/api/rentals/admin/rentals` | GET | Get all rentals |
| `/api/payments` | GET | Get all payments (admin sees all) |

### Server Actions

| Function | Endpoint | Frontend Component |
|----------|----------|-------------------|
| `adminGetAllUsers(query)` | `GET /api/admin/all-users` | `admin-dashboard/users/page.tsx` |
| `adminToggleUserStatus(userId, activeStatus)` | `PATCH /api/admin/users/:userId` | `UsersTable.tsx` (Ban/Unban button) |
| `adminGetAllProperties(query)` | `GET /api/properties/admin/all` | `admin-dashboard/properties/page.tsx` |
| `adminGetAllRentals()` | `GET /api/rentals/admin/rentals` | `admin-dashboard/rentals/page.tsx` |
| `adminGetAllPayments()` | `GET /api/payments` | Admin analytics |

### `adminGetAllUsers` Query Options

```typescript
{
  searchTerm?: string       // Search name/email
  role?: string             // TENANT | LANDLORD | ADMIN | "all"
  activeStatus?: string     // ACTIVE | BANNED | "all"
  page?: string             // Pagination
  limit?: string            // Items per page (default: 10)
}
```

### `adminGetAllProperties` Query Options

```typescript
{
  searchTerm?: string
  status?: string           // AVAILABLE | PENDING | RENTED | "all"
  page?: string             // Default limit: 12
}
```

### Cache Tags

- `admin-users`

---

## 🔄 Cache Revalidation Strategy

Using Next.js `revalidateTag()` for smart cache invalidation.

### Tag Reference

| Cache Tag | Invalidated By | Refreshes |
|-----------|---------------|-----------|
| `property` | Property CRUD | Public property listings |
| `my-properties` | Landlord CRUD | Landlord's property list |
| `my-rental-requests` | Rental create / status update | Tenant & Landlord dashboards |
| `landlord-requests` | Rental create / status update | Landlord incoming requests |
| `admin-rentals` | Admin operations | Admin rental view |
| `my-payments` | Payment success / cache refresh | Payment history |
| `property-reviews-${id}` | New review created | Property reviews section |
| `admin-users` | User ban/unban | Admin user list |

### Time-Based Revalidation

| Function | Revalidate Time |
|----------|----------------|
| `getMyRentalRequests()` | 60 seconds |
| `getMyPayments()` | 60 seconds |
| `getMyProperties()` | 24 hours |
| `getReviewsByProperty()` | 5 minutes |

---

## 🔒 Authentication Flow

```
┌────────────────────────────────────────────────────┐
│  1. User Registers                                 │
│     POST /api/users/register                       │
│                                                    │
│  2. Auto Login (inside registerAction)             │
│     POST /api/auth/login                           │
│     Returns: { accessToken, refreshToken }         │
│                                                    │
│  3. Cookies Set                                    │
│     - accessToken (24h, httpOnly, sameSite: lax)   │
│     - refreshToken (7d, httpOnly, sameSite: lax)   │
│                                                    │
│  4. JWT Decoded (role-based redirect)              │
│     - TENANT   → /tenant-dashboard                 │
│     - LANDLORD → /landlord-dashboard               │
│     - ADMIN    → /admin-dashboard                  │
│                                                    │
│  5. All API Calls                                  │
│     Cookie: accessToken=<jwt> automatically sent   │
└────────────────────────────────────────────────────┘
```

### JWT Payload Structure

```typescript
{
  userId: string
  email: string
  role: "TENANT" | "LANDLORD" | "ADMIN"
  iat: number
  exp: number
}
```

---

## 👥 Role-Based Access

| Role | Permissions |
|------|-------------|
| **PUBLIC** | View properties, view reviews, register/login |
| **TENANT** | Submit rental requests, make payments, write reviews |
| **LANDLORD** | Manage properties, approve/reject requests, view earnings |
| **ADMIN** | Full platform access, user management, moderation |

### Protected Routes

| Route Pattern | Required Role |
|---------------|---------------|
| `/tenant-dashboard/**` | TENANT |
| `/landlord-dashboard/**` | LANDLORD |
| `/admin-dashboard/**` | ADMIN |
| `/properties/**` (browse) | Public |
| `/payment/**` | Any authenticated |

---

## 🎯 User Journeys

### 🏘️ Tenant Journey

```
1. Register / Login                    → POST /api/users/register + auto login
2. Browse properties                   → GET /api/properties
3. View property details               → GET /api/properties/:id
4. Submit rental request               → POST /api/rentals
5. Wait for landlord approval          (Status: PENDING)
6. Landlord approves                   (Status: APPROVED)
7. Click "Pay Now"                     → POST /api/payments/create
8. Redirected to Stripe Checkout       
9. Complete payment                    → Webhook updates status
10. Rental becomes ACTIVE              (Auto via webhook)
11. Write review                       → POST /api/reviews
```

### 🏢 Landlord Journey

```
1. Register / Login                    → POST /api/users/register + auto login
2. Access dashboard                    → GET /api/properties/landlord/my-properties
3. Create property listing             → POST /api/properties
4. View incoming requests              → GET /api/rentals
5. Approve/Reject request              → PATCH /api/rentals/landlord/requests/:id
6. Tenant pays                         (Handled by tenant)
7. Track earnings                      → GET /api/payments
8. Update/Delete properties            → PUT/DELETE /api/properties/:id
```

### 🛡 Admin Journey

```
1. Login as admin                      → POST /api/auth/login
2. View platform analytics             → Multiple endpoints in parallel
3. Manage users                        → GET /api/admin/all-users
4. Ban/Unban user                      → PATCH /api/admin/users/:userId
5. Moderate properties                 → GET /api/properties/admin/all
6. Monitor all rentals                 → GET /api/rentals/admin/rentals
7. Track platform revenue              → GET /api/payments
```

---

## 🛠 Environment Variables

**Frontend (`.env.local`):**
```env
# Backend API
BACKEND_API_URL=http://localhost:5000

# App URL (for Stripe redirect)
APP_URL=http://localhost:3000

# Stripe (Public)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

**Backend (referenced):**
```env
# Server
PORT=5000
APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://...

# JWT
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

---

## 🔥 Common Endpoints Quick Reference

### Public Endpoints (No Auth)
```
GET  /api/properties                    - Browse properties
GET  /api/properties/:id                - Property details
GET  /api/categories                    - Categories list
GET  /api/reviews/property/:id          - Property reviews
POST /api/users/register                - Register
POST /api/auth/login                    - Login
```

### Tenant Endpoints
```
POST  /api/rentals                      - Create rental request
GET   /api/rentals                      - My requests
POST  /api/payments/create              - Start payment
GET   /api/payments                     - My payment history
POST  /api/reviews                      - Create review
```

### Landlord Endpoints
```
POST   /api/properties                            - Create property
PUT    /api/properties/:id                        - Update property
DELETE /api/properties/:id                        - Delete property
GET    /api/properties/landlord/my-properties     - My properties
GET    /api/rentals                               - Incoming requests
PATCH  /api/rentals/landlord/requests/:id         - Approve/Reject
GET    /api/payments                              - My earnings
```

### Admin Endpoints
```
GET   /api/admin/all-users              - All users
PATCH /api/admin/users/:userId          - Ban/Unban
GET   /api/properties/admin/all         - All properties
GET   /api/rentals/admin/rentals        - All rentals
GET   /api/payments                     - All payments
```

---

## 📊 TypeScript Types

**File:** `lib/types.ts`

Key types used across actions:

```typescript
type IRole = "TENANT" | "LANDLORD" | "ADMIN"

type IActiveStatus = "ACTIVE" | "BANNED"

type IPropertyStatus = "AVAILABLE" | "PENDING" | "RENTED"

type IRentalRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "PAYMENT_PENDING"
  | "ACTIVE"
  | "COMPLETED"

type IPaymentStatus = "PENDING" | "COMPLETED" | "FAILED"

type ActionState = {
  success: boolean
  message?: string
  data?: any
}
```

---

## 🐛 Troubleshooting

| Issue | Likely Cause | Solution |
|-------|-------------|----------|
| "Route not found" | Wrong endpoint URL | Check `BACKEND_API_URL` + path |
| "Not authenticated" | Missing/expired cookie | Login again |
| "User not logged in!" | Cookie not set/passed | Check `credentials: include` |
| Filter not working | Param name mismatch | Match frontend → backend params |
| Payment stuck in PENDING | Webhook not firing | Use `stripe listen` locally |
| Review submit fails | Status/payment checks | Rental must be ACTIVE, Payment COMPLETED |
| Cache not updating | Missing `revalidateTag` | Add tag to action + fetch |
| "Payment must be COMPLETED" | Webhook not processed | Check Stripe webhook config |

---


```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# 3. Run development server
npm run dev

# 4. (Optional) Stripe webhook testing
stripe listen --forward-to localhost:5000/api/payments/webhook
```


```
rent-nest-frontend/
├── app/
│   ├── (authGroup)/
│   │   ├── login/page.tsx              → loginAction
│   │   └── register/page.tsx           → registerAction
│   │
│   ├── (publicGroup)/
│   │   ├── properties/
│   │   │   ├── page.tsx                → getProperty
│   │   │   ├── [id]/page.tsx           → getPropertyById
│   │   │   ├── _actions/
│   │   │   │   ├── getProperty.ts
│   │   │   │   ├── getPropertyById.ts
│   │   │   │   └── getCategories.ts
│   │   │   └── _components/
│   │   │       ├── property/
│   │   │       │   ├── PropertyList.tsx
│   │   │       │   ├── PropertyCard.tsx
│   │   │       │   ├── PropertySearchBar.tsx
│   │   │       │   ├── PropertyFilters.tsx
│   │   │       │   ├── PropertyImageGallery.tsx
│   │   │       │   ├── PropertyInfo.tsx
│   │   │       │   ├── LandlordCard.tsx
│   │   │       │   ├── PropertyReviews.tsx
│   │   │       │   └── RequestToRentModal.tsx  → createRentalRequest
│   │   │
│   │   └── payment/
│   │       ├── success/page.tsx        → refreshPayments
│   │       └── cancel/page.tsx
│   │
│   └── (dashboardGroup)/
│       ├── layout.tsx                  → getMe (auth check)
│       ├── _actions/
│       │   ├── property.ts             → CRUD properties
│       │   ├── rentalRequest.ts        → Rental operations
│       │   ├── payment.ts              → Payment operations
│       │   ├── review.ts               → Review operations
│       │   └── admin.ts                → Admin operations
│       │
│       ├── _components/
│       │   ├── property/
│       │   │   ├── PropertyFormDialog.tsx      → create/update
│       │   │   ├── DeletePropertyDialog.tsx    → delete
│       │   │   ├── MyPropertyCard.tsx
│       │   │   └── MyPropertyList.tsx
│       │   ├── request/
│       │   │   ├── RequestsTable.tsx
│       │   │   └── RequestActions.tsx          → updateRequestStatus
│       │   ├── tenant/
│       │   │   ├── TenantRequestsTable.tsx
│       │   │   ├── ProceedToPaymentButton.tsx  → createCheckoutSession
│       │   │   ├── PaymentsTable.tsx
│       │   │   └── ReviewFormDialog.tsx        → createReview
│       │   ├── landlord/
│       │   │   └── EarningsTable.tsx
│       │   └── admin/
│       │       └── UsersTable.tsx              → adminToggleUserStatus
│       │
│       ├── landlord-dashboard/
│       │   ├── page.tsx                → getMyProperties, getMyRentalRequests
│       │   ├── properties/page.tsx
│       │   ├── requests/page.tsx
│       │   └── earnings/page.tsx       → getMyPayments
│       │
│       ├── tenant-dashboard/
│       │   ├── page.tsx
│       │   ├── requests/page.tsx
│       │   ├── payments/page.tsx       → getMyPayments
│       │   └── reviews/page.tsx
│       │
│       └── admin-dashboard/
│           ├── page.tsx                → All admin actions
│           ├── users/page.tsx          → adminGetAllUsers
│           ├── properties/page.tsx     → adminGetAllProperties
│           └── rentals/page.tsx        → adminGetAllRentals
│
├── components/shared/
│   ├── navbar.tsx                      → getMe, logout
│   └── DashboardSidebar.tsx
│
├── service/
│   ├── getMe.ts
│   └── logout.ts
│
├── lib/
│   └── types.ts
│
├── API_INTEGRATION.md                  ← This file
└── README.md
```

---

## 🎯 Contributing Guidelines

When adding new features:

1. **Backend first:** Create the endpoint & document its signature
2. **Create server action** in appropriate `_actions/` folder
3. **Update this doc:** Add the endpoint & mapping
4. **Add cache tags** if the data needs revalidation
5. **Test with proper role** — verify auth/permission checks
6. **Handle loading & error states** in UI components

---

## 📝 Version History

- **v1.0.0** — Initial API integration setup
- Complete auth, property, rental, payment, review, admin flows
- Cookie-based JWT authentication
- Stripe payment integration with webhooks

---

**Last Updated:** 2026-01  
**Maintained by:** Zisan Ul Haque  
**Project:** RentNest — Property Rental Platform