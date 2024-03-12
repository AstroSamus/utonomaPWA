import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';  
import { styled } from 'styled-components'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState, useRef, useEffect } from "react";
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { ethers } from "ethers";
import { BrowserProvider, Contract, JsonRpcProvider, formatUnits, parseUnits, bigNumber } from 'ethers'
import { utonomaABI, utonomaFilecoinCalibrationTestNetAddress } from '../Utils/UtonomaABI'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const VideoContainer = styled.div`
  min-block-size: 100vh;
  inline-size: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  display:flex;

  @media only screen and (orientation:landscape) {
    max-height: 100vh;
    max-width: 70vw;
  }
  `;

const Player = styled.video`
  width: 100%;

  @media only screen and (orientation:landscape) {
    width: auto;
  }
`;

const InteractionButtons  = styled.div`
  position: absolute;
  display: flex;
  gap: 8%;
  bottom: 10%;
  right: 10%;
  color: white;
`

export default function VideoCard({ posterURL, source, utonomaCID }) { 
  const playerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  const toast = useRef(null);
  /*const [videoUrl, setVideoUrl] = useState("")
  useEffect(async() => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random")
    const jsonRes = await res.json()
    setVideoUrl(data.message)
  },[])*/

  const onPlayerPress = () => {
    if(playing) {
      playerRef.current.pause()
      setPlaying(false)  
    } else {
      playerRef.current.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    if(source) {
      playerRef.current?.load();
      playerRef.current.play()
      setPlaying(true)
    }    
  }, [source]);

  const like = async() => {
    console.log("like")
    if(isConnected) {
      const ethersProvider = new BrowserProvider(walletProvider)
      //const ethersProvider = new JsonRpcProvider('https://314159.rpc.thirdweb.com')
      const signer = await ethersProvider.getSigner()
      // The Contract object
      const utonomaContract = new Contract(utonomaFilecoinCalibrationTestNetAddress, utonomaABI, signer)
      let currentFee
      try{
        const currentMAU = await utonomaContract.currentPeriodMAU()
        console.log(ethers.getNumber(currentMAU))
        currentFee = await utonomaContract.calculateFee(ethers.getNumber(currentMAU))
        console.log(formatUnits(currentFee, 18))
        confirmLike(formatUnits(currentFee, 18))
      } catch(err) {
        console.log("error when getting the fee", err)
        return  
      }
    }
  }

  const confirmLike = (fee) => {
    confirmDialog({
      message: `Current fee for liking a content is: ${fee} Utonoma tokens`,
      header: 'Do you accept the fee?',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: acceptLike,
      reject: rejectLike
    });
  }

  const rejectLike = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected, remember that the fee keeps the bots away from the platform', life: 3000 });
  }

  const acceptLike = async() => {
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const utonomaContract = new Contract(utonomaFilecoinCalibrationTestNetAddress, utonomaABI, signer)
    //Approves a big amount of tokens to be spent by the smart contract, so the user doesn't need to 
    const approveResult = await utonomaContract.like([utonomaCID.identifier, utonomaCID.contentLibrary])
    const transactionResp = await approveResult.wait()
    console.log(transactionResp)
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Confirmed like!!!', life: 3000 });
  }


  const dislike = async() => {
    console.log("dislike")
    if(isConnected) {
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      const utonomaContract = new Contract(utonomaFilecoinCalibrationTestNetAddress, utonomaABI, signer)
      let currentFee
      try{
        const currentMAU = await utonomaContract.currentPeriodMAU()
        console.log(ethers.getNumber(currentMAU))
        currentFee = await utonomaContract.calculateFee(ethers.getNumber(currentMAU))
        console.log(formatUnits(currentFee, 18))
        confirmDislike(formatUnits(currentFee, 18))
      } catch(err) {
        console.log("error when getting the fee", err)
        return  
      }
    }
  }

  const confirmDislike = (fee) => {
    confirmDialog({
      message: `Current fee for disliking a content is: ${fee} Utonoma tokens`,
      header: 'Do you accept the fee?',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: acceptDislike,
      reject: rejectDislike
    });
  }

  const rejectDislike = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected, remember that the fee keeps the bots away from the platform', life: 3000 });
  }

  const acceptDislike = async() => {
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const utonomaContract = new Contract(utonomaFilecoinCalibrationTestNetAddress, utonomaABI, signer)
    //Approves a big amount of tokens to be spent by the smart contract, so the user doesn't need to 
    const approveResult = await utonomaContract.dislike([utonomaCID.identifier, utonomaCID.contentLibrary])
    const transactionResp = await approveResult.wait()
    console.log(transactionResp)
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Confirmed dislike!!!', life: 3000 });
  }

  return (
    <VideoContainer> 
      <Player 
        loop 
        poster = { posterURL } 
        src = {source}
        onClick={onPlayerPress}
        ref={playerRef} 
        crossOrigin="anonymous"
      ></Player>
      <InteractionButtons>
        <Button icon="pi pi-heart" onClick={like}  rounded severity="help" aria-label="Favorite" />
        <Button icon="pi pi-thumbs-down" onClick={dislike} rounded severity="help" aria-label="Favorite" />
      </InteractionButtons>
      <Toast ref={toast} />
    </VideoContainer>
  );
}   