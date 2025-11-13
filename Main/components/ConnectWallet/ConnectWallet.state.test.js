import { createStateForConnectWallet } from "./ConnectWallet.state";

describe('createStateForConnectWallet', () => {
  it('the state should initialize with the button enabled', () => {
    const state = createStateForConnectWallet()
    expect(state.isButtonConnectWalletEnabled()).toBe(true)
  })

  it('When calling the setIsButtonConnectWalletEnabled method and passing true as a first parameter, isButtonConnectWalletEnabled should be setted to true', async () => {
    const state = createStateForConnectWallet()
    state.setIsButtonConnectWalletEnabled(true, () => {})
    
    expect(state.isButtonConnectWalletEnabled()).toBe(true)
  })

  it('When calling the setIsButtonConnectWalletEnabled method and passing false as a first parameter, isButtonConnectWalletEnabled should be setted to false', async () => {
    const state = createStateForConnectWallet()
    state.setIsButtonConnectWalletEnabled(true, () => {}) //first set to true
    state.setIsButtonConnectWalletEnabled(false, () => {}) //then to false
    
    expect(state.isButtonConnectWalletEnabled()).toBe(false)
  })

  it('When calling the setIsButtonConnectWalletEnabled method and passing true as a first parameter and an effect function as second one, the effect should never be executed', async () => {
    const state = createStateForConnectWallet()

    const exception = () => {throw 'A horrible exception in setIsButtonConnectWalletEnabled'}

    //setIsButtonConnectWalletEnabled returns if the new value is the same that the old one, we validate this with this line
    expect(() => {
      state.setIsButtonConnectWalletEnabled(true, exception)
    }).not.toThrow()

    state.setIsButtonConnectWalletEnabled(false, () => {})

    expect(() => {
      state.setIsButtonConnectWalletEnabled(true, exception)
    }).not.toThrow()
  })

  it('When calling the setIsButtonConnectWalletEnabled method and passing false as a first parameter and an effect function that sets isButtonConnectWalletEnabled back to true. The effect should cause that isButtonConnectWalletEnabled ends with a value of true', async () => {
    const state = createStateForConnectWallet()

    state.setIsButtonConnectWalletEnabled(false, () => {
      state.setIsButtonConnectWalletEnabled(true, () => {})
    })
    
    expect(state.isButtonConnectWalletEnabled()).toBe(true)
  })
})