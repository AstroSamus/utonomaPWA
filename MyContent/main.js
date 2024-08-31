import '../utonoma_styles_library/index.css'
import { readOnlyProvider } from "../web3_providers/readOnlyProvider.js"
import { getUserAddress } from "../services/userManager/userManager.js"
import { getIpfsHashFromBytes32 } from "../utils/encodingUtils/encodingUtils.js"
import { canContentBeHarvested } from '../utils/validationUtils/validationUtils.js'
import { getAddress } from 'ethers'


const $contentInfoCardTemplate = document.querySelector('#contentInfoCardTemplate')
const $cardsContainer = document.querySelector('#cardsContainer')
const $tempFragment = document.createDocumentFragment()
const $dialogFetchingMyContentError = document.querySelector('#dialogFetchingMyContentError')

async function getContent() {
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
    $cardsContainer.appendChild(
      document.querySelector('#noUploadedContentTemplate').content.cloneNode(true)
    )
    console.log('There are no uploaded events triggered by this user')
    return
  }

  try{
    const contents = await Promise.all(
      events.map(async (element, index) => {
        const { 
          0: uploaderAddress, 
          1: identifierIndex, 
          2: identifierContentType 
        } = element.args

        const { 
          0: authorAddress, 
          1: contentIdInBytes32, 
          2: metadataHashInBytes32, 
          3: likes,
          4: dislikes,
          5: harvestedLikes
        } = await readOnlyProvider.utonomaContract.getContentById([identifierIndex, identifierContentType])
  
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
          identifierIndex,
          identifierContentType
        }
      })
    )

    contents.forEach(e => {
      const $template = $contentInfoCardTemplate.content.cloneNode(true)
      const $contentCard = contentInformationCard($template, e)
      $tempFragment.appendChild($contentCard)
    })

    $cardsContainer.appendChild($tempFragment)
  }
  catch(error) {
    $dialogFetchingMyContentError.showModal()
    setTimeout(() => { 
      $dialogFetchingMyContentError.close() 
      window.location.replace('/#rightPanelContainer')
    }, 8000)
    console.log('error when creating the content onformation cards')
    console.log(error)
  }
}

getContent()

const contentInformationCard = (
  $template, 
  {
    identifierIndex,
    identifierContentType,
    shortVideoTitle,
    likes,
    dislikes,
    isHarvestable
  }
) => {
  $template.querySelector('#contentInfoCardTitle').innerText = shortVideoTitle
  $template.querySelector('#contentInfoCardLikes').innerText = likes
  $template.querySelector('#contentInfoCardDislikes').innerText = dislikes
  $template.querySelector('.Card__container').setAttribute('data-utonomaId', [identifierIndex, identifierContentType])
  if(isHarvestable) {
    $template.querySelector('.Card__container').classList.add('Card__container--glow')
    $template.querySelector('.Card__actionButton').addEventListener('click', async(e) => {
      const $container = e.target.closest('.Card__container')
      try {
        const { useUtonomaContractForSignedTransactions } = await import('../web3_providers/signedProvider.js')
        const { utonomaContractForSignedTransactions } = await useUtonomaContractForSignedTransactions()
        alertCashRewardRequest($container)
        const harvestLikesReq = await utonomaContractForSignedTransactions.harvestLikes([identifierIndex, identifierContentType])
        alertCashRewardSent($container)
        const harvestLikesResp = await harvestLikesReq.wait()
        console.log(harvestLikesResp)
      } catch (error) {
        console.log(error)
        alertUserNotLoggedIn($container)
      }

      $container.classList.remove('Card__container--glow')
      $container.querySelector('.Card__actionButton').style.display = 'none'
    })
  }
  else {
    $template.querySelector('.Card__actionButton').style.display = 'none' //remove button if content is not harvestable
  }

  const alertCashRewardRequest = ($container) => {
    const $approveDialog = $container.querySelector('#dialogCashRewardRequest')
    $approveDialog.show()
    setTimeout(() => $approveDialog.close(), 5000)
  }

  const alertCashRewardSent = ($container) => {
    const $sentDialog = $container.querySelector('#dialogCashRewardSent')
    $sentDialog.show()
    setTimeout(() => $sentDialog.close(), 5000)
  }

  const alertUserNotLoggedIn = ($container) => {
    const $errorDialog = $container.querySelector('#dialogCashRewardError')
    $errorDialog.show()
    setTimeout(() => { 
      $errorDialog.close() 
      window.location.replace('/#rightPanelContainer')
    }, 8000)
  }

  return $template
}