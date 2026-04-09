import { useState, useRef } from 'react';
import { Play, Pause, ChevronRight, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { surahs, type Surah } from '@/data/surahs';

interface Ayah {
	number: number;
	arabic: string;
	english: string;
	bangla: string;
	audioUrl: string;
}

const QuranBrowser = () => {
	const [selectedSurah, setSelectedSurah] = useState<Surah>(surahs[0]);
	const [ayahs, setAyahs] = useState<Ayah[]>([]);
	const [loading, setLoading] = useState(false);
	const [playingAyah, setPlayingAyah] = useState<number | null>(null);
	const [playingFullSurah, setPlayingFullSurah] = useState(false);
	const [currentFullSurahIndex, setCurrentFullSurahIndex] = useState(0);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	const fetchAyahs = async (surah: Surah) => {
		setSelectedSurah(surah);
		setSidebarOpen(false);
		setLoading(true);
		setPlayingAyah(null);
		setPlayingFullSurah(false);

		try {
			const arRes = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/ar.alafasy`);
			const arData = await arRes.json();
			const enRes = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/en.sahih`);
			const enData = await enRes.json();
			const bnRes = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/bn.bengali`);
			const bnData = await bnRes.json();

			const mapped: Ayah[] = arData.data.ayahs.map((a: any, i: number) => ({
				number: a.numberInSurah,
				arabic: a.text,
				english: enData.data.ayahs[i]?.text || '',
				bangla: bnData.data.ayahs[i]?.text || '',
				audioUrl: a.audio,
			}));

			setAyahs(mapped);
		} catch (err) {
			console.error('Failed to fetch ayahs:', err);
		} finally {
			setLoading(false);
		}
	};

	const toggleAudio = (ayahNumber: number, url: string) => {
		if (!audioRef.current) return;
		setPlayingFullSurah(false);
		if (playingAyah === ayahNumber) {
			audioRef.current.pause();
			setPlayingAyah(null);
		} else {
			audioRef.current.src = url;
			audioRef.current.play();
			setPlayingAyah(ayahNumber);
		}
	};

	const playFullSurah = () => {
		if (!audioRef.current || ayahs.length === 0) return;
		if (playingFullSurah) {
			audioRef.current.pause();
			setPlayingFullSurah(false);
			setPlayingAyah(null);
			return;
		}
		setPlayingFullSurah(true);
		setCurrentFullSurahIndex(0);
		setPlayingAyah(ayahs[0].number);
		audioRef.current.src = ayahs[0].audioUrl;
		audioRef.current.play();
	};

	const handleAudioEnded = () => {
		if (playingFullSurah && ayahs.length > 0) {
			const nextIndex = currentFullSurahIndex + 1;
			if (nextIndex < ayahs.length) {
				setCurrentFullSurahIndex(nextIndex);
				setPlayingAyah(ayahs[nextIndex].number);
				if (audioRef.current) {
					audioRef.current.src = ayahs[nextIndex].audioUrl;
					audioRef.current.play();
				}
			} else {
				setPlayingFullSurah(false);
				setPlayingAyah(null);
			}
		} else {
			setPlayingAyah(null);
		}
	};

	// Load first surah on mount
	useState(() => {
		fetchAyahs(surahs[0]);
	});

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<div className="flex flex-1">
				{/* Mobile toggle */}
				<button
					className="fixed bottom-4 right-4 z-50 md:hidden rounded-full bg-primary p-3 text-primary-foreground shadow-lg"
					onClick={() => setSidebarOpen(!sidebarOpen)}
				>
					<ChevronRight className={`h-5 w-5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
				</button>

				{/* Sidebar */}
				<aside
					className={`fixed inset-y-0 left-0 z-40 w-72 border-r bg-card pt-16 transition-transform md:static md:translate-x-0 ${
						sidebarOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
				>
					<div className="p-4 border-b">
						<h2 className="font-display text-lg font-bold text-foreground">114 Surahs</h2>
						<p className="text-xs text-muted-foreground">Select a Surah to read</p>
					</div>
					<ScrollArea className="h-[calc(100vh-8rem)]">
						<div className="p-2">
							{surahs.map((s) => (
								<button
									key={s.number}
									onClick={() => fetchAyahs(s)}
									className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted ${
										selectedSurah.number === s.number ? 'bg-primary/10 text-primary' : 'text-foreground'
									}`}
								>
									<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold">
										{s.number}
									</span>
									<div className="min-w-0 flex-1">
										<p className="font-medium truncate">{s.name}</p>
										<p className="text-xs text-muted-foreground truncate">
											{s.englishName} · {s.ayahCount} ayahs
										</p>
									</div>
									<span className="font-arabic text-base text-muted-foreground">{s.nameArabic}</span>
								</button>
							))}
						</div>
					</ScrollArea>
				</aside>

				{/* Main Content */}
				<main className="flex-1 overflow-auto">
					<div className="container py-8 max-w-3xl">
						<div className="mb-8 text-center">
							<Badge variant="secondary" className="mb-2">
								{selectedSurah.revelationType}
							</Badge>
							<h1 className="font-display text-3xl font-bold text-foreground">{selectedSurah.name}</h1>
							<p className="font-arabic text-2xl text-muted-foreground mt-1">{selectedSurah.nameArabic}</p>
							<p className="text-sm text-muted-foreground mt-1">
								{selectedSurah.englishName} · {selectedSurah.ayahCount} Ayahs
							</p>
							{!loading && ayahs.length > 0 && (
								<Button
									onClick={playFullSurah}
									className="mt-4 gap-2"
									variant={playingFullSurah ? 'destructive' : 'default'}
									size="lg"
								>
									{playingFullSurah ? (
										<>
											<Pause className="h-4 w-4" /> Stop Full Surah
										</>
									) : (
										<>
											<Volume2 className="h-4 w-4" /> Play Full Surah
										</>
									)}
								</Button>
							)}
						</div>

						{loading ? (
							<div className="space-y-4">
								{[...Array(5)].map((_, i) => (
									<div key={i} className="animate-pulse rounded-lg bg-muted h-40" />
								))}
							</div>
						) : (
							<div className="space-y-4">
								{ayahs.map((ayah) => (
									<Card key={ayah.number} className="overflow-hidden">
										<CardContent className="p-5">
											<div className="flex items-start justify-between mb-4">
												<span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
													{ayah.number}
												</span>
												<Button
													size="sm"
													variant="ghost"
													onClick={() => toggleAudio(ayah.number, ayah.audioUrl)}
													className="gap-1.5"
												>
													{playingAyah === ayah.number ? (
														<>
															<Pause className="h-3.5 w-3.5" /> Pause
														</>
													) : (
														<>
															<Play className="h-3.5 w-3.5" /> Listen
														</>
													)}
												</Button>
											</div>

											<p className="font-arabic text-2xl md:text-3xl leading-loose text-right mb-5" dir="rtl">
												{ayah.arabic}
											</p>

											<div className="space-y-3 border-t pt-4">
												<div>
													<span className="text-xs font-semibold uppercase tracking-wider text-secondary">English</span>
													<p className="text-sm text-muted-foreground mt-1">{ayah.english}</p>
												</div>
												<div>
													<span className="text-xs font-semibold uppercase tracking-wider text-secondary">বাংলা</span>
													<p className="text-sm text-muted-foreground mt-1">{ayah.bangla}</p>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</div>
				</main>
			</div>

			<audio ref={audioRef} onEnded={handleAudioEnded} />
			<Footer />
		</div>
	);
};

export default QuranBrowser;
