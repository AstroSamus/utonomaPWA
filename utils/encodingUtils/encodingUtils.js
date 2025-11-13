import bops from 'bops'
import bs58 from 'bs58'
import { Buffer } from 'buffer'


export function getIpfsHashFromBytes32(bytes32Hex) {
  // Add our default ipfs values for first 2 bytes:
  // f¡unction:0x12=sha2, size:0x20=256 bits
  // and cut off leading '0x'
  if(!bytes32Hex) throw 'no input received'
  const hashHex = '1220' + bytes32Hex.slice(2)
  const hashBytes = bops.from(hashHex, 'hex')
  const hashStr = bs58.encode(hashBytes)
  return hashStr
}

export function getUrlFromIpfsHash(cid) {
  return `https://copper-urban-gorilla-864.mypinata.cloud/ipfs/${cid}?pinataGatewayToken=WmR3tEcyNtxE6vjc4lPPIrY0Hzp3Dc9AYf2X4Bl-8o6JYBzTx9aY_u3OlpL1wGra`
}

export function convertIPFSHashToBytes32(CID){
  const arrayBase8 = bs58.decode(CID)
  const reducedTo32Bytes = arrayBase8.slice(2)
  const res = "0x" + Buffer.from(reducedTo32Bytes).toString('hex')
  return res
}