export const createStateForLikeButton = () => {

  const availiableSteps = Object.freeze({
    waiting: Symbol('waiting'),
    loading: Symbol('loading'),
    pressingButton: Symbol('likeButtonPressed'),
    checkingIfUserIsConnected: Symbol('checkIfUserIsConnected'),
    requestingFeeAcceptance: Symbol('requestingFeeAcceptance'),
    checkingUserAllowance: Symbol('checkingUserAllowance'),
    checkingAccountBalance: Symbol('checkingAccountBalance'),
    waitingForApproveOnWallet: Symbol('waitingForApproveOnWallet'),
    waitiingForBlockchainResult: Symbol('waitiingForBlockchainResult'),
    activatingAccount: Symbol('activatingAccount'),
    updatingUtonomaIdentifier: Symbol('updatingUtonomaIdentifier'),
    success: Symbol('success'),
    userDisconnectedError: Symbol('userDisconnectedError'),
    balanceNotEnoughtError: Symbol('balanceNotEnoughtError'),
    genericError: Symbol('genericError')
  })

  const state = {
    utonomaIdentifier: {},
    currentStep: availiableSteps.waiting,
    loading: false
  }

  function setStep(newStep, effect, payload) {
    if (!Object.values(availiableSteps).includes(newStep)) return
    state.currentStep = newStep

    switch (state.currentStep) {
      case availiableSteps.updatingUtonomaIdentifier:
        state.utonomaIdentifier = payload
        break
      case availiableSteps.loading:
        state.loading = payload
        break
    }

    if(effect) effect()
  }

  return {
    availiableSteps,
    currentStep: () => state.currentStep,
    setStep,
    loading: () => state.loading,
    utonomaIdentifier: () => state.utonomaIdentifier
  }
}