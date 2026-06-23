import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { SidebarProvider } from "@/components/SidebarContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dark Angel Clothing | Minimal Luxury. Maximum Presence.",
    template: "%s | Dark Angel Clothing",
  },
  description:
    "Dark Angel Clothing — high-end luxury streetwear with a gothic-femme edge. Discover tanks, shirts, crop tops, hoodies, and more.",
  keywords: [
    "Dark Angel Clothing",
    "luxury streetwear",
    "fashion",
    "minimal luxury",
    "gothic femme",
  ],
  openGraph: {
    title: "Dark Angel Clothing",
    description: "Minimal Luxury. Maximum Presence.",
    type: "website",
    locale: "en_US",
    siteName: "Dark Angel Clothing",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-white font-sans text-black antialiased">
        <SidebarProvider>
          <Header />
          <Sidebar />
          <main>{children}</main>
          <Footer />
        </SidebarProvider>
      </body>
    </html>
  );
}
