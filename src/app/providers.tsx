// src/app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http('https://cloudflare-eth.com'),
    [sepolia.id]: http('https://rpc.sepolia.org'),
  },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#262626',
              border: '1px solid #e6e6e6',
              borderRadius: '0px',
              padding: '12px 16px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />
      </QueryClientProvider>
    </WagmiProvider>
  );
}