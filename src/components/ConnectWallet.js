import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';  
import { styled } from 'styled-components'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from "react";
import { ethers } from 'ethers';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits } from 'ethers'
import { utonomaABI, utonomaSepoliaAddress } from '../Utils/UtonomaABI'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'acc64a6d2308020280276076ddc6effa'

// 2. Set chains
const sepolia = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io/',
  rpcUrl: 'https://sepolia.infura.io/v3/a8b7f3c03367496183ae6e32ad962ee5'
}

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  tokens: {
    1: { address: '0x1AdaA27C9890c97D605778c2C7B9ff846B8e3352' }
  },
  chains: [sepolia],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

const Container = styled.div`
  text-align: center;
  margin: 40px 20px;
  border: solid 5px var(--bluegray-800);
  border-radius: 20px;
  padding: 20px
`;

export default function ConnectWallet({ Component, pageProps }) {
  const [loadingGetUserBalance, setLoadingGetUserBalance] = useState(false);
  const [userBalance, setUserBalance] = useState(0)
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  async function getBalance() {
    setLoadingGetUserBalance(true)
    if (!isConnected)  {
      setLoadingGetUserBalance(false)
      throw Error('User disconnected')
    }

    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const utonomaContract = new Contract(utonomaSepoliaAddress, utonomaABI, signer)
    const userBalance = await utonomaContract.balanceOf(address)

    setLoadingGetUserBalance(false)

    setUserBalance(formatUnits(userBalance, 18))
  }

  return (
    <Container>
      <h2>Connect Wallet</h2>
      <w3m-button />
      <div 
        style={{ 
          "alignContent": "center", 
          display:"flex", 
          justifyContent:"center", 
          alignItems:"center", 
          gap:"20px",
          margin: "20px 0"
        }}
      >
        <Button 
          icon="pi pi-check" 
          label="Get User Balance" 
          onClick={getBalance} 
          severity="secondary" 
          outlined 
          loading={loadingGetUserBalance}
        />
        <label>{userBalance == 0 ? null : userBalance}</label>
      </div>
    </Container>
  );
}