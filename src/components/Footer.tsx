import { BookOpen, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const Footer = () => {
	const { language } = useLanguage();

	return (
		<footer className="border-t border-border bg-[hsl(220,25%,14%)] text-white/80">
			<div className="container py-12">
				<div className="grid gap-8 md:grid-cols-3">
					<div>
						<div className="flex items-center gap-2 mb-4">
							<div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
								<BookOpen className="h-4 w-4 text-primary-foreground" />
							</div>
							<span className="font-display text-lg font-bold text-white">
								{language === 'bn' ? 'ডেইলি কুরআন' : 'Daily Quran'}
							</span>
						</div>
						<p className="text-sm text-white/50 leading-relaxed">
							{language === 'bn'
								? 'প্রতিদিন একটি আয়াত — আরবী টেক্সট, বাংলা ও ইংরেজি অনুবাদ এবং অডিও তেলাওয়াতসহ সরাসরি আপনার ইমেইল ইনবক্সে।'
								: 'One Ayah daily — Arabic text, English & Bangla translations, and audio recitation delivered to your inbox.'}
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-3 text-white text-sm">
							{language === 'bn' ? 'প্রয়োজনীয় লিঙ্ক' : 'Important Links'}
						</h4>
						<div className="flex flex-col gap-2 text-sm text-white/50">
							<Link to="/" className="hover:text-white transition-colors">
								{language === 'bn' ? 'হোম' : 'Home'}
							</Link>
							<Link to="/quran" className="hover:text-white transition-colors">
								{language === 'bn' ? 'কুরআন ব্রাউজ করুন' : 'Browse Quran'}
							</Link>
							<Link to="/#support" className="hover:text-white transition-colors">
								{language === 'bn' ? 'সাপোর্ট' : 'Support'}
							</Link>
						</div>
					</div>
					<div>
						<h4 className="font-semibold mb-3 text-white text-sm">
							{language === 'bn' ? 'কমিউনিটি' : 'Community'}
						</h4>
						<div className="flex flex-col gap-2 text-sm text-white/50">
							<Link to="/#faq" className="hover:text-white transition-colors">
								{language === 'bn' ? 'জিজ্ঞাসা (FAQ)' : 'FAQ'}
							</Link>
							<a href="https://wa.me/8801932391487" target="_blank" className="hover:text-white transition-colors">
								{language === 'bn' ? 'আমাদের সাথে যোগাযোগ' : 'Contact Us'}
							</a>
						</div>
					</div>
				</div>
				<div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
					<span>
						© {new Date().getFullYear()} {language === 'bn' ? 'ডেইলি কুরআন। সর্বস্বত্ব সংরক্ষিত।' : 'Daily Quran. All rights reserved.'}
					</span>
					<span className="flex items-center gap-1">
						{language === 'bn' ? 'উম্মাহর জন্য' : 'Built for the Ummah with'}{' '}
						<Heart className="h-3 w-3 fill-red-400 text-red-400" /> {language === 'bn' ? 'ভালোবাসা সহকারে নির্মিত' : 'love'}
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
