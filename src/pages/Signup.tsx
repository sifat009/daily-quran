import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const handleSignup = (e: React.FormEvent) => {
		e.preventDefault();
		// Will integrate with Lovable Cloud auth
		console.log('Signup:', email, name);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<Link to="/" className="mx-auto mb-4 flex items-center gap-2">
						<BookOpen className="h-6 w-6 text-primary" />
						<span className="font-display text-xl font-bold text-foreground">Daily Quran</span>
					</Link>
					<CardTitle className="font-display text-2xl">Create your account</CardTitle>
					<CardDescription>Start receiving one Ayah every morning</CardDescription>
				</CardHeader>
				<form onSubmit={handleSignup}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								placeholder="Your name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								minLength={6}
							/>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col gap-3">
						<Button type="submit" className="w-full">
							Create Account
						</Button>
						<p className="text-sm text-muted-foreground">
							Already have an account?{' '}
							<Link to="/login" className="font-medium text-primary hover:underline">
								Sign in
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
};

export default Signup;
