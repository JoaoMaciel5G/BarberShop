import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/_components/Footer";
import AuthProvider from "./_providers/auth";
import { Toaster } from "@/_components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barber Shop",
  description: "Barbearia feita para você fazer suas reservas e agendar cortes de qualidade mais proximo de você",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
            {children}
            <Toaster/>
            <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
