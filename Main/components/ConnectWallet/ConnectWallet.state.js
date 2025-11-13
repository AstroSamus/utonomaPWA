export const createStateForConnectWallet = () => {
  let isButtonConnectWalletEnabled = true

  async function setIsButtonConnectWalletEnabled(newValue, effect) {
    if(isButtonConnectWalletEnabled === newValue) return
    isButtonConnectWalletEnabled = newValue
    //Careful here, as the effect may call the setter again and this will call the efect recursively and create an infinite loop
    //So, you need to add logic to avoid creating an infinite loop.
    if(isButtonConnectWalletEnabled === false) effect()
  }

  return {
    isButtonConnectWalletEnabled: () => isButtonConnectWalletEnabled,
    setIsButtonConnectWalletEnabled
  }
}