import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
	return (
		<div className="min-h-screen bg-background flex flex-col">
			<Navbar />
			<main className="flex-1 container max-w-4xl py-12 md:py-24">
				<h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
				<div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-6 text-muted-foreground">
					<p>Last updated: {new Date().toLocaleDateString()}</p>
					
					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
						<p>
							We collect information that you provide directly to us when you subscribe to our service, including your email address and timezone preferences. When you make a purchase, payment information is collected and processed securely by our Merchant of Record, Paddle.com. We do not store your full credit card information on our servers.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
						<p>
							We use the information we collect to:
						</p>
						<ul className="list-disc pl-6 space-y-2 mt-2">
							<li>Provide, maintain, and improve our daily email service</li>
							<li>Process your transactions and manage your subscription</li>
							<li>Send you technical notices, updates, security alerts, and support messages</li>
							<li>Respond to your comments, questions, and customer service requests</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">3. Data Sharing and Third Parties</h2>
						<p>
							We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners. We use third-party service providers to help us operate our business and the Site or administer activities on our behalf, such as sending out newsletters or processing payments (e.g., Supabase for database, Paddle for payments).
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">4. Data Security</h2>
						<p>
							We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">5. Your Rights</h2>
						<p>
							Depending on your location, you may have the right to access, update, or delete the information we have on you. You can easily unsubscribe from our daily emails at any time using the link provided at the bottom of every email.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">6. Contact Us</h2>
						<p>
							If you have any questions about this Privacy Policy, please contact us at getdailyquran@gmail.com.
						</p>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Privacy;
