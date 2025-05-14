'use client';

import * as React from 'react';
import { Button as DefaultButton } from '@/components/ui';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'destructive';
type Subvariant = 'default' | 'outline' | 'link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    subvariant?: Subvariant;
    children?: React.ReactNode;
}

const Button = ({
    variant = 'primary',
    subvariant = 'default',
    children,
    className,
    ...props
}: ButtonProps) => {
    const base =
        'font-normal bg-transparent transition-colors disabled:opacity-50 disabled:pointer-events-none rounded-sm';

    const classes: Record<Variant, Record<Subvariant, string>> = {
        primary: {
            default: 'bg-[#2563EB] hover:bg-[#2563EB]/90 text-white focus:shadow-[0_0_0_3px_#2563EB]/25',
            outline: 'text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB]/10',
            link: 'text-[#2563EB] p-0 m-0 shadow-none border-none outline-none font-medium',
        },
        secondary: {
            default: 'bg-[#E4E4E7] text-[#18181B] hover:bg-[#E4E4E7]/90 shadow-sm/5 hover:shadow-sm/10 focus:shadow-[0_0_0_3px_#E4E4E7]/25',
            outline: 'text-[#18181B] border border-[#E4E4E7] hover:bg-[#F4F4F5] hover:border-[#E4E4E7]/10',
            link: 'text-[#E4E4E7] p-0 m-0 shadow-none border-none outline-none font-medium',
        },
        destructive: {
            default: 'bg-[#DC2626] text-white hover:bg-[#DC2626]/90 focus:shadow-[0_0_0_3px_#DC2626]/25',
            outline: 'text-[#DC2626] border border-[#DC2626] hover:bg-[#DC2626]/10',
            link: 'text-[#DC2626] p-0 m-0 shadow-none border-none outline-none font-medium',
        },
    };

    return (
        <DefaultButton
            {...props}
            className={cn(base, classes[variant][subvariant], className)}
        >
            {children}
        </DefaultButton>
    );
};

export { Button };
