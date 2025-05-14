import { request } from "@/configs";

export const getAllProducts = () => request({
    method: 'GET',
    url: '/products'
});

export const getProduct = (id: string) => request({
    method: 'GET',
    url: `/products/${id}`
});