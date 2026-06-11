/**
 * @typedef { 'ERROR_INVALID_CONTENT_TYPE' | 'ERROR_VIDEO_TOO_LONG' | 'ERROR_INVALID_VIDEO' | 'ERROR_FILE_TOO_BIG' } UploadContentApiErrorCode
 * 
 * @typedef {Object} UploadContentApiError
 * @property {UploadContentApiErrorCode} code
 * @property {string} message
 * 
 * @typedef { 'EMPTY_SHORT_VIDEO_TITLE' | 'EMPTY_SHORT_VIDEO_DESCRIPTION' } ShortVideoMetadataError
 * 
 */


import '../utonoma-styles-library/globals.css'
import '../utonoma-styles-library/components/top-action-bar.css'
import './layout.css'
import '../utonoma-styles-library/components/scrollable-stepper-menu.css'
import '../utonoma-styles-library/components/collapsible.css'
import '../utonoma-styles-library/components/collapsible-gallery.css'
import '../utonoma-styles-library/components/swipe-indicator.css'
import '../utonoma-styles-library/components/button.css'
import { FilePicker as FilePickerFactory } from '../components/FilePicker/FilePicker.js'
import { validateVideoDuration } from '../utils/validationUtils/validationUtils.js'
import { HideableContainer as HideableContainerFactory } from '../components/utils/HideableContainer/HideableContainer.js'
import { UploadContentMachine } from './UploadContent.machine.js'
import { Dialog as DialogFactory } from '../components/Dialog/Dialog.js'
import { web3 } from '../web3_providers/web3Test.js'
import { 
  utonomaTelegramGroup,
  apiUrl
} from "config.env"

const $scrollableStepperMenu = document.querySelector('main')
const $shortVideoPicker = document.querySelector('main > div:nth-child(2) section')
const $shortVideoPickerCard = document.querySelector('main > div:nth-child(2)')
const $shortVideoPickerCardSelector = $shortVideoPickerCard.querySelector('.swipe-indicator')
const $shortVideoTitleCard = document.querySelector('main > div:nth-child(3)') 
const $shortVideoDescriptionCard = document.querySelector('main > div:nth-child(4)') 
const $finalCard = document.querySelector('main > div:nth-child(5)') 
const $shortVideoInput = document.getElementById('short-video-input')
const $shortVideoTitle = document.getElementById('short-video-title')
const $shortVideoDescription = document.getElementById('short-video-description')
const $dialog = document.querySelector('dialog')

$shortVideoInput.disabled = true
$shortVideoPickerCardSelector.style.visibility = 'hidden'

let uploadSessionId = null
let shortVideoFile = null
/**@type {UploadContentApiErrorCode | null} */
let shortVideoUploadApiError = null
/**@type {ShortVideoMetadataError | null} */
let shortVideoMetadataError = null
let isFirstVisit = true

const effects = {
  validatingWallet: async() => {
    // connect wallet
    const walletInstance = await web3.connect()
    if(!walletInstance) {
      UploadContentMachine.state = 'walletError'
      return
    }
    // check funds
    const [errorGettingBalance, accountBalance] = await web3.getAccountBalance()
    if(!errorGettingBalance) {
      //to do: calculate the cost of the operation in blockchain an check if its enough
      if(accountBalance == 0) {
        UploadContentMachine.state = 'insuficientFunds'
        return
      } else {
        // If all good; Create Upload Session
        UploadContentMachine.state = 'creatingUploadSession'
        return
      }
    } else {
      if(errorGettingBalance.code === 'WALLET_DISCONNECTED') {
        UploadContentMachine.state = 'walletError'
        return
      } else {
        UploadContentMachine.state = 'unexpectedError'
        return
      }
    }
  },
  creatingUploadSession: async () => {
    const [_,  userAddress] = web3.userAddress
    console.log(apiUrl)
    try {
      const uploadSessionRawRes = await fetch(apiUrl + 'upload-content/create-upload-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          creatorAddress: userAddress
        })
      })
      const uploadSessionRes = await uploadSessionRawRes.json()
      if(uploadSessionRes?.data?.uploadSessionId) {
        uploadSessionId = uploadSessionRes.data.uploadSessionId
        UploadContentMachine.state = 'pickingShortVideo'
      } else {
        //Unexpected error
        throw new Error('ERROR_CREATING_UPLOAD_SESSION')
      }
    } catch (error) {
      UploadContentMachine.state = 'unexpectedError'
    }
  },
  pickingShortVideo: async () => {
    //if there was an error in uploadingShortVideo then do this
    if(shortVideoUploadApiError) {
      const currentLang = navigator.language.substring(0,2)
      const runtimeTranslations = (await import(`../i18n/runtime/${currentLang}/upload-content.json`)).default 
      
      let errorMessage = 'Error in short video' //default error

      switch(shortVideoUploadApiError) {
        case 'ERROR_FILE_TOO_BIG':
          errorMessage = runtimeTranslations.shortVideoTooBigError
          break
        case 'ERROR_INVALID_VIDEO' :
        case 'ERROR_INVALID_CONTENT_TYPE':
          errorMessage = runtimeTranslations.fileIsNotAVideo
          break
        case 'ERROR_VIDEO_TOO_LONG' :
          errorMessage = runtimeTranslations.shortVideoTooLongError
          break
      }

      //clear the shortVideoUploadApiError
      shortVideoUploadApiError = null
      
      //show an alert to the user
      const Dialog = DialogFactory(
        $dialog,
        {
          title: runtimeTranslations.error,
          text: errorMessage,
          cancelText: runtimeTranslations.understood,
        },
        {
          severity: 'warning',
          intention: 'alert'
        }
      )
      Dialog.alert()

      //move the ui to the short video file picker section
      $shortVideoPickerCard.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })

      //prompt the error in the file picker
      FilePicker.showErrorMessage(errorMessage)
    }

    //allow the user to pick a file
    $shortVideoInput.disabled = false
  },
  uploadingShortVideo : async () => {
    const form = new FormData()
    form.append('video', shortVideoFile)
    try {
      const uploadShortVideoRawResp = await fetch(
        `${apiUrl}upload-content/${uploadSessionId}/upload-short-video`, 
        {
          method: 'POST',
          body: form
        }
      )
      if(uploadShortVideoRawResp.status === 200) {
        //show the swipe indicator
        $shortVideoPickerCardSelector.style.visibility = 'visible'
        //UploadContentMachine.state = 'typingMetadata'
        return
      }
      //error case
      /**@type UploadContentApiError */
      const uploadShortVideoResp =  await uploadShortVideoRawResp.json()
      console.log(uploadShortVideoResp.code)
      shortVideoUploadApiError = uploadShortVideoResp.code
      UploadContentMachine.state = 'pickingShortVideo'      
    } catch(error) {
      console.log(error)
      UploadContentMachine.state = 'unexpectedError'
    }
  },
  typingMetadata: async () => {
    if(shortVideoMetadataError === 'EMPTY_SHORT_VIDEO_TITLE') {
      setTimeout(() => {
        $shortVideoTitle.scrollIntoView()
        $shortVideoTitle.setCustomValidity('This field is required')
        $shortVideoTitle.reportValidity()
      }, 1000)
      return
    }
    if(shortVideoMetadataError === 'EMPTY_SHORT_VIDEO_DESCRIPTION') {
      setTimeout(() => {
        $shortVideoDescription.scrollIntoView()
        $shortVideoDescription.setCustomValidity('This field is required')
        $shortVideoDescription.reportValidity()
      }, 1000)
      return
    }
  },
  uploadingMetadata: async () => {
    const shortVideoTitle = $shortVideoTitle.value
    const shortVideoDescription = $shortVideoDescription.value
    //validate that there is a title
    if(!shortVideoTitle) {
      shortVideoMetadataError = 'EMPTY_SHORT_VIDEO_TITLE'
      UploadContentMachine.state = 'typingMetadata'
      return
    } 
    //validate that there is a description
    if(!shortVideoDescription) {
      shortVideoMetadataError = 'EMPTY_SHORT_VIDEO_DESCRIPTION'
      UploadContentMachine.state = 'typingMetadata'
      return
    }
    try {
      const uploadMetadataRawResp = await fetch(
        `${apiUrl}upload-content/${uploadSessionId}/upload-short-video-metadata`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            shortVideoTitle,
            shortVideoDescription
          })
        }
      )
      if(uploadMetadataRawResp.status == 200) {
        console.log('success, lets go to the next state')
      } else {
        UploadContentMachine.state = 'unexpectedError'
      }
    } catch (error) {
      console.log('Uploading short video metadata unexpected error: ', error)
      UploadContentMachine.state = 'unexpectedError'
    }
  },
  walletError: async() => {
    const currentLang = navigator.language.substring(0,2)
    const runtimeTranslations = (await import(`../i18n/runtime/${currentLang}/upload-content.json`)).default 
    const Dialog = DialogFactory(
      $dialog,
      {
        title: runtimeTranslations.error,
        text: runtimeTranslations.walletIsRequired,
        cancelText: runtimeTranslations.exit,
        acceptText: runtimeTranslations.retry
      },
      {
        severity: 'warning',
        intention: 'decision'
      }
    )
    const ret = await Dialog.ask()
    if(ret) { //User choosed retry
      UploadContentMachine.state = 'validatingWallet'
    } else { //User choosed exit
      window.location.href = '/index.html'
      //finish
    }
  },
  insuficientFunds: async() => {
    const currentLang = navigator.language.substring(0,2)
    const runtimeTranslations = (await import(`../i18n/runtime/${currentLang}/upload-content.json`)).default 
    const Dialog = DialogFactory(
      $dialog,
      {
        title: runtimeTranslations.insufficientFunds,
        text: runtimeTranslations.insufficientFundsUploadContent,
        cancelText: runtimeTranslations.exit,
        acceptText: runtimeTranslations.joinTelegram
      },
      {
        severity: 'warning',
        intention: 'decision'
      }
    )
    const ret = await Dialog.ask()
    //if true send to telegram group
    if(ret) {
      window.open(utonomaTelegramGroup, '_blank')
      //to do: When user clicks on join telegram, move the upload content page
      //to the explanation screen so the upload-content flow can be restarted
      window.location.href = '/index.html'
    } 
    //if false send to main page
    else window.location.href = '/index.html'
  },
  unexpectedError: async() => {
    const currentLang = navigator.language.substring(0,2)
    const runtimeTranslations = (await import(`../i18n/runtime/${currentLang}/upload-content.json`)).default 
    const Dialog = DialogFactory(
      $dialog,
      {
        title: runtimeTranslations.error,
        text: runtimeTranslations.unexpectedError,
      },
      {
        severity: 'warning',
        intention: 'toast'
      }
    )
    const ret = await Dialog.toast(3000)
    setTimeout(() => {
      window.location.href = '/index.html'
    }, 3500)
  }
}

const menuIntersectionObserver = new IntersectionObserver((entries, observer) => {
  //if the user scrolls to the second card then we check if its the first visit

  entries.forEach(el => {
    if(el.isIntersecting) {
      if(el.target === $shortVideoPickerCard && isFirstVisit === true) {
        isFirstVisit = false
        UploadContentMachine.state = 'validatingWallet'
      } else if(el.target === $finalCard) {
        UploadContentMachine.state = 'uploadingMetadata'
      } else if(
        UploadContentMachine.state !== 'typingMetadata'
        && ( 
          el.target === $shortVideoDescriptionCard 
          || el.target === $shortVideoTitleCard
        )
      ) {
        UploadContentMachine.state = 'typingMetadata'
      }
    } 
  }) 
}, {
  root: $scrollableStepperMenu,
  threshold: 0.5
})

Array.from($scrollableStepperMenu.children).forEach(($children) => {
  menuIntersectionObserver.observe($children)
})

const FilePicker = FilePickerFactory(
  $shortVideoPicker,
  {
    isRequired: true,
    callback: (file) => {
      shortVideoFile = file
      UploadContentMachine.state = 'uploadingShortVideo'
    }, //sets the file
    validation: async (file) => { //returns tuple err, data, el error contiene un mensaje a desplegar al usuario
      const currentLang = navigator.language.substring(0,2)
      const runtimeTranslations = (await import(`../i18n/runtime/${currentLang}/upload-content.json`)).default 
      const [err, data] = await validateVideoDuration(
        document.getElementById('validate-video-duration'), 
        file, 
        60,
        500
      )
      //if wrong video format, respond ok as videos with weird codecs will not pass validation
      if(err === 'UNSUPPORTED_VIDEO_FORMAT') return [null, true]
      if(err=== 'FILE_IS_TOO_BIG') return [runtimeTranslations.shortVideoTooBigError]
      else if(err === 'VIDEO_TOO_LONG') return [runtimeTranslations.shortVideoTooLongError, null]  
      else if(err === 'FILE_IS_NOT_A_VIDEO') return [runtimeTranslations.fileIsNotAVideo, null]
      else if(!err) return [null, true]
    }
  }
)

UploadContentMachine.effects = effects
//UploadContentMachine.state = 'validatingWallet'

/*

const $cards = document.querySelectorAll('main > div')

const $ctaHideableContainer = document.querySelector('.hideable-container')

const CtaHideableContainer = HideableContainerFactory(
  document.querySelector('.hideable-container')
)


CtaHideableContainer.show('#cta-button')
CtaHideableContainer.show('#cta-loading')


const state = {
  _file: {},

  set file(newFile) {
    this._file = newFile
    if(this._file) {
      console.log('trigger effect for file upload on ', this._file)
    }
  },

  get file() {
    return this._file
  }
}
validateVideoDuration(
  
)


const intersectionObserver = new IntersectionObserver(callback, { 
  root: $scrollableStepperMenu,
  threshold: 0.5 
})

function callback(entries, obs) {
  if(entries[1]?.isIntersecting) {
    //func() //validate user connection
  }
}

$cards.forEach(($card) => {
  console.log($card)
  intersectionObserver.observe($card)
})



const currentLang = navigator.language.substring(0,2)

async function walletRequiredError() {
  const runtimeTranslations = (await import(`../i18n/runtime/${currentLang}/upload-content.json`)).default 
  const { Dialog: DialogComponent } = await import('../components/Dialog/Dialog.js')
  const Dialog = DialogComponent(
    $dialog,
    {
      title: runtimeTranslations.error,
      text: runtimeTranslations.walletIsRequired,
      cancelText: runtimeTranslations.exit,
      acceptText: runtimeTranslations.retry
    },
    {
      severity: 'warning',
      intention: 'decision'
    }
  )
  const ret = await Dialog.ask()

}

async function invalidVideoError() {
  const runtimeTranslations = (await import(`../i18n/runtime/${currentLang}/upload-content.json`)).default 
  const { Dialog: DialogComponent } = await import('../components/Dialog/Dialog.js')
  const Dialog = DialogComponent(
    $dialog,
    {
      title: runtimeTranslations.invalidVideo,
      text: runtimeTranslations.checkVideoTooLong,
      cancelText: runtimeTranslations.retry,
      acceptText: '',
    },
    {
      severity: 'warning',
      intention: 'alert'
    }
  )
  const ret = await Dialog.alert()
}

async function alertSuccessfulUpload() {
  const {Dialog: DialogComponent} = await import('../components/Dialog/Dialog.js')
  const Dialog = DialogComponent(
    $dialog,
    {
      title: 'Success',
      text: 'Your contant was uploaded successfuly to blockchain',
      cancelText: 'UNDERSTOOD'
    },
    {
      severity: 'success',
      intention: 'alert'
    }
  )
  Dialog.alert()
}


alertSuccessfulUpload()
walletRequiredError()
invalidVideoError()
ask the user to connect their wallet 
*/