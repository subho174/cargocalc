import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeProvider";
import Navbar from "../components/Navbar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "CargoCalc - Smart Shipping Cost Estimator",
  description:
    "Estimate shipping costs based on distance, weight, and delivery type. Fast, accurate, and user-friendly.",
  keywords: [
    "shipping cost calculator",
    "cargo calculator",
    "freight estimator",
    "logistics tool",
  ],
  openGraph: {
    title: "CargoCalc - Smart Shipping Cost Estimator",
    description:
      "Easily estimate shipping charges using our intuitive tool. Powered by distance, weight, and service type.",
    url: "https://cargocalc.vercel.app",
    siteName: "CargoCalc",
    images: [
      {
        url: "https://cargocalc.vercel.app/favicon.ico",
        width: 400,
        height: 400,
        alt: "CargoCalc - Smart Shipping Cost Estimator",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster
            position="top-right"
            richColors
            expand={true}
            toastOptions={{ className: "sonner-font" }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
