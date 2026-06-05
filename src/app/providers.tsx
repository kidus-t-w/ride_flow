'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';  // ✅ Use 'injected' instead of 'metaMask'

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],  // ✅ This will detect MetaMask and other injected wallets
  transports: {
    [mainnet.id]: http('https://eth.llamarpc.com'),
    [sepolia.id]: http('https://rpc.sepolia.org'),
  },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}