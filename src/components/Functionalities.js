import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';  
import { styled } from 'styled-components'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from "react";
import { ethers } from 'ethers';
import UploadContent from './UploadContent' 
import ConnectWallet from './ConnectWallet'

export default function Functionalities({ Component, pageProps }) {

  return (
    <>
      <ConnectWallet></ConnectWallet>
      <UploadContent></UploadContent>
    </>
  );
}   