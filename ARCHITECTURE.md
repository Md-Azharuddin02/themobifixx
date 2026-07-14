# TheMobifixx — Architecture Document

**Version:** 1.0  
**Date:** July 2025  
**Author:** Arbormit  
**Status:** Living Document  

---

## 1. Architecture Overview

TheMobifixx's architecture is designed to evolve in phases — starting from a zero-backend static SPA today, to a fully integrated repair operations platform. Each phase adds a new layer without breaking the existing one.

```
┌───────────────────────────────────────────────────────────┐
│                     PHASE PROGRESSION                     │
│                                                           │
│  Phase 1 ──▶ Phase 2 ──▶ Phase 3 ──▶ Phase 4 ──▶ Phase 5 │
│  Static      +Auth        +Reviews    +Payments  +Admin   │
│  SPA         +Booking     +Dashboard  +Invoices  +Techs   │
│  (Live)      +Tracking                                    │
└───────────────────────────────────────────────────────────┘
```

---

## 2. Current Architecture — Phase 1 (Static SPA)

### 2.1 High-Level Diagram

```
┌─────────────────────────────────────────────────────┐
│                      USER BROWSER                   │
│                                                     │
│   React SPA (Vite build)                            │
│   ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│   │  Header  │ │  Pages   │ │  FloatingCTAs    │   │
│   └──────────┘ └──────────┘ └──────────────────┘   │
│   ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│   │ SEOMgr   │ │  Footer  │ │  motion/react    │   │
│   └──────────┘ └──────────┘ └──────────────────┘   │
└────────────────────────┬────────────────────────────┘
                         │ HTTPS
┌────────────────────────▼────────────────────────────┐
│                  VERCEL EDGE CDN                    │
│  - Static file serving (HTML/CSS/JS/assets)         │
│  - Security headers (HSTS, CSP, X-Frame-Options)    │
│  - SPA rewrite: all routes → index.html             │
│  - Asset caching: max-age=31536000 immutable        │
└─────────────────────────────────────────────────────┘

External Services (CDN only, read-only):
  - cdn.simpleicons.org → brand logos (SVG)
  - fonts.googleapis.com → typography
  - images.unsplash.com → hero/gallery images
  - res.cloudinary.com → logo image
  - wa.me → WhatsApp redirect
```

### 2.2 File & Directory Structure

```
themobifixx/
├── public/                      # Static assets served at root
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── favicon.svg
│   ├── site.webmanifest
│   ├── microsoft.png            # Microsoft brand logo
│   ├── realme.avif              # Realme brand logo
│   └── *.webp                   # Issue category images
│
├── src/
│   ├── main.tsx                 # React root mount
│   ├── index.css                # Global design tokens + Tailwind
│   ├── App.tsx                  # Router, FloatingCTAs, layout shell
│   ├── types.ts                 # Shared TypeScript interfaces
│   ├── CategoryPage.tsx         # Category hub (mobile/laptop/tablet)
│   │
│   ├── components/
│   │   ├── Header.tsx           # Sticky nav, mobile menu, search
│   │   ├── Footer.tsx           # Links, legal, social
│   │   ├── SEOManager.tsx       # Dynamic meta / JSON-LD per route
│   │   ├── LeadForms.tsx        # Inquiry + Booking WhatsApp forms
│   │   ├── DeviceComparison.tsx # Device compare UI
│   │   ├── PriceEstimator.tsx   # Price estimation widget
│   │   └── devices.ts           # Static device model data (1200+ models)
│   │
│   └── pages/
│       ├── Home.tsx             # Homepage (921 lines — hero, brands, FAQ…)
│       ├── Contact.tsx          # Contact page with tabs
│       ├── BrandPage.tsx        # /brand/:brandId
│       ├── DeviceRepairPage.tsx # /repair/:brandId/:modelId
│       ├── Services.tsx         # /services
│       ├── ServiceDetail.tsx    # /services/:slug
│       ├── Legal.tsx            # PrivacyPolicy + TermsAndConditions
│       ├── TextScramble.tsx     # Text animation component
│       └── SparklesText.tsx     # Sparkle text animation
│
├── index.html                   # Shell HTML with full SEO meta + JSON-LD
├── vite.config.ts               # Vite config (pure frontend)
├── package.json                 # Frontend-only dependencies
├── vercel.json                  # Security headers + SPA rewrite
├── tsconfig.json
├── .env.example                 # Public VITE_ vars only
├── .gitignore
├── ARCHITECTURE.md              # This document
└── PRODUCT_REQUIREMENTS.md      # PRD
```

### 2.3 Client-Side Routing

```
/                          → Home
/contact                   → Contact (tabs: inquiry | booking)
/brand/:brandId            → BrandPage
  /brand/apple
  /brand/samsung
  /brand/oneplus …
/repair/:brandId/:modelId  → DeviceRepairPage
  /repair/apple/iphone-15-pro-max
/category/:categoryId      → CategoryPage
  /category/mobile
  /category/laptop
/services                  → Services hub
/services/:slug            → ServiceDetail
/privacy-policy            → PrivacyPolicy
/terms-and-conditions      → TermsAndConditions
/* (catch-all)             → Home (graceful fallback)
```

### 2.4 Lead / Form Data Flow (Current)

```
Customer on page
      │
      ▼
Fills form in LeadForms.tsx
(name, phone, issue, device)
      │
      ▼
JavaScript builds URL:
wa.me/919310112994?text=<encoded message>
      │
      ▼
window.open() → Customer's WhatsApp app opens
      │
      ▼
Customer manually sends message to shop
      │
      ▼
Shop owner responds manually via WhatsApp
```

**No data persisted. No server involved.**

### 2.5 SEO Architecture

```
index.html (static shell)
  └── Full meta suite: title, description, OG, Twitter, GEO, hreflang
  └── JSON-LD: LocalBusiness + WebSite (static, always present)

SEOManager.tsx (runs on every route change)
  └── Updates: document.title
  └── Updates: meta[name="description"]
  └── Updates: meta[property="og:*"]
  └── Updates: meta[name="twitter:*"]
  └── Updates: link[rel="canonical"]
  └── Updates: link[rel="alternate"][hreflang]
  └── Injects: <script type="application/ld+json"> per route

public/robots.txt
  └── Allow: /
  └── Disallow: /404
  └── Sitemap: https://themobifixx.com/sitemap.xml

public/sitemap.xml
  └── 25 URLs: home, contact, services, brands, legal pages
  └── Priority + changefreq + lastmod + hreflang per URL
  └── Image sitemap for homepage hero
```

### 2.6 Security Headers (via vercel.json)

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera=(), mic=(), geolocation=(self) |
| `Content-Security-Policy` | Locked to known origins |
| `Cross-Origin-Opener-Policy` | `same-origin-allow-popups` |
| `Cross-Origin-Resource-Policy` | `same-origin` |

---

## 3. Target Architecture — Phase 2+ (Full-Stack)

### 3.1 High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                       │
│                  React SPA (same frontend)                  │
│         + React Query (server state + caching)              │
│         + Zustand (UI state)                                │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS REST + JWT Bearer Token
┌──────────────────────▼──────────────────────────────────────┐
│                     VERCEL EDGE CDN                         │
│              (Frontend static files + CDN)                  │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS API calls to /api/*
┌──────────────────────▼──────────────────────────────────────┐
│                  API SERVER (Railway / Render)               │
│              Node.js + Express + TypeScript                  │
│                                                             │
│   ┌────────────┐  ┌──────────────┐  ┌─────────────────┐    │
│   │ Auth Layer │  │ Order Router │  │  Review Router  │    │
│   │  JWT + bcr │  │  CRUD + FSM  │  │  Verified only  │    │
│   └────────────┘  └──────────────┘  └─────────────────┘    │
│   ┌────────────┐  ┌──────────────┐  ┌─────────────────┐    │
│   │ Pay Router │  │ Admin Router │  │ Notif Service   │    │
│   │  Razorpay  │  │  Role-gated  │  │  WA + Email     │    │
│   └────────────┘  └──────────────┘  └─────────────────┘    │
│                                                             │
│   Middleware: rate-limit | helmet | cors | morgan | Zod     │
└──────────┬──────────────────┬──────────────────────────────┘
           │                  │
┌──────────▼──────┐  ┌────────▼────────────────────────────┐
│  PostgreSQL DB  │  │         External Services            │
│  (Neon/Supa)   │  │  Cloudinary (images)                 │
│  Drizzle ORM   │  │  Resend.com (email)                  │
│                │  │  Razorpay (payments)                 │
│  Tables:       │  │  Meta Cloud API / Interakt (WA)      │
│  - users       │  │  Sentry (error monitoring)           │
│  - orders      │  └──────────────────────────────────────┘
│  - reviews     │
│  - payments    │
│  - technicians │
│  - status_log  │
└─────────────────┘
```

### 3.2 Database Schema

#### users
```sql
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  phone       TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'customer', -- customer | technician | admin
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

#### repair_orders
```sql
CREATE TABLE repair_orders (
  id              TEXT PRIMARY KEY,             -- TMX-2025-XXXXX
  customer_id     UUID REFERENCES users(id),    -- NULL for guests
  customer_name   TEXT NOT NULL,
  customer_phone  TEXT NOT NULL,
  customer_email  TEXT,
  device_type     TEXT NOT NULL,
  brand           TEXT NOT NULL,
  model           TEXT NOT NULL,
  issues          TEXT[] NOT NULL,
  service_mode    TEXT NOT NULL,                -- walkin | doorstep | dropoff
  pickup_address  TEXT,
  preferred_date  DATE NOT NULL,
  preferred_slot  TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending',
  estimated_cost  INTEGER,                      -- in paise
  actual_cost     INTEGER,
  technician_id   UUID REFERENCES users(id),
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### order_status_log
```sql
CREATE TABLE order_status_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    TEXT REFERENCES repair_orders(id),
  from_status TEXT,
  to_status   TEXT NOT NULL,
  note        TEXT,
  updated_by  UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

#### reviews
```sql
CREATE TABLE reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      TEXT REFERENCES repair_orders(id) UNIQUE,
  customer_id   UUID REFERENCES users(id),
  customer_name TEXT NOT NULL,
  device_type   TEXT,
  brand         TEXT,
  rating        SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text   TEXT,
  is_verified   BOOLEAN DEFAULT TRUE,
  is_visible    BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

#### payments
```sql
CREATE TABLE payments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id            TEXT REFERENCES repair_orders(id),
  amount              INTEGER NOT NULL,          -- in paise
  currency            TEXT DEFAULT 'INR',
  gateway             TEXT DEFAULT 'razorpay',
  gateway_order_id    TEXT UNIQUE,
  gateway_payment_id  TEXT,
  status              TEXT DEFAULT 'created',   -- created|paid|failed|refunded
  method              TEXT,
  paid_at             TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.3 Entity Relationship Diagram

```
users ──────────────┬── repair_orders ──────── order_status_log
  │                 │         │
  │ (technician)   │         ├── reviews (1:1, only if delivered)
  │                │         │
  └────────────────┘         └── payments (1:many)
```

### 3.4 Authentication Flow

```
SIGNUP:
  Client ──POST /api/auth/signup──▶ Server
  Server: validate → hash password → insert user → return {accessToken, refreshToken}
  Client: store accessToken in memory, refreshToken in httpOnly cookie

LOGIN:
  Client ──POST /api/auth/login──▶ Server
  Server: lookup user → compare hash → sign JWT (15min) + refresh (7d) → return
  Client: store in memory + cookie

REFRESH:
  Client (on 401) ──POST /api/auth/refresh──▶ Server
  Server: validate refresh cookie → issue new accessToken → return
  Client: retry original request

LOGOUT:
  Client ──POST /api/auth/logout──▶ Server
  Server: invalidate refresh token (token rotation / blocklist) → return 200
  Client: clear memory + cookie

PROTECTED ROUTE:
  Client ──GET /api/user/orders──▶ Server
  Server: authMiddleware → verify JWT → attach req.user → proceed
```

### 3.5 Order State Machine

```
                    ┌──────────┐
         ┌──────────│ pending  │──────────┐
         │          └──────────┘          │
         ▼               │                ▼
    [confirmed]          │           [cancelled]
         │               ▼
         │          [picked_up]
         │               │
         │               ▼
         │          [diagnosing]
         │               │
         │               ▼
         │          [in_repair]
         │               │
         │               ▼
         │         [quality_check]
         │               │
         │               ▼
         └──────────▶  [ready]
                         │
                         ▼
                    [delivered] ──▶ Review eligible
```

Every status transition is:
1. Written to `repair_orders.status`
2. Logged to `order_status_log` with timestamp + actor + note
3. Triggers a WhatsApp / Email notification to the customer

### 3.6 Payment Flow

```
Customer clicks "Pay Now"
        │
        ▼
POST /api/payments/create-order
  └── Server creates Razorpay Order → returns {orderId, amount, currency}
        │
        ▼
Razorpay SDK in browser collects payment (UPI/card/etc)
        │
        ▼
On success: Razorpay fires onSuccess with {razorpay_payment_id, razorpay_signature}
        │
        ▼
POST /api/payments/verify
  └── Server validates HMAC signature
  └── Updates payment.status = 'paid'
  └── Updates order.status = 'paid'
  └── Triggers PDF invoice generation
  └── Sends invoice via email (Resend)
  └── Sends WhatsApp confirmation
        │
        ▼
Client redirected to order success page
```

### 3.7 Notification Pipeline

```
Order status change
        │
        ▼
notificationService.send(orderId, event)
        │
        ├──▶ WhatsApp (Meta Cloud API / Interakt)
        │      Template: STATUS_UPDATE_TEMPLATE
        │      Variables: customerName, orderId, status, note
        │
        ├──▶ Email (Resend.com)
        │      Template: order-status-update.html
        │      To: customer.email
        │
        └──▶ Push (Web Push API)  [Phase 6]
               ServiceWorker broadcasts to subscribed devices
```

---

## 4. API Contract Reference

### Base URL
```
Production:  https://api.themobifixx.com/api
Development: http://localhost:5000/api
```

### Auth Headers
```
Authorization: Bearer <accessToken>
Content-Type:  application/json
```

### Standard Response Format
```typescript
// Success
{
  success: true,
  data: T,
  meta?: { page: number, total: number, limit: number }
}

// Error
{
  success: false,
  error: {
    code: string,       // e.g. "ORDER_NOT_FOUND"
    message: string,    // Human-readable
    field?: string      // For validation errors
  }
}
```

### Core Endpoints Summary

```
AUTH
  POST   /api/auth/signup
  POST   /api/auth/login
  POST   /api/auth/logout
  POST   /api/auth/refresh
  GET    /api/auth/me

ORDERS
  POST   /api/orders                    (public — guest or auth)
  GET    /api/orders/:id                (public — limited fields)
  GET    /api/user/orders               (auth — customer's orders)
  GET    /api/user/orders/:id           (auth — full detail)
  PUT    /api/admin/orders/:id/status   (admin/tech only)

REVIEWS
  POST   /api/reviews                   (auth, order must be 'delivered')
  GET    /api/reviews                   (public)
  GET    /api/reviews/summary           (public)
  PUT    /api/admin/reviews/:id         (admin)
  DELETE /api/admin/reviews/:id         (admin)

PAYMENTS
  POST   /api/payments/create-order     (auth)
  POST   /api/payments/verify           (auth)
  POST   /api/payments/webhook          (Razorpay webhook, IP-verified)
  GET    /api/payments/:orderId         (auth)

ADMIN
  GET    /api/admin/orders              (admin — paginated, filterable)
  GET    /api/admin/customers           (admin)
  GET    /api/admin/analytics           (admin)
  POST   /api/admin/technicians         (admin)
  PUT    /api/admin/technicians/:id     (admin)
```

---

## 5. Frontend Architecture (Phase 2+)

### 5.1 State Management Strategy

```
Global Auth State   → Zustand store (authStore)
Server Data         → React Query (useQuery / useMutation)
UI / Local State    → React useState / useReducer
Forms               → React Hook Form + Zod validation
Routing             → React Router v6
```

### 5.2 New Routes (Phase 2+)

```
/login              → LoginPage
/signup             → SignupPage
/forgot-password    → ForgotPasswordPage
/reset-password     → ResetPasswordPage
/dashboard          → CustomerDashboard (protected)
/tracker            → RepairTrackerPage (public, Booking ID input)
/tracker/:orderId   → OrderTimelinePage
/admin              → AdminDashboard (admin role only)
/admin/orders       → AdminOrderList
/admin/orders/:id   → AdminOrderDetail
/admin/customers    → AdminCustomerList
/admin/analytics    → AdminAnalytics
/admin/reviews      → AdminReviewManager
/technician         → TechnicianPanel (tech role only)
```

### 5.3 Code Splitting (Phase 2)

```typescript
// Lazy load heavy pages to keep initial bundle < 250 KB
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard'));
const TrackerPage = lazy(() => import('./pages/TrackerPage'));
```

### 5.4 Protected Route Pattern

```tsx
function ProtectedRoute({ role }: { role?: 'admin' | 'technician' }) {
  const { user, isLoading } = useAuthStore();
  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return <Outlet />;
}
```

---

## 6. Infrastructure & Deployment

### 6.1 Current (Phase 1)

```
GitHub repo
    │ git push main
    ▼
Vercel (auto-deploy)
    └── Static build (npm run build)
    └── CDN distribution globally
    └── Custom domain: themobifixx.com
```

### 6.2 Target (Phase 2+)

```
GitHub repo
    │
    ├── /  (React SPA)              ─▶ Vercel (auto-deploy on push)
    │                                       └── themobifixx.com
    │
    └── /server  (Express API)      ─▶ Railway / Render
                                            └── api.themobifixx.com
                                            └── Auto-deploy via GitHub Actions

PostgreSQL Database
    └── Neon (serverless Postgres, free tier → paid on scale)
    └── Daily automated backups
    └── Connection pooling: PgBouncer (built into Neon)

File Storage
    └── Cloudinary (images, before/after photos)
    └── Folder structure: /themobifixx/orders/:orderId/

Monitoring
    └── Sentry (frontend + backend error tracking)
    └── Vercel Analytics (Web Vitals, page views)
    └── Uptime: Better Uptime / UptimeRobot
```

### 6.3 CI/CD Pipeline (Phase 2+)

```yaml
# .github/workflows/deploy.yml

on:
  push:
    branches: [main]

jobs:
  test:
    - npm ci
    - npm run typecheck
    - npm run lint
    - npm run test

  deploy-frontend:
    - needs: test
    - vercel deploy --prod

  deploy-api:
    - needs: test
    - railway up --environment production
```

### 6.4 Environment Variables

**Frontend (.env — VITE_ prefix only):**
```
VITE_SITE_URL=https://themobifixx.com
VITE_API_URL=https://api.themobifixx.com
VITE_WA_NUMBER=919310112994
VITE_SUPPORT_EMAIL=themobifixx@gmail.com
VITE_RAZORPAY_KEY_ID=rzp_live_XXXX
```

**Backend (.env — never committed):**
```
DATABASE_URL=postgresql://...
JWT_SECRET=<32-char random>
JWT_REFRESH_SECRET=<32-char random>
RAZORPAY_KEY_ID=rzp_live_XXXX
RAZORPAY_KEY_SECRET=XXXX
RAZORPAY_WEBHOOK_SECRET=XXXX
RESEND_API_KEY=re_XXXX
CLOUDINARY_URL=cloudinary://XXXX
WHATSAPP_API_TOKEN=XXXX
WHATSAPP_PHONE_ID=XXXX
NODE_ENV=production
PORT=5000
```

---

## 7. Scalability Considerations

| Concern | Current Solution | Scale Solution |
|---|---|---|
| Database connections | N/A | PgBouncer connection pooling |
| API throughput | N/A | Horizontal scaling on Railway |
| Static assets | Vercel CDN | Same (already globally distributed) |
| Image uploads | Cloudinary free | Cloudinary paid plan |
| WhatsApp rate limits | wa.me links | Meta Business API (1000 msg/day free) |
| Search performance | Client-side filter | PostgreSQL full-text search with tsvector index |
| Multi-branch | Single location | `branches` table + location filter on all queries |
| Mobile app | Web only | React Native (shared business logic) — Phase 7 |

---

## 8. Key Engineering Decisions & Rationale

| Decision | Rationale |
|---|---|
| **Static SPA for Phase 1** | Zero hosting cost, instant global CDN, no backend attack surface, perfect SEO via pre-baked HTML |
| **Drizzle ORM over Prisma** | Lighter, type-safe SQL, better Neon compatibility, no Prisma Client generation step |
| **Razorpay over Stripe** | INR native, UPI support, India compliance, lower fees for domestic |
| **Resend over SendGrid/Nodemailer** | Modern API, generous free tier, excellent deliverability, react-email templates |
| **Neon over RDS** | Serverless branching, free tier, instant scale, native Postgres |
| **React Query over Redux** | Server state ≠ UI state — React Query manages caching, refetching, mutation state automatically |
| **Zod for validation** | Single schema = TypeScript types + runtime validation on both frontend and backend |
| **JWT + httpOnly cookie** | XSS-resistant token storage for refresh token; access token in memory |

---

## 9. Monitoring & Observability

```
Error Tracking:   Sentry (client + server)
Performance:      Vercel Analytics (Core Web Vitals)
Uptime:           UptimeRobot (every 5 min, alert on Slack/WhatsApp)
Database:         Neon dashboard (query insights, slow queries)
API Logs:         Railway built-in logs + structured JSON logging (pino)
```

---

## 10. Disaster Recovery

| Scenario | Recovery Plan |
|---|---|
| Frontend deploy breaks | Vercel instant rollback to previous deployment |
| API server crash | Railway auto-restart, health check endpoint |
| Database corruption | Neon point-in-time recovery (automated daily backups) |
| Credential leak | Rotate via provider console; update Railway env vars |
| DDoS / traffic spike | Vercel Edge absorbs static traffic; API behind rate limiter |
