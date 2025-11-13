import '../utonoma_styles_library/index.css'
import { readOnlyProvider } from "../web3_providers/readOnlyProvider.js"
import { setIsLoggedIn, setAddress, getUserAddress } from "../services/userManager/userManager.js"
import { getIpfsHashFromBytes32 } from "../utils/encodingUtils/encodingUtils.js"
import { canContentBeHarvested } from '../utils/validationUtils/validationUtils.js'
import { ContentInformationCard } from '../components/ContentInformationCard/ContentInformationCard.js'
import { ZeroHash } from 'ethers'

const $contentInfoCardTemplate = document.querySelector('#contentInfoCardTemplate')
const $cardsContainer = document.querySelector('#cardsContainer')
const $tempFragment = document.createDocumentFragment()
const $dialogFetchingMyContentError = document.querySelector('#dialogFetchingMyContentError')
const $loadingIndicator = document.querySelector('#loadingIndicator')

async function getContent() {
  //getting all the events
  if(!getUserAddress()) {
    errorUserDisconnected()
  }

  let events
  try{
    events = await readOnlyProvider.filters.getContentUploadedByThisAccount(getUserAddress())
  }
  catch(error) {
    $dialogFetchingMyContentError.showModal()
    setTimeout(() => { 
      $dialogFetchingMyContentError.close() 
      window.location.replace('/#rightPanelContainer')
    }, 8000)
    console.log('error when querying the events list of the account, check if user is logged in', error)
    return
  }
  if(!events?.length || events.length <= 0) {
    $loadingIndicator.style.display = 'none'
    $cardsContainer.appendChild(
      document.querySelector('#noUploadedContentTemplate').content.cloneNode(true)
    )
    console.log('There are no uploaded events triggered by this user')
    return
  }

  try {
    //getting the contents
    let contents = []
    for (let i = 0; i < events.length; i++) {
      const element = await getElement(events[i].index, events[i].contentType)
      if(element) contents.push(element)
      //fetch the contents one by one and with a delay to avoid the provider to block the requests
      await delay(300)
    }
    console.log(contents)

    $loadingIndicator.style.display = 'none'

    //placing the contents on screen
    await place(contents)
  } catch(error) {
    $dialogFetchingMyContentError.showModal()
    setTimeout(() => { 
      $dialogFetchingMyContentError.close() 
      window.location.replace('/#rightPanelContainer')
    }, 8000)
    console.log('error when creating the content onformation cards')
    console.log(error)
  }
}

async function getElement(index, contentType) {
  const { 
    0: authorAddress, 
    1: contentIdInBytes32, 
    2: metadataHashInBytes32, 
    3: likes,
    4: dislikes,
    5: harvestedLikes
  } = await readOnlyProvider.utonomaContract.getContentById([index, contentType])

  if(metadataHashInBytes32 === ZeroHash) return null

  const metadata = await fetch(
    `https://copper-urban-gorilla-864.mypinata.cloud/ipfs/${getIpfsHashFromBytes32(metadataHashInBytes32)}?pinataGatewayToken=WmR3tEcyNtxE6vjc4lPPIrY0Hzp3Dc9AYf2X4Bl-8o6JYBzTx9aY_u3OlpL1wGra`
  )
  const readableMetadata = await metadata.json()

  const isHarvestable = canContentBeHarvested(Number(likes), Number(dislikes), Number(harvestedLikes))

  return {
    shortVideoTitle : readableMetadata.shortVideoTitle,
    likes,
    dislikes,
    harvestedLikes,
    isHarvestable,
    identifierIndex: index,
    identifierContentType: contentType
  }
}

const place = (cont) => {
  cont.forEach(e => {
    const $template = $contentInfoCardTemplate.content.cloneNode(true)
    const $contentCard = ContentInformationCard($template, e)
    $tempFragment.appendChild($contentCard)
  })
  $cardsContainer.appendChild($tempFragment)
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

getContent()

function errorUserDisconnected() {
  setIsLoggedIn(false)
  setAddress('')
  window.location.replace('/#rightPanelContainer')
  setTimeout(() => location.hash = '', 100)
}