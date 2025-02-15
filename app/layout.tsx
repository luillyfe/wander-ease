import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AI Travel Agent',
    description: 'Let`s book your journey',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="taru.x5">
            <body className={inter.className} data-oid="6rx9:hz">
                {children}
            </body>
        </html>
    );
}
