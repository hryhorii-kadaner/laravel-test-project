export type ProductType = {
    id: string;
    title: string;
    short_description: string;
    description: string;
    price: number;
    cost_price: number;
    discount_price: number;
    discount: boolean;
    preview: string;
    media: string[] | null;
    created_at: string;
    updated_at: string;
};

export type ProductGetAllType = {
    id: string;
    title: string;
    short_description: null;
    description: string;
    price: number;
    cost_price: null;
    discount_price: null;
    discount: boolean;
    preview: string;
    images: ProductMediaType[];
    created_at: string;
    updated_at: string;
};

type ProductMediaType = {
    original: string;
    "100x100": string;
    "300x300": string;
    "600x600": string;
};

export type ProductPostParamsType = {
    title: string;
    short_description: string;
    description: string;
    price: number;
    cost_price: number;
    discount_price: number;
    discount: boolean;
    media: File[] | null;
};

export type ProductPatchParamsType = {
    id: string;
    title: string;
    short_description: string;
    description: string;
    price: number;
    cost_price: number;
    discount_price: number;
    discount: boolean;
    media: File[] | null;
};