import { createStateActivateForVoting } from './ActivateForVoting.state.js'
import { useUtonomaContractForSignedTransactions } from '../../../web3_providers/signedProvider.js'
import { utonomaSepoliaAddress } from '../../../utonomaSmartContract.js'
import { parseUnits } from 'ethers'

export const ActivateForVoting = ($container) => {

  const $modalConfirmActivateForVoting = $container.querySelector('#modalConfirmActivateForVoting')
  const $dialogCheckWalletToApprove = document.querySelector('#dialogCheckWalletToApprove')
  const $dialogActivateForVotingTransactionSent = $container.querySelector('#dialogActivateForVotingTransactionSent')
  const $dialogActivateForVotingSuccess = $container.querySelector('#dialogActivateForVotingSuccess')
  const $dialogActivateForVotingError = $container.querySelector('#dialogActivateForVotingError')
  const $buttonConfirmActivateForVotingYes = $container.querySelector('#buttonConfirmActivateForVotingYes')
  const $buttonConfirmActivateForVotingNo = $container.querySelector('#buttonConfirmActivateForVotingNo')

  const state = createStateActivateForVoting()

  let approveResult

  async function effects() {
    switch (state.currentStep()) {
      case state.availiableSteps.askingForUserConfirmation:
        $modalConfirmActivateForVoting.showModal()
        break
      case state.availiableSteps.userAccepted:
        try {
          $modalConfirmActivateForVoting.close()
          $dialogCheckWalletToApprove.showModal()
          const { utonomaContractForSignedTransactions } = await useUtonomaContractForSignedTransactions()
          approveResult = await utonomaContractForSignedTransactions.approve(utonomaSepoliaAddress, parseUnits("100000.0", 18))
          state.setStep(state.availiableSteps.waitingForApproveOnWallet, effects)
        }
        catch(error) {
          if(error.error?.message == 'Please call connect() before request()' || error == 'Error: User disconnected') {
            state.setStep(state.availiableSteps.userDisconnectedError, effects)
          }
          else state.setStep(state.availiableSteps.genericError, effects)
        } finally {
          $dialogCheckWalletToApprove.close()
        }
        break
      case state.availiableSteps.userDeclined:
        $modalConfirmActivateForVoting.close()
        break
      case state.availiableSteps.waitingForApproveOnWallet:
        try {
          $dialogActivateForVotingTransactionSent.show()
          setTimeout(() => $dialogActivateForVotingTransactionSent.close(), 5000)
          await approveResult.wait()
          state.setStep(state.availiableSteps.success, effects)
        } catch(error) {
          state.setStep(state.availiableSteps.genericError, effects)
        }
        break
      case state.availiableSteps.success:
        $dialogActivateForVotingSuccess.show()
        setTimeout(() => $dialogActivateForVotingSuccess.close(), 5000)
        break
      case state.availiableSteps.userDisconnectedError:
        const { setIsLoggedIn, setAddress } = await import('../../../services/userManager/userManager.js')
        setIsLoggedIn(false)
        setAddress('')
        location.hash = 'rightPanelContainer'
        setTimeout(() => location.hash = '', 100)
        break
      case state.availiableSteps.genericError:
        $dialogActivateForVotingError.show()
        setTimeout(() => $dialogActivateForVotingError.close(), 5000)
        break
    }
  }

  $buttonConfirmActivateForVotingYes.addEventListener('click', () => {
    state.setStep(state.availiableSteps.userAccepted, effects)
  })

  $buttonConfirmActivateForVotingNo.addEventListener('click', () => {
    state.setStep(state.availiableSteps.userDeclined, effects)
  })

  return {
    state,
    openModal: () => { state.setStep(state.availiableSteps.askingForUserConfirmation, effects) },
  }
}