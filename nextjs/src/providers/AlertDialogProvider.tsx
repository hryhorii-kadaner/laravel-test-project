'use client';

import { createContext, useState, useCallback, useContext } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/common";
import { useIsMobile } from "@/hooks/use-mobile";

type AlertOptions = {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onSubmit: () => void | Promise<void>;
}

type AlertDialogContextType = {
    showAlert: (options: AlertOptions) => void;
};

const AlertDialogContext = createContext<AlertDialogContextType | null>(null);

export function AlertDialogProvider({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<AlertOptions | null>(null);
    const [loading, setLoading] = useState(false);

    const showAlert = useCallback((opts: AlertOptions) => {
        setOptions(opts);
        setOpen(true);
    }, [])

    const handleConfirm = async () => {
        if (!options) return;
        setLoading(true);
        try {
            await options.onSubmit();
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    const handleCancel = () => {
        if (!loading) {
            setOpen(false);
        }
    };

    return (
        <AlertDialogContext.Provider value={{ showAlert }}>
            {children}

            <AlertDialog open={open} onOpenChange={handleCancel}>
                <AlertDialogContent>
                    <AlertDialogHeader className={isMobile ? 'text-start' : ''}>
                        <AlertDialogTitle>{options?.title || 'Попередження'}</AlertDialogTitle>
                        {options?.description && (
                            <AlertDialogDescription>{options.description || 'Ви впевнені, що бажаєте це зробити?'}</AlertDialogDescription>
                        )}
                    </AlertDialogHeader>
                    <AlertDialogFooter className={isMobile ? 'flex-row items-center gap-2 justify-end' : ''}>
                        <Button
                            variant="primary"
                            subvariant="outline"
                            disabled={loading}
                            onClick={handleCancel}
                            autoFocus
                        >
                            {options?.cancelText || "Скасувати"}
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={loading}
                            className="font-normal"
                            onClick={handleConfirm}
                        >
                            {loading ? "..." : options?.confirmText || "Підтвердити"}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AlertDialogContext.Provider>
    );
};


export const useAlertDialog = () => {
    const ctx = useContext(AlertDialogContext);
    if (!ctx) {
        throw new Error("useAlertDialog must be used within AlertDialogProvider");
    }
    return ctx;
}
