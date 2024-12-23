import '../utonoma_styles_library/index.css'
import { getIsLoggedIn } from '../services/userManager/userManager.js'
import './components/Settings/Settings.js'

const $settings = document.querySelector('#settings')
const $connectWallet = document.querySelector('#connectWallet')
const $splashScreen = document.querySelector('#splashScreen')
const $buttonTouchToStart = document.querySelector('#buttonTouchToStart')
const $shortVideoReel = document.querySelector('#shortVideoReel')


let ConnectWallet

$buttonTouchToStart.addEventListener('click', async () => {
  $splashScreen.style.display = 'none'
  $shortVideoReel.style.display = ''
  const { ShortVideoReel } = await import('../components/ShortVideoReel/ShortVideoReel.js')
  ShortVideoReel($shortVideoReel)
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

window.addEventListener('storage', (event) => {
  console.log('change in storage: ', event)
  if (event.key === 'isUserLoggedIn' || event.key === 'userAddress') {
    console.log('re evaluate right pannel')
    switchSettingsOrConnectWallet()
  }
})