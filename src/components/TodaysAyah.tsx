import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useRef } from 'react';

const TodaysAyah = () => {
	const [playing, setPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	const ayah = {
		surah: 'Al-Baqarah',
		surahNumber: 2,
		ayahNumber: 255,
		arabic:
			'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
		english:
			'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.',
		bangla:
			'আল্লাহ, তিনি ব্যতীত কোনো উপাস্য নেই। তিনি চিরঞ্জীব, সর্বসত্তার ধারক। তাঁকে তন্দ্রা বা নিদ্রা স্পর্শ করে না। আসমান ও জমীনে যা কিছু আছে সবই তাঁর।',
		audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3',
	};

	const toggleAudio = () => {
		if (!audioRef.current) return;
		if (playing) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setPlaying(!playing);
	};

	return (
		<Card className="overflow-hidden border-secondary/30 shadow-lg">
			<div className="bg-primary px-6 py-3 flex items-center justify-between">
				<span className="text-primary-foreground text-sm font-medium">Today's Ayah</span>
				<span className="text-primary-foreground/80 text-xs">
					Surah {ayah.surah} ({ayah.surahNumber}:{ayah.ayahNumber})
				</span>
			</div>
			<CardContent className="p-6 space-y-5">
				<p className="font-arabic text-2xl md:text-3xl leading-loose text-right text-foreground" dir="rtl">
					{ayah.arabic}
				</p>
				<div className="space-y-3">
					<div>
						<span className="text-xs font-semibold uppercase tracking-wider text-secondary">English</span>
						<p className="text-sm text-muted-foreground mt-1">{ayah.english}</p>
					</div>
					<div>
						<span className="text-xs font-semibold uppercase tracking-wider text-secondary">বাংলা</span>
						<p className="text-sm text-muted-foreground mt-1">{ayah.bangla}</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<Button size="sm" variant="outline" onClick={toggleAudio} className="gap-2">
						{playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
						{playing ? 'Pause' : 'Listen'}
					</Button>
					<audio ref={audioRef} src={ayah.audioUrl} onEnded={() => setPlaying(false)} />
				</div>
			</CardContent>
		</Card>
	);
};

export default TodaysAyah;
