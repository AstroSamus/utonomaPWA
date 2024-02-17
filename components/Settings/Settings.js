import { createDOM } from "../../utils/dom"

let isAuthenticationModalOpen = false

const $settingsContainer = document.querySelector("#settings")

let userAddress = localStorage.getItem("userAddress")
if(userAddress) {
  createSettingsSection(userAddress)
} else {
  createConnectWalletSection()
}

function createSettingsSection(address) {
  function settingsTemplate() {
    return `
      <div style="display: flex; flex-direction: column; height: 100%;">
        <p style="flex-shrink: 0;
          margin: 0.5rem 0.5rem; 
          align-self: flex-end;
          max-width: 13rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;">
          ${address}
        </p> 
        <div style="display: flex; flex-direction: column; flex: 1; justify-content: end;">
          <img src="assets/icons/banner.svg" style="max-width: 100%; max-height: 80vh; object-fit: cover;" alt="">
          <button id="log-out" style="background-color: var(--snow); border: none; padding: 1rem 0;" >
            <span lang="en"> 
              <b>Log out</b>
            </span>
            <span lang="es">
              <b>Cerrar sesión</b>
            </span>
          </button>
        </div>
      </div>
    `
  }
  const $settingsSection = createDOM(settingsTemplate())
  $settingsContainer.append($settingsSection) 
  document.querySelector("#log-out").addEventListener("click", async () => {
    const walletConnectProvider = await import("../../utils/walletConnectProvider")
    const walletConnectProviderInstance = walletConnectProvider.default.getAuthenticationInstance()
    await walletConnectProviderInstance.disconnect()
    if(!walletConnectProviderInstance.getIsConnected()) {
      localStorage.removeItem("userAddress");
      $settingsContainer.removeChild($settingsContainer.firstElementChild)
      createConnectWalletSection()
    }
  })
}

function createConnectWalletSection() {
  function connectWalletTemplate() {
    return `
      <div style="display:flex; flex-direction: column; height: 100%; justify-content: flex-end">
        <img src="assets/icons/banner.svg" style="width: 100vw;" alt="">
        <h2 style="margin: 5vh 6vw">
          <span lang="en">Connect<br>Wallet</span>
          <span lang="es">Conectar<br>Billera</span>
        </h2>
        <div style="display: flex; margin: 0 6vw 5vh 6vw">
          <p style="margin: 0;">
            <span lang="en"> 
              Login using Metamask or any wallet supported by <b>WalletConnect</b> and start using all the features.         
            </span>
            <span lang="es">
              Inicia sesión utilizando Metamask o cualquier billetera soportada por <b>WalletConnect</b> y comienza a utilizar todas las funcionalidades.
            </span>
          </p>
          <button id="connect-wallet" style="background-color: var(--snow); border: none; padding: 0 0 0 1vw;" >
            <img src="/assets/icons/continue.svg" alt="" style="width: 4rem;">
          </button>
        </div>
      </div>
    `
  }

  async function openWalletConnectModal() {
    const walletConnectProvider = await import("../../utils/walletConnectProvider")
    const walletConnectProviderInstance = walletConnectProvider.default.getAuthenticationInstance()
    await walletConnectProviderInstance.open()
    $connectWalletButton.children[0].src = "../../assets/icons/continue.svg"
    isAuthenticationModalOpen = false
    walletConnectProviderInstance.subscribeEvents(event => {
      if(walletConnectProviderInstance.getIsConnected()) {
        const userAddress = walletConnectProviderInstance.getAddress()
        localStorage.setItem("userAddress", userAddress)
        $settingsContainer.removeChild($settingsContainer.firstElementChild)
        createSettingsSection(userAddress)
      }
    })
  }

  const $connectWalet = createDOM(connectWalletTemplate())
  $settingsContainer.append($connectWalet) 
  const $connectWalletButton = document.querySelector("#connect-wallet")
  $connectWalletButton.addEventListener("click", () => {
    if(!isAuthenticationModalOpen) {
      $connectWalletButton.children[0].src = "../../assets/icons/circularProgress.svg"
      openWalletConnectModal()
    }
    isAuthenticationModalOpen = true
  })
}