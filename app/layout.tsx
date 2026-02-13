import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TempMail - Temporary Email Generator',
  description: 'Generate disposable email addresses for secure sign-ups',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
