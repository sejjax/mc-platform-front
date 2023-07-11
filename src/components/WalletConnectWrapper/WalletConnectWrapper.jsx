import React from 'react';

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { bsc, mainnet } from 'wagmi/chains';

const chains = [bsc];

const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID;

const { provider, publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

const WalletConnectWrapper = ({ children }) => {
  return (
    <>
      <WagmiConfig config={wagmiClient}>{children}</WagmiConfig>

      <Web3Modal appName="MC" version="1" projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default WalletConnectWrapper;
