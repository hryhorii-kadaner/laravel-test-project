'use client';
import { navigation } from "@/components/common/sidebar/sidebar-list";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const path = usePathname();
    const router = useRouter();
    const firstActivePath = navigation.map(menu => menu.items.find(item => !item.disabled))[0]?.url;

    useEffect(() => {
        if (path === '/') {
            router.push(`${firstActivePath}`, { scroll: true });
        }
    }, []);

    return (<div>Redirect on first avaliable page...</div>);
}
