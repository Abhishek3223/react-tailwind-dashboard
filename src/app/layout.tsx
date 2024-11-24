import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "A dashboard application with persistent sidebar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-stone-950 bg-stone-100`}>
        <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
          <Sidebar />
          <div className="dashboard-container">{children}</div>
        </main>
      </body>
    </html>
  );
}
