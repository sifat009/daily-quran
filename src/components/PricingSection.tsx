import { Heart, Copy, CheckCircle2, Wallet, MessageCircle, Coffee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/hooks/useLanguage';

const PricingSection = () => {
	const { language } = useLanguage();

	const copyToClipboard = (text: string, label: string) => {
		navigator.clipboard.writeText(text);
		const successMsg = language === 'bn' 
			? `${label} নাম্বারটি কপি করা হয়েছে!` 
			: `${label} number copied!`;
		toast.success(successMsg);
	};

	const openWhatsApp = () => {
		const message = language === 'bn'
			? 'আসসালামু আলাইকুম, আমি ডেইলি কুরআন প্রজেক্টে ডোনেট করতে আগ্রহী।'
			: 'Assalamu Alaikum, I am interested in supporting the Daily Quran project.';
		window.open(`https://wa.me/8801932391487?text=${encodeURIComponent(message)}`, '_blank');
	};

	return (
		<section className="py-16 md:py-24 bg-muted/30" id="support">
			<div className="container">
				<div className="mx-auto max-w-3xl text-center">
					<div className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary mb-6">
						<Heart className="h-3.5 w-3.5 fill-secondary" /> 
						{language === 'bn' ? 'সাদাকা জারিয়া' : 'Sadaqah Jariyah'}
					</div>
					<h2 className="mb-4 font-display text-3xl md:text-4xl font-bold text-foreground">
						{language === 'bn' ? (
							<>সবার জন্য ফ্রী, <span className="italic text-secondary">সবার সহযোগিতায়</span></>
						) : (
							<>Free for all, <span className="italic text-secondary">supported by you</span></>
						)}
					</h2>
					<p className="mb-12 text-muted-foreground leading-relaxed">
						{language === 'bn' 
							? 'ডেইলি কুরআন সবার জন্য উন্মুক্ত একটি প্রজেক্ট। এই প্রজেক্টের হোস্টিং, ইমেইল এবং মেইনটেন্যান্স খরচ সচল রাখতে আপনার সামর্থ্য অনুযায়ী কন্ট্রিবিউট করতে পারেন।'
							: 'Daily Quran is a labor of love, free for everyone. Your generous support helps us cover the costs of hosting, premium email delivery, and ongoing maintenance.'}
					</p>
				</div>

				<div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-2 items-stretch">
					{/* Left Side: Why Support? */}
					<Card className="border-border bg-background/50 backdrop-blur-sm">
						<CardContent className="p-8">
							<h3 className="text-xl font-bold mb-6 flex items-center gap-2">
								<Heart className="h-5 w-5 text-secondary" />
								{language === 'bn' ? 'আপনার সাপোর্ট কেন প্রয়োজন?' : 'Why your support matters?'}
							</h3>
							<ul className="space-y-4">
								{[
									language === 'bn' ? 'প্রিমিয়াম ইমেইল ডেলিভারি সার্ভিস' : 'Premium Email Delivery Service',
									language === 'bn' ? 'হাই-পারফরম্যান্স সার্ভার হোস্টিং খরচ' : 'High-Performance Server Hosting',
									language === 'bn' ? 'নতুন ফিচার ডেভেলপমেন্ট' : 'New Feature Development',
									language === 'bn' ? 'সম্পূর্ণ বিজ্ঞাপন মুক্ত অভিজ্ঞতা' : 'Keeping the platform 100% Ad-Free',
								].map((item, i) => (
									<li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
										<CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
										{item}
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					{/* Right Side: Donation Methods */}
					<Card className="border-secondary/30 bg-[hsl(220,25%,14%)] text-white shadow-xl relative overflow-hidden">
						<div className="absolute top-0 right-0 p-4 opacity-10">
							<Wallet className="h-24 w-24" />
						</div>
						<CardContent className="p-8 relative z-10">
							<h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
								<Wallet className="h-5 w-5 text-secondary" />
								{language === 'bn' ? 'ডোনেশন মেথড' : 'Support Methods'}
							</h3>

							<div className="space-y-4">
								{language === 'bn' ? (
									<>
										<div className="group rounded-xl bg-white/5 border border-white/10 p-4 flex items-center justify-between transition-all hover:bg-white/10">
											<div>
												<p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">bKash (Personal)</p>
												<p className="text-lg font-mono font-bold tracking-wider">01932391487</p>
											</div>
											<Button 
												variant="ghost" 
												size="icon" 
												className="text-white/40 hover:text-secondary hover:bg-transparent"
												onClick={() => copyToClipboard('01932391487', 'bKash')}
											>
												<Copy className="h-4 w-4" />
											</Button>
										</div>
										<Button 
											onClick={openWhatsApp}
											className="w-full h-12 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold gap-2"
										>
											<MessageCircle className="h-5 w-5" /> হোয়াটসঅ্যাপে যোগাযোগ করুন
										</Button>
									</>
								) : (
									<>
										<div className="grid gap-3">
											<Button 
												className="w-full h-12 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black font-bold gap-2"
												onClick={() => window.open('https://buymeacoffee.com/yourprofile', '_blank')}
											>
												<Coffee className="h-4 w-4" /> Buy Me a Coffee
											</Button>
											<Button 
												variant="outline" 
												className="w-full h-12 border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold gap-2"
												onClick={openWhatsApp}
											>
												<MessageCircle className="h-4 w-4 text-[#25D366]" /> Contact via WhatsApp
											</Button>
										</div>
									</>
								)}
								<p className="mt-3 text-[10px] text-white/40 text-center italic">
									{language === 'bn' 
										? '*সেন্ড মানি করার পর রেফারেন্সে ইমেইল দিতে পারেন।' 
										: '*You can reference your email when supporting.'}
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="mt-16 text-center">
					<p className="text-sm text-muted-foreground italic">
						{language === 'bn'
							? '"যে ব্যক্তি মানুষকে হেদায়াতের দিকে আহ্বান করবে, তার জন্য ওই পরিমাণ সওয়াব রয়েছে যা পালনকারীর জন্য রয়েছে।" — (সহীহ মুসলিম)'
							: '"Whoever guides someone to goodness will have a reward like one who did it." — (Sahih Muslim)'}
					</p>
				</div>
			</div>
		</section>
	);
};

export default PricingSection;
