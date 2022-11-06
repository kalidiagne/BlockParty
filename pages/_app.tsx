import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { WagmiConfig, createClient, chain } from "wagmi";
import { getDefaultProvider } from "ethers";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
  connectors: [new MetaMaskConnector({ chains: [chain.goerli] })],
});
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;800;900&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={client}>
          <Component {...pageProps} />
        </WagmiConfig>
      </QueryClientProvider>
    </>
  );
}
