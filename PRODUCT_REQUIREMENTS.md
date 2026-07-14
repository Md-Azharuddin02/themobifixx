# TheMobifixx — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** July 2025  
**Author:** Arbormit  
**Status:** Living Document — updated per release phase  

---

## 1. Product Overview

### 1.1 What is TheMobifixx?

TheMobifixx is **Delhi NCR's premium mobile phone and laptop repair service center**, headquartered at Nehru Place, New Delhi. The digital product is a customer-facing web platform designed to:

- Generate **inbound repair leads** via WhatsApp and phone
- Establish **brand trust** and local SEO dominance
- Scale into a **full-stack service operations platform** covering bookings, tracking, payments, and reviews

### 1.2 Business Goals

| Goal | Metric | Target |
|---|---|---|
| Increase inbound leads | WhatsApp clicks + calls per week | 200+ / week |
| SEO dominance | Rank #1 for "mobile repair Nehru Place" | Within 90 days |
| Reduce friction | Time to first customer contact | < 30 seconds |
| Build trust | Published verified reviews | 50+ within 3 months |
| Scale operations | Repair orders managed digitally | 100% by Phase 3 |

### 1.3 Target Users

| Persona | Description | Primary Goal |
|---|---|---|
| **Retail Customer** | Individual with a broken device | Fast repair, trust in quality |
| **Corporate Client** | Office manager with bulk devices | SLA-backed bulk repair |
| **Returning Customer** | Previous repair user | Track order, leave review |
| **Admin / Owner** | Shop manager | See all orders, manage staff |
| **Technician** | Repair engineer | View assigned jobs |

---

## 2. Current State — Phase 1 (Live)

### 2.1 What's Built

The current site is a **fully static React SPA** deployed on Vercel. No backend, no database.

**Pages:**

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, services, brands, testimonials, FAQ, CTAs |
| `/contact` | Inquiry form + repair booking form (WhatsApp-based) |
| `/brand/:brandId` | Brand-specific repair page (Apple, Samsung, etc.) |
| `/repair/:brandId/:modelId` | Device-specific repair page with issues and booking |
| `/category/:categoryId` | Mobile / Laptop / Tablet / Watch category hub |
| `/services` | All services listing |
| `/services/:slug` | Individual service detail |
| `/privacy-policy` | Legal |
| `/terms-and-conditions` | Legal |

**How forms work (current):**  
Customer fills form → JavaScript builds pre-filled WhatsApp message → `wa.me` link opens in new tab → Customer sends to team manually.

**Lead flow:**
```
Website → WhatsApp / Phone → Manual follow-up → Offline repair → Done
```

### 2.2 Current Limitations

- No persistent data — every lead is ephemeral (WhatsApp conversation only)
- No repair status tracking for customers
- No verified reviews system
- No payment collection online
- No admin visibility into order volume
- No customer accounts or history

---

## 3. Feature Roadmap

```
Phase 1 (Done)   → Static lead-gen site, SEO, WhatsApp forms
Phase 2          → Auth + Repair Booking Backend + Order Tracking
Phase 3          → Ratings & Reviews + Customer Dashboard
Phase 4          → Payments + Invoicing
Phase 5          → Admin Dashboard + Technician Panel
Phase 6          → Notifications + CRM + Analytics
```

---

## 4. Phase 2 — Authentication + Booking Backend

### 4.1 User Registration & Login

**User Story:**
*As a customer, I want to create an account so that I can view my past repair orders without contacting the shop.*

**Acceptance Criteria:**
- [ ] Customer can sign up with name, phone, email, password
- [ ] Customer can log in with email + password
- [ ] OTP-based phone verification supported
- [ ] JWT sessions with 7-day expiry + refresh token
- [ ] "Forgot Password" flow via email reset link
- [ ] Google OAuth sign-in supported (optional, Phase 2.1)

**Data Model — User:**
```typescript
interface User {
  id: string;                        // UUID
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  salt: string;
  role: 'customer' | 'technician' | 'admin';
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**API Endpoints:**
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me
```

---

### 4.2 Repair Booking System

**User Story:**
*As a customer, I want to book a repair online so that I get a confirmed slot without calling.*

**Acceptance Criteria:**
- [ ] Customer selects: device type then brand then model then issue(s)
- [ ] Customer selects preferred date + time slot
- [ ] Customer chooses: Walk-in / Doorstep pickup / Drop-off
- [ ] System generates a unique Booking ID (e.g. `TMX-2025-00142`)
- [ ] Booking stored in database
- [ ] Confirmation sent via WhatsApp + Email
- [ ] Booking linked to customer account if logged in

**Data Model — RepairOrder:**
```typescript
interface RepairOrder {
  id: string;                        // e.g. TMX-2025-00142
  customerId?: string;               // null for guest bookings
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deviceType: 'mobile' | 'laptop' | 'macbook' | 'tablet' | 'other';
  brand: string;
  model: string;
  issues: string[];
  serviceMode: 'walkin' | 'doorstep' | 'dropoff';
  pickupAddress?: string;
  preferredDate: string;             // ISO date
  preferredSlot: string;             // e.g. "10:00-12:00"
  status: RepairStatus;
  estimatedCost?: number;
  actualCost?: number;
  technicianId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

type RepairStatus =
  | 'pending'       // Awaiting confirmation
  | 'confirmed'     // Slot confirmed by team
  | 'picked_up'     // Device collected from customer
  | 'diagnosing'    // Under diagnosis
  | 'in_repair'     // Repair in progress
  | 'quality_check' // Post-repair QC
  | 'ready'         // Ready for pickup / dispatch
  | 'delivered'     // Device returned
  | 'cancelled';    // Order cancelled
```

---

### 4.3 Repair Tracking (Customer-Facing)

**User Story:**
*As a customer, I want to track my repair in real time without calling the shop.*

**Acceptance Criteria:**
- [ ] Customer enters Booking ID on `/tracker` page
- [ ] Timeline shows current status with timestamps
- [ ] Each status update has a note (e.g. "Battery replaced, testing in progress")
- [ ] Logged-in customers see all their orders automatically
- [ ] Guest customers track via Booking ID + phone number

**Tracker UI States:**
```
[filled] Order Received       Jul 14, 10:30 AM
[filled] Device Picked Up     Jul 14, 1:15 PM
[filled] Diagnosis Started    Jul 14, 2:00 PM
[empty]  Repair In Progress   —
[empty]  Quality Check        —
[empty]  Ready for Delivery   —
```

**API Endpoints:**
```
GET    /api/orders/:id                     (guest — returns public status only)
GET    /api/user/orders                    (auth — returns full order list)
GET    /api/user/orders/:id                (auth — full order detail)
```

---

## 5. Phase 3 — Ratings and Reviews + Customer Dashboard

### 5.1 Review System

**User Story:**
*As a customer who received a repaired device, I want to leave a verified star rating and review so that others can trust the service.*

**Acceptance Criteria:**
- [ ] Only customers with a `delivered` order can submit a review
- [ ] Review: 1-5 stars + text (optional) + device type tag
- [ ] Reviews are publicly visible on homepage + brand pages
- [ ] Admin can flag/hide inappropriate reviews
- [ ] Review badge shows "Verified Repair Customer"
- [ ] Average rating shown on homepage (schema.org AggregateRating)

**Data Model — Review:**
```typescript
interface Review {
  id: string;
  orderId: string;                   // Must have status === 'delivered'
  customerId: string;
  customerName: string;              // Auto-populated from account
  deviceType: string;
  brand: string;
  rating: 1 | 2 | 3 | 4 | 5;
  reviewText?: string;
  isVerified: boolean;               // True = linked to completed order
  isVisible: boolean;                // Admin toggle
  createdAt: Date;
}
```

**API Endpoints:**
```
POST   /api/reviews                         (auth, order must be 'delivered')
GET    /api/reviews?page=1&limit=10
GET    /api/reviews/summary                 (avg rating, total count)
DELETE /api/admin/reviews/:id               (admin only)
PUT    /api/admin/reviews/:id/visibility    (admin only)
```

---

### 5.2 Customer Dashboard

**Route:** `/dashboard`
**Access:** Logged-in customers only

**Dashboard Sections:**

| Section | Content |
|---|---|
| **Active Orders** | Cards with status timeline, Booking ID, device |
| **Order History** | Past completed/cancelled repairs |
| **Leave a Review** | One-click review for eligible completed orders |
| **My Profile** | Name, phone, email, change password |
| **Support** | Quick WhatsApp link with order pre-filled |

---

## 6. Phase 4 — Payments and Invoicing

### 6.1 Online Payment

**User Story:**
*As a customer, I want to pay for my repair online via UPI so I don't have to carry cash.*

**Acceptance Criteria:**
- [ ] Payment offered after order status = `ready`
- [ ] Payment gateway: Razorpay (primary) — supports UPI, cards, net banking
- [ ] Customer receives payment link via WhatsApp
- [ ] On payment success: order status auto-updates to `paid`
- [ ] Invoice (PDF) generated and sent via email
- [ ] Partial payment / advance booking deposit supported (Phase 4.1)

**Data Model — Payment:**
```typescript
interface Payment {
  id: string;
  orderId: string;
  amount: number;                    // in paise (INR x 100)
  currency: 'INR';
  gateway: 'razorpay';
  gatewayOrderId: string;
  gatewayPaymentId?: string;
  status: 'created' | 'paid' | 'failed' | 'refunded';
  method?: 'upi' | 'card' | 'netbanking' | 'wallet';
  paidAt?: Date;
  createdAt: Date;
}
```

**API Endpoints:**
```
POST   /api/payments/create-order        (creates Razorpay order)
POST   /api/payments/verify              (webhook + frontend verification)
GET    /api/payments/:orderId            (auth)
POST   /api/payments/:id/refund          (admin only)
```

---

### 6.2 Invoice Generation

- Auto-generated PDF invoice per completed payment
- Includes: Booking ID, device details, repair description, parts used, labour, GST, total
- Downloadable from customer dashboard
- Emailed to customer automatically

---

## 7. Phase 5 — Admin Dashboard + Technician Panel

### 7.1 Admin Dashboard

**Route:** `/admin`
**Access:** `role === 'admin'` only

**Admin Modules:**

| Module | Features |
|---|---|
| **Orders** | View all, filter by status/date/tech, update status, add notes |
| **Customers** | Search, view history, block/unblock accounts |
| **Technicians** | Add/edit/deactivate, assign orders |
| **Reviews** | Approve, flag, delete |
| **Payments** | Revenue summary, refund initiation |
| **Analytics** | Orders per day, avg repair time, revenue chart, top brands |
| **Settings** | Business hours, service areas, pricing config |

**Analytics KPIs (Admin):**
- Total orders this month
- Revenue month-to-date
- Average repair turnaround time
- Orders by device type (pie chart)
- Orders by status (funnel chart)
- Peak booking hours (heatmap)

---

### 7.2 Technician Panel

**Route:** `/technician`
**Access:** `role === 'technician'` only

**Features:**
- View assigned orders for the day
- Update order status in real time
- Add repair notes and parts used
- Upload before/after photos (stored on Cloudinary)
- Mark order ready for delivery

---

## 8. Phase 6 — Notifications + CRM

### 8.1 Notification System

| Channel | Trigger | Recipient |
|---|---|---|
| WhatsApp | Booking confirmed | Customer |
| WhatsApp | Status change (every step) | Customer |
| WhatsApp | Payment link ready | Customer |
| WhatsApp | Device ready for pickup | Customer |
| Email | Booking confirmation + summary | Customer |
| Email | Invoice on payment | Customer |
| Email | Daily orders summary | Admin |
| Push (PWA) | Status update | Customer (opt-in) |

**WhatsApp Business API:** Use Meta Cloud API / Interakt / AiSensy for template messages.

### 8.2 CRM Features

- Customer contact history timeline
- Repeat customer identification
- Automated follow-up: "How was your repair?" 3 days post-delivery
- Birthday/festival promotional messages (opt-in)
- Bulk broadcast to opted-in customers

---

## 9. Non-Functional Requirements

### 9.1 Performance
- LCP (Largest Contentful Paint): < 2.5 seconds
- FID / INP: < 200ms
- Page weight: < 400 KB initial JS bundle (code splitting required Phase 2+)
- Images: WebP/AVIF format, lazy loading
- Fonts: Preloaded, subset

### 9.2 Security
- All API routes: JWT authentication + rate limiting (100 req/15 min)
- Admin routes: additional IP allowlist (optional)
- PII (name, phone, email): encrypted at rest
- Payment data: never stored raw (Razorpay tokenisation)
- HTTPS enforced: HSTS header on all responses
- CSP: strict Content-Security-Policy header
- OWASP Top 10 compliance verified pre-launch of each phase

### 9.3 Accessibility
- WCAG 2.1 Level AA compliance
- All interactive elements keyboard-navigable
- ARIA labels on all icons and buttons
- Minimum contrast ratio 4.5:1

### 9.4 SEO
- Every page: unique title, meta description, canonical URL
- JSON-LD structured data: LocalBusiness, Service, Review, FAQPage
- sitemap.xml auto-generated (Phase 2: include dynamic brand/model pages)
- robots.txt: allow all, block /admin, /dashboard, /api
- Core Web Vitals: all green

### 9.5 Internationalisation
- Primary language: English (en-IN)
- Secondary: Hindi (hi-IN) — Phase 6
- hreflang tags in place from Phase 1

---

## 10. Tech Stack Recommendation (Phase 2+)

| Layer | Current | Phase 2+ Recommendation |
|---|---|---|
| **Frontend** | React + Vite + Tailwind | Same + React Query + Zustand |
| **Backend** | None | Node.js + Express + TypeScript |
| **Database** | None | PostgreSQL (Neon / Supabase) |
| **ORM** | None | Drizzle ORM (type-safe, lightweight) |
| **Auth** | None | JWT + bcrypt / Clerk.dev (hosted) |
| **File Storage** | Public folder | Cloudinary |
| **Email** | None | Resend.com API |
| **WhatsApp** | wa.me links | Meta Cloud API / Interakt |
| **Payments** | None | Razorpay |
| **Hosting** | Vercel (static) | Vercel (frontend) + Railway/Render (API) |
| **CDN** | Vercel Edge | Vercel Edge Network |
| **Monitoring** | None | Sentry (errors) + Vercel Analytics |
| **CI/CD** | Manual deploy | GitHub Actions to Vercel |

---

## 11. Open Questions

| # | Question | Impact |
|---|---|---|
| 1 | Will doorstep pickup require live slot booking with calendar integration? | Phase 2 complexity |
| 2 | Is GST registration required on invoices? What GST% applies? | Phase 4 invoicing |
| 3 | Should customers be able to chat with a technician via in-app chat? | Phase 5/6 |
| 4 | Is WhatsApp Business API required for template messages? | Phase 6 notifications |
| 5 | Will there be multiple shop branches in the future? | Multi-location architecture |
| 6 | Should the app be a PWA (installable on phone)? | Phase 3 |

---

## 12. Glossary

| Term | Definition |
|---|---|
| Booking ID | Unique repair order reference (e.g. TMX-2025-00142) |
| Doorstep | Free pickup and delivery from customer's location |
| Drop-off | Customer brings device to shop |
| Walk-in | Customer visits and repairs on-site |
| Chip-Level | PCB/logic board micro-soldering repair |
| NCR | National Capital Region (Delhi + Noida + Gurugram + Faridabad + Ghaziabad) |
| CTA | Call to Action |
| SLA | Service Level Agreement |
