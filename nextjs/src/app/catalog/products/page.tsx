'use client';
import { Button, DataTable } from "@/components/common";
import { columns } from "./table/columns";
import { Plus, SearchIcon } from "lucide-react";
import { Input, SidebarTrigger } from "@/components/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useApiGet } from "@/hooks/custom-requests";
import { getAllProducts } from "@/api";
import { ProductGetAllType } from "@/types";

const ProductsPage = () => {
    const isMobile = useIsMobile();
    const [mounted, setMounted] = useState(false);
    const { data } = useApiGet<ProductGetAllType[] | unknown>(['products'], getAllProducts);

    useEffect(() => { setMounted(true) }, []);

    return (
        mounted &&
        <div className={cn("flex flex-col gap-6", isMobile && 'p-4')}>
            <h1 className={cn("text-2xl font-medium flex items-center justify-between", isMobile && 'text-sm text-[#A1A1AA] justify-start gap-2')}>
                {isMobile && <><SidebarTrigger className="text-[#18181B]" /><span className="font-light text-[#E4E4E7]">|</span></>}Товари
                <Link href={'products/new'} className={isMobile ? 'hidden' : ''}>
                    <Button variant="primary">
                        <Plus /> Додати товар
                    </Button>
                </Link>
            </h1>

            <div className={cn("relative", isMobile && 'flex items-center gap-2 mb-2')}>
                <SearchIcon width={15} className="absolute top-1/2 -translate-1/2 left-[20px] cursor-pointer select-none" onClick={(e) => { (e.currentTarget.nextElementSibling as HTMLInputElement)?.focus() }} color="#A1A1AA" />
                <Input type="search" className={cn("max-w-[400px] pl-[40px] bg-white", isMobile && 'max-w-none')} placeholder="Пошук товару" />
                {isMobile && <Link href={'products/new'}><Button variant="primary" className="max-w-9 max-h-9"><Plus /></Button></Link>}
            </div>

            <DataTable
                columns={columns}
                data={data as ProductGetAllType[]  || []}
            />
        </div>
    );
};

export default ProductsPage;