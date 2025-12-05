import '../utonoma_styles_library/index.css'
import {
  USER_ADDRESS_KEY,
  userManager 
} from '../services/userManager/userManager.js'

const $settings = document.querySelector('#settings')
const $connectWallet = document.querySelector('#connectWallet')
const $splashScreen = document.querySelector('#splashScreen')
const $buttonTouchToStart = document.querySelector('#buttonTouchToStart')
const $shortVideoReel = document.querySelector('#shortVideoReel')

let ConnectWallet

$buttonTouchToStart.addEventListener('click', async () => {
  $splashScreen.style.display = 'none'
  $shortVideoReel.style.display = ''
  await import('../components/ShortVideoReel/ShortVideoReel.js')
})

document.querySelector('#buttonSplashScreenToRightPanel').addEventListener('click', async()=> {
  location.hash = 'rightPanelContainer'
  setTimeout(() => location.hash = '', 100)
})

document.querySelector('#buttonShortVideoReelToRightPanel').addEventListener('click', async() => {
  location.hash = 'rightPanelContainer'
  setTimeout(() => location.hash = '', 100)
})

document.querySelector('#buttonRightPanelToCenterPanel').addEventListener('click', async()=> {
  location.hash = 'centerPanelContainer'
  setTimeout(() => location.hash = '', 100)
})

document.querySelector('#buttonSettings').addEventListener('click', async()=> {
  location.hash = 'rightPanelContainer'
  setTimeout(() => location.hash = '', 100)
})

document.querySelector('#buttonNavbarBack').addEventListener('click', async()=> {
  location.hash = 'centerPanelContainer'
  setTimeout(() => location.hash = '', 100)
})

window.addEventListener('storage', (event) => {
  if (event.key === USER_ADDRESS_KEY) {
    console.log('re evaluate right pannel')
    switchSettingsOrConnectWallet()
  }
})

async function switchSettingsOrConnectWallet() {
  if(userManager.isLoggedIn) {
    $connectWallet.style.display = 'none'
    $settings.style.display = 'flex'
    await import('./components/Settings/Settings.js')
  } else {
    $settings.style.display = 'none'
    $connectWallet.style.display = 'flex'
    if(!ConnectWallet) {
      ConnectWallet = true //prevent creating multiple instances as setting ConnectWallet depends on an async operation
      const { ConnectWallet: ConnectWalletFactory } = await import('./components/ConnectWallet/ConnectWallet.js')
      ConnectWallet = ConnectWalletFactory($connectWallet)
    }
  }
}
switchSettingsOrConnectWallet()