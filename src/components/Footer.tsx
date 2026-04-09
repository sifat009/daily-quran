import { BookOpen, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
	<footer className="border-t border-border bg-[hsl(220,25%,14%)] text-white/80">
		<div className="container py-12">
			<div className="grid gap-8 md:grid-cols-3">
				<div>
					<div className="flex items-center gap-2 mb-4">
						<div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
							<BookOpen className="h-4 w-4 text-primary-foreground" />
						</div>
						<span className="font-display text-lg font-bold text-white">Daily Quran</span>
					</div>
					<p className="text-sm text-white/50 leading-relaxed">
						One Ayah a day — delivered to your inbox with Arabic text, English &amp; Bangla translations, and audio
						recitation.
					</p>
				</div>
				<div>
					<h4 className="font-semibold mb-3 text-white text-sm">Products</h4>
					<div className="flex flex-col gap-2 text-sm text-white/50">
						<Link to="/" className="hover:text-white transition-colors">
							Home
						</Link>
						<Link to="/quran" className="hover:text-white transition-colors">
							Browse Quran
						</Link>
						<Link to="/#pricing" className="hover:text-white transition-colors">
							Pricing
						</Link>
					</div>
				</div>
				<div>
					<h4 className="font-semibold mb-3 text-white text-sm">Account</h4>
					<div className="flex flex-col gap-2 text-sm text-white/50">
						<Link to="/login" className="hover:text-white transition-colors">
							Log in
						</Link>
						<Link to="/signup" className="hover:text-white transition-colors">
							Sign up
						</Link>
						<Link to="/dashboard" className="hover:text-white transition-colors">
							Dashboard
						</Link>
					</div>
				</div>
			</div>
			<div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
				<span>© {new Date().getFullYear()} Daily Quran. All rights reserved.</span>
				<span className="flex items-center gap-1">
					Made with <Heart className="h-3 w-3 fill-red-400 text-red-400" /> for the Ummah
				</span>
			</div>
		</div>
	</footer>
);

export default Footer;
