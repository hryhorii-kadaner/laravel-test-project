'use client';

import { cn } from "@/lib/utils";
import { FieldsetHTMLAttributes, HTMLAttributes } from "react";

interface FieldsetProps extends React.DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> {
    children: React.ReactNode;
}

export const Fieldset = ({ children, ...props }: FieldsetProps) => {
    const fieldsetClassName = 'flex flex-col gap-2';
    return <fieldset {...props} className={cn(fieldsetClassName, props?.className)}>{children}</fieldset>
};


interface ContainerProps extends React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactNode;
    isMobile?: boolean;
}

export const Container = ({ isMobile = false, children, ...props }: ContainerProps) => {
    const containerClassName = 'flex flex-col gap-4 bg-white border border-[#E4E4E7] rounded-2xl p-4';
    return <div className={cn(containerClassName, props?.className, isMobile && 'rounded-none border-none')}>{children}</div>;
};