import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "To-Do AI",
  description: "Smart task manager with AI-assisted organization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}