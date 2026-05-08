# Daily Quran Email Subscription MVP - Implementation Plan

**Version:** 1.1
**Status:** In Progress (Publication Phase)
**Last Updated:** May 8, 2026
**Project:** Daily Quran
**Workspace:** `/Users/sifathaque/Desktop/daily-quran`

---

## 1. Executive Summary

**Goal:** Build a zero-authentication email subscription MVP for the Daily Quran app that sends one personalized Ayah daily to subscribers via email.

**Status:** Core functionality (subscription, unsubscription, and daily email cron) is implemented. Auth and Dashboard files have been removed to focus on the zero-auth model.

---

## 2. Implementation Progress

### Phase 1: Database Setup (Supabase) ✅
- [x] Create `subscribers` table
- [x] Create `delivery_logs` table
- [x] Add indexes for performance

### Phase 2: API Layer (Vercel Functions) ✅
- [x] `api/subscribe.ts`: Handle subscriptions
- [x] `api/unsubscribe.ts`: Handle one-click unsubscribes
- [x] `api/send-daily-ayah.ts`: Daily email cron job logic
- [x] Configure `vercel.json` for cron schedule

### Phase 3: Frontend Updates ✅
- [x] Landing page subscription form integration
- [x] Success/error messaging
- [x] Removed unnecessary Auth (Login/Signup) and Dashboard pages
- [x] Updated Footer and FAQ to reflect Zero-Auth model

### Phase 4: Environment & Dependencies ✅
- [x] Install `@supabase/supabase-js` and `nodemailer`
- [x] Create `.env.local` with necessary secrets
- [x] Parameterize `EMAIL_FROM` in API

---

## 3. Phase 5: Publication & Launch (Remaining Tasks)

### 1. Google SMTP Setup
- [ ] **Generate App Password**: Go to Google Account > Security > 2-Step Verification > App Passwords. Generate a password for "Mail".
- [ ] **Update `SMTP_USER` & `SMTP_PASS`**: Add your Gmail and the App Password to Vercel environment variables.
- [ ] **Update `EMAIL_FROM`**: Set your sender name and email (e.g., `"Daily Quran" <your-email@gmail.com>`).

### 2. Vercel Deployment & Config
- [ ] **Import Project**: Connect the GitHub repository to Vercel.
- [ ] **Set Environment Variables**:
    - `SMTP_USER`
    - `SMTP_PASS`
    - `EMAIL_FROM`
    - `VERCEL_URL` (Set to your production domain)
    - `SUPABASE_URL`
    - `SUPABASE_SERVICE_ROLE_KEY`
- [ ] **Explicit Runtimes**: Ensure `vercel.json` is fully configured to handle the serverless function runtimes.

### 3. SEO & Metadata Optimization
- [ ] **Update `index.html`**:
    - Improve meta description and Open Graph tags.
    - Add a favicon and touch icons.
- [ ] **PWA Manifest**: Create `public/manifest.json` to allow users to "Install" the app on their home screens.
- [ ] **Sitemap & Robots**: Add a `sitemap.xml` and update `robots.txt` for better search engine indexing.

### 4. Final Testing (Production Environment)
- [ ] **Test Subscription**: Verify a real email can subscribe and receive a "Success" message.
- [ ] **Test Unsubscribe**: Ensure the link in the email works in the production environment.
- [ ] **Manual Cron Trigger**: Manually trigger the `/api/send-daily-ayah` (via POST) to verify end-to-end delivery.

---

## 4. Production Checklist

- [ ] Gmail App Password generated
- [ ] Environment variables set in Vercel dashboard
- [ ] `SMTP_USER` and `SMTP_PASS` confirmed
- [ ] `VERCEL_URL` points to the final domain
- [ ] PWA Manifest and icons added to `public/`
- [ ] Metadata updated in `index.html`
- [ ] `robots.txt` and `sitemap.xml` configured
- [ ] One final successful test of the subscription flow

---

## 5. Technical Decisions (Finalized)

| Decision | Rationale |
| :--- | :--- |
| **Zero Authentication** | Maximizes conversion and simplifies the MVP. |
| **Google SMTP + Vercel Cron** | Cost-effective and reliable for high-deliverability emails. |
| **Direct Quran API** | Fetches fresh data for every email, avoiding large local data storage. |
| **POST-only Cron** | Security measure to prevent accidental triggers (Vercel Crons use POST). |
| **Crypto UUID Tokens** | Secure, unguessable tokens for one-click unsubscriptions. |
