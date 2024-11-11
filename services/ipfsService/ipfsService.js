export async function pinJsonToIpfs(jsonToPin) {
  const rawRes = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYmJlNTYxOS1hM2VmLTRjNzgtYWZjMi04N2E2ZjAzYTg4NTEiLCJlbWFpbCI6ImFkcmlhbi5zZXF1ZWlyYUBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMmJjYjVmYTA5YzVhMjY4ODViYSIsInNjb3BlZEtleVNlY3JldCI6ImIyM2ZlYTM0NGJiMTY1Zjg2M2M1ZGQ2NjA4NDExYjFkZTk5OWEwY2Y1MmMwODg0MmRiMzJjNzMyZDljMTg2YmEiLCJpYXQiOjE3MDg2NTMxMjh9.2l4FvQow4eqchALGkxMcdhVTvSjFOxWMtU_ZIVfj2fg', 
      'Content-Type': 'application/json'
    },
    body: `{"pinataContent":${JSON.stringify(jsonToPin)},"pinataMetadata":{"name":"metadata.json"},"pinataOptions":{"cidVersion":0}}`
  })
  const res = await rawRes.json()
  if(res.error) throw new Error('Error in the request to upload metadata to IPFS network')
  return res
}

export async function pinFileToIPFS(file) {
  const form = new FormData();
  form.append("file", file);
  form.append("pinataOptions", "{\n  \"cidVersion\": 0\n}");
  
  const rawRes =  await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYmJlNTYxOS1hM2VmLTRjNzgtYWZjMi04N2E2ZjAzYTg4NTEiLCJlbWFpbCI6ImFkcmlhbi5zZXF1ZWlyYUBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMmJjYjVmYTA5YzVhMjY4ODViYSIsInNjb3BlZEtleVNlY3JldCI6ImIyM2ZlYTM0NGJiMTY1Zjg2M2M1ZGQ2NjA4NDExYjFkZTk5OWEwY2Y1MmMwODg0MmRiMzJjNzMyZDljMTg2YmEiLCJpYXQiOjE3MDg2NTMxMjh9.2l4FvQow4eqchALGkxMcdhVTvSjFOxWMtU_ZIVfj2fg', 
    },
    body: form
  })
  const res = await rawRes.json()
  if(res.error) throw new Error('Error in the request to upload a short video to IPFS network')
  return res
}