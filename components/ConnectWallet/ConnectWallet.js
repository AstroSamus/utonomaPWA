import { 
  getIsLoggedIn, 
  getUserAddress, 
  setIsLoggedIn, 
  setAddress 
} from '../../services/userManager/userManager.js'

const $settings = document.querySelector('#settings')
const $connectWallet = document.querySelector('#connectWallet')
const $buttonConnectWallet = document.querySelector('#buttonConnectWallet')
$buttonConnectWallet.addEventListener('click', async () => {
  const { useSignedProvider } = await import('../../web3_providers/signedProvider.js')
  const { modal } = useSignedProvider()
  modal.subscribeState(async(newState) => {
    if(modal.getIsConnected()) {
      //switch to the other screen and unsubscribe
      setIsLoggedIn(true)
      setAddress(modal.getAddress())
      $connectWallet.style.display = 'none'
      $settings.style.display = 'flex'
      await import('../Settings/Settings.js')
    } else {
      setIsLoggedIn(false)
      setAddress('')
    }
  })
  //Give two seconds before opening the modal, as there are wrong lectures on the getIsConnected method when
  //we call it immediately
  setTimeout(() => modal.open(), 2000)
})

console.log('isConnected ', getIsLoggedIn())
console.log('address ', getUserAddress())