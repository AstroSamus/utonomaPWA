import { 
  getIsLoggedIn, 
  getUserAddress, 
  setIsLoggedIn, 
  setAddress 
} from '../../../services/userManager/userManager.js'
import { createStateForConnectWallet } from "./ConnectWallet.state.js"
import { appkit } from '../../../web3_providers/signedProvider.js'
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

  async function effectIsButtonConnectWalletEnabled() {
    loading(true)
    const modal = appkit.modal
    modal.subscribeState(async(newState) => {
      if(newState?.open === false) {
        state.setIsButtonConnectWalletEnabled(true, () => {})
        loading(false)
      }
      const isLoggedIn = modal.getIsConnectedState()
      if(isLoggedIn) {
        const address = modal.getAddress()
        setIsLoggedIn(true)
        setAddress(address)
        $connectWallet.style.display = 'none'
        $settings.style.display = 'flex'
      } else {
        setIsLoggedIn(false)
        setAddress('')
      }
    })
    modal.open()
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