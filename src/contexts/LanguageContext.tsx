import React, { createContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'bn' | 'en';

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const [language, setLanguage] = useState<Language>(() => {
		const saved = localStorage.getItem('language');
		return (saved as Language) || 'bn';
	});

	const toggleLanguage = () => {
		const newLang = language === 'bn' ? 'en' : 'bn';
		setLanguage(newLang);
	};

	useEffect(() => {
		localStorage.setItem('language', language);
	}, [language]);

	return (
		<LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};
