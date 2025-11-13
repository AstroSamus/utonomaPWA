import { readOnlyProvider } from '../web3_providers/readOnlyProvider.js'
import { formatUnits, ZeroHash } from 'ethers'
import { getIpfsHashFromBytes32 } from '../utils/encodingUtils/encodingUtils.js'
import { getUniqueRandomNumberFromArray } from '../utils/generalUtils/generalUtils.js'
import { shouldContentBeEliminated } from '../utils/validationUtils/validationUtils.js'

const state = {
  indexesOfSeenShortVideos: []
}

export async function getShortVideo() {
  //throw exception if the content id is 0
  try {
    const shortVideosLibraryLength = formatUnits(await readOnlyProvider.utonomaContract.getContentLibraryLength(5), 0)
    //Reset the indexesOfSeenShortVideos if there are no more videos to see
    if(state.indexesOfSeenShortVideos.length >= shortVideosLibraryLength) state.indexesOfSeenShortVideos = []
    const params = new URLSearchParams(window.location.search)
    const watchValue = params.get('watch')
    //Clear "watch" from the query params if it exists
    if(watchValue) {
      const url = new URL(window.location)
      url.searchParams.delete('watch')
      window.history.replaceState({}, '', url)
    }
    let identifier = watchValue && Number(watchValue) < shortVideosLibraryLength 
    ? watchValue
    : null
    let authorAddress, contentIdInBytes32, metadata, likes, dislikes
    //This do while is used to avoid returning contents that have been deleted from the smart contract
    do {
      if(!identifier) identifier = getUniqueRandomNumberFromArray(shortVideosLibraryLength, state.indexesOfSeenShortVideos)
      if(identifier !== null) state.indexesOfSeenShortVideos.push(identifier)
      else throw new Error('indexesOfSeenShortVideos was not reseted correctly')
      const rawContent = await readOnlyProvider.utonomaContract.getContentById([identifier,5])
      if(!rawContent) continue
      ({ 
        0: authorAddress, 
        1: contentIdInBytes32, 
        2: metadata, 
        3: likes,
        4: dislikes 
      } = rawContent)
      if(contentIdInBytes32 === ZeroHash) identifier = null
    } while(!contentIdInBytes32 || contentIdInBytes32 === ZeroHash)
    const contentId = getIpfsHashFromBytes32(contentIdInBytes32)
    return {
      authorAddress,
      contentId,
      metadata,
      likes,
      dislikes,
      utonomaIdentifier: { index: identifier, contentType: 5 },
      isDeletable: shouldContentBeEliminated(Number(likes), Number(dislikes))
    }
  } catch(error) {
    console.log('Error in getContentLibrary getContentById: ', error)
    return {}
  }
}


