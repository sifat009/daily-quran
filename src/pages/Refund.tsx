import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Refund = () => {
	return (
		<div className="min-h-screen bg-background flex flex-col">
			<Navbar />
			<main className="flex-1 container max-w-4xl py-12 md:py-24">
				<h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
				<div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-6 text-muted-foreground">
					<p>Last updated: {new Date().toLocaleDateString()}</p>
					
					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">Our 14-Day Guarantee</h2>
						<p>
							At Daily Quran, we want you to be completely satisfied with your Pro Subscription. If you are not satisfied with our service for any reason, we offer a full refund within the first 14 days of your initial purchase.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">How to Request a Refund</h2>
						<p>
							To request a refund, please contact our support team at <strong>getdailyquran@gmail.com</strong> with your account email address and order details. 
						</p>
						<p className="mt-2">
							Since our order process is conducted by our online reseller Paddle.com, refunds will be processed through their platform and returned to your original payment method. Please allow 3-5 business days for the refund to reflect on your statement.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">Renewals and Cancellations</h2>
						<p>
							You may cancel your subscription at any time to prevent future billing. However, refunds are not provided for partial subscription periods or after the initial 14-day guarantee period has expired. Once cancelled, you will retain access to Pro features until the end of your current billing cycle.
						</p>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Refund;
