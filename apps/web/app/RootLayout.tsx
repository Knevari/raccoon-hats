import { HatsProvider } from "../contexts/hats";
import { inter } from "./layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" data-color-mode="light">
      <body className={`${inter.className} bg-background`}>
        <HatsProvider>{children}</HatsProvider>
        <Toaster />
      </body>
    </html>
  );
}
