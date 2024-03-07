import { Button } from 'primereact/button';  
import { styled } from 'styled-components'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState, useRef, useEffect } from "react";
import VideoCard from './VideoCard';
import { ethers } from "ethers";
import { BrowserProvider, Contract, JsonRpcProvider, formatUnits, parseUnits } from 'ethers'
import { utonomaABI, utonomaSepoliaAddress } from '../Utils/UtonomaABI'
import bs58 from 'bs58'


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

  async function getVideo() {
    const provider = new JsonRpcProvider("https://sepolia.infura.io/v3/a8b7f3c03367496183ae6e32ad962ee5")
    const utonomaContract = new Contract(utonomaSepoliaAddress, utonomaABI, provider)
    const shortVideosLibraryLength = formatUnits(await utonomaContract.getContentLibraryLength(5), 0)
    console.log(shortVideosLibraryLength)
    const identifier = Math.floor(Math.random() * (shortVideosLibraryLength - 1))
    console.log("the identifier is: ", identifier)
    const {0: authorAddress, 1: contentId, 2: metadata}  = await utonomaContract.getContentById([1,5])
    setVideoSrc("https://ipfs.io/ipfs/" + getIpfsHashFromBytes32(contentId))
  }

  useEffect(() => {
    getVideo()
  }, []);

  return (
    <>
      <VideoCard 
        posterURL={ "https://i1.wp.com/detechter.com/wp-content/uploads/2015/11/romain-3.gif?fit=500%2C700&ssl=1" } 
        source = { videoSrc }
      />
      <VideoCard 
        posterURL={ "https://i1.wp.com/detechter.com/wp-content/uploads/2015/11/romain-3.gif?fit=500%2C700&ssl=1" } 
        source = { "https://v16-webapp-prime.tiktok.com/video/tos/useast2a/tos-useast2a-pve-0068/o4GBGnDgFNO7yRSeVRvuAB1EE73QIJgfQlS5AE/?a=1988&ch=0&cr=3&dr=0&lr=unwatermarked&cd=0%7C0%7C0%7C&cv=1&br=1792&bt=896&bti=NDU3ZjAwOg%3D%3D&cs=0&ds=6&ft=4fUEKMtN8Zmo01pGT94jVUKBDpWrKsd.&mime_type=video_mp4&qs=0&rc=OzQ7NThkOTU6ODU0Zjc0M0BpajppOnc5cmhscTMzNzczM0BfYy4vNTReXi0xMGNiMV9iYSNfaTRlMmRzMDFgLS1kMTZzcw%3D%3D&btag=e00090000&expire=1709040373&l=20240225132509A716D552852644D7B071&ply_type=2&policy=2&signature=7f8b6bb38c9382b1f7957b2a49079b76&tk=tt_chain_token" }
      />
      <VideoCard 
        posterURL={ "https://i1.wp.com/detechter.com/wp-content/uploads/2015/11/romain-3.gif?fit=500%2C700&ssl=1" } 
        source = { "https://v16-webapp-prime.tiktok.com/video/tos/useast2a/tos-useast2a-pve-0068/o4GBGnDgFNO7yRSeVRvuAB1EE73QIJgfQlS5AE/?a=1988&ch=0&cr=3&dr=0&lr=unwatermarked&cd=0%7C0%7C0%7C&cv=1&br=1792&bt=896&bti=NDU3ZjAwOg%3D%3D&cs=0&ds=6&ft=4fUEKMtN8Zmo01pGT94jVUKBDpWrKsd.&mime_type=video_mp4&qs=0&rc=OzQ7NThkOTU6ODU0Zjc0M0BpajppOnc5cmhscTMzNzczM0BfYy4vNTReXi0xMGNiMV9iYSNfaTRlMmRzMDFgLS1kMTZzcw%3D%3D&btag=e00090000&expire=1709040373&l=20240225132509A716D552852644D7B071&ply_type=2&policy=2&signature=7f8b6bb38c9382b1f7957b2a49079b76&tk=tt_chain_token" }
      />
    </>
  );
}   