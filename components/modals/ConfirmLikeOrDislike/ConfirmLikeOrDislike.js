import { createStateForConfirmLikeOrDislike } from "./ConfirmLikeOrDislike.state.js"

export const ConfirmLikeOrDislike = ($container, { feeForVoting = '-' } = {}) => {
  const $dialog = $container
  const $spanCurrentFee = $container.querySelector('#spanCurrentFee')

  const state = createStateForConfirmLikeOrDislike()

  const effects = {
    setIsDialogVisible: function() {
      return new Promise((resolve) => {
        if(state.isDialogVisible()) {
          $dialog.showModal()
          $dialog.addEventListener('close', function onClose() {
            if($dialog.returnValue === 'confirm') {
              resolve(true)
            }
            else resolve(false)
            $dialog.removeEventListener('close', onClose)
            state.setIsDialogVisible(false, async() => {})
          })
        }
      })
    },
    setFeeForVoting: function() {
      $spanCurrentFee.innerHTML = state.feeForVoting()
    }
  }

  //initialize the state,
  state.setFeeForVoting(feeForVoting, effects.setFeeForVoting)

  return {
    state,
    //Write wrapper functions with names that allows external callers to interact with the component without knowing how it works internally
    askForUserConfirmation : async() => { return await state.setIsDialogVisible(true, effects.setIsDialogVisible) },
    updateFee: (newValue) => { state.setFeeForVoting(newValue, effects.setFeeForVoting) }
  }
}
