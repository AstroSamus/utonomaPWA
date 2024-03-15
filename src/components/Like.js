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

export default function Like({likes = 0}) { 
  return (
    <div style={{textAlign: "center" }}>
      <Button icon="pi pi-heart" rounded severity="help" aria-label="Favorite" />
      <p style={{backgroundColor: "grey", margin: "2px", borderRadius: "10px"}}>{ likes }</p>
    </div>
  );
}   