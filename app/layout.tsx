import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideNavPage from "@/components/Side-Nav/page";
import Header from "@/components/Header/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mineral View",
  description: "Created by Prithviraj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body> */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex bg-white">
          <SideNavPage />
          <div className="flex-1 pl-56"> {/* Add pl-56 to push content right of sidebar */}
            <Header />
            <main className="">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
