import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navigation from "@/components/layout/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cave Texas",
  description: "Cave Texas - Your source for cave exploration in Texas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <div className="flex-grow bg-white">
              {children}
            </div>
            <footer className="bg-[#1a1f36] text-white py-8">
              <div className="container mx-auto px-4">
                <p className="text-center">© {new Date().getFullYear()} Texas Speleological Association. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
