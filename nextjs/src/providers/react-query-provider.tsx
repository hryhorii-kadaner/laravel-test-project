"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TanstackClientProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 10 * 60 * 1000
            }
        }
    });

    return (<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>);
};

export default TanstackClientProvider;