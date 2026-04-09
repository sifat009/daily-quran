import { useState } from 'react';
import { Mail, BookOpen, Star, Headphones, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingSection from '@/components/PricingSection';

const Index = () => {
	const [email, setEmail] = useState('');

	const handleSubscribe = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Subscribe:', email);
		setEmail('');
	};

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			{/* Hero — two-column layout */}
			<section className="relative overflow-hidden py-16 md:py-24 lg:py-28">
				{/* Background pattern */}
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(43,72%,47%,0.06),transparent_50%)]" />
				<div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2240%22%20stroke%3D%22%231B5E20%22%20stroke-width%3D%220.5%22%20fill%3D%22none%22%2F%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2230%22%20stroke%3D%22%231B5E20%22%20stroke-width%3D%220.5%22%20fill%3D%22none%22%2F%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2220%22%20stroke%3D%22%231B5E20%22%20stroke-width%3D%220.5%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] bg-repeat" />

				<div className="container relative">
					<div className="grid items-center gap-12 md:grid-cols-2">
						{/* Left: Text */}
						<div>
							<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
								<Star className="h-3 w-3" /> 7 Days Free Trial · No Credit Card Required
							</div>
							<h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.15]">
								Receive the <span className="italic text-secondary">Divine Wisdom</span>
								<br />
								of the Quran
								<br />
								<span className="text-muted-foreground font-normal italic text-3xl md:text-4xl lg:text-5xl">
									every single morning.
								</span>
							</h1>
							<p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-lg">
								One Ayah a day. Arabic text, English &amp; Bangla translations, and audio recitation delivered to your
								inbox at 6 AM.
							</p>

							<form onSubmit={handleSubscribe} className="mt-8 flex flex-col gap-3 sm:flex-row">
								<div className="relative flex-1 sm:max-w-xs">
									<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input
										type="email"
										placeholder="Enter your email address"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										className="h-12 pl-10"
									/>
								</div>
								<Button
									type="submit"
									size="lg"
									className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 px-6 font-semibold shrink-0"
								>
									Start Free Trial <ArrowRight className="h-4 w-4" />
								</Button>
							</form>

							{/* Stats inline */}
							<div className="mt-8 flex items-center gap-6 flex-wrap">
								{[
									{ value: '6,236', label: 'Ayahs' },
									{ value: '114', label: 'Surahs' },
									{ value: '2,000+', label: 'Subscribers' },
								].map((stat) => (
									<div key={stat.label} className="flex items-center gap-1.5">
										<span className="text-lg font-bold text-foreground">{stat.value}</span>
										<span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
									</div>
								))}
							</div>
						</div>

						{/* Right: Decorative verse preview card */}
						<div className="hidden md:block">
							<div className="relative">
								{/* Floating badge */}
								<div className="absolute -top-3 -left-3 z-10 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground shadow-lg">
									✦ Daily at 6:00 AM
								</div>
								<div className="rounded-2xl border border-border bg-card p-8 shadow-xl relative overflow-hidden">
									{/* Watermark */}
									<span className="absolute right-4 bottom-4 text-[100px] leading-none text-primary/[0.04] font-arabic select-none pointer-events-none">
										☪
									</span>

									<p className="text-xs font-semibold uppercase tracking-wider text-secondary mb-4">Today's Ayah</p>
									<div className="rounded-xl bg-[hsl(45,100%,96%)] p-6 text-center space-y-3 mb-4">
										<Badge
											variant="outline"
											className="border-secondary/40 text-secondary text-xs uppercase tracking-wider"
										>
											Surah Al-Baqarah · 255
										</Badge>
										<p className="font-arabic text-xl md:text-2xl leading-[2] text-foreground" dir="rtl">
											اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ
										</p>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<div className="rounded-lg bg-primary/5 p-3">
											<p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">English</p>
											<p className="text-xs text-foreground/70 italic leading-relaxed">
												"Allah - there is no deity except Him, the Ever-Living..."
											</p>
										</div>
										<div className="rounded-lg bg-primary/5 p-3">
											<p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">বাংলা</p>
											<p className="text-xs text-foreground/70 leading-relaxed">
												আল্লাহ, তিনি ব্যতীত কোনো উপাস্য নেই...
											</p>
										</div>
									</div>
									<div className="mt-3 flex items-center gap-2 rounded-lg bg-[hsl(45,100%,96%)] p-2.5">
										<div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
											<Play className="h-3 w-3 text-primary-foreground ml-0.5" />
										</div>
										<div className="flex-1 h-1.5 rounded-full bg-border">
											<div className="h-1.5 w-2/5 rounded-full bg-primary/40" />
										</div>
										<span className="text-[10px] text-muted-foreground">0:42</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Email Preview Section */}
			<section className="py-16 md:py-24 bg-muted/30">
				<div className="container">
					<div className="mx-auto max-w-4xl">
						<h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground">
							Your daily dose of <span className="italic text-secondary">divine clarity</span>
						</h2>
						<p className="mb-10 text-center text-muted-foreground">A beautiful, daily curated email. Every morning.</p>

						{/* Gmail browser chrome */}
						<div className="rounded-xl border shadow-2xl overflow-hidden bg-[hsl(220,20%,97%)]">
							{/* Browser top bar */}
							<div className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(220,15%,93%)] border-b">
								<div className="flex gap-1.5">
									<span className="h-3 w-3 rounded-full bg-[hsl(0,70%,65%)]" />
									<span className="h-3 w-3 rounded-full bg-[hsl(45,80%,60%)]" />
									<span className="h-3 w-3 rounded-full bg-[hsl(120,50%,55%)]" />
								</div>
								<div className="flex-1 mx-8">
									<div className="mx-auto max-w-md rounded-full bg-white border px-4 py-1.5 text-xs text-muted-foreground flex items-center gap-2">
										<svg
											className="h-3 w-3 shrink-0"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
											<path d="M7 11V7a5 5 0 0110 0v4" />
										</svg>
										mail.google.com/mail/u/0/#inbox
									</div>
								</div>
							</div>

							{/* Gmail layout: sidebar + content */}
							<div className="flex">
								{/* Gmail left sidebar */}
								<div className="hidden md:flex w-16 shrink-0 flex-col items-center gap-1 border-r bg-[hsl(220,20%,97%)] py-3">
									<div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(210,60%,95%)]">
										<svg
											className="h-5 w-5 text-[hsl(210,60%,45%)]"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path d="M12 5v14M5 12h14" />
										</svg>
									</div>
									<div className="flex h-8 w-12 items-center justify-center rounded-full bg-[hsl(210,60%,92%)]">
										<svg
											className="h-4 w-4 text-foreground"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<rect x="3" y="3" width="18" height="18" rx="2" />
											<path d="M3 13h6l2 2h2l2-2h6" />
										</svg>
									</div>
									{[
										'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2',
										'M12 12m-10 0a10 10 0 1020 0 10 10 0 10-20 0M12 6v6l4 2',
										'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7',
										'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6',
									].map((d, i) => (
										<div key={i} className="flex h-8 w-12 items-center justify-center rounded-full hover:bg-muted/50">
											<svg
												className="h-4 w-4 text-muted-foreground"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
											>
												<path d={d} />
											</svg>
										</div>
									))}
								</div>

								{/* Email content area */}
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-3 px-4 py-2 border-b bg-white">
										<svg
											className="h-5 w-5 text-muted-foreground"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path d="m15 18-6-6 6-6" />
										</svg>
										<svg
											className="h-5 w-5 text-muted-foreground"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<rect x="3" y="3" width="7" height="7" />
											<rect x="14" y="3" width="7" height="7" />
											<rect x="14" y="14" width="7" height="7" />
											<rect x="3" y="14" width="7" height="7" />
										</svg>
										<svg
											className="h-5 w-5 text-muted-foreground"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
										</svg>
										<svg
											className="h-5 w-5 text-muted-foreground"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<circle cx="12" cy="12" r="10" />
											<polyline points="12 6 12 12 16 14" />
										</svg>
									</div>

									<div className="px-6 py-4 bg-white border-b flex items-center gap-3 flex-wrap">
										<h3 className="text-lg font-normal text-foreground">☪️ Quran — Surah 2, Verse 255</h3>
										<Badge className="bg-secondary/15 text-secondary border-0 text-xs font-semibold">Daily Quran</Badge>
									</div>

									<div className="px-6 py-3 bg-white border-b">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
													DQ
												</div>
												<div>
													<p className="text-sm">
														<span className="font-semibold text-foreground">Daily Quran</span>{' '}
														<span className="text-muted-foreground">&lt;ayah@dailyquran.com&gt;</span>
													</p>
													<p className="text-xs text-muted-foreground">to me · Tue, Mar 4, 2025, 6:00 AM</p>
												</div>
											</div>
											<Badge variant="outline" className="text-xs hidden sm:inline-flex">
												📥 Inbox
											</Badge>
										</div>
									</div>

									<div className="max-h-[520px] overflow-y-auto bg-white">
										<div className="p-6 space-y-5">
											<p className="text-sm text-foreground">Assalamu Alaikum 🤲 Here is your Ayah for today</p>

											<div className="rounded-xl bg-[hsl(45,100%,96%)] p-8 text-center space-y-4 relative overflow-hidden">
												<span className="absolute right-4 top-1/2 -translate-y-1/2 text-[120px] leading-none text-secondary/[0.06] font-arabic select-none pointer-events-none">
													☪
												</span>
												<Badge
													variant="outline"
													className="border-secondary/40 text-secondary text-xs uppercase tracking-wider relative z-10"
												>
													Surah 2 · Verse 255
												</Badge>
												<p
													className="font-arabic text-2xl md:text-3xl leading-[2] text-foreground relative z-10"
													dir="rtl"
												>
													اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ
													لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ
												</p>
												<div className="flex items-center justify-center gap-2 text-secondary/60 relative z-10">
													<span className="h-px w-8 bg-secondary/30" />
													<span>☪</span>
													<span className="h-px w-8 bg-secondary/30" />
												</div>
											</div>

											<div className="grid gap-4 md:grid-cols-2">
												<div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
													<div className="flex items-center gap-1.5 mb-2">
														<span className="h-2 w-2 rounded-full bg-primary" />
														<span className="text-xs font-bold uppercase tracking-wider text-primary">
															English Translation
														</span>
													</div>
													<p className="text-sm text-foreground/80 italic leading-relaxed">
														"Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither
														drowsiness overtakes Him nor sleep."
													</p>
												</div>
												<div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
													<div className="flex items-center gap-1.5 mb-2">
														<span className="h-2 w-2 rounded-full bg-primary" />
														<span className="text-xs font-bold uppercase tracking-wider text-primary">
															বাংলা অনুবাদ
														</span>
													</div>
													<p className="text-sm text-foreground/80 leading-relaxed">
														আল্লাহ, তিনি ব্যতীত কোনো উপাস্য নেই। তিনি চিরঞ্জীব, সর্বসত্তার ধারক।
													</p>
												</div>
											</div>

											<div className="rounded-xl bg-[hsl(45,100%,96%)] border border-secondary/20 p-4">
												<div className="flex items-center gap-1.5 mb-2">
													<span className="h-2 w-2 rounded-full bg-secondary" />
													<span className="text-xs font-bold uppercase tracking-wider text-secondary">
														🎧 Audio Recitation
													</span>
												</div>
												<div className="flex items-center gap-3">
													<div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
														<Play className="h-4 w-4 text-primary-foreground ml-0.5" />
													</div>
													<div className="flex-1 h-2 rounded-full bg-border">
														<div className="h-2 w-1/3 rounded-full bg-primary/50" />
													</div>
													<span className="text-xs text-muted-foreground">0:42</span>
												</div>
											</div>

											<p className="text-xs text-muted-foreground text-center pt-2">
												— Sheikh Mishary Rashid Alafasy · Ayat al-Kursi
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* What You'll Receive — feature cards with numbers */}
			<section className="py-16 md:py-24">
				<div className="container">
					<h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground">What You'll Receive</h2>
					<p className="mb-12 text-center text-muted-foreground max-w-xl mx-auto">
						A structured journey through the entire Quran — one morning at a time.
					</p>
					<div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
						{[
							{
								num: '01',
								icon: Mail,
								title: 'One Ayah, Every Morning',
								desc: 'A carefully curated Ayah delivered to your inbox at 6 AM — complete with Arabic text, translations, and audio.',
							},
							{
								num: '02',
								icon: BookOpen,
								title: 'Surah by Surah, In Order',
								desc: 'We move through each Surah sequentially so every verse gets its moment. A structured path through the entire Quran.',
							},
							{
								num: '03',
								icon: Headphones,
								title: 'Arabic, Translations & Audio',
								desc: 'Arabic text, English & Bangla translations, and audio by Sheikh Mishary Alafasy — all in one beautiful email.',
							},
						].map((f) => (
							<Card key={f.title} className="group hover:shadow-lg transition-shadow border-border">
								<CardContent className="p-6">
									<div className="flex items-center gap-3 mb-4">
										<span className="text-xs font-bold text-secondary/60 uppercase tracking-wider">{f.num}</span>
										<div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
											<f.icon className="h-5 w-5 text-primary" />
										</div>
									</div>
									<h3 className="mb-2 font-display text-lg font-semibold text-foreground">{f.title}</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Banner */}
			<section className="py-16 md:py-24 bg-muted/30">
				<div className="container">
					<div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-[hsl(220,25%,14%)] px-8 py-14 md:px-16 md:py-20">
						<div className="absolute top-0 right-0 h-40 w-40 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2280%22%20stroke%3D%22white%22%20stroke-width%3D%221%22%20fill%3D%22none%22%2F%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2260%22%20stroke%3D%22white%22%20stroke-width%3D%221%22%20fill%3D%22none%22%2F%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2240%22%20stroke%3D%22white%22%20stroke-width%3D%221%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-contain" />
						<div className="absolute bottom-0 left-0 h-32 w-32 rounded-tr-full bg-white/[0.03]" />

						<div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
							<div className="max-w-lg">
								<p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
									Start Today — 7 Days Free Trial
								</p>
								<h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
									Begin Your Journey
									<br />
									<span className="italic text-secondary">One Verse at a Time</span>
								</h2>
								<p className="mt-4 text-white/60 leading-relaxed">
									One verse every morning. Surah by Surah. Arabic, English &amp; Bangla translations with audio
									recitation. 7 days free trial.
								</p>
							</div>

							<div className="w-full md:w-auto">
								<div className="rounded-xl border border-white/10 bg-white/[0.07] backdrop-blur-sm p-6 space-y-4 md:w-80">
									<form onSubmit={handleSubscribe} className="space-y-3">
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
											<Input
												type="email"
												placeholder="Enter your email address"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												required
												className="h-12 pl-10 bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-secondary/50 focus:ring-secondary/20"
											/>
										</div>
										<Button
											type="submit"
											size="lg"
											className="w-full gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 font-semibold"
										>
											✦ Start 7 Days Free Trial <ArrowRight className="h-4 w-4" />
										</Button>
									</form>
									<p className="text-[11px] text-white/40 leading-relaxed">
										🔒 No spam. Unsubscribe anytime. First email tomorrow at 6 AM.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-16 md:py-24">
				<div className="container">
					<h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground">
						Loved by Muslims <span className="italic text-secondary">Worldwide</span>
					</h2>
					<p className="mb-12 text-center text-muted-foreground">Here's what our subscribers have to say.</p>
					<div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
						{[
							{
								name: 'Aisha R.',
								text: 'Starting my day with an Ayah has brought so much peace to my mornings. The Bangla translation is a blessing!',
								loc: 'Dhaka, Bangladesh',
							},
							{
								name: 'Omar K.',
								text: "I've tried many Quran apps but this email format is the simplest and most consistent way to stay connected.",
								loc: 'London, UK',
							},
							{
								name: 'Fatima H.',
								text: 'The audio recitation by Mishary Alafasy is beautiful. I look forward to every morning email.',
								loc: 'Toronto, Canada',
							},
						].map((t) => (
							<Card key={t.name} className="border-border">
								<CardContent className="p-6">
									<div className="mb-3 flex gap-1">
										{[...Array(5)].map((_, i) => (
											<Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
										))}
									</div>
									<p className="text-sm text-muted-foreground mb-4 leading-relaxed">"{t.text}"</p>
									<p className="text-sm font-semibold text-foreground">{t.name}</p>
									<p className="text-xs text-muted-foreground">{t.loc}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Pricing */}
			<PricingSection />

			{/* FAQ */}
			<section className="py-16 md:py-24">
				<div className="container">
					<div className="mx-auto max-w-2xl">
						<h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground">
							Frequently Asked <span className="italic text-secondary">Questions</span>
						</h2>
						<p className="mb-8 text-center text-muted-foreground">Everything you need to know about Daily Quran.</p>
						<Accordion type="single" collapsible className="w-full">
							{[
								{
									q: 'Is Daily Quran free?',
									a: 'We offer a 7-day free trial so you can experience the service. After that, a small subscription keeps your daily Ayahs coming.',
								},
								{
									q: 'Which translation do you use?',
									a: 'We use Sahih International for English and Dr. Abu Bakr Muhammad Zakaria for Bangla translation.',
								},
								{
									q: 'Who is the reciter?',
									a: 'All audio recitations are by Sheikh Mishary Rashid Alafasy, one of the most beloved reciters worldwide.',
								},
								{
									q: 'What time will I receive the email?',
									a: 'Emails are sent at 6:00 AM in your local timezone (configurable in your dashboard after signing up).',
								},
								{
									q: 'Can I browse the Quran without subscribing?',
									a: 'Absolutely! Our verse browser is open to everyone. Visit the Browse Quran page to explore all 114 Surahs.',
								},
							].map((faq, i) => (
								<AccordionItem key={i} value={`faq-${i}`}>
									<AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
									<AccordionContent>{faq.a}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Index;
