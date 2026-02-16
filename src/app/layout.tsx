import type { Metadata } from "next";
import "./globals.css";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "AfricaShowbizRoom",
  description:
    "La plateforme digitale premium qui connecte les talents africains et les grandes marques.",
  icons: {
    icon: "/favicon.jpeg",
    apple: "/favicon.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-black font-sans text-neutral-100 antialiased">
        <Providers>
          <MainHeader />
          {/* pt-16 = hauteur du header fixe */}
          <div className="pt-16">{children}</div>
          <MainFooter />
        </Providers>
      </body>
    </html>
  );
}
