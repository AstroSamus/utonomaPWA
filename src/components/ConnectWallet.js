import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';  
import { styled } from 'styled-components'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState, useRef } from "react";
import { ethers } from 'ethers';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits, parseUnits } from 'ethers'
import { utonomaABI, utonomaFilecoinCalibrationTestNetAddress } from '../Utils/UtonomaABI'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'acc64a6d2308020280276076ddc6effa'

// 2. Set chains
const filecoinCalibrationTestNet = {
  chainId: 314159,
  name: 'Filecoin - Calibration testnet',
  currency: 'tFIL',
  explorerUrl: 'https://calibration.filscan.io',
  rpcUrl: 'https://rpc.ankr.com/filecoin_testnet'
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
    1: { address: '0xe54d9c99a9A0cfc3974f1b4AfB0a231a059872aD' }
  },
  chains: [filecoinCalibrationTestNet],
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
  const [loadingActivateVoting, setLoadingActivateVoting] = useState(false)
  const [userBalance, setUserBalance] = useState(0)
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  const toast = useRef(null);

  async function testFilecoin() {
    try {
      // Get the provider, instantiate the contract and then call getCurrentAd
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(utonomaFilecoinCalibrationTestNetAddress, utonomaABI, provider);
      const adData = await contract.balanceOf("0x4A9101BDEe2466d8B8d78a737C11820c9FC1c792")
      setUserBalance(formatUnits(userBalance, 18))
      console.log(adData);
    } catch (error) {
      console.error('Error fetching current ad:', error);
    }
  }

  async function getBalance() {
    setLoadingGetUserBalance(true)
    if (!isConnected)  {
      setLoadingGetUserBalance(false)
      throw Error('User disconnected')
    }

    const ethersProvider = new BrowserProvider(walletProvider)
    //const ethersProvider = new JsonRpcProvider('https://314159.rpc.thirdweb.com')
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const utonomaContract = new Contract(utonomaFilecoinCalibrationTestNetAddress, utonomaABI, signer)
    let userBalance
    try{
      userBalance = await utonomaContract.balanceOf(address)
    } catch(err) {
      console.log("error when getting the balance", userBalance)
      setLoadingGetUserBalance(false)    
      return  
    }
    setLoadingGetUserBalance(false)

    setUserBalance(formatUnits(userBalance, 18))
  }

  const activateVoting = async() => {
    setLoadingActivateVoting(true)
    if (!isConnected) {
      setLoadingActivateVoting(false)
      throw Error('User disconnected')
    }
    
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const utonomaContract = new Contract(utonomaFilecoinCalibrationTestNetAddress, utonomaABI, signer)
    //Approves a big amount of tokens to be spent by the smart contract, so the user doesn't need to 
    const approveResult = await utonomaContract.approve(utonomaFilecoinCalibrationTestNetAddress, parseUnits("100000.0", 18))
    const transactionResp = await approveResult.wait()
    console.log(transactionResp)
    setLoadingActivateVoting(false)
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Done. Wait some minutes and start voting!!!', life: 3000 });
  }

  const confirmActivateVoting = () => {
    confirmDialog({
      message: 'This will allow the smart contract to charge you automatically the fees?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: activateVoting,
      reject
    });
  }

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
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
      <Button 
        icon="pi pi-check" 
        label="Activate Account For Voting" 
        onClick={confirmActivateVoting} 
        severity="secondary" 
        outlined 
        loading={loadingActivateVoting}
      />
      <Toast ref={toast} />
      <ConfirmDialog />
    </Container>
  );
}