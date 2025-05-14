'use client';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SetStateAction, useEffect, useState } from 'react';
import { Input, Switch, Textarea } from '@/components/ui';
import { Container, Fieldset } from './form-components';
import { useIsMobile } from '@/hooks/use-mobile';
import ImageLoaderComponent from './image-loader';
import RichTextEditor from './jodit';
import { cn, margin } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { ProductType } from '@/types';

// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
// const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm'];
// 
// const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
// const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

const schema = z.object({
    title: z.string().min(1, 'Назва не може бути порожньою!').max(200, 'Максимум 200 символов'),
    short_description: z.string().max(300, 'Максимум 300 символов').optional(),
    description: z.string().max(5000, 'Максимум 5000 символов').optional(),
    media: z
        .any()
        // .refine(
        //     (files: File[] | FileList) => {
        //         if (!files || files.length === 0) return true;

        //         let processedFiles = files;

        //         if (files instanceof FileList) processedFiles = Array.from(files);

        //         for (const file of processedFiles) {
        //             const isImage = ACCEPTED_IMAGE_TYPES.includes(file.type);
        //             const isVideo = ACCEPTED_VIDEO_TYPES.includes(file.type);
        //             if (!isImage && !isVideo) return false;
        //             if (isImage && file.size > MAX_IMAGE_SIZE) return false;
        //             if (isVideo && file.size > MAX_VIDEO_SIZE) return false;
        //         }

        //         return true;
        //     },
        //     {
        //         message: 'Файли повині бути зображеннями (до 10МБ) або відео (до 100МБ)',
        //     }
        // )
        .optional(),
    price: z.coerce.number().min(0, 'Ціна не може бути від\'ємною').optional(),
    discount: z.boolean(),
    cost_price: z.coerce
        .number()
        .min(0, 'Собівартісь не може бути від\'ємною')
        .optional()
        .nullable(),
    discount_price: z.coerce
        .number()
        .min(0, 'Знижка не може бути від\'ємною')
        .optional()
        .nullable(),
})
    .refine((data) => {
        if (data.discount) return typeof data.cost_price === 'number';
        return true;
    }, {
        message: 'Укажите себестоимость, если включена скидка',
        path: ['cost_price'],
    });

export type FormData = z.infer<typeof schema>;

export default function ProductForm({ data = null, setProductName, onSubmit }: { data?: ProductType | null; setProductName: React.Dispatch<SetStateAction<string>>; onSubmit: (data: FormData) => void }) {
    const isMobile = useIsMobile();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: data ?? {
            title: '',
            short_description: '',
            description: '',
            price: 0,
            discount: false,
            cost_price: 0,
            discount_price: 0,
            media: null
        },
        ...(data && {
            values: {
                title: data?.title,
                short_description: data?.short_description || '',
                description: data?.description || '',
                price: data?.price || 0,
                discount: data?.discount || false,
                cost_price: data?.cost_price || 0,
                discount_price: data?.discount_price || 0,
                media: data?.media
            }
        })
    });

    const [previews, setPreviews] = useState<string[]>([]);

    const discount = useWatch({ control, name: 'discount' });
    const files = useWatch({ control, name: 'media' });
    const title = useWatch({ control, name: 'title' });
    const short_description = useWatch({ control, name: 'short_description' });
    const price = useWatch({ control, name: 'price' });
    const cost_price = useWatch({ control, name: 'cost_price' });
    const discount_price = useWatch({ control, name: 'discount_price' });

    useEffect(() => {
        if (!files || files.length === 0) return;
        if (files.find((i: File | FileList) => i instanceof FileList)) return;

        const readers = Array.from(files).map(file => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file as File);
            });
        });

        Promise.all(readers).then(setPreviews);
    }, [files]);

    useEffect(() => {
        if (data) {
            setProductName(data.title);
        }
    }, [data, setProductName]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 pb-8' id='products-form'>
            <Container isMobile={isMobile}>
                <h2 className='font-semibold text-lg'>Інформація про товар</h2>
                <Fieldset>
                    <div className='flex items-center justify-between'>
                        <label className='block font-normal'>Назва <span className='text-red-500'>*</span></label>
                        <span className='text-[#A1A1AA] text-sm'>{title?.length || 0}/200</span>
                    </div>
                    <Input {...register('title')} onInput={(e) => { setProductName(e.currentTarget.value) }} className='input' placeholder='Назва товару' maxLength={200} />
                    {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
                </Fieldset>

                <Fieldset>
                    <div className='flex items-center justify-between'>
                        <label className='block font-normal'>Короткий опис</label>
                        <span className='text-[#A1A1AA] text-sm'>{short_description?.length || 0}/300</span>
                    </div>

                    <Textarea {...register('short_description')} className='input max-h-32' placeholder='Введіть короткий опис товару' rows={5} maxLength={300} />
                    {errors.short_description && <p className='text-red-500 text-sm'>{errors.short_description.message}</p>}
                </Fieldset>

                <Fieldset>
                    <div className='flex items-center justify-between'>
                        <label className='block font-normal'>Опис</label>
                        <span className='text-[#A1A1AA] text-sm'>{getValues('description')?.length || 0}/5000</span>
                    </div>
                    <RichTextEditor
                        value={getValues('description') || ''}
                        onChange={(v) => { setValue('description', v) }}
                        onBlur={(v) => { setValue('description', v) }}
                    />

                    {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
                </Fieldset>

            </Container>




            <Container isMobile={isMobile}>
                <h2 className='font-semibold text-lg'>Зображення</h2>
                <Fieldset className={
                    cn(files && files?.length > 0 ? 'grid grid-cols-[repeat(8,100px)] grid-rows-[repeat(2,100px)]' : '')
                }>
                    {
                        files && files.length > 0
                            ? Array.from(files as FileList).filter(i => i instanceof FileList === false).map((file, index) => {
                                const baseClass = 'h-full rounded-sm border border-[#E4E4E7] relative bg-gray-100';
                                const handleDeleteImg = (name: string) => {
                                    const filtered = Array.from(files as FileList).filter(f => f.name !== name);
                                    setValue('media', filtered);
                                };
                                const deleteIcon = (
                                    <span
                                        onClick={() => handleDeleteImg(file.name)}
                                        className="absolute top-0.5 right-0.5 text-[#DC2626] hover:bg-[#DC2626]/10 active:scale-[0.95] cursor-pointer p-1 rounded-sm"
                                    >
                                        <Trash2 size={16} />
                                    </span>
                                );

                                return (
                                    <div
                                        key={file.name}
                                        className={cn(baseClass, index === 0 ? 'col-start-1 col-end-3 row-start-1 row-end-3' : '')}
                                    >
                                        {previews[index] && (
                                            <Image
                                                src={previews[index]}
                                                alt={file.name}
                                                width={index === 0 ? 210 : 100}
                                                height={index === 0 ? 210 : 100}
                                                className="object-cover w-full h-full rounded-sm"
                                            />
                                        )}
                                        {deleteIcon}
                                    </div>
                                );
                            })
                            : null
                    }
                    <ImageLoaderComponent setFiles={setValue} files={files} />
                    {errors.media && <p className='text-red-500 text-sm'>{errors.media.message as string}</p>}
                </Fieldset>

            </Container>



            <Container isMobile={isMobile}>
                <h2 className='font-semibold text-lg'>Ціни</h2>

                <Fieldset>
                    <label className='block font-normal'>Ціна</label>
                    <div className='relative'>
                        <span className='absolute top-1/2 -translate-1/2 left-4 pointer-events-none select-none'>₴</span>
                        <Input type='number' {...register('price')} className='pl-8' min={0} />
                    </div>
                    {errors.price && <p className='text-red-500 text-sm'>{errors.price.message}</p>}
                </Fieldset>

                <Fieldset className='flex-row items-center space-x-2 max-w-max'>
                    <Switch {...register('discount')} checked={getValues('discount')} onCheckedChange={v => setValue('discount', v)} id='discount' className='cursor-pointer data-[state=checked]:bg-[#2563EB]' />
                    <label htmlFor='discount' className='select-none cursor-pointer'>Знижка</label>
                </Fieldset>

                {discount && (
                    <>
                        <Fieldset className={isMobile ? 'w-full' : ''}>
                            <label className='block font-normal'>Ціна зі знижкою</label>
                            <div className='relative'>
                                <span className='absolute top-1/2 -translate-1/2 left-4 pointer-events-none select-none'>₴</span>
                                <Input type='number' {...register('discount_price')} className='pl-8' />
                            </div>
                            {errors.discount_price && <p className='text-red-500 text-sm'>{errors.discount_price.message}</p>}
                        </Fieldset>
                        <div className={cn('flex gap-4 items-center', isMobile && 'flex-wrap')}>

                            <Fieldset className={isMobile ? 'w-full' : ''}>
                                <label className='block font-normal'>Собівартість</label>
                                <div className='relative'>
                                    <span className='absolute top-1/2 -translate-1/2 left-4 pointer-events-none select-none'>₴</span>
                                    <Input type='number' {...register('cost_price')} className='pl-8' />
                                </div>
                                {errors.cost_price && <p className='text-red-500 text-sm'>{errors.cost_price.message}</p>}
                            </Fieldset>
                            <Fieldset className={isMobile ? 'w-[calc((100%/2)-1rem/2)]' : ''}>
                                <label className='block font-normal'>Прибуток</label>
                                <div className='relative'>
                                    <span className='absolute top-1/2 -translate-1/2 left-4 pointer-events-none select-none opacity-50'>₴</span>
                                    <Input type='text' value={`${(discount_price && discount_price > 0 ? discount_price as number : price as number) - (cost_price as number)}`} className='pl-8 select-none pointer-events-none' disabled />
                                </div>
                            </Fieldset>
                            <Fieldset className={cn('w-full', isMobile && 'w-[calc((100%/2)-1rem/2)]')}>
                                <label className='block font-normal'>Маржа</label>
                                <div className='relative'>
                                    <span className='absolute top-1/2 -translate-1/2 left-4 pointer-events-none select-none opacity-50'>%</span>
                                    <Input type='text' value={`${margin(discount_price && discount_price > 0 ? discount_price as number : price as number, cost_price as number).toFixed(2)}`} className='pl-8 select-none pointer-events-none' disabled />
                                </div>
                            </Fieldset>
                        </div>
                    </>
                )}
            </Container>

        </form>
    );
}