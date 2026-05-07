# Daily Quran Email Subscription MVP - Implementation Plan

**Version:** 1.0
**Status:** Ready for Implementation
**Last Updated:** May 7, 2026
**Project:** Daily Quran
**Workspace:** `/Users/sifathaque/Desktop/daily-quran`

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Prerequisites & Dependencies](#prerequisites--dependencies)
4. [Implementation Phases](#implementation-phases)
5. [File Structure & Creation](#file-structure--creation)
6. [Code Implementation Details](#code-implementation-details)
7. [Environment Setup](#environment-setup)
8. [Testing & Verification](#testing--verification)
9. [Deployment](#deployment)
10. [Decision Log](#decision-log)
11. [Risk Mitigation](#risk-mitigation)

---

## Executive Summary

**Goal:** Build a zero-authentication email subscription MVP for the Daily Quran app that sends one personalized Ayah daily to subscribers via email.

**Scope:**

- Email subscription form on landing page
- Serverless API layer for subscribe/unsubscribe
- Supabase PostgreSQL for subscriber data and progress tracking
- Resend for email delivery
- Vercel Cron for daily email scheduling
- Per-user progress tracking (independent Quran progression)

**Timeline:** ~3-5 days for complete implementation
**Resources:** 1 Developer, Vercel account, Supabase account, Resend account
**Success Metric:** Users receive personalized daily Ayah emails with unsubscribe functionality

---

## Architecture Overview

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React/Vite)                    │
│                    [Index.tsx Landing Page]                 │
│                   Email Subscription Form                   │
└────────┬────────────────────────────────────────────────────┘
         │
         │ POST /api/subscribe
         │
┌────────▼──────────────────────────────────────────────────────┐
│               Vercel Functions (Serverless)                   │
│  ┌─────────────────┐  ┌──────────────┐  ┌────────────────┐   │
│  │  /api/subscribe │  │ /api/unsub   │  │ /api/send-     │   │
│  │                 │  │   scribe     │  │ daily-ayah     │   │
│  │ • Validate email│  │              │  │ (Cron Job)     │   │
│  │ • Create token  │  │ • Set inactive│  │ • Query subs   │   │
│  │ • Store in DB   │  │ • Return 200 │  │ • Fetch Ayah   │   │
│  │ • Return 200    │  │              │  │ • Send email   │   │
│  └─────────────────┘  └──────────────┘  │ • Update prog  │   │
│                                          │ • Log delivery │   │
│                                          └────────────────┘   │
└────────┬────────────────────────────────────────────────────┘
         │
         ├──► Supabase PostgreSQL
         │    [subscribers table]
         │    [delivery_logs table]
         │
         ├──► Resend API
         │    [Email Service]
         │
         └──► api.alquran.cloud
              [Quran Data Source]
```

### Data Flow

1. **Subscription:** User enters email → API validates → Creates subscriber record with unique unsubscribe token
2. **Daily Send:** Cron triggers at 6 AM UTC → Fetch all active subscribers → For each subscriber: get current Ayah → Fetch from Quran API → Send personalized email → Update progress
3. **Unsubscribe:** User clicks unsubscribe link with token → API validates token → Mark subscriber inactive

### Key Tables

**`subscribers` Table:**

- `id` (UUID, PRIMARY KEY)
- `email` (TEXT, UNIQUE, NOT NULL) - subscriber's email
- `created_at` (TIMESTAMP WITH TIME ZONE DEFAULT NOW()) - subscription date
- `is_active` (BOOLEAN, DEFAULT TRUE) - subscription status
- `current_surah_number` (INT, DEFAULT 1) - current surah (1-114)
- `current_ayah_number` (INT, DEFAULT 1) - current ayah in surah
- `unsubscribe_token` (TEXT, UNIQUE, NOT NULL) - secure unsubscribe identifier

**`delivery_logs` Table:**

- `id` (UUID, PRIMARY KEY)
- `subscriber_id` (UUID, FOREIGN KEY) - reference to subscriber
- `surah_number` (INT) - ayah sent
- `ayah_number` (INT) - ayah sent
- `sent_at` (TIMESTAMP WITH TIME ZONE DEFAULT NOW()) - delivery timestamp

---

## Prerequisites & Dependencies

### Accounts & Services

- ✅ **Vercel Account** - For hosting and serverless functions
- ✅ **Supabase Account** - For PostgreSQL database
- ✅ **Resend Account** - For email delivery (100 emails/day free)

### Development Environment

- ✅ **Node.js 18+** - Already configured in project
- ✅ **npm** - Package manager
- ✅ **Git** - Version control

### External APIs

- ✅ **api.alquran.cloud** - Quran data source (already used in app)

---

## Implementation Phases

### Phase 1: Database Setup (Supabase)

**Duration:** 30 minutes
**Dependencies:** None

1. Create new Supabase project
2. Create `subscribers` table with schema above
3. Create `delivery_logs` table with schema above
4. Note down project URL and service role key

### Phase 2: API Layer (Vercel Functions)

**Duration:** 2-3 hours
**Dependencies:** Phase 1

1. Create `api/subscribe.ts` - Handle email subscriptions
2. Create `api/unsubscribe.ts` - Handle one-click unsubscribes
3. Create `api/send-daily-ayah.ts` - Daily email cron job
4. Create `vercel.json` - Cron configuration

### Phase 3: Frontend Updates

**Duration:** 1 hour
**Dependencies:** Phase 2

1. Update landing page subscription form
2. Add success/error handling
3. Test form integration

### Phase 4: Environment & Deployment

**Duration:** 30 minutes
**Dependencies:** All previous phases

1. Create `.env.local` with secrets
2. Deploy to Vercel
3. Configure environment variables
4. Test end-to-end flow

---

## File Structure & Creation

### New Files to Create

```
daily-quran/
├── IMPLEMENTATION_PLAN.md          # This file
├── .env.local                      # Environment variables
├── vercel.json                     # Vercel configuration
└── api/
    ├── subscribe.ts                # Subscription endpoint
    ├── unsubscribe.ts              # Unsubscribe endpoint
    └── send-daily-ayah.ts          # Daily email cron job
```

### Modified Files

```
daily-quran/
├── src/pages/Index.tsx             # Update subscription form
├── package.json                    # Add dependencies
└── index.html                      # Update metadata
```

---

## Code Implementation Details

### 1. Database Schema (Supabase SQL)

```sql
-- Create subscribers table
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  current_surah_number INTEGER DEFAULT 1,
  current_ayah_number INTEGER DEFAULT 1,
  unsubscribe_token TEXT UNIQUE NOT NULL
);

-- Create delivery_logs table
CREATE TABLE delivery_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subscriber_id UUID REFERENCES subscribers(id),
  surah_number INTEGER NOT NULL,
  ayah_number INTEGER NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_active ON subscribers(is_active);
CREATE INDEX idx_delivery_logs_subscriber ON delivery_logs(subscriber_id);
```

### 2. Vercel Functions

#### `api/subscribe.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json();

		if (!email || !email.includes('@')) {
			return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
		}

		// Generate unique unsubscribe token
		const unsubscribeToken = crypto.randomUUID();

		const { data, error } = await supabase
			.from('subscribers')
			.insert([{ email, unsubscribe_token: unsubscribeToken }])
			.select();

		if (error) {
			if (error.code === '23505') {
				// Unique violation
				return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 });
			}
			throw error;
		}

		return NextResponse.json({
			message: 'Successfully subscribed! Check your email tomorrow.',
			subscriber: data[0],
		});
	} catch (error) {
		console.error('Subscription error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
```

#### `api/unsubscribe.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const token = searchParams.get('token');

		if (!token) {
			return NextResponse.json({ error: 'Token required' }, { status: 400 });
		}

		const { data, error } = await supabase
			.from('subscribers')
			.update({ is_active: false })
			.eq('unsubscribe_token', token)
			.select();

		if (error) throw error;

		if (!data || data.length === 0) {
			return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
		}

		// Return simple HTML confirmation page
		return new NextResponse(
			`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Unsubscribed</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .success { color: #22c55e; }
          </style>
        </head>
        <body>
          <h1 class="success">Successfully Unsubscribed</h1>
          <p>You will no longer receive daily Ayah emails.</p>
          <p>You can always subscribe again from our website.</p>
        </body>
      </html>
    `,
			{
				headers: { 'Content-Type': 'text/html' },
			},
		);
	} catch (error) {
		console.error('Unsubscribe error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
```

#### `api/send-daily-ayah.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const resend = new Resend(process.env.RESEND_API_KEY!);

interface QuranVerse {
	number: number;
	text: string;
	audio: string;
	translation: {
		en: { text: string };
		bn: { text: string };
	};
}

export async function POST(request: NextRequest) {
	try {
		// Get all active subscribers
		const { data: subscribers, error: subError } = await supabase.from('subscribers').select('*').eq('is_active', true);

		if (subError) throw subError;

		console.log(`Sending daily Ayah to ${subscribers?.length || 0} subscribers`);

		for (const subscriber of subscribers || []) {
			try {
				// Calculate next Ayah for this subscriber
				const { nextSurah, nextAyah } = await getNextAyah(
					subscriber.current_surah_number,
					subscriber.current_ayah_number,
				);

				// Fetch Ayah data from Quran API
				const ayahData = await fetchAyahData(nextSurah, nextAyah);

				// Send email
				await sendAyahEmail(subscriber, ayahData);

				// Update subscriber progress
				await supabase
					.from('subscribers')
					.update({
						current_surah_number: nextSurah,
						current_ayah_number: nextAyah,
					})
					.eq('id', subscriber.id);

				// Log delivery
				await supabase.from('delivery_logs').insert([
					{
						subscriber_id: subscriber.id,
						surah_number: nextSurah,
						ayah_number: nextAyah,
					},
				]);

				console.log(`Sent Ayah ${nextSurah}:${nextAyah} to ${subscriber.email}`);
			} catch (error) {
				console.error(`Failed to send to ${subscriber.email}:`, error);
				// Continue with other subscribers
			}
		}

		return NextResponse.json({
			message: `Processed ${subscribers?.length || 0} subscribers`,
		});
	} catch (error) {
		console.error('Daily send error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

async function getNextAyah(currentSurah: number, currentAyah: number) {
	// Import surah data to know ayah counts
	const surahs = (await import('../src/data/surahs')).surahs;

	const currentSurahData = surahs.find((s) => s.number === currentSurah);
	if (!currentSurahData) throw new Error(`Invalid surah ${currentSurah}`);

	let nextSurah = currentSurah;
	let nextAyah = currentAyah + 1;

	// If we've reached the end of current surah, move to next surah
	if (nextAyah > currentSurahData.numberOfAyahs) {
		nextSurah = currentSurah + 1;
		nextAyah = 1;

		// If we've reached the end of Quran, loop back to start
		if (nextSurah > 114) {
			nextSurah = 1;
			nextAyah = 1;
		}
	}

	return { nextSurah, nextAyah };
}

async function fetchAyahData(surah: number, ayah: number): Promise<QuranVerse> {
	const response = await fetch(
		`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/editions/quran-uthmani,en.sahih,bn.bengali`,
	);

	if (!response.ok) throw new Error('Failed to fetch Ayah data');

	const data = await response.json();
	const editions = data.data;

	return {
		number: ayah,
		text: editions[0].text, // Arabic
		audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surah}${ayah.toString().padStart(3, '0')}.mp3`,
		translation: {
			en: { text: editions[1].text },
			bn: { text: editions[2].text },
		},
	};
}

async function sendAyahEmail(subscriber: any, ayahData: QuranVerse) {
	const unsubscribeUrl = `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/unsubscribe?token=${subscriber.unsubscribe_token}`;

	const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Your Daily Ayah</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .arabic { font-size: 24px; text-align: right; direction: rtl; font-family: 'Amiri', serif; }
          .translation { margin: 20px 0; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
          .unsubscribe { margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Your Daily Ayah</h1>

        <div class="arabic">${ayahData.text}</div>

        <div class="translation">
          <h3>English Translation:</h3>
          <p>${ayahData.translation.en.text}</p>
        </div>

        <div class="translation">
          <h3>বাংলা অনুবাদ (Bangla Translation):</h3>
          <p>${ayahData.translation.bn.text}</p>
        </div>

        <div class="translation">
          <h3>Audio Recitation:</h3>
          <p><a href="${ayahData.audio}">Listen to this Ayah</a></p>
        </div>

        <div class="footer">
          <p>This is Ayah ${subscriber.current_surah_number}:${subscriber.current_ayah_number} from your personalized Quran journey.</p>

          <div class="unsubscribe">
            <p><a href="${unsubscribeUrl}">Unsubscribe from daily emails</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

	await resend.emails.send({
		from: 'Daily Quran <daily@yourdomain.com>', // Update with your verified domain
		to: subscriber.email,
		subject: `Your Daily Ayah - ${subscriber.current_surah_number}:${subscriber.current_ayah_number}`,
		html: emailHtml,
	});
}
```

### 3. Vercel Configuration (`vercel.json`)

```json
{
	"functions": {
		"api/**/*.ts": {
			"runtime": "@vercel/node"
		}
	},
	"crons": [
		{
			"path": "/api/send-daily-ayah",
			"schedule": "0 6 * * *"
		}
	]
}
```

### 4. Frontend Updates

#### Update `src/pages/Index.tsx`

```typescript
// Add this import at the top
import { useState } from 'react'

// Add this state and function inside the component
const [email, setEmail] = useState('')
const [isSubscribing, setIsSubscribing] = useState(false)
const [subscribeMessage, setSubscribeMessage] = useState('')

const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubscribing(true)
  setSubscribeMessage('')

  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })

    const data = await response.json()

    if (response.ok) {
      setSubscribeMessage('Successfully subscribed! Check your email tomorrow.')
      setEmail('')
    } else {
      setSubscribeMessage(data.error || 'Subscription failed')
    }
  } catch (error) {
    setSubscribeMessage('Network error. Please try again.')
  } finally {
    setIsSubscribing(false)
  }
}

// Replace the existing newsletter form with this
<div className="bg-white p-8 rounded-lg shadow-lg">
  <h3 className="text-2xl font-bold text-center mb-4">Start Your Daily Quran Journey</h3>
  <p className="text-gray-600 text-center mb-6">
    Receive one beautiful Ayah every morning at 6 AM
  </p>

  <form onSubmit={handleSubscribe} className="space-y-4">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email address"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      required
    />

    <button
      type="submit"
      disabled={isSubscribing}
      className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50"
    >
      {isSubscribing ? 'Subscribing...' : 'Subscribe Now'}
    </button>
  </form>

  {subscribeMessage && (
    <p className={`mt-4 text-center ${subscribeMessage.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>
      {subscribeMessage}
    </p>
  )}
</div>
```

### 5. Package Dependencies

Add these to `package.json`:

```json
{
	"dependencies": {
		"@supabase/supabase-js": "^2.39.0",
		"resend": "^3.2.0"
	}
}
```

---

## Environment Setup

### 1. Create `.env.local`

```bash
# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend
RESEND_API_KEY=your_resend_api_key

# Vercel (auto-populated in production)
VERCEL_URL=https://your-app.vercel.app
```

### 2. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project
3. Go to SQL Editor and run the schema SQL above
4. Go to Settings > API to get URL and service role key

### 3. Resend Setup

1. Go to [resend.com](https://resend.com) and create account
2. Get API key from dashboard
3. Verify your domain (for production emails)

---

## Testing & Verification

### Manual Testing Steps

1. **Test Subscription:**
   - Submit email on landing page
   - Verify database entry created
   - Check unsubscribe token generated

2. **Test Unsubscribe:**
   - Click unsubscribe link from email
   - Verify user marked inactive in database

3. **Test Daily Send:**
   - Manually call `/api/send-daily-ayah` endpoint
   - Verify email received with correct Ayah
   - Check progress updated in database
   - Verify delivery logged

4. **Test Ayah Progression:**
   - Subscribe multiple test emails
   - Run daily send multiple times
   - Verify each user gets different Ayahs
   - Test wrap-around after Quran completion

### Automated Testing (Future)

```typescript
// Example test for subscribe endpoint
describe('/api/subscribe', () => {
	it('should create subscriber with valid email', async () => {
		const response = await request(app).post('/api/subscribe').send({ email: 'test@example.com' }).expect(200);

		expect(response.body.message).toContain('Successfully subscribed');
	});
});
```

---

## Deployment

### Vercel Deployment Steps

1. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings (should auto-detect Vite)

2. **Environment Variables:**
   - Add all variables from `.env.local` in Vercel dashboard
   - Set production values

3. **Domain Setup:**
   - Configure custom domain if needed
   - Update Resend domain verification

4. **Cron Verification:**
   - Check Vercel dashboard for cron job status
   - Monitor function logs

### Production Checklist

- [ ] Domain verified in Resend
- [ ] Environment variables set in Vercel
- [ ] Database tables created
- [ ] Test subscription flow
- [ ] Test email delivery
- [ ] Verify cron job scheduled
- [ ] Update email sender address

---

## Decision Log

### Core Architecture Decisions

| Decision                    | Rationale                                        | Alternatives Considered                    |
| --------------------------- | ------------------------------------------------ | ------------------------------------------ |
| **Zero Authentication**     | MVP focus on email delivery, not user management | Firebase Auth, custom auth                 |
| **Per-user Progress**       | Personalized learning experience                 | Global daily Ayah, random selection        |
| **Supabase PostgreSQL**     | Serverless, easy setup, good DX                  | PlanetScale, Railway, AWS RDS              |
| **Resend Email**            | Vercel-friendly, good free tier                  | SendGrid, Mailgun, AWS SES                 |
| **Vercel Cron**             | Built-in, no extra services                      | External cron (EasyCron), Supabase pg_cron |
| **Wrap-around Progression** | Continuous learning cycle                        | Stop at end, restart confirmation          |

### Technical Decisions

| Decision               | Rationale                           | Alternatives Considered             |
| ---------------------- | ----------------------------------- | ----------------------------------- |
| **UUID for tokens**    | Secure, unique, URL-safe            | Hash-based tokens, numeric IDs      |
| **Service Role Key**   | Full database access for serverless | Row Level Security + anon key       |
| **HTML Emails**        | Rich formatting for Arabic text     | Plain text, MJML templates          |
| **External Quran API** | Reliable, comprehensive data        | Local Quran database, different API |
| **Delivery Logging**   | Debugging and analytics             | No logging, external analytics      |

---

## Risk Mitigation

### High Priority Risks

1. **Email Deliverability**
   - **Risk:** Emails marked as spam
   - **Mitigation:** Use verified domain, monitor reputation, add unsubscribe headers

2. **API Rate Limits**
   - **Risk:** Quran API or Resend limits hit
   - **Mitigation:** Implement caching, batch processing, monitor usage

3. **Database Performance**
   - **Risk:** Slow queries with many subscribers
   - **Mitigation:** Proper indexing, query optimization, pagination

### Medium Priority Risks

4. **Cron Job Failures**
   - **Risk:** Daily emails not sent
   - **Mitigation:** Monitoring, retry logic, manual trigger fallback

5. **Data Loss**
   - **Risk:** Subscriber data lost
   - **Mitigation:** Regular backups, data validation

### Low Priority Risks

6. **Arabic Text Rendering**
   - **Risk:** Poor display in emails
   - **Mitigation:** Test across email clients, use web fonts

7. **Timezone Issues**
   - **Risk:** Emails sent at wrong time
   - **Mitigation:** UTC scheduling, future per-user timezone support

---

## Success Metrics

- [ ] **Subscription Rate:** Track daily/weekly signups
- [ ] **Email Deliverability:** Monitor open rates, bounce rates
- [ ] **Unsubscribe Rate:** Track churn percentage
- [ ] **User Engagement:** Track email opens, audio plays
- [ ] **System Reliability:** Monitor API response times, error rates

---

## Future Enhancements

### Phase 2 Features (Post-MVP)

- User authentication and dashboard
- Customizable delivery times
- Progress visualization
- Multiple translation languages
- Bookmarking system
- Social sharing

### Technical Improvements

- Email templates with MJML
- Advanced analytics
- A/B testing for email content
- Mobile app companion
- Offline Quran access

---

**Ready to implement! Start with Phase 1 (Database Setup) and work through each phase systematically.**
