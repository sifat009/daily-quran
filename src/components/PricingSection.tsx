import { Check, ArrowRight, Sparkles, BookOpen, Crown, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const plans = [
	{
		name: 'Seeker',
		price: 'Free',
		period: '',
		description: 'Daily Ayahs delivered to your inbox',
		features: [
			'1 Ayah delivered daily',
			'Arabic text + English translation',
			'Bangla translation',
			'Audio recitation',
			'Full Quran browser access',
		],
		cta: 'Subscribe Now',
		highlighted: false,
		icon: Zap,
	},
	{
		name: 'Complete Quran',
		price: '$3',
		period: '/month',
		description: 'All 6,236 Ayahs. Chapter by chapter. The complete plan.',
		features: [
			'Everything in Seeker',
			'Chapters 1–114, delivered in order',
			'Support the mission',
		],
		cta: 'Support the Project',
		highlighted: true,
		badge: 'Most Popular',
		icon: BookOpen,
	},
	{
		name: 'Premium',
		price: '$24',
		period: '/year',
		description: 'Best value for your daily Quran journey. Save 33%.',
		features: [
			'Everything in Complete Quran',
			'Save $12 per year',
			'Early access to new features',
			'Support the mission',
		],
		cta: 'Go Premium',
		highlighted: false,
		badge: 'Best Value',
		icon: Crown,
	},
];

const PricingSection = () => {
	return (
		<section className="py-16 md:py-24 bg-muted/30" id="pricing">
			<div className="container">
				<div className="text-center mb-4">
					<div className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary mb-4">
						<Sparkles className="h-3.5 w-3.5" /> Choose Your Path
					</div>
				</div>
				<h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground">
					Choose your <span className="italic text-secondary">path</span>
				</h2>
				<p className="mb-12 text-center text-muted-foreground max-w-md mx-auto">
					Start free. Upgrade anytime. Walk across months of learning — grab yours now.
				</p>

				<div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 items-start">
					{plans.map((plan) => (
						<Card
							key={plan.name}
							className={`relative flex flex-col transition-all ${
								plan.highlighted
									? 'border-2 border-secondary shadow-xl md:scale-[1.05] bg-[hsl(220,25%,14%)] text-white'
									: 'border-border hover:shadow-lg'
							}`}
						>
							{plan.badge && (
								<div className="absolute -top-3 left-1/2 -translate-x-1/2">
									<Badge
										className={`border-0 px-3 py-1 text-xs font-semibold ${
											plan.highlighted ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'
										}`}
									>
										{plan.badge}
									</Badge>
								</div>
							)}
							<CardContent className="flex flex-1 flex-col p-6 pt-8">
								<div className="flex items-center gap-2 mb-1">
									<div
										className={`h-8 w-8 rounded-lg flex items-center justify-center ${
											plan.highlighted ? 'bg-secondary/20' : 'bg-primary/10'
										}`}
									>
										<plan.icon className={`h-4 w-4 ${plan.highlighted ? 'text-secondary' : 'text-primary'}`} />
									</div>
									<h3
										className={`font-display text-lg font-semibold ${
											plan.highlighted ? 'text-white' : 'text-foreground'
										}`}
									>
										{plan.name}
									</h3>
								</div>
								<div className="mt-3 flex items-baseline gap-1">
									<span
										className={`font-display text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-foreground'}`}
									>
										{plan.price}
									</span>
									<span className={`text-sm ${plan.highlighted ? 'text-white/60' : 'text-muted-foreground'}`}>
										{plan.period}
									</span>
								</div>
								<p className={`mt-2 text-sm ${plan.highlighted ? 'text-white/70' : 'text-muted-foreground'}`}>
									{plan.description}
								</p>

								<ul className="mt-6 flex-1 space-y-3">
									{plan.features.map((feature) => (
										<li key={feature} className="flex items-start gap-2 text-sm">
											<Check
												className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? 'text-secondary' : 'text-primary'}`}
											/>
											<span className={plan.highlighted ? 'text-white/80' : 'text-foreground/80'}>{feature}</span>
										</li>
									))}
								</ul>

								<button
									onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
									className="mt-8 block w-full"
								>
									<Button
										className={`w-full gap-2 ${
											plan.highlighted ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' : ''
										}`}
										variant={plan.highlighted ? 'default' : 'outline'}
										size="lg"
									>
										{plan.cta} <ArrowRight className="h-4 w-4" />
									</Button>
								</button>
							</CardContent>
						</Card>
					))}
				</div>

				<p className="mt-8 text-center text-xs text-muted-foreground">
					All plans include a 7-day free trial. Cancel anytime. No questions asked.
				</p>
			</div>
		</section>
	);
};

export default PricingSection;
