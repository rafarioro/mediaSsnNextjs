import type { Metadata } from "next"; 
import "./globals.css";
 

export const metadata: Metadata = {
  title: "Media SSN",
  description: "Your media verified, check your media against the effects of Artificial Intelligence", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
