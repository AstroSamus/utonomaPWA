export const createStateActivateForVoting = () => {

  const availiableSteps = Object.freeze({
    waiting: Symbol('waiting'),
    loading: Symbol('loading'),
    askingForUserConfirmation: Symbol('askingForUserConfirmation'),
    userAccepted : Symbol('userAccepted'),
    userDeclined : Symbol('userDeclined'),
    waitingForApproveOnWallet: Symbol('waitingForApproveOnWallet'),
    success: Symbol('success'),
    userDisconnectedError: Symbol('userDisconnectedError'),
    genericError: Symbol('genericError'),
  })

  const state = {
    currentStep: availiableSteps.waiting
  }

  function setStep(newStep, effect, payload) {
    if (!Object.values(availiableSteps).includes(newStep)) return
    state.currentStep = newStep
    if(effect) effect()
  }

  return {
    availiableSteps,
    currentStep: () => state.currentStep,
    setStep,
  }
}