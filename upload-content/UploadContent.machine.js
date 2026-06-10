/**
 * @typedef {'start' | 'validatingWallet' | 'creatingUploadSession' | 'insuficientFunds' |  'walletError' | 'unexpectedError' | 'uploadingShortVideo' | 'pickingShortVideo' } UploadContentMachineStates
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
        && newState !== 'unexpectedError'
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
