import { request } from "@/configs";
import { ProductPatchParamsType, ProductPostParamsType } from "@/types";

export const createProduct = async (data: ProductPostParamsType) => {
    const formData = new FormData();

    if (data?.media) {
        data.media.forEach((file) => {
            formData.append('media[]', file, file.name);
        });
    }

    for (const key in data) {
        if (/title|short_description|description|price|cost_price|discount_price|discount/g.test(key)) {
            const value = data[key as keyof ProductPostParamsType];
            if (value) {
                formData.append(key, value.toString());
            }
        }
    }

    return request({
        url: '/products',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData
    })
}

export const updateProduct = async (data: ProductPatchParamsType) => {
    const {id} = data;
    const formData = new FormData();

    if (data?.media) {
        data.media.forEach((file) => {
            formData.append('media[]', file, file.name);
        });
    }

    for (const key in data) {
        if (/title|short_description|description|price|cost_price|discount_price|discount/g.test(key)) {
            const value = data[key as keyof ProductPatchParamsType];
            if (value) {
                formData.append(key, value.toString());
            }
        }
    }

    formData.append('_method', 'PATCH');

    return request({
        url: `/products/${id}`,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData
    })
}

export const deleteProduct = (id: string) => request({
    url: `/products/${id}`,
    method: 'DELETE',
});