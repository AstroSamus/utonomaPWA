const $settings = document.querySelector('#settings')
const $dialogAddTokenManually = document.querySelector('#dialogAddTokenManually')
const $connectWallet = document.querySelector('#connectWallet')
const $buttonDisconnectWallet = document.querySelector('#buttonDisconnectWallet')
const $buttonAddTokenToWallet = document.querySelector('#buttonAddTokenToWallet')
const $buttonDialogCloseSendTokens = document.querySelector('#buttonDialogCloseSendTokens')
const $buttonBuySellTokens = document.querySelector('#buttonBuySellTokens')

$buttonDisconnectWallet.addEventListener('click', async () => {
  $buttonDisconnectWallet.disabled = true
  const { web3 } = await import('../../../web3_providers/web3Test.js')
  await web3.disconnect()
  $buttonDisconnectWallet.disabled = false
})


$buttonAddTokenToWallet.addEventListener('click', async () => {
  const { web3 } = await import('../../../web3_providers/web3Test.js')
  const isTokenAddedToWallet = await web3.addNomaxToWallet()
  //if token was not added to wallet, then display dialog with instructions to add it manually
  if(!isTokenAddedToWallet) $dialogAddTokenManually.showModal()
})

$buttonDialogCloseSendTokens.addEventListener('click', () => {
  $dialogAddTokenManually.close()
})

$buttonBuySellTokens.addEventListener('click', async () => {
  const { dexLink } = await import('../../../utonomaSmartContract.js')
  window.location.href = dexLink
})