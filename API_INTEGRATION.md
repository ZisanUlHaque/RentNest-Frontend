# 🔌 API Integration Documentation

Complete mapping of frontend components/pages to backend API endpoints for **RentNest** platform.

---

## 📌 Table of Contents

1. [Base Configuration](#base-configuration)
2. [Authentication Endpoints](#authentication-endpoints)
3. [User Endpoints](#user-endpoints)
4. [Property Endpoints](#property-endpoints)
5. [Category Endpoints](#category-endpoints)
6. [Rental Request Endpoints](#rental-request-endpoints)
7. [Payment Endpoints](#payment-endpoints)
8. [Review Endpoints](#review-endpoints)
9. [Admin Endpoints](#admin-endpoints)
10. [Server Actions Overview](#server-actions-overview)

---

## 🌐 Base Configuration

**Backend Base URL:**
```env
BACKEND_API_URL=http://localhost:5000
# Production
BACKEND_API_URL=https://rent-nest-backend-sigma.vercel.app
```

**Authentication:** Cookie-based (`accessToken`)  
**Response Format:** JSON

**Standard Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Standard Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🔐 Authentication Endpoints

Base path: `/api/auth`

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/auth/register` | Register new user |  Public |
| POST | `/api/auth/login` | Login user |  Public |
| POST | `/api/auth/logout` | Logout user |  Any |

### Frontend Mapping

| Component/Page | File | Endpoint Used |
|----------------|------|---------------|
| Register Page | `app/(authGroup)/register/page.tsx` | `POST /api/auth/register` |
| Login Page | `app/(authGroup)/login/page.tsx` | `POST /api/auth/login` |
| Navbar Logout | `components/shared/navbar.tsx` | `POST /api/auth/logout` |

**Server Actions:** `service/logout.ts`, `service/register.ts`, `service/login.ts`

---

## 👤 User Endpoints

Base path: `/api/users`

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/api/users/me` | Get current user profile | Any |
| GET | `/api/users` | Get all users |  Admin |
| PATCH | `/api/users/:id/status` | Ban/Unban user |  Admin |

### Frontend Mapping

| Component/Page | File | Endpoint |
|----------------|------|----------|
| Navbar (get user) | `components/shared/navbar.tsx` | `GET /api/users/me` |
| Admin Users Page | `app/(dashboardGroup)/admin-dashboard/users/page.tsx` | `GET /api/users` |
| Ban/Unban Button | `_components/admin/UsersTable.tsx` | `PATCH /api/users/:id/status` |

**Server Actions:** `service/getMe.ts`, `_actions/admin.ts`

---

## 🏠 Property Endpoints

Base path: `/api/properties`

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/api/properties` | Get all properties (with filters) |  Public |
| GET | `/api/properties/:propertyId` | Get single property |  Public |
| POST | `/api/properties` | Create property |  Landlord |
| PUT | `/api/properties/:propertyId` | Update property |  Landlord |
| DELETE | `/api/properties/:propertyId` | Delete property |  Landlord |
| GET | `/api/properties/landlord/my-properties` | Get landlord's properties |  Landlord |
| GET | `/api/properties/admin/all` | Admin: get all properties |  Admin |

### Query Parameters (for filtering)

| Param | Type | Description |
|-------|------|-------------|
| `searchTerm` | string | Search title, description, location |
| `location` | string | Filter by location |
| `categoryId` | string | Filter by category |
| `minRent` | number | Minimum rent |
| `maxRent` | number | Maximum rent |
| `status` | enum | AVAILABLE, PENDING, RENTED |
| `page` | number | Pagination |
| `limit` | number | Items per page |

### Frontend Mapping

| Component/Page | File | Endpoint |
|----------------|------|----------|
| Properties List | `app/(publicGroup)/properties/page.tsx` | `GET /api/properties?filters` |
| Property Search Bar | `_components/property/PropertySearchBar.tsx` | URL query params |
| Property Filters | `_components/property/PropertyFilters.tsx` | URL query params |
| Property Card | `_components/property/PropertyCard.tsx` | Displays data |
| Property Details | `app/(publicGroup)/properties/[id]/page.tsx` | `GET /api/properties/:id` |
| Landlord: My Properties | `landlord-dashboard/properties/page.tsx` | `GET /landlord/my-properties` |
| Create Property Modal | `_components/property/PropertyFormDialog.tsx` (create mode) | `POST /api/properties` |
| Edit Property Modal | `_components/property/PropertyFormDialog.tsx` (edit mode) | `PUT /api/properties/:id` |
| Delete Property Dialog | `_components/property/DeletePropertyDialog.tsx` | `DELETE /api/properties/:id` |

**Server Actions:** `_actions/getProperty.ts`, `_actions/getPropertyById.ts`, `_actions/property.ts`

---

## 📂 Category Endpoints

Base path: `/api/categories`

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/api/categories` | Get all categories |  Public |
| POST | `/api/categories` | Create category |  Admin |
| PATCH | `/api/categories/:id` | Update category |  Admin |
| DELETE | `/api/categories/:id` | Delete category |  Admin |

### Frontend Mapping

| Component/Page | File | Endpoint |
|----------------|------|----------|
| Property Filter Dropdown | `_components/property/PropertyFilters.tsx` | `GET /api/categories` |
| Property Form Category Select | `_components/property/PropertyFormDialog.tsx` | `GET /api/categories` |

**Server Actions:** `_actions/getCategories.ts`

---

## 📋 Rental Request Endpoints

Base path: `/api/rentals`

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/rentals` | Create rental request |  Tenant |
| GET | `/api/rentals` | Get my requests (role-based) |  Tenant/Landlord |
| GET | `/api/rentals/:id` | Get single request |  Tenant/Landlord |
| PATCH | `/api/rentals/landlord/requests/:id` | Approve/Reject request |  Landlord |
| GET | `/api/rentals/admin/rentals` | Admin: get all rentals |  Admin |

### Request Statuses

```
PENDING → APPROVED → PAYMENT_PENDING → ACTIVE → COMPLETED
                  → REJECTED
```

### Frontend Mapping

| Component/Page | File | Endpoint |
|----------------|------|----------|
| Property Details "Request to Rent" | `_components/property/RequestToRentModal.tsx` | `POST /api/rentals` |
| Landlord Dashboard Overview | `landlord-dashboard/page.tsx` | `GET /api/rentals` |
| Landlord Requests Page | `landlord-dashboard/requests/page.tsx` | `GET /api/rentals` |
| Approve/Reject Buttons | `_components/request/RequestActions.tsx` | `PATCH /api/rentals/landlord/requests/:id` |
| Tenant Dashboard Overview | `tenant-dashboard/page.tsx` | `GET /api/rentals` |
| Tenant Requests Page | `tenant-dashboard/requests/page.tsx` | `GET /api/rentals` |
| Admin Rentals Page | `admin-dashboard/rentals/page.tsx` | `GET /api/rentals/admin/rentals` |

**Server Actions:** `_actions/rentalRequest.ts`

---

## 💳 Payment Endpoints

Base path: `/api/payments`

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/payments/create` | Create Stripe checkout session |  Tenant |
| POST | `/api/payments/webhook` | Stripe webhook handler |  Stripe |
| GET | `/api/payments` | Get my payments (role-based) |  Any |
| GET | `/api/payments/:id` | Get single payment |  Any |

### Payment Statuses

```
PENDING → COMPLETED
        → FAILED
```

### Frontend Mapping

| Component/Page | File | Endpoint |
|----------------|------|----------|
| "Pay Now" Button | `_components/tenant/ProceedToPaymentButton.tsx` | `POST /api/payments/create` |
| Payment Success Page | `app/(publicGroup)/payment/success/page.tsx` | Cache revalidation |
| Payment Cancel Page | `app/(publicGroup)/payment/cancel/page.tsx` | UI only |
| Tenant Payment History | `tenant-dashboard/payments/page.tsx` | `GET /api/payments` |
| Landlord Earnings Page | `landlord-dashboard/earnings/page.tsx` | `GET /api/payments` |
| Admin Revenue Analytics | `admin-dashboard/page.tsx` | `GET /api/payments` |

**Payment Flow:**
1. Tenant clicks "Pay Now" → `POST /api/payments/create`
2. Backend creates Stripe session → returns `paymentUrl`
3. Frontend redirects to Stripe checkout
4. After payment → Stripe redirects to `/payment/success`
5. Stripe webhook (`POST /api/payments/webhook`) updates payment & rental status in DB

**Server Actions:** `_actions/payment.ts`

---

## ⭐ Review Endpoints

Base path: `/api/reviews`

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/reviews` | Create review |  Tenant |
| GET | `/api/reviews/property/:propertyId` | Get property reviews |  Public |

### Review Requirements
- Rental status must be `ACTIVE` or `COMPLETED`
- Payment status must be `COMPLETED`
- Can only review once per rental
- Rating: 1-5 stars

### Frontend Mapping

| Component/Page | File | Endpoint |
|----------------|------|----------|
| Review Form Modal | `_components/tenant/ReviewFormDialog.tsx` | `POST /api/reviews` |
| Tenant Reviews Page | `tenant-dashboard/reviews/page.tsx` | From rental requests data |
| Property Reviews Section | `_components/property/PropertyReviews.tsx` | `GET /api/reviews/property/:id` |

**Server Actions:** `_actions/review.ts`

---

## 🛡 Admin Endpoints

Combined admin routes across modules.

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/users` | All users |
| PATCH | `/api/users/:id/status` | Ban/Unban user |
| GET | `/api/properties/admin/all` | All properties |
| GET | `/api/rentals/admin/rentals` | All rentals |
| GET | `/api/payments` | All payments (admin sees all) |

### Frontend Mapping

| Component/Page | File | Endpoints |
|----------------|------|-----------|
| Admin Dashboard | `admin-dashboard/page.tsx` | Multiple (users, properties, rentals, payments) |
| Users Management | `admin-dashboard/users/page.tsx` | `GET /api/users` |
| User Actions | `_components/admin/UsersTable.tsx` | `PATCH /api/users/:id/status` |
| Properties Moderation | `admin-dashboard/properties/page.tsx` | `GET /api/properties` |
| Rentals Moderation | `admin-dashboard/rentals/page.tsx` | `GET /api/rentals/admin/rentals` |

**Server Actions:** `_actions/admin.ts`

---

## 🧩 Server Actions Overview

Complete list of server actions and their purposes.

### Auth Actions
| File | Function | Endpoint |
|------|----------|----------|
| `service/register.ts` | `registerUser()` | `POST /api/auth/register` |
| `service/login.ts` | `loginUser()` | `POST /api/auth/login` |
| `service/logout.ts` | `logout()` | `POST /api/auth/logout` |
| `service/getMe.ts` | `getMe()` | `GET /api/users/me` |

### Property Actions
| File | Function | Endpoint |
|------|----------|----------|
| `_actions/getProperty.ts` | `getProperty()` | `GET /api/properties` |
| `_actions/getPropertyById.ts` | `getPropertyById()` | `GET /api/properties/:id` |
| `_actions/getCategories.ts` | `getCategories()` | `GET /api/categories` |
| `_actions/property.ts` | `createProperty()` | `POST /api/properties` |
| `_actions/property.ts` | `updateProperty()` | `PUT /api/properties/:id` |
| `_actions/property.ts` | `deleteProperty()` | `DELETE /api/properties/:id` |
| `_actions/property.ts` | `getMyProperties()` | `GET /api/properties/landlord/my-properties` |

### Rental Actions
| File | Function | Endpoint |
|------|----------|----------|
| `_actions/rentalRequest.ts` | `createRentalRequest()` | `POST /api/rentals` |
| `_actions/rentalRequest.ts` | `getMyRentalRequests()` | `GET /api/rentals` |
| `_actions/rentalRequest.ts` | `getRentalRequestById()` | `GET /api/rentals/:id` |
| `_actions/rentalRequest.ts` | `updateRequestStatus()` | `PATCH /api/rentals/landlord/requests/:id` |

### Payment Actions
| File | Function | Endpoint |
|------|----------|----------|
| `_actions/payment.ts` | `createCheckoutSession()` | `POST /api/payments/create` |
| `_actions/payment.ts` | `getMyPayments()` | `GET /api/payments` |
| `_actions/payment.ts` | `getPaymentById()` | `GET /api/payments/:id` |
| `_actions/payment.ts` | `refreshPayments()` | Cache revalidation |

### Review Actions
| File | Function | Endpoint |
|------|----------|----------|
| `_actions/review.ts` | `createReview()` | `POST /api/reviews` |
| `_actions/review.ts` | `getReviewsByProperty()` | `GET /api/reviews/property/:id` |

### Admin Actions
| File | Function | Endpoint |
|------|----------|----------|
| `_actions/admin.ts` | `getAllUsers()` | `GET /api/users` |
| `_actions/admin.ts` | `toggleUserStatus()` | `PATCH /api/users/:id/status` |

---

## 🔄 Cache & Revalidation Strategy

Using Next.js `revalidateTag` for smart caching:

| Cache Tag | Invalidated After |
|-----------|-------------------|
| `property` | Property create/update/delete |
| `my-properties` | Landlord CRUD operations |
| `category` | Category CRUD |
| `my-rental-requests` | Rental create/status change |
| `landlord-requests` | Rental create/status change |
| `my-payments` | Payment success (webhook) |
| `property-reviews-:id` | Review creation |
| `admin-users` | User ban/unban |

---

## 🔒 Authentication Flow

```
1. User registers    → POST /api/auth/register
2. User logs in      → POST /api/auth/login → Sets cookie
3. All requests      → Cookie: accessToken=<jwt>
4. Get user data     → GET /api/users/me
5. Logout            → POST /api/auth/logout → Clears cookie
```

**Cookie Configuration:**
- Name: `accessToken`
- HttpOnly: `true`
- Secure: `true` (in production)
- SameSite: `lax`
- Sent automatically with every request

---

## 👥 Role-Based Access

| Role | Access |
|------|--------|
| **PUBLIC** | Browse properties, view details, view reviews |
| **TENANT** | Submit requests, make payments, write reviews |
| **LANDLORD** | Manage properties, approve/reject requests, view earnings |
| **ADMIN** | Full platform access, user management, moderation |

---

## 🎯 Complete User Journeys

### Tenant Journey
```
Register → Login → Browse Properties → View Details → 
Submit Rental Request → Wait for Approval → Pay via Stripe → 
Rental Active → Write Review
```

**Endpoints:** `/register` → `/login` → `/properties` → `/properties/:id` → 
`POST /rentals` → `POST /payments/create` → `POST /reviews`

### Landlord Journey
```
Register → Login → Dashboard → Add Property → 
Receive Requests → Approve/Reject → Get Payment → Track Earnings
```

**Endpoints:** `/register` → `/login` → `GET /rentals` → `POST /properties` → 
`PATCH /rentals/landlord/requests/:id` → `GET /payments`

### Admin Journey
```
Login → Dashboard Overview → View Analytics → 
Manage Users (Ban/Unban) → Moderate Properties → Monitor Rentals
```

**Endpoints:** `/login` → `GET /users` → `PATCH /users/:id/status` → 
`GET /properties/admin/all` → `GET /rentals/admin/rentals`

---

## 🛠 Environment Variables

```env
# Backend
BACKEND_API_URL=http://localhost:5000
APP_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# Database
DATABASE_URL=postgresql://...

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

---

## 📊 Data Types Reference

### IUser
```typescript
{
  id: string
  name: string
  email: string
  role: "TENANT" | "LANDLORD" | "ADMIN"
  activeStatus: "ACTIVE" | "BANNED"
  profilePhoto: string | null
  phone: string
}
```

### IProperty
```typescript
{
  id: string
  title: string
  description: string
  rentPerMonth: number
  location: string
  amenities: string[]
  images: string[]
  status: "AVAILABLE" | "PENDING" | "RENTED"
  landlordId: string
  categoryId: string
}
```

### IRentalRequest
```typescript
{
  id: string
  propertyId: string
  tenantId: string
  moveInDate: string
  durationMonths: number
  message: string | null
  status: "PENDING" | "APPROVED" | "REJECTED" | 
          "PAYMENT_PENDING" | "ACTIVE" | "COMPLETED"
}
```

### IPayment
```typescript
{
  id: string
  rentalRequestId: string
  tenantId: string
  amount: number
  currency: string
  status: "PENDING" | "COMPLETED" | "FAILED"
  stripePaymentIntentId: string | null
  stripeCheckoutSessionId: string | null
  paidAt: string | null
}
```

### IReview
```typescript
{
  id: string
  propertyId: string
  tenantId: string
  rentalRequestId: string
  rating: number  // 1-5
  comment: string | null
}
```

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Route not found" | Verify backend URL & path prefix |
| "Not authenticated" | Check cookie is being sent |
| Filter not working | Ensure frontend param names match backend |
| Payment webhook not firing | Use Stripe CLI: `stripe listen` |
| Review submit fails | Check rental & payment status |
| Cache not updating | Verify `revalidateTag` in server action |

---

## 📚 Additional Resources

- [Next.js Server Actions Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Stripe Checkout Documentation](https://stripe.com/docs/checkout)
- [Prisma ORM Documentation](https://www.prisma.io/docs)

---

## 👨‍💻 Contributing

When adding new endpoints:
1. Add route to backend module
2. Create server action in `_actions/`
3. Update this documentation
4. Add cache tag if needed
5. Test with proper role permissions

---

**Last Updated:** _Auto-updated with each release_  
**Version:** 1.0.0  
**Maintained by:** Zisan Ul Haque