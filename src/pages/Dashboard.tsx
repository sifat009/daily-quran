import { BookOpen, Calendar, Clock, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

const Dashboard = () => {
	const [paused, setPaused] = useState(false);
	const [deliveryTime, setDeliveryTime] = useState('06:00');

	// Placeholder data — will come from database
	const progress = {
		currentSurah: 'Al-Baqarah',
		currentAyah: 45,
		totalReceived: 52,
		startedAt: '2024-12-01',
	};

	const recentAyahs = [
		{ surah: 'Al-Baqarah', ayah: 45, date: 'Today' },
		{ surah: 'Al-Baqarah', ayah: 44, date: 'Yesterday' },
		{ surah: 'Al-Baqarah', ayah: 43, date: '2 days ago' },
		{ surah: 'Al-Baqarah', ayah: 42, date: '3 days ago' },
		{ surah: 'Al-Baqarah', ayah: 41, date: '4 days ago' },
	];

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1 py-8">
				<div className="container max-w-4xl">
					<div className="mb-8">
						<h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
						<p className="text-muted-foreground">Track your Quran journey</p>
					</div>

					{/* Progress Cards */}
					<div className="grid gap-4 md:grid-cols-3 mb-8">
						<Card>
							<CardContent className="pt-6">
								<div className="flex items-center gap-3">
									<div className="rounded-full bg-primary/10 p-2">
										<BookOpen className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Current Position</p>
										<p className="font-semibold text-foreground">
											{progress.currentSurah} : {progress.currentAyah}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="pt-6">
								<div className="flex items-center gap-3">
									<div className="rounded-full bg-secondary/10 p-2">
										<Calendar className="h-5 w-5 text-secondary" />
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Ayahs Received</p>
										<p className="font-semibold text-foreground">{progress.totalReceived}</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="pt-6">
								<div className="flex items-center gap-3">
									<div className="rounded-full bg-primary/10 p-2">
										<Clock className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Delivery Time</p>
										<p className="font-semibold text-foreground">{deliveryTime} AM</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						{/* Preferences */}
						<Card>
							<CardHeader>
								<CardTitle className="font-display text-lg">Delivery Preferences</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label className="text-sm font-medium text-foreground mb-2 block">Delivery Time</label>
									<Select value={deliveryTime} onValueChange={setDeliveryTime}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="05:00">5:00 AM</SelectItem>
											<SelectItem value="06:00">6:00 AM</SelectItem>
											<SelectItem value="07:00">7:00 AM</SelectItem>
											<SelectItem value="08:00">8:00 AM</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-foreground">
											Status: <Badge variant={paused ? 'destructive' : 'default'}>{paused ? 'Paused' : 'Active'}</Badge>
										</p>
										<p className="text-xs text-muted-foreground mt-1">
											{paused ? "You won't receive emails until you resume" : "You're receiving daily Ayahs"}
										</p>
									</div>
									<Button variant="outline" size="sm" onClick={() => setPaused(!paused)} className="gap-1.5">
										{paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
										{paused ? 'Resume' : 'Pause'}
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Recent History */}
						<Card>
							<CardHeader>
								<CardTitle className="font-display text-lg">Recent Ayahs</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{recentAyahs.map((a, i) => (
										<div key={i} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
											<div>
												<p className="text-sm font-medium text-foreground">
													{a.surah} : {a.ayah}
												</p>
												<p className="text-xs text-muted-foreground">{a.date}</p>
											</div>
											<Button variant="ghost" size="sm" className="text-xs">
												View
											</Button>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Dashboard;
