'use client';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Dropzone from 'react-dropzone';
import { UseFormSetValue } from 'react-hook-form';

const ImageLoaderComponent = ({ setFiles, files }: {
    setFiles: UseFormSetValue<{
        title: string;
        discount: boolean;
        media?: FileList | null;
        short_description?: string | undefined;
        description?: string | undefined;
        price?: number | undefined;
        cost_price?: number | null | undefined;
    }>;
    files: FileList | undefined;
}) => {

    return (
        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className={
                    cn(
                        'bg-[#F8F9FB] p-8 flex flex-col justify-center items-center rounded-xl border border-dashed border-[#E4E4E7] transition-colors',
                        'hover:border-[#E2E2E2] hover:bg-[#E2E2E2]',
                        files && files?.length > 0 && 'max-w-[100px] max-h-[100px] cursor-pointer'
                    )
                }>
                    {/* @ts-ignore */}
                    <input {...getInputProps()} onChange={(e) => {
                        // @ts-ignore
                        setFiles('media', files && files?.length > 0 ? [...Array.from(e.target.files), files] : [...Array.from(e.target.files)])
                    }} />
                    {
                        files && files?.length > 0 ?
                            <Plus size={24} />
                            :
                            <>
                                <button type='button' className='py-2 px-3 bg-white border border-[#E4E4E7] rounded-sm cursor-pointer'>Завантажити</button>
                                <p className='text-[#3F3F46] pt-2 text-sm text-center'>Ви можете завантажити зображення до 10 Mb, відео до 100 Mb або медіа файли за посиланням</p>
                            </>
                    }

                </div>
            )}
        </Dropzone>
    );
};

export default ImageLoaderComponent;