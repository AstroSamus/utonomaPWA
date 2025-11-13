export const createStateForConfirmLikeOrDislike = () => {
  let isDialogVisible = false
  let feeForVoting = '-'

  async function setIsDialogVisible(newValue, effect) {
    if(newValue === isDialogVisible) return
    isDialogVisible = newValue
    return await effect()
  }

  function setFeeForVoting(newValue, effect) {
    if(!newValue) {
      feeForVoting = '-'
      return
    }
    if(newValue === feeForVoting) return
    feeForVoting = newValue
    effect()
  }
  
  return {
    isDialogVisible: () => isDialogVisible,
    feeForVoting: () => feeForVoting,
    setIsDialogVisible,
    setFeeForVoting
  }
}