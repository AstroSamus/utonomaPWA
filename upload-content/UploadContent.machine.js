/**
 * @typedef {'start' | 'validatingWallet' | 'creatingUploadSession' | 'insuficientFunds' |  'walletError' | 'unexpectedError' | 'uploadingShortVideo' | 'pickingShortVideo' | 'uploadingMetadata' | 'typingMetadata' } UploadContentMachineStates
 */

export const UploadContentMachine = {
  /**@type UploadContentMachineStates */
  _state: 'start',
  _effects: {},

  /**@param {UploadContentMachineStates} newState */
  set state(newState) {
    if(this._state === 'start' && newState !== 'validatingWallet' ) { 
      throw new Error(`State ${this._state} cannot transition to ${newState}`)
    }
    if(this._state === 'validatingWallet' 
      && (
        newState !== 'insuficientFunds'
        && newState !== 'walletError'
        && newState !== 'creatingUploadSession'
        && newState !== 'unexpectedError'
      )
    ) { throw new Error(`State ${this._state} cannot transition to ${newState}`)}
    if(this._state === 'walletError' && newState !== 'validatingWallet') { 
      throw new Error(`State ${this._state} cannot transition to ${newState}`)
    }
    if(this._state === 'creatingUploadSession' 
      && (
        newState !== 'pickingShortVideo'
        && newState !== 'unexpectedError'
      )
    ) { throw new Error(`State ${this._state} cannot transition to ${newState}`)}
    if(this._state === 'pickingShortVideo' 
      && (
        newState !== 'uploadingShortVideo'
        &&newState !== 'typingMetadata' //picking short video can go to typingMetadata if the user scrolls to the title and description cards
        && newState !== 'unexpectedError'
      )
    ) { throw new Error(`State ${this._state} cannot transition to ${newState}`)}
    if(this._state === 'uploadingShortVideo' 
      && (
        newState !== 'typingMetadata'
        && newState !== 'unexpectedError'
        && newState !== 'pickingShortVideo'
        && newState !== 'uploadingShortVideo' //uploadingShortVideo can transition to uploadingShortVideo if the user picks a short video again
      )
    ) { throw new Error(`State ${this._state} cannot transition to ${newState}`)}
    if(this._state === 'typingMetadata' 
      && (
        newState !== 'uploadingMetadata'
        && newState !== 'pickingShortVideo' //typingMetadata can go to pickingShortVideo if the user scrolls back or didn't picked a file and scrolled down
      )
    ) { 
      throw new Error(`State ${this._state} cannot transition to ${newState}`)
    }
    if(this._state === 'uploadingMetadata' 
      && (
        newState !== 'typingMetadata'
        && newState !== 'unexpectedError'
        && newState !== 'waitingForCids'
      )
    ) { throw new Error(`State ${this._state} cannot transition to ${newState}`)}
    
    this._state = newState
    if(this._effects[this._state]) {
      this._effects[this._state]()
    }
  },
  get state() {
    return this._state
  },

  set effects(effects) {
    this._effects = effects
  }
}
