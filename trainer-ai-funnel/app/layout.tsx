import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Onest } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";
import { OnboardingProvider } from "@/context/OnboardingContext";
import { ImagePreloader } from "@/components/ImagePreloader";
import MetaPixel from "@/components/MetaPixel";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["600"], // SemiBold only
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Trainer AI - Never Skip Workouts Again",
  description: "Your AI-powered fitness motivation companion",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Trainer AI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      <body className={`${onest.variable} font-sans antialiased bg-white`}>
        <OnboardingProvider>
          <Suspense fallback={null}>
            <MetaPixel />
          </Suspense>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-58WZLPM7'}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
          <ImagePreloader />
          {children}
        </OnboardingProvider>
      </body>
    </html>
  );
}
