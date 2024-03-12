import { Button } from 'primereact/button';  
import { styled } from 'styled-components'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState, useRef, useEffect } from "react";
import VideoCard from './VideoCard';
import { ethers } from "ethers";
import { BrowserProvider, Contract, JsonRpcProvider, formatUnits, parseUnits } from 'ethers'
import { utonomaABI, utonomaFilecoinCalibrationTestNetAddress } from '../Utils/UtonomaABI'
import bs58 from 'bs58'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'


function getIpfsHashFromBytes32(bytes32Hex) {
  // Add our default ipfs values for first 2 bytes:
  // function:0x12=sha2, size:0x20=256 bits
  // and cut off leading "0x"
  const hashHex = "1220" + bytes32Hex.slice(2)
  const hashBytes = Buffer.from(hashHex, 'hex');
  const hashStr = bs58.encode(hashBytes)
  return hashStr
}

export default function VideoReel({ Component, pageProps }) {  
  const [videoSrc, setVideoSrc] = useState("") 
  const [utonomaCID, setUtonomaCID] = useState({}) 
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()


  async function getVideo() {
    //const provider = new BrowserProvider(window.ethereum)
    const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/filecoin_testnet")
    const utonomaContract = new Contract(utonomaFilecoinCalibrationTestNetAddress, utonomaABI, provider)
    const shortVideosLibraryLength = formatUnits(await utonomaContract.getContentLibraryLength(5), 0)
    console.log(shortVideosLibraryLength)
    const identifier = Math.floor(Math.random() * (shortVideosLibraryLength - 1))
    console.log("the identifier is: ", identifier)
    try {
      const {0: authorAddress, 1: contentId, 2: metadata}  = await utonomaContract.getContentById([identifier,5])
      setUtonomaCID({identifier, contentLibrary: 5})
      setVideoSrc("https://copper-urban-gorilla-864.mypinata.cloud/ipfs/" + getIpfsHashFromBytes32(contentId) + "?pinataGatewayToken=WmR3tEcyNtxE6vjc4lPPIrY0Hzp3Dc9AYf2X4Bl-8o6JYBzTx9aY_u3OlpL1wGra")
    } catch(err) {
      console.log("No content with provided identifier")
    }

  }

  useEffect(() => {
    return () => {
      getVideo()
    };
  }, []);

  return (
    <>
      <VideoCard 
        posterURL={ "https://i1.wp.com/detechter.com/wp-content/uploads/2015/11/romain-3.gif?fit=500%2C700&ssl=1" } 
        source = { videoSrc }
        utonomaCID = { utonomaCID }
      />
      <VideoCard 
        posterURL={ "https://i1.wp.com/detechter.com/wp-content/uploads/2015/11/romain-3.gif?fit=500%2C700&ssl=1" } 
        source = { "" }
      />
      <VideoCard 
        posterURL={ "https://i1.wp.com/detechter.com/wp-content/uploads/2015/11/romain-3.gif?fit=500%2C700&ssl=1" } 
        source = { "" }
      />
    </>
  );
}   