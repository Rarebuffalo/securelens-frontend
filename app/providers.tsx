"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // We use useState to ensure a new QueryClient is NOT created on every render
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // Data remains fresh for 1 minute
        retry: 1, // Only retry once on failure
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
