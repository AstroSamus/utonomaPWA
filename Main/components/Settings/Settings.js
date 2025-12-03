const $settings = document.querySelector('#settings')
const $dialogSendOrReceiveTokens = document.querySelector('#dialogSendOrReceiveTokens')
const $connectWallet = document.querySelector('#connectWallet')
const $buttonDisconnectWallet = document.querySelector('#buttonDisconnectWallet')
const $buttonSendTokens = document.querySelector('#buttonSendTokens')
const $buttonDialogCloseSendTokens = document.querySelector('#buttonDialogCloseSendTokens')
const $buttonBuySellTokens = document.querySelector('#buttonBuySellTokens')

$buttonDisconnectWallet.addEventListener('click', async () => {
  $buttonDisconnectWallet.disabled = true
  const { web3 } = await import('../../../web3_providers/web3Test.js')
  await web3.disconnect()
  $buttonDisconnectWallet.disabled = false
})


$buttonSendTokens.addEventListener('click', () => {
  $dialogSendOrReceiveTokens.showModal()
})

})

$buttonDialogCloseSendTokens.addEventListener('click', () => {
  $dialogSendOrReceiveTokens.close()
})

$buttonBuySellTokens.addEventListener('click', async () => {
  const { dexLink } = await import('../../../utonomaSmartContract.js')
  window.location.href = dexLink
})