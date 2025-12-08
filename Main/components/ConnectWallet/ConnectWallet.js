import { 
  getIsLoggedIn, 
  getUserAddress, 
  setIsLoggedIn, 
  setAddress 
} from '../../../services/userManager/userManager.js'
import { createStateForConnectWallet } from "./ConnectWallet.state.js"
import { web3 } from '../../../web3_providers/web3Test.js'

const $settings = document.querySelector('#settings')
const $connectWallet = document.querySelector('#connectWallet')

export const ConnectWallet = ($container) => {
  const state = createStateForConnectWallet()
  const $buttonConnectWallet = $container.querySelector('#buttonConnectWallet')
  const $buttonImANewUser = document.querySelector('#buttonImANewUser')

  function loading(boolean) {
    $buttonImANewUser.disabled = boolean
    $buttonConnectWallet.disabled = boolean
  }

  $buttonConnectWallet.addEventListener('click', async () => {
    //state.setIsButtonConnectWalletEnabled(false, effectIsButtonConnectWalletEnabled)
    try {
      await web3.connect()
    } catch (error) {
      console.error(error)
    }
  })

  return state
}