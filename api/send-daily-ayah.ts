import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { surahs } from '../src/data/surahs';

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

export default async function handler(request: VercelRequest, response: VercelResponse) {
	if (request.method !== 'POST') {
		return response.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const { data: subscribers, error: subError } = await supabase.from('subscribers').select('*').eq('is_active', true);

		if (subError) throw subError;

		console.log(`Sending daily Ayah to ${subscribers?.length || 0} subscribers`);

		for (const subscriber of subscribers || []) {
			try {
				const { nextSurah, nextAyah } = await getNextAyah(
					subscriber.current_surah_number,
					subscriber.current_ayah_number,
				);

				const ayahData = await fetchAyahData(nextSurah, nextAyah);

				await sendAyahEmail(subscriber, ayahData);

				await supabase
					.from('subscribers')
					.update({
						current_surah_number: nextSurah,
						current_ayah_number: nextAyah,
					})
					.eq('id', subscriber.id);

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
			}
		}

		return response.status(200).json({
			message: `Processed ${subscribers?.length || 0} subscribers`,
		});
	} catch (error) {
		console.error('Daily send error:', error);
		return response.status(500).json({ error: 'Internal server error' });
	}
}

async function getNextAyah(currentSurah: number, currentAyah: number) {
	const currentSurahData = surahs.find((s) => s.number === currentSurah);
	if (!currentSurahData) throw new Error(`Invalid surah ${currentSurah}`);

	let nextSurah = currentSurah;
	let nextAyah = currentAyah + 1;

	if (nextAyah > currentSurahData.numberOfAyahs) {
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

	if (!response.ok) throw new Error('Failed to fetch Ayah data');

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
		from: 'Daily Quran <daily@yourdomain.com>',
		to: subscriber.email,
		subject: `Your Daily Ayah - ${subscriber.current_surah_number}:${subscriber.current_ayah_number}`,
		html: emailHtml,
	});
}
