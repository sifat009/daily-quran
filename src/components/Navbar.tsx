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
		<>
			{/* Announcement bar */}
			<div className="bg-[hsl(220,25%,14%)] text-white text-center py-2 px-4 text-xs sm:text-sm">
				<span className="inline-flex items-center gap-1.5">
					☪️ Start your Quran journey today.{' '}
					<Link
						to="/signup"
						className="underline underline-offset-2 font-semibold text-secondary hover:text-secondary/80 transition-colors"
					>
						Get 7 days free →
					</Link>
				</span>
			</div>

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

					<div className="hidden items-center gap-3 md:flex">
						<Link to="/login">
							<Button variant="ghost" size="sm">
								Log in
							</Button>
						</Link>
						<Link to="/signup">
							<Button size="sm" className="gap-1.5 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
								<Star className="h-3.5 w-3.5" /> Start Free Trial
							</Button>
						</Link>
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
							<div className="flex gap-2 pt-2">
								<Link to="/login" className="flex-1">
									<Button variant="outline" size="sm" className="w-full">
										Log in
									</Button>
								</Link>
								<Link to="/signup" className="flex-1">
									<Button size="sm" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
										Start Free Trial
									</Button>
								</Link>
							</div>
						</div>
					</div>
				)}
			</nav>
		</>
	);
};

export default Navbar;
