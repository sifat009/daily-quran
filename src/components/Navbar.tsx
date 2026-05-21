import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const Navbar = () => {
	const location = useLocation();
	const [mobileOpen, setMobileOpen] = useState(false);
	const { language, toggleLanguage } = useLanguage();

	const links = [
		{ to: '/', label: language === 'bn' ? 'হোম' : 'Home' },
		{ to: '/quran', label: language === 'bn' ? 'ব্রাউজ' : 'Browse' },
		{ to: '/#pricing', label: language === 'bn' ? 'প্রো' : 'Pro' },
	];

	return (
		<nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between">
				<Link to="/" className="flex items-center gap-2">
					<div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
						<BookOpen className="h-4 w-4 text-primary-foreground" />
					</div>
					<span className="font-display text-xl font-bold text-foreground">
						{language === 'bn' ? 'ডেইলি কুরআন' : 'Daily Quran'}
					</span>
				</Link>

				{/* Desktop */}
				<div className="hidden items-center gap-8 md:flex">
					<div className="flex gap-6">
						{links.map((l) => (
							<Link
								key={l.to}
								to={l.to}
								className={`text-sm font-medium transition-colors hover:text-primary ${
									location.pathname === l.to ? 'text-primary' : 'text-muted-foreground'
								}`}
							>
								{l.label}
							</Link>
						))}
					</div>
					
					<Button 
						variant="ghost" 
						size="sm" 
						onClick={toggleLanguage}
						className="gap-2 text-muted-foreground hover:text-primary"
					>
						<Globe className="h-4 w-4" />
						{language === 'bn' ? 'English' : 'বাংলা'}
					</Button>
				</div>

				{/* Mobile toggle */}
				<div className="flex items-center gap-2 md:hidden">
					<Button 
						variant="ghost" 
						size="sm" 
						onClick={toggleLanguage}
						className="gap-2 px-2"
					>
						<Globe className="h-4 w-4" />
						{language === 'bn' ? 'EN' : 'বাং'}
					</Button>
					<button onClick={() => setMobileOpen(!mobileOpen)}>
						{mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</button>
				</div>
			</div>

			{mobileOpen && (
				<div className="border-t bg-background p-4 md:hidden">
					<div className="flex flex-col gap-3">
						{links.map((l) => (
							<Link
								key={l.to}
								to={l.to}
								onClick={() => setMobileOpen(false)}
								className="text-sm font-medium text-muted-foreground hover:text-primary"
							>
								{l.label}
							</Link>
						))}
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
