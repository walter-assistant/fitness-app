import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "4 Weken Vetverbranding",
  description: "Jouw persoonlijke fitness coach - 4 weken vetverbrandingsprogramma",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
