import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Index from './pages/Index';
import QuranBrowser from './pages/QuranBrowser';
import NotFound from './pages/NotFound';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';

import { LanguageProvider } from './contexts/LanguageContext';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<LanguageProvider>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/quran" element={<QuranBrowser />} />
						<Route path="/terms" element={<Terms />} />
						<Route path="/privacy" element={<Privacy />} />
						<Route path="/refund" element={<Refund />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</TooltipProvider>
		</LanguageProvider>
	</QueryClientProvider>
);

export default App;
