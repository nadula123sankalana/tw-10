import "./globals.css";
import { DevAuthBanner } from "./dev-auth-banner";

export const metadata = {
  title: "Paid Media & Growth Proposal | Dandelion Colombo",
  description: "Prepared by: Twist Digital",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

// Ensure auth helpers (node:crypto) are never evaluated in the Edge runtime.
export const runtime = "nodejs";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f1020",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <DevAuthBanner />
        {children}
      </body>
    </html>
  );
}
