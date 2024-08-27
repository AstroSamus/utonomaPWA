import '../utonoma_styles_library/index.css'
import { AdministrationPanel } from '../components/AdministrationPanel/AdministrationPanel.js'

AdministrationPanel(document.querySelector('#rightPanelContainer'))

const $splashScreen = document.querySelector('#splashScreen')
const $buttonTouchToStart = document.querySelector('#buttonTouchToStart')
$buttonTouchToStart.addEventListener('click', async () => {
  $splashScreen.style.display = 'none'
  document.querySelector('#shortVideoReel').style.display = ''
  await import('./components/ShortVideoReel/ShortVideoReel.js')
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