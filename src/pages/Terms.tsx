import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
	return (
		<div className="min-h-screen bg-background flex flex-col">
			<Navbar />
			<main className="flex-1 container max-w-4xl py-12 md:py-24">
				<h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
				<div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-6 text-muted-foreground">
					<p>Last updated: {new Date().toLocaleDateString()}</p>
					
					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">1. Agreement to Terms</h2>
						<p>
							By accessing or using Daily Quran ("we", "us", "our"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access our service.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Service</h2>
						<p>
							Daily Quran provides a digital subscription service ("Daily Quran Pro") that delivers daily educational content via email, alongside web-based access to our platform.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">3. Subscriptions and Payments</h2>
						<p>
							Certain features of the Service are billed on a subscription basis ("Pro Subscription"). You will be billed in advance on a recurring and periodic basis. Billing cycles are set depending on the type of subscription plan you select. Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">4. Intellectual Property</h2>
						<p>
							The Service and its original content, features, and functionality are and will remain the exclusive property of Daily Quran and its licensors. The Service is protected by copyright, trademark, and other laws of both the domestic and foreign countries.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">5. Termination</h2>
						<p>
							We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">6. Limitation of Liability</h2>
						<p>
							In no event shall Daily Quran, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">7. Contact Us</h2>
						<p>
							If you have any questions about these Terms, please contact us at getdailyquran@gmail.com.
						</p>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Terms;
