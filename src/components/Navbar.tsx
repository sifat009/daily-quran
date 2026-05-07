import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Navbar = () => {
	const location = useLocation();
	const [mobileOpen, setMobileOpen] = useState(false);

	const links = [
		{ to: '/', label: 'Home' },
		{ to: '/quran', label: 'Browse' },
		{ to: '/#pricing', label: 'Pricing' },
	];

	return (
		<nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between">
				<Link to="/" className="flex items-center gap-2">
					<div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
						<BookOpen className="h-4 w-4 text-primary-foreground" />
					</div>
					<span className="font-display text-xl font-bold text-foreground">Daily Quran</span>
				</Link>

				{/* Desktop */}
				<div className="hidden items-center gap-8 md:flex">
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

				{/* Mobile toggle */}
				<button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
					{mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</button>
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
