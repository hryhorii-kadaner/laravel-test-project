'use client';
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function CatalogLayout({ children }: { children: React.ReactNode; }) {
    const isMobile = useIsMobile();
    return (
        <main className={cn("w-full p-6", isMobile && 'p-0')} style={{ backgroundColor: 'hsl(220 27% 98%)' }}>
            {children}
        </main>
    );
};