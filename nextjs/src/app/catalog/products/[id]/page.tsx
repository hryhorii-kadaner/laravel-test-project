'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common";
import { ArrowLeft, ChevronLeft, Loader2, Save } from "lucide-react";
import ProductForm, { FormData } from "./components/form";
import { useIsMobile } from "@/hooks/use-mobile";
import { getProduct } from "@/api";
import { useApiGet, useApiSend } from "@/hooks/custom-requests";
import { ProductType } from "@/types";
import { createProduct, updateProduct } from "@/api/mutations";
import toast from "react-hot-toast";

type PageParams = { params: Promise<{ id: string }> };

const SingleProductPage = ({ params }: PageParams) => {
    const navigation = useRouter();
    const [resolvedParams, setResolvedParams] = useState<string | null>(null);
    const isMobile = useIsMobile();

    // Запросы
    const { data, refetch } = useApiGet<ProductType>(
        ['products', resolvedParams],
        // @ts-ignore
        () => resolvedParams && getProduct(resolvedParams as string),
        { enabled: false, refetchOnWindowFocus: false }
    );

    const { mutate: createProductRequest, isPending: isCreating } = useApiSend(
        createProduct,
        (data: { message: string }) => {
            toast.success(data.message);
            navigation.back();
        },
        (error: { error: string; }) => {
            toast.error(error.error);
        },
        ['products', resolvedParams],
    );

    const { mutate: updateProductRequest, isPending: isUpdating } = useApiSend(
        updateProduct,
        (data: { message: string }) => {
            toast.success(data.message);
            navigation.back();
        },
        (error: { error: string; }) => {
            toast.error(error.error);
        },
        ['products', resolvedParams],
    );

    const [productName, setProductName] = useState('');


    // Эффекты
    useEffect(() => {
        params.then(data => { setResolvedParams(data.id) });
        return () => setResolvedParams(null);
    }, [params]);

    useEffect(() => {
        if (resolvedParams !== 'new') refetch();
    }, [resolvedParams]);

    const handleSubmit = (formData: FormData) => {
        if (data) {
            updateProductRequest({ id: resolvedParams, ...formData });
            return;
        }
        createProductRequest(formData);
        return;
    };

    if (!resolvedParams) return null;

    return (
        <div className="flex flex-col gap-4 w-full max-w-[1090px] mx-auto">
            {
                isMobile ?
                    <div className="flex flex-col gap-4 p-4 pb-0">
                        <div className="flex gap-4 items-center justify-between">
                            <button className="cursor-pointer" onClick={() => { navigation.back(); }}><ChevronLeft size={16} /></button>
                            <Button variant="primary" subvariant="link" type="submit" form="products-form">Зберегти</Button>
                        </div>
                        <h1 className="font-semibold text-xl mr-auto">{resolvedParams === 'new' && productName.length === 0 ? 'Новий товар' : productName}</h1>
                    </div>
                    : <div className="flex gap-4 items-center">
                        <button onClick={() => { navigation.back(); }} className="flex items-center justify-center w-[28px] h-[28px] cursor-pointer"><ArrowLeft size={16} /></button>
                        <h1 className="font-semibold text-xl mr-auto">{resolvedParams === 'new' && productName.length === 0 ? 'Новий товар' : productName}</h1>

                        <Button variant="primary" type="submit" form="products-form" disabled={isCreating || isUpdating}>
                            {isCreating || isUpdating ? <Loader2 className="animate-spin origin-center" /> : <Save />}
                            Зберегти
                        </Button>
                    </div>
            }

            <ProductForm data={data || null} setProductName={setProductName} onSubmit={handleSubmit} />
        </div>
    );
};

export default SingleProductPage;