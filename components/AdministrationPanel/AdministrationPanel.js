import { userManager } from '../../services/userManager/userManager.js'
import { storageEventKeys, pubSub } from '../../services/pubSub.js'

export const AdministrationPanel = ($container) => {
  const $settings = $container.querySelector('#settings')
  const $connectWallet = $container.querySelector('#connectWallet')

  const state = (function() {
    let isWalletConnected = null 
    async function setIsWalletConnected(newValue) {
      if(isWalletConnected === newValue) return    
      isWalletConnected = newValue
      await effectIsWalletConnected()
    }
    async function effectIsWalletConnected() {
      if(userManager.isLoggedIn()) {
        $connectWallet.style.display = 'none'
        $settings.style.display = 'flex'
        //Hoisting
        if(!Settings) {
          var { Settings }  = await import('../Settings/Settings.js')
          Settings($settings)
        }
      } else {
        $settings.style.display = 'none'
        $connectWallet.style.display = 'flex'
        //Hoisting
        if(!ConnectWallet) {
          var { ConnectWallet }  = await import('../ConnectWallet/ConnectWallet.js')
          ConnectWallet($connectWallet)
        }
      }
    }

    return {
      isWalletConnected: () => isWalletConnected,
      setIsWalletConnected
    }
  })()
  pubSub.subscribe(storageEventKeys.connectedUserAddress, () => { 
    state.setIsWalletConnected(userManager.isLoggedIn()) 
  })
/*
  window.addEventListener('storage', (event) => {
    console.log('change in storage: ', event)
    if (event.key === 'isUserLoggedIn' || event.key === 'userAddress') {
      state.setIsWalletConnected(userManager.isLoggedIn())
    }
  })
*/
  state.setIsWalletConnected(userManager.isLoggedIn())
  
  return state
}