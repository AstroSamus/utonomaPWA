import { userManager } from '../../services/userManager/userManager.js'

export const ConnectWallet = ($container) => {
  const $buttonConnectWallet = $container.querySelector('#buttonConnectWallet')

  const state = (function() {
    let isButtonConnectWalletActive = true
    async function setIsButtonConnectWalletActive(newValue) {
      if(isButtonConnectWalletActive == newValue) return
      isButtonConnectWalletActive = newValue
      effectIsButtonConnectWalletActive()
    }
    async function effectIsButtonConnectWalletActive() {
      if(isButtonConnectWalletActive === true) $buttonConnectWallet.disabled = false

      if(isButtonConnectWalletActive === false) {
        $buttonConnectWallet.disabled = true
        if(!useSignedProvider) {
          var { useSignedProvider } = await import('../../web3_providers/signedProvider.js')
          var { modal } = await useSignedProvider()
          modal.subscribeState(async(newState) => {
            if(newState?.open === false) {
              setIsButtonConnectWalletActive(true)
            }
          })
          modal.subscribeProvider(({ address, isConnected }) => {
            console.log('something happened with the provider')
            console.log(userManager.actionLoginUser)
            debugger
            if(isConnected) {
              userManager.actionLoginUser(address)
            } else {
              userManager.actionLogoutUser()
            }
          })
        }
        modal.open()
      }
    }

    return {
      isButtonConnectWalletActive: () => isButtonConnectWalletActive,
      setIsButtonConnectWalletActive
    }
  })()

  $buttonConnectWallet.addEventListener('click', () => {
    state.setIsButtonConnectWalletActive(false)
  })

  return state
}