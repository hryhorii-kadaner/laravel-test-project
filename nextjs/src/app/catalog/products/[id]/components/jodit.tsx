'use client';
import dynamic from 'next/dynamic';
import { memo, useRef } from 'react';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

type Props = {
    value: string;
    onChange: (value: string) => void;
    onBlur?: (value: string) => void;
    height?: number;
    placeholder?: string;
};

const RichTextEditor = ({
    value,
    onChange,
    onBlur,
    height = 450,
    placeholder = 'Введіть опис...',
}: Props) => {
    const editorRef = useRef(null);
    const lastValueRef = useRef<string>(value);

    const handleChange = (newValue: string) => {
        if (newValue !== lastValueRef.current) {
            lastValueRef.current = newValue;
            onChange(newValue);
        }
    };

    return (
        <JoditEditor
            ref={editorRef}
            value={value}
            config={{
                readonly: false,
                width: '100%',
                height,
                placeholder,
            }}
            onBlur={onBlur}
            onChange={handleChange}
            tabIndex={1}
            className='text-wrap break-all'
        />
    );
};

export default memo(RichTextEditor);