import { Folders } from "lucide-react";

export const navigation = [
    {
        title: "Каталог",
        url: "#",
        icon: Folders,
        items: [
            {
                title: "Товари",
                url: "/catalog/products",
                disabled: false,
            },
            {
                title: "Залишки",
                url: "#",
                disabled: true,
            },
            {
                title: "Категорії",
                url: "#",
                disabled: true,
            },
            {
                title: "Колекції",
                url: "#",
                disabled: true,
            },
            {
                title: "Лейбли",
                url: "#",
                disabled: true,
            },
            {
                title: "Бренди",
                url: "#",
                disabled: true,
            },
        ],
    },
];