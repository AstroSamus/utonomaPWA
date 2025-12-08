export const createStateForUploadContentForm = () => {
  const availiableStates = Object.freeze({
    fillingForm: Symbol('fillingForm'),
    validatingForm: Symbol('validatingForm'), 
    connectingUserWallet: Symbol('connectingUserWallet'),
    uploadingToIpfs: Symbol('uploadingToIpfs'),
    uploadingToUtonoma: Symbol('uploadingToUtonoma'),
    confirmingTransaction: Symbol('success'),
    success: Symbol('success'),
    videoTooLongError: Symbol('videoTooLongErrsor'),
    wrongVideoFileError: Symbol('wrongVideoFileError'),
    uploadingToIpfsError: Symbol('uploadingToIpfsError'),
    genericError: Symbol('genericError'),
    userCannotConnectError: Symbol('userCannotConnectError')
  })

  let currentState = availiableStates.fillingForm

  function setState(newState, effect) {
    if (!Object.values(availiableStates).includes(newState)) return
    if(newState === currentState) return
    currentState = newState
    effect()
  }

  return {
    availiableStates,
    currentState: () => currentState,
    setState
  }
}