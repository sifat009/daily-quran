import { useState } from 'react';
import { Sparkles, Copy, CheckCircle2, Wallet, MessageCircle, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/hooks/useLanguage';
import { openPaddleCheckout } from '@/lib/paddle';

const PricingSection = () => {
	const { language } = useLanguage();
	const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

	const copyToClipboard = (text: string, label: string) => {
		navigator.clipboard.writeText(text);
		const successMsg = language === 'bn' 
			? `${label} নাম্বারটি কপি করা হয়েছে!` 
			: `${label} number copied!`;
		toast.success(successMsg);
	};

	const openWhatsApp = () => {
		const message = language === 'bn'
			? 'আসসালামু আলাইকুম, আমি ডেইলি কুরআন প্রো সাবস্ক্রিপশন নিতে আগ্রহী।'
			: 'Assalamu Alaikum, I am interested in subscribing to Daily Quran Pro.';
		window.open(`https://wa.me/8801932391487?text=${encodeURIComponent(message)}`, '_blank');
	};

	const handlePaddleCheckout = async () => {
		setIsCheckoutLoading(true);
		try {
			await openPaddleCheckout();
		} catch (err: any) {
			console.error(err);
			if (err.message === 'PADDLE_NOT_INITIALIZED') {
				toast.error(
					language === 'bn'
						? 'প্যাডেল পেমেন্ট গেটওয়ে কনফিগার করা নেই। অনুগ্রহ করে VITE_PADDLE_CLIENT_TOKEN সেট করুন।'
						: 'Paddle payment gateway is not initialized. Please configure VITE_PADDLE_CLIENT_TOKEN.'
				);
			} else if (err.message === 'PADDLE_PRICE_ID_MISSING') {
				toast.error(
					language === 'bn'
						? 'প্যাডেল প্রাইস আইডি কনফিগার করা নেই। অনুগ্রহ করে VITE_PADDLE_PRICE_ID সেট করুন।'
						: 'Paddle Price ID is not configured. Please configure VITE_PADDLE_PRICE_ID.'
				);
			} else {
				toast.error(
					language === 'bn'
						? 'চেকআউট খুলতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
						: 'Failed to open checkout. Please try again.'
				);
			}
		} finally {
			setIsCheckoutLoading(false);
		}
	};

	return (
		<section className="py-16 md:py-24 bg-muted/30" id="pricing">
			<div className="container">
				<div className="mx-auto max-w-3xl text-center">
					<div className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary mb-6">
						<Sparkles className="h-3.5 w-3.5 fill-secondary text-secondary animate-pulse" /> 
						{language === 'bn' ? 'ডেইলি কুরআন প্রো' : 'Daily Quran Pro'}
					</div>
					<h2 className="mb-4 font-display text-3xl md:text-4xl font-bold text-foreground">
						{language === 'bn' ? (
							<>আপনার দিনটি শুরু হোক <span className="italic text-secondary">ডেইলি কুরআন প্রো</span> এর সাথে</>
						) : (
							<>Elevate your mornings with <span className="italic text-secondary">Daily Quran Pro</span></>
						)}
					</h2>
					<p className="mb-12 text-muted-foreground leading-relaxed">
						{language === 'bn' 
							? 'ডেইলি কুরআন প্রো সাবস্ক্রিপশনের মাধ্যমে আমাদের প্রিমিয়াম ইমেইল ডেলিভারি অবকাঠামো, বিজ্ঞাপন-মুক্ত অভিজ্ঞতা এবং ডেডিকেটেড সার্ভিস নিশ্চিত করুন।'
							: 'Subscribe to Daily Quran Pro to get access to our premium high-deliverability infrastructure, 100% ad-free experience, and dedicated customer service.'}
					</p>
				</div>

				<div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-2 items-stretch">
					{/* Left Side: Features */}
					<Card className="border-border bg-background/50 backdrop-blur-sm">
						<CardContent className="p-8">
							<h3 className="text-xl font-bold mb-6 flex items-center gap-2">
								<Sparkles className="h-5 w-5 text-secondary" />
								{language === 'bn' ? 'প্রো সাবস্ক্রিপশনের সুবিধাসমূহ' : 'Pro Subscription Features'}
							</h3>
							<ul className="space-y-4">
								{[
									language === 'bn' ? 'প্রিমিয়াম ইমেইল ডেলিভারি অবকাঠামো' : 'Premium High-Deliverability Email Infrastructure',
									language === 'bn' ? 'উচ্চ-গতিসম্পন্ন ডেডিকেটেড সার্ভার হোস্টিং' : 'High-Performance Dedicated Server Hosting',
									language === 'bn' ? 'নতুন প্রিমিয়াম ফিচারের দ্রুত অ্যাক্সেস' : 'Early Access to New Premium Features',
									language === 'bn' ? '১০০% বিজ্ঞাপন মুক্ত প্রিমিয়াম অভিজ্ঞতা' : '100% Ad-Free Premium Experience',
								].map((item, i) => (
									<li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
										<CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
										{item}
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					{/* Right Side: Subscription Options */}
					<Card className="border-secondary/30 bg-[hsl(220,25%,14%)] text-white shadow-xl relative overflow-hidden">
						<div className="absolute top-0 right-0 p-4 opacity-10">
							<Wallet className="h-24 w-24" />
						</div>
						<CardContent className="p-8 relative z-10">
							<h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
								<Wallet className="h-5 w-5 text-secondary" />
								{language === 'bn' ? 'সাবস্ক্রিপশন অপশন' : 'Subscription Options'}
							</h3>

								<div className="space-y-4">
									<div className="group rounded-xl bg-white/5 border border-white/10 p-4 flex items-center justify-between transition-all hover:bg-white/10">
										<div>
											<p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
												{language === 'bn' ? 'বিকাশ (ম্যানুয়াল অ্যাক্টিভেশন)' : 'bKash (Manual Activation)'}
											</p>
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
										onClick={handlePaddleCheckout}
										disabled={isCheckoutLoading}
										className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-bold gap-2"
									>
										<CreditCard className="h-5 w-5" /> 
										{isCheckoutLoading 
											? (language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...') 
											: (language === 'bn' ? 'কার্ড দিয়ে সাবস্ক্রাইব করুন' : 'Subscribe via Card')}
									</Button>

									<Button 
										onClick={openWhatsApp}
										className="w-full h-12 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold gap-2"
									>
										<MessageCircle className="h-5 w-5" /> 
										{language === 'bn' ? 'ম্যানুয়াল অ্যাক্টিভেশনের জন্য যোগাযোগ করুন' : 'Contact for Manual Activation'}
									</Button>

									<p className="mt-3 text-[10px] text-white/40 text-center italic">
										{language === 'bn' 
											? '*বিকাশ পেমেন্ট সম্পন্ন করার পর রেফারেন্সে আপনার ইমেইল ব্যবহার করুন।' 
											: '*Use your email as the reference code when paying via bKash.'}
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
