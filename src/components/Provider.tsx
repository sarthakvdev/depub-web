import { ReactNode } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { ETH_CHAINS, SITE_NAME } from 'utils/config';
import { alchemyProvider } from 'wagmi/providers/alchemy';

interface Props {
  children: ReactNode;
}

const { chains, provider, webSocketProvider } = configureChains(ETH_CHAINS, [
  alchemyProvider({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
  }),
  publicProvider(),
]);

const client = createClient(
  getDefaultClient({
    appName: SITE_NAME,
    autoConnect: true,
    provider,
    chains,
    webSocketProvider,
  })
);

export default function Provider(props: Props) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="soft">{props.children}</ConnectKitProvider>
    </WagmiConfig>
  );
}
