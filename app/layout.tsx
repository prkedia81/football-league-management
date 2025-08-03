import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { register } from '@/lib/instrumentation';

if (typeof window === 'undefined') {
  register();
}

export const metadata: Metadata = {
  title: 'Calcutta Football League | কলকাতা ফুটবল লীগ',
  description: 
    "The Calcutta Football League (CFL), Asia's oldest football league since 1898, is the premier state-level competition in West Bengal. | কলকাতা ফুটবল লীগ (CFL), ১৮৯৮ সাল থেকে এশিয়ার প্রাচীনতম ফুটবল লীগ, পশ্চিমবঙ্গের প্রধান রাজ্য-স্তরের প্রতিযোগিতা।",
  keywords: ['CFL', 'Calcutta Football League', 'IFA', 'Kolkata Football', 'Indian Football', 'কলকাতা ফুটবল লীগ'],
    openGraph: {
    title: 'Calcutta Football League | কলকাতা ফুটবল লীগ',
    description:
      "The Calcutta Football League (CFL), Asia's oldest football league since 1898, is the premier state-level competition in West Bengal. | কলকাতা ফুটবল লীগ (CFL), ১৮৯৮ সাল থেকে এশিয়ার প্রাচীনতম ফুটবল লীগ, পশ্চিমবঙ্গের প্রধান রাজ্য-স্তরের প্রতিযোগিতা।",
    images: 'https://ifa.kickoffonline.in/Logo.png',
    locale: 'en-IN', // Considering the location context
    type: 'website',
    url: 'https://ifa.kickoffonline.in',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta property="og:image" content="https://ifa.kickoffonline.in/Logo.png" />
      <body>
        <Suspense>{children}</Suspense>
        <Toaster />
      </body>
    </html>
  );
}
