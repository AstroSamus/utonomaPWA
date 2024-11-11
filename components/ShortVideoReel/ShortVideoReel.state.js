export const createStateForShortVideoReel = () => {

  const availiableSteps = Object.freeze({
    waiting: Symbol('waiting'),
    nextShortVideo: Symbol('nextShortVideo'),
    previousShortVideo: Symbol('previousShortVideo'),
    informCorrectPlay: Symbol('informCorrectPlay')
  })

  const state = {
    shortVideoHistory: [],
    currentVideo: -1,
    _detachedHead: false,  // Internal property to hold the actual value
    get detachedHead() { 
      return this._detachedHead;  // Access the internal property
    },
    set detachedHead(value) {
      if (typeof value !== "boolean") {
        throw 'updateDetachedHead only accepts booleans';  // Correct the error check
      }
      this._detachedHead = value;  // Update the internal property
    },
    currentStep: availiableSteps.fillingForm,
  }

  function setStep(newState, effect, payload) {
    if (!Object.values(availiableSteps).includes(newState)) return
    state.currentStep = newState

    switch (state.currentStep) {
      case availiableSteps.nextShortVideo:
        if(state.detachedHead) state.currentVideo++
        break
      case availiableSteps.previousShortVideo:
        if(state.currentVideo <= 0 ) break
        state.currentVideo--
        state.detachedHead = true
        break
      case availiableSteps.informCorrectPlay:
        if(!payload) throw new Error('No short video information to push')
        if(state.currentVideo >= state.shortVideoHistory.length - 1) {
          //If we are comming out of a detached head state, we are not going to add the video to the history
          //because we already have it
          if(state.detachedHead === false) {
            state.shortVideoHistory.push(payload)
            state.currentVideo = state.shortVideoHistory.length - 1
          }
          state.detachedHead = false
        }
        break
    }

    if(effect) effect()
  }

  return {
    availiableSteps,
    currentStep: () => state.currentStep,
    setStep,
    detachedHead: () => state.detachedHead,
    shortVideoHistory: () => state.shortVideoHistory,
    currentVideo: () => state.currentVideo
  }
}