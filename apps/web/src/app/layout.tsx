import './globals.css';
import Providers from '@/components/Providers';


export const metadata = {
  title: 'To-Do AI PWA',
  description: 'AI-assisted task manager',
  manifest: '/manifest.json',
};

export const viewport = {
  // Match system theme for PWA installs
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
