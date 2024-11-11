import { getShortVideo } from '../../services/contentProvider.js'
import { getUrlFromIpfsHash } from '../../utils/encodingUtils/encodingUtils.js'
import {
  createStateForShortVideoReel
} from './ShortVideoReel.state.js'
import { LikeButton as LikeButtonFactory } from '../LikeButton/LikeButton.js'

export const ShortVideoReel = ($container) => {
  const state = createStateForShortVideoReel()

  const $shortVideoPlayer = $container.querySelector('#shortVideoPlayer')
  const $buttonNextShortVideo = $container.querySelector('#buttonNextShortVideo')
  const $buttonPreviousShortVideo = $container.querySelector('#buttonPreviousShortVideo')
  const $likesNumber = $container.querySelector('#likesNumber')

  const LikeButton = LikeButtonFactory($container.querySelector('#likeButtonContainer'))

  let currentUtonomaIdentifier
  let numberOfRetriesToGetShortVideo = 0 

  async function effects() {
    switch (state.currentStep()) {
      case state.availiableSteps.nextShortVideo:
        loading(true)
        //if user is watching a previuos video then get the next one from the history, otherwise get a new one from the internet
        try {
          if(state.detachedHead()) var nextShortVideo = state.shortVideoHistory()[state.currentVideo()]
          else nextShortVideo = await getShortVideo()
          const { authorAddress, contentId, metadata, likes, utonomaIdentifier } = nextShortVideo
          $shortVideoPlayer.src = getUrlFromIpfsHash(contentId)
          $shortVideoPlayer.load()
          const playPromise = $shortVideoPlayer.play()
          if (!playPromise) throw new Error('playPromise returned undefined')
          playPromise.then(() => {
            numberOfRetriesToGetShortVideo = 0
            state.setStep(state.availiableSteps.informCorrectPlay, undefined, nextShortVideo)
            currentUtonomaIdentifier = utonomaIdentifier
            LikeButton.updateUtonomaIdentifier(utonomaIdentifier)
            $likesNumber.innerHTML = likes
            loading(false)
          }).catch((error) => {
            console.log(`Error when playing the short video. The message is: ${error}. Retry number ${numberOfRetriesToGetShortVideo}`)
            numberOfRetriesToGetShortVideo++
            if(numberOfRetriesToGetShortVideo < 10) {
              console.log('Error when playing the short video, retrying')
              state.setStep(state.availiableSteps.nextShortVideo, effects) //On error, transition to this same step to retry 
              return
            }
            else {
              loading(false)
              console.log('Next short video method was not able to find valid content after all retries')
            }
          })
        } catch(error) {
          console.log("Error when loading the short video", error)
          state.setStep(state.availiableSteps.nextShortVideo, effects) //On error, transition to this same step to retry 
          return
        }
        break
      case state.availiableSteps.previousShortVideo:
        loading(true)
        try {
          const { authorAddress, contentId, metadata, likes, utonomaIdentifier } = state.shortVideoHistory()[state.currentVideo()]
          $shortVideoPlayer.src = getUrlFromIpfsHash(contentId)
          $shortVideoPlayer.load()
          $shortVideoPlayer.play()
          $likesNumber.innerHTML = likes
          currentUtonomaIdentifier = utonomaIdentifier
          LikeButton.updateUtonomaIdentifier(utonomaIdentifier)
        } catch(error) {
          console.log("Error when loading the previous short video", error)
          state.setStep(state.availiableSteps.nextShortVideo, effects) //On error, transition to the next video step
        }
        loading(false)
        break 
    }
  }

  function loading(boolean) {
    $buttonNextShortVideo.disabled = boolean
    $buttonPreviousShortVideo.disabled = boolean
    LikeButton.loading(boolean)
  }

  $buttonNextShortVideo.addEventListener('click', async() => {
    state.setStep(state.availiableSteps.nextShortVideo, effects)
  })

  $buttonPreviousShortVideo.addEventListener('click', async() => {
    state.setStep(state.availiableSteps.previousShortVideo, effects)
  })

  state.setStep(state.availiableSteps.nextShortVideo, effects) //kickstart the component
}

