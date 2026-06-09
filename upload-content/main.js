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

let uploadSessionId = null
const $scrollableStepperMenu = document.querySelector('main')
const $dialog = document.querySelector('dialog')

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
        UploadContentMachine.state = 'uploadingShortVideo'
      } else {
        //Unexpected error
        throw new Error('ERROR_CREATING_UPLOAD_SESSION')
      }
    } catch (error) {
      UploadContentMachine.state = 'unexpectedError'
    }
  },
  uploadingShortVideo: async () => {
    console.log(uploadSessionId)
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
  }
}

UploadContentMachine.effects = effects
UploadContentMachine.state = 'validatingWallet'

const menuIntersectionObserver = new IntersectionObserver(() => {
  console.log('intersection crossed')
}, {
  root: $scrollableStepperMenu,
  threshold: 0.5
})

Array.from($scrollableStepperMenu.children).forEach(($children) => {
  menuIntersectionObserver.observe($children)
})





/*

const $cards = document.querySelectorAll('main > div')
const $shortVideoPicker = document.querySelector('.scrollable-stepper-menu__file-picker')
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

const FilePicker = FilePickerFactory(
  $shortVideoPicker,
  {
    isRequired: true,
    callback: (file) => state.file = file, //sets the state.file of this file
    validation: async (file) => { //returns tuple err, data, el error contiene un mensaje a desplegar al usuario
      const [err, data] = await validateVideoDuration(
        document.getElementById('validate-video-duration'), 
        file, 
        60,
        500
      )
      //if wrong video format, respond ok as videos with weird codecs will not pass validation
      if(err === 'UNSUPPORTED_VIDEO_FORMAT') return [null, true]
      if(err=== 'FILE_IS_TOO_BIG') return ['Error: File is too big, max 500mb']
      else if(err === 'VIDEO_TOO_LONG') return ['Error: Short videos last 60 seconds or less', null]  
      else if(err === 'FILE_IS_NOT_A_VIDEO') return ['Error: This file is not a valid video', null]
      else if(!err) return [null, true]
    }
  }
)

  const form = new FormData()
  form.append("video", files[0])
  try {
    const ret = await fetch('http://localhost:3000/upload-content/6/upload-short-video', {
      method: 'POST',
      body: form
    })
    console.log(ret.status)
    console.log(await ret.json())
  } catch(error) {
    console.log(error)
  }


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