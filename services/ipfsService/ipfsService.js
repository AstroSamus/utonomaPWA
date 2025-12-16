import { 
  ipfsJsonUploaderUrl,
  ipfsFileUploaderUrl
} from "config.env"

export async function pinJsonToIpfs(jsonToPin) {
  const rawRes = await fetch(ipfsJsonUploaderUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonToPin)
  })
  const res = await rawRes.json()
  if(res.error) throw new Error('Error in the request to upload metadata to IPFS network')
  return res
}

export async function pinFileToIPFS(file) {
  const form = new FormData();
  form.append("file", file);

  const rawRes =  await fetch(ipfsFileUploaderUrl, {
    method: 'POST',
    body: form
  })
  const res = await rawRes.json()
  if(res.error) throw new Error('Error in the request to upload a short video to IPFS network')
  return res
}