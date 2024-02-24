import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';  
import { styled } from 'styled-components'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState, useRef } from "react";
import { BrowserProvider, Contract, formatUnits } from 'ethers'
import { utonomaABI, utonomaSepoliaAddress } from '../Utils/UtonomaABI'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { CID } from 'multiformats/cid'
import bs58 from 'bs58'
import { Toast } from 'primereact/toast';
import { ListBox } from 'primereact/listbox';


const UploadFile = styled.div`
  text-align: center;
  margin: 40px 20px;
  border: solid 5px var(--bluegray-800);
  border-radius: 20px;
  padding: 20px
`;

function convertIPFSHashToBytes32(CID){
  const arrayBase8 = bs58.decode(CID)
  const reducedTo32Bytes = arrayBase8.slice(2)
  console.log(reducedTo32Bytes)
  const res = "0x" + Buffer.from(reducedTo32Bytes).toString('hex')
  return res
}

export default function UploadContent({ Component, pageProps }) {
  const [shortVideoTitle, setShortVideoTitle] = useState('');
  const [shortVideoDescription, setShortVideoDescription] = useState('');
  const [shortVideoFile, setShortVideoFile] = useState('');
  const [loading, setLoading] = useState(false);
  const { isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  //const [contentType, setContentType] = useState(null);
  const toast = useRef(null);
/*
  const groupedCities = [
    {
        label: 'Germany',
        code: 'Audio',
        items: [
            { label: 'audios', value: 0 },
            { label: 'music', value: 1 },
            { label: 'podcasts', value: 2 },
            { label: 'audio live streams', value: 3 },
            { label: 'videos', value: 4 },
            { label: 'short videos', value: 5 },
            { label: 'movies', value: 6 },
            { label: 'video live streams', value: 7 },
            { label: 'comments', value: 8 },
            { label: 'blogs', value: 9 },
            { label: 'books', value: 10 },
            { label: 'images', value: 11 },
            { label: 'animations', value: 12 },
            { label: 'videoGames', value: 13 },
        ]
    },
];*/

  const groupTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
        <div>{option.label}</div>
      </div>
    );
  };


  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Success', detail:'Transaction sent to the blockchain', life: 3000});
  }

  const showError = () => {
    toast.current.show({severity:'error', summary: 'Error', detail:'There was an error while uploading your content', life: 3000});
  }

  const uploadShortVideo = async () => {
    setLoading(true);
    let metadataHash
    let contentHash

    const payload = {
      shortVideoTitle,
      shortVideoDescription 
    }

    //Start of Upload Metadata to IPFS
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYmJlNTYxOS1hM2VmLTRjNzgtYWZjMi04N2E2ZjAzYTg4NTEiLCJlbWFpbCI6ImFkcmlhbi5zZXF1ZWlyYUBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMmJjYjVmYTA5YzVhMjY4ODViYSIsInNjb3BlZEtleVNlY3JldCI6ImIyM2ZlYTM0NGJiMTY1Zjg2M2M1ZGQ2NjA4NDExYjFkZTk5OWEwY2Y1MmMwODg0MmRiMzJjNzMyZDljMTg2YmEiLCJpYXQiOjE3MDg2NTMxMjh9.2l4FvQow4eqchALGkxMcdhVTvSjFOxWMtU_ZIVfj2fg', 
        'Content-Type': 'application/json'
      },
      body: `{"pinataContent":${JSON.stringify(payload)},"pinataMetadata":{"name":"metadata.json"},"pinataOptions":{"cidVersion":0}}`
    };
    
    try {
      const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', options)
      const jsonResp = await res.json()
      metadataHash = jsonResp
      console.log(jsonResp)
    } catch (err) {
      console.error(err)
      showError()
    }
    //End of Upload Metadata to IPFS

    //Start of Upload Content to IPFS
    const form = new FormData();
    form.append("file", shortVideoFile);
    form.append("pinataOptions", "{\n  \"cidVersion\": 0\n}");

    const opt = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYmJlNTYxOS1hM2VmLTRjNzgtYWZjMi04N2E2ZjAzYTg4NTEiLCJlbWFpbCI6ImFkcmlhbi5zZXF1ZWlyYUBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMmJjYjVmYTA5YzVhMjY4ODViYSIsInNjb3BlZEtleVNlY3JldCI6ImIyM2ZlYTM0NGJiMTY1Zjg2M2M1ZGQ2NjA4NDExYjFkZTk5OWEwY2Y1MmMwODg0MmRiMzJjNzMyZDljMTg2YmEiLCJpYXQiOjE3MDg2NTMxMjh9.2l4FvQow4eqchALGkxMcdhVTvSjFOxWMtU_ZIVfj2fg', 
      }
    };

    opt.body = form;

    try {
      const fileUploadResp =  await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', opt)
      contentHash = await fileUploadResp.json()
      console.log(contentHash)
    } catch (err) {
      console.log(err)
      setLoading(false);
      showError()
    }
    //End of Upload Content to IPFS

    //Start of Upload hashes to the smart contract

    if (!isConnected)  {

      throw Error('User disconnected')
      setLoading(false);
      showError()
    }

    try{
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      // The Contract object
      const utonomaContract = new Contract(utonomaSepoliaAddress, utonomaABI, signer)
      const uploadResponse = await utonomaContract.upload(
        convertIPFSHashToBytes32(metadataHash.IpfsHash), 
        convertIPFSHashToBytes32(contentHash.IpfsHash), 
        5
      )
      
      const transactionResp = await uploadResponse.wait()
      console.log(transactionResp)
      showSuccess()
    } catch(err) {
      console.log("Error when uploading file", err)
      setLoading(false);
      showError()
    }

    //End of Upload hashes to the smart contract
    
    setLoading(false);
  };

  return (
    <PrimeReactProvider>
      <Toast ref={toast} />
      <UploadFile>
        <h2>Upload content</h2>
        <input 
          type="file" 
          accept="video/*"
          onChange={(e) => setShortVideoFile(e.target.files[0])}
        ></input>
        <div className="p-inputgroup flex-1" style={{ margin: "15px 0"}}>
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText 
            placeholder="Title" 
            value={shortVideoTitle} 
            onChange={(e) => setShortVideoTitle(e.target.value)}
          />
        </div>
        <div className="card flex justify-content-center">
          <InputTextarea 
            value={shortVideoDescription} 
            onChange={(e) => setShortVideoDescription(e.target.value)} 
            rows={5}
            placeholder='Description'
            style={{ width: '100%', margin: "15px 0"}}
          />
        </div>
        {/*
                  <div className="card flex justify-content-center" style={{marginBottom:"20px"}}>
                  <p>Pick a content type:</p>
                  <ListBox value={contentType} onChange={(e) => setContentType(e.value)} options={groupedCities} optionLabel="label" 
                  optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={groupTemplate} className="w-full md:w-14rem" listStyle={{ maxHeight: '250px' }} />
                </div>
        */}
        <div className="card flex flex-wrap justify-content-center gap-3">
          <Button icon="pi pi-check" label="Upload" severity="secondary" outlined loading={loading} onClick={uploadShortVideo} />
        </div>
      </UploadFile>
    </PrimeReactProvider>
  );
}   