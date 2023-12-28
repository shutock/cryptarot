"use client";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygon, mainnet } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

type Props = { children: React.ReactNode };

export const Wagmi: React.FC<Props> = ({ children }) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygon, mainnet],
    [publicProvider()]
  );

  const config = createConfig({
    publicClient,
    webSocketPublicClient,
    connectors: [
      new InjectedConnector({ chains }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
        },
      }),
      new CoinbaseWalletConnector({
        chains,
        options: { appName: "Witchfolio" },
      }),
    ],
    autoConnect: true,
  });

  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};
