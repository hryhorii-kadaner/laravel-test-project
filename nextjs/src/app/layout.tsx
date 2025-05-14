import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/common";
import { AlertDialogProvider } from "@/providers/AlertDialogProvider";
import TanstackClientProvider from "@/providers/react-query-provider";
import { Toaster } from 'react-hot-toast';

const interSans = Inter({
    variable: "--font-inter-sans",
    subsets: ["cyrillic-ext"],
});

const interMono = Inter({
    variable: "--font-inter-mono",
    subsets: ["cyrillic-ext"],
});

export const metadata: Metadata = {
    title: "Biksiko",
    description: "Webstik internship test task",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uk">
            <body
                className={`${interSans.variable} ${interMono.variable} antialiased`}
            >
                <TanstackClientProvider>

                    <AlertDialogProvider>
                        <SidebarProvider>
                            <AdminSidebar className="border-none" />
                            {children}
                            <Toaster gutter={15} position="top-center" />
                        </SidebarProvider>
                    </AlertDialogProvider>
                </TanstackClientProvider>
            </body>
        </html>
    );
}
