export const createStateForUploadContentForm = () => {
  const availiableStates = Object.freeze({
    fillingForm: Symbol('fillingForm'),
    validatingForm: Symbol('validatingForm'), 
    checkingIfUserIsConnected: Symbol('checkingIfUserIsConnected'),
    uploadingToIpfs: Symbol('uploadingToIpfs'),
    uploadingToUtonoma: Symbol('uploadingToUtonoma'),
    confirmingTransaction: Symbol('success'),
    success: Symbol('success'),
    videoTooLongError: Symbol('videoTooLongError'),
    wrongVideoFileError: Symbol('wrongVideoFileError'),
    uploadingToIpfsError: Symbol('uploadingToIpfsError'),
    genericError: Symbol('genericError'),
    userDisconnectedError: Symbol('userDisconnectedError')
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