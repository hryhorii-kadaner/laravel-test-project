"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { useAlertDialog } from "@/providers/AlertDialogProvider"
import { ColumnDef } from "@tanstack/react-table"
import { FilePen, Loader2, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProductGetAllType } from "@/types"
import { useApiSend } from "@/hooks/custom-requests"
import { deleteProduct } from "@/api"
import toast from "react-hot-toast"

export type ProductPreview = {
    id: string;
    name: string;
    short_description: string;
    preview_url: string | null;
}

const ActionButtonsComponent = ({ id }: { id: string; }) => {
    const { showAlert } = useAlertDialog();
    const { mutate: deleteItem, isPending } = useApiSend(
        deleteProduct,
        (data: { message: string }) => {
            toast.success(data.message);
        },
        (error: Error) => {
            toast.error(error.toString());
        },
        ['products', id],
    );

    const btnClass = 'cursor-pointer w-9 h-9 active:scale-[.95] transition-colors rounded-sm flex items-center justify-center';

    const handleDelete = () => showAlert({
        onSubmit: () => { deleteItem(id); },
        title: 'Видалення товару',
        description: 'Ви впевнені, що бажаєте видалити товар?',
        cancelText: 'Скасувати',
        confirmText: 'Видалити'
    });

    return (
        <div className="flex items-center gap-2 ml-2">
            <Link href={`/catalog/products/${id}`} className={cn(btnClass, 'hover:bg-gray-200', isPending && 'pointer-events-none select-none opacity-50')}><FilePen size={16} /></Link>
            <button className={cn(btnClass, 'hover:bg-[#DC2626]/10', isPending && 'pointer-events-none select-none opacity-50')} onClick={handleDelete}>{isPending ? <Loader2 className="animate-spin origin-center"/> :<Trash2 color="#DC2626" size={16} />}</button>
        </div>
    );
};

const TableCellComponent = ({ original }: { original: ProductGetAllType }) => {
    const isMobile = useIsMobile();
    const { id, title, short_description, preview } = original;

    return (
        <div className={cn("flex items-center justify-between font-medium", isMobile && 'items-start text-wrap')}>
            <div className={cn("flex items-center gap-2", isMobile && 'items-start')}>
                <Image
                    width={100}
                    height={100}
                    src={preview && preview?.length && preview.length > 0 ? preview : "/assets/images/empty-image.png"}
                    alt={`${title} - ${short_description}`}
                    className="w-10 h-10 rounded-md object-cover bg-gray-50"
                    loading="lazy"
                    unoptimized
                />
                <span className="w-full break-all">{title} - {short_description || <span className="italic text-muted-foreground/50 break-all">[Короткий опис відсутній]</span>}</span>
            </div>
            <ActionButtonsComponent id={id} />
        </div>
    );
};

export const columns: ColumnDef<ProductGetAllType>[] = [
    {
        accessorKey: "name",
        header: "Назва",
        cell: ({ row }) => (<TableCellComponent original={row.original} />),
    }
];
