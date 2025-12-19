import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import StoreProvider from "@/components/providers/store-provider";
import { QueryClientProvider } from "@/components/providers/query-client-provider";
import { Toaster } from "@/components/ui/sonner";
import StoreInitializer from "@/components/initializers/store-initializer";
import { getMe } from "@/lib/helpers/get-me";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KeyBud",
  description: "Social Media Platform For Keyboard Addicts",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <Toaster />
        <StoreProvider>
          <StoreInitializer user={user} />
          <QueryClientProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </QueryClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
