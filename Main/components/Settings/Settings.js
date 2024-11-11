import { 
  setIsLoggedIn,
  setAddress
} from '../../../services/userManager/userManager.js'

const $settings = document.querySelector('#settings')
const $dialogSendOrReceiveTokens = document.querySelector('#dialogSendOrReceiveTokens')
const $connectWallet = document.querySelector('#connectWallet')
const $buttonActivateForVoting = document.querySelector('#buttonActivateForVoting')
const $buttonManageAccount = document.querySelector('#buttonManageAccount')
const $buttonSendTokens = document.querySelector('#buttonSendTokens')
const $buttonDialogCloseSendTokens = document.querySelector('#buttonDialogCloseSendTokens')
const $buttonBuySellTokens = document.querySelector('#buttonBuySellTokens')

let ActivateForVoting

$buttonManageAccount.addEventListener('click', async () => {
  $buttonManageAccount.disabled = true
  const { useSignedProvider } = await import('../../../web3_providers/signedProvider.js')
  const { modal } = await useSignedProvider()
  modal.open()
  modal.subscribeState(async(newState) => {
    if(modal.getIsConnected()) {
      setIsLoggedIn(true)
      setAddress(modal.getAddress())
    } else {
      setIsLoggedIn(false)
      setAddress('')
      $settings.style.display = 'none'
      $connectWallet.style.display = 'flex'
      await import('../ConnectWallet/ConnectWallet.js')
    }
  })
  $buttonManageAccount.disabled = false
})

$buttonActivateForVoting.addEventListener('click', async() => {
  if(!ActivateForVoting) {
    const { ActivateForVoting: ActivateForVotingFactory } = await import('../../../components/modals/ActivateForVoting/ActivateForVoting.js')
    ActivateForVoting = ActivateForVotingFactory(document.querySelector('#activateForVoting'))
  }
  ActivateForVoting.openModal()
})

$buttonSendTokens.addEventListener('click', () => {
  $dialogSendOrReceiveTokens.showModal()
})

$buttonDialogCloseSendTokens.addEventListener('click', () => {
  $dialogSendOrReceiveTokens.close()
})

$buttonBuySellTokens.addEventListener('click', async () => {
  const { dexLink } = await import('../../../utonomaSmartContract.js')
  window.location.href = dexLink
})