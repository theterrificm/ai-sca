import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import { Navbar } from "@/components/custom/navbar";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { Toaster } from "@/components/ui/toaster"

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chat.vercel.ai"),
  title: "Next.js Chatbot Template",
  description: "Next.js chatbot template using the AI SDK.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster  />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}