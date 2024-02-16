let isAuthenticationModalOpen = false

const $connectWallet = document.querySelector("#connect-wallet")
$connectWallet.addEventListener('click', () => {
  if(!isAuthenticationModalOpen) {
    $connectWallet.children[0].src = "../../assets/icons/circularProgress.svg"
    openWalletConnectModal()
  }
  isAuthenticationModalOpen = true
})

async function openWalletConnectModal() {
  const walletConnectProvider = await import("../../utils/walletConnectProvider")
  const walletConnectProviderInstance = walletConnectProvider.default.getAuthenticationInstance()
  await walletConnectProviderInstance.open()
  $connectWallet.children[0].src = "../../assets/icons/continue.svg"
  isAuthenticationModalOpen = false
}