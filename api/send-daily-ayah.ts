import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { surahs } from './_data/surahs.js';

export const config = {
	maxDuration: 60,
};

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

interface QuranVerse {
	number: number;
	text: string;
	audio: string;
	translation: {
		en: { text: string };
		bn: { text: string };
	};
}

interface Subscriber {
	id: string;
	email: string;
	created_at: string;
	is_active: boolean;
	current_surah_number: number;
	current_ayah_number: number;
	unsubscribe_token: string;
}

export default async function handler(req: any, res: any) {
	// Allow both GET (for Vercel Cron) and POST (for manual testing)
	if (req.method !== 'POST' && req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		// Get all active subscribers
		const { data: subscribers, error: subError } = await supabase.from('subscribers').select('*').eq('is_active', true);

		if (subError) {
			console.error('Supabase error fetching subscribers:', subError);
			throw subError;
		}

		if (!subscribers || subscribers.length === 0) {
			return res.status(200).json({ message: 'No active subscribers' });
		}

		let successCount = 0;
		let failCount = 0;

		for (const subscriber of subscribers as Subscriber[]) {
			try {
				const { nextSurah, nextAyah } = await getNextAyah(
					subscriber.current_surah_number,
					subscriber.current_ayah_number,
				);

				const ayahData = await fetchAyahData(nextSurah, nextAyah);

				await sendAyahEmail(subscriber, ayahData, nextSurah, nextAyah);

				// Update progress
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

				successCount++;
			} catch (error) {
				failCount++;
				console.error(`Failed to send to ${subscriber.email}:`, error);
			}
		}

		return res.status(200).json({
			message: 'Daily Ayah process completed',
			successCount,
			failCount,
		});
	} catch (error: any) {
		console.error('Fatal error in daily-ayah cron:', error);
		return res.status(500).json({
			error: 'Internal server error',
			details: error.message,
		});
	}
}

async function getNextAyah(currentSurah: number, currentAyah: number) {
	const currentSurahData = surahs.find((s) => s.number === currentSurah);
	if (!currentSurahData) throw new Error(`Invalid surah ${currentSurah}`);

	let nextSurah = currentSurah;
	let nextAyah = currentAyah + 1;

	if (nextAyah > currentSurahData.ayahCount) {
		nextSurah = currentSurah + 1;
		nextAyah = 1;

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

	if (!response.ok) throw new Error(`Failed to fetch Ayah data: ${response.statusText}`);

	const data = await response.json();
	const editions = data.data;

	return {
		number: ayah,
		text: editions[0].text,
		audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surah}${ayah.toString().padStart(3, '0')}.mp3`,
		translation: {
			en: { text: editions[1].text },
			bn: { text: editions[2].text },
		},
	};
}
async function sendAyahEmail(subscriber: Subscriber, ayahData: QuranVerse, surahNumber: number, ayahNumber: number) {
	const baseUrl = process.env.APP_URL || 'https://www.getdailyquran.com';
	const unsubscribeUrl = `${baseUrl}/api/unsubscribe?token=${subscriber.unsubscribe_token}`;
	const surahName = surahs.find((s) => s.number === surahNumber)?.englishName || 'Surah';
	const pricingUrl = `${baseUrl}/#pricing`;

	const emailHtml = `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Daily Ayah</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <link href="https://fonts.googleapis.com/css2?family=Amiri&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
    }
    .container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
    }
    .header {
      padding: 24px 0;
    }
    .greeting {
      font-size: 15px;
      color: #333333;
      margin-bottom: 20px;
      padding: 0 10px;
    }
    .ayah-card {
      background-color: #fdfaf2; /* Light cream/yellowish */
      border-radius: 16px;
      padding: 40px 24px;
      text-align: center;
      margin-bottom: 24px;
      position: relative;
      overflow: hidden;
    }
    .badge-secondary {
      display: inline-block;
      padding: 4px 16px;
      border: 1px solid #f59e0b; /* Gold border */
      border-radius: 100px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #d97706; /* Darker gold */
      margin-bottom: 24px;
      background-color: #ffffff;
    }
    .arabic {
      font-family: 'Amiri', serif;
      font-size: 32px;
      line-height: 2;
      color: #1a1a1a;
      direction: rtl;
      margin: 0 0 24px 0;
    }
    .divider {
      text-align: center;
      margin-top: 10px;
    }
    .divider-line {
      display: inline-block;
      width: 40px;
      height: 1px;
      background-color: #f59e0b;
      vertical-align: middle;
      opacity: 0.3;
    }
    .divider-icon {
      display: inline-block;
      color: #d97706;
      font-size: 14px;
      margin: 0 10px;
      vertical-align: middle;
      opacity: 0.6;
    }
    .translation-container {
      width: 100%;
      margin-bottom: 24px;
    }
    .translation-box {
      background-color: #f2f7f4; /* Very light green */
      border: 1px solid #d1e3d6; /* Light green border */
      border-radius: 12px;
      padding: 20px;
      text-align: left;
    }
    .translation-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1b5e20; /* Dark green */
      margin-bottom: 12px;
    }
    .translation-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #1b5e20;
      border-radius: 50%;
      margin-right: 8px;
    }
    .translation-text-en {
      font-size: 14px;
      font-style: italic;
      color: #444444;
      margin: 0;
      line-height: 1.6;
    }
    .translation-text-bn {
      font-size: 15px;
      color: #444444;
      margin: 0;
      line-height: 1.6;
    }
    .audio-box {
      background-color: #fdfaf2;
      border: 1px solid #fde68a;
      border-radius: 12px;
      padding: 20px;
      text-align: left;
      margin-bottom: 32px;
      text-decoration: none;
      display: block;
    }
    .audio-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #d97706;
      margin-bottom: 16px;
    }
    .audio-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #d97706;
      border-radius: 50%;
      margin-right: 4px;
    }
    .player-row {
      display: table;
      width: 100%;
    }
    .play-btn-cell {
      width: 48px;
      vertical-align: middle;
    }
    .play-btn {
      width: 36px;
      height: 36px;
      background-color: #1b5e20;
      border-radius: 50%;
      display: inline-block;
      text-align: center;
      line-height: 36px;
      color: white;
      font-size: 12px;
    }
    .progress-cell {
      vertical-align: middle;
      padding: 0 16px;
    }
    .progress-track {
      width: 100%;
      height: 6px;
      background-color: #d1d5db;
      border-radius: 3px;
    }
    .progress-fill {
      width: 33%;
      height: 6px;
      background-color: #86efac;
      border-radius: 3px;
    }
    .time-cell {
      width: 30px;
      vertical-align: middle;
      font-size: 12px;
      color: #6b7280;
      text-align: right;
    }
    .footer-author {
      text-align: center;
      font-size: 13px;
      color: #6b7280;
      margin-bottom: 40px;
    }
    .unsub-text {
      text-align: center;
      font-size: 11px;
      color: #9ca3af;
      margin-top: 40px;
    }
    .unsub-text a {
      color: #6b7280;
      text-decoration: underline;
    }

    /* Responsive grid classes */
    .col-half {
      width: 48%;
      display: inline-block;
      vertical-align: top;
    }
    .col-spacer {
      width: 3%;
      display: inline-block;
    }
    @media only screen and (max-width: 768px) {
      .col-half {
        width: 100% !important;
        display: block !important;
        margin-bottom: 16px !important;
      }
      .col-spacer {
        display: none !important;
      }
      .ayah-card {
        padding: 30px 16px;
      }
      .arabic {
        font-size: 26px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="greeting">Assalamu Alaikum 🤲 Here is your Ayah for today</div>

      <!-- Ayah Card -->
      <div class="ayah-card">
        <div class="badge-secondary">SURAH ${surahNumber} · VERSE ${ayahNumber}</div>
        <p class="arabic" dir="rtl">${ayahData.text}</p>
        <div class="divider">
          <span class="divider-line"></span>
          <span class="divider-icon" style="font-family: Arial, sans-serif;">☪&#xFE0E;</span>
          <span class="divider-line"></span>
        </div>
      </div>

      <!-- Translations Grid -->
      <div class="translation-container" style="font-size: 0; text-align: center;">
        <!--[if mso]>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
        <td width="48%" valign="top">
        <![endif]-->
        
        <div class="col-half">
          <div class="translation-box">
            <div class="translation-label">
              <span class="translation-dot"></span>ENGLISH TRANSLATION
            </div>
            <p class="translation-text-en">"${ayahData.translation.en.text}"</p>
          </div>
        </div>
        
        <!--[if mso]>
        </td>
        <td width="4%"></td>
        <td width="48%" valign="top">
        <![endif]-->
        <div class="col-spacer"></div>
        
        <div class="col-half">
          <div class="translation-box">
            <div class="translation-label">
              <span class="translation-dot"></span>বাংলা অনুবাদ
            </div>
            <p class="translation-text-bn">${ayahData.translation.bn.text}</p>
          </div>
        </div>
        
        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </div>

      <!-- Audio Player -->
      <a href="${ayahData.audio}" class="audio-box">
        <div class="audio-label">
          <span class="audio-dot"></span> 🎧 AUDIO RECITATION
        </div>
        <table class="player-row" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td class="play-btn-cell">
              <div class="play-btn">
                <div style="display: inline-block; width: 0; height: 0; border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-left: 8px solid white; margin-left: 3px; vertical-align: middle;"></div>
              </div>
            </td>
            <td class="progress-cell">
              <div class="progress-track">
                <div class="progress-fill"></div>
              </div>
            </td>
            <td class="time-cell">0:42</td>
          </tr>
        </table>
      </a>

      <div class="footer-author">
        — Sheikh Mishary Rashid Alafasy · ${surahName} (${surahNumber}:${ayahNumber})
      </div>

      <!-- Footer Info -->
      <!-- Pricing Section -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px;">
        <tr>
          <td style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 24px; text-align: center;">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 12px;">
              Daily Quran Pro
            </div>
            <p style="font-size: 14px; color: #475569; margin: 0 0 20px 0; line-height: 1.5;">
              Subscribe to Pro to support our premium hosting, email delivery, and ongoing development.
            </p>
            <a href="${pricingUrl}" style="display: inline-block; background-color: #1b5e20; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
              Support us by going Pro
            </a>
          </td>
        </tr>
      </table>

      <div class="unsub-text">
        This daily Ayah was sent to ${subscriber.email}.<br>
        <a href="${unsubscribeUrl}">Unsubscribe</a>
      </div>
    </div>
  </div>
</body>
</html>
`;

	try {
		await transporter.sendMail({
			from: process.env.EMAIL_FROM || `"Daily Quran" <${process.env.SMTP_USER}>`,
			to: subscriber.email,
			subject: `Your Daily Ayah - ${surahName} ${surahNumber}:${ayahNumber}`,
			html: emailHtml,
		});
	} catch (error: any) {
		throw new Error(`SMTP error: ${error.message}`);
	}
}
