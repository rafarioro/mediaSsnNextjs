import type { Metadata } from "next"; 
import "../../globals.css";

export const metadata: Metadata = {
  title: "How it works",
  description: "How it works", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
