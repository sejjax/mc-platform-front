import React from "react"
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum"
import { Web3Modal } from "@web3modal/react"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { bsc } from "wagmi/chains"

const chains = [bsc]

const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    version: "1",
    appName: "MC",
    chains,
    projectId,
  }),
  provider,
})

const ethereumClient = new EthereumClient(wagmiClient, chains)

const WalletConnectWrapper = ({ children }) => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

export default WalletConnectWrapper
