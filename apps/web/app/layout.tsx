import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HatsProvider } from "../contexts/hats";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raccoon Hats",
  description: "Your favorite hat shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <HatsProvider>{children}</HatsProvider>
      </body>
    </html>
  );
}
