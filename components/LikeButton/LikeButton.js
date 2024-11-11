import { createStateForLikeButton } from './LikeButton.state.js'
import { ConfirmLikeOrDislike as ConfirmLikeOrDislikeFactory } from '../modals/ConfirmLikeOrDislike/ConfirmLikeOrDislike.js'
import { readOnlyProvider } from "../../web3_providers/readOnlyProvider.js"
import { formatUnits } from 'ethers'
import { useUtonomaContractForSignedTransactions } from '../../web3_providers/signedProvider.js'

export const LikeButton = ($container) => { 
  const state = createStateForLikeButton()

  const $buttonLikeShortVideo = $container.querySelector('#buttonLikeShortVideo')
  const $dialogNotEnoughBalanceError = $container.querySelector('#dialogNotEnoughBalanceError')
  const $dialogCheckWalletToApprove = document.querySelector('#dialogCheckWalletToApprove')
  const $dialogLikeContentTransactionSent = $container.querySelector('#dialogLikeContentTransactionSent')
  const $dialogLikeButtonSuccess = $container.querySelector('#dialogLikeButtonSuccess')
  const $dialogLikeButtonError = $container.querySelector('#dialogLikeButtonError')

  let ConfirmLikeOrDislike
  let modal
  let currentFee
  let ActivateForVoting
  let likeResult

  async function effects() {
    switch (state.currentStep()) {
      case state.availiableSteps.pressingButton:
        loading(true)
        state.setStep(state.availiableSteps.checkingIfUserIsConnected, effects)
        break      
      case state.availiableSteps.checkingIfUserIsConnected:
        if(!modal) {
          const { useSignedProvider } = await import('../../web3_providers/signedProvider.js')
          const { modal: modalInstance } = await useSignedProvider()
          modal = modalInstance
        }
        if(modal.getIsConnected()) state.setStep(state.availiableSteps.requestingFeeAcceptance, effects)
        else state.setStep(state.availiableSteps.userDisconnectedError, effects)
        break
      case state.availiableSteps.requestingFeeAcceptance:
        try {
          currentFee = await readOnlyProvider.genericRequests.getCurrentFee(modal.getAddress())
          if(!ConfirmLikeOrDislike) ConfirmLikeOrDislike = ConfirmLikeOrDislikeFactory($container.querySelector('#dialogConfirmLikeOrDislike'))
          ConfirmLikeOrDislike.updateFee(formatUnits(currentFee, 18))
          const confirmation = await ConfirmLikeOrDislike.askForUserConfirmation()
          if(!confirmation) loading(false) //user rejected
          else state.setStep(state.availiableSteps.checkingUserAllowance, effects)
        } catch (error) {
          state.setStep(state.availiableSteps.genericError, effects)
        }
        break
      case state.availiableSteps.checkingUserAllowance:
        try {
          const accountAllowance = await readOnlyProvider.genericRequests.getAllowance(modal.getAddress())
          if(accountAllowance <= currentFee) state.setStep(state.availiableSteps.activatingAccount, effects)
          else state.setStep(state.availiableSteps.checkingAccountBalance, effects)
        } catch(error) {
          state.setStep(state.availiableSteps.genericError, effects)
        }
        break
      case state.availiableSteps.checkingAccountBalance:
        try {
          const accountBalance = await readOnlyProvider.genericRequests.getBalance(modal.getAddress())
          if(accountBalance <= currentFee) state.setStep(state.availiableSteps.balanceNotEnoughtError, effects)
          else state.setStep(state.availiableSteps.waitingForApproveOnWallet, effects)
        } catch(error) {
          state.setStep(state.availiableSteps.genericError, effects)
        }
        break
      case state.availiableSteps.waitingForApproveOnWallet:
        try {
          $dialogCheckWalletToApprove.showModal()
          const { utonomaContractForSignedTransactions } = await useUtonomaContractForSignedTransactions()
          likeResult = await utonomaContractForSignedTransactions.like([state.utonomaIdentifier().index, state.utonomaIdentifier().contentType])
          state.setStep(state.availiableSteps.waitiingForBlockchainResult, effects)
        } catch(error) {
          state.setStep(state.availiableSteps.genericError, effects)
        } finally {
          $dialogCheckWalletToApprove.close()
        }
        break
      case state.availiableSteps.waitiingForBlockchainResult:
        try {
          $dialogLikeContentTransactionSent.show()
          setTimeout(() => $dialogLikeContentTransactionSent.close(), 5000)
          await likeResult.wait()
          state.setStep(state.availiableSteps.success, effects)
        } catch(error) {
          state.setStep(state.availiableSteps.genericError, effects)
        } finally {
          loading(false)
        }
        break
      case state.availiableSteps.success:
        $dialogLikeButtonSuccess.show()
        setTimeout(() => $dialogLikeButtonSuccess.close(), 5000)
        break
      case state.availiableSteps.activatingAccount:
        if(!ActivateForVoting) {
          const { ActivateForVoting: ActivateForVotingFactory } = await import('../modals/ActivateForVoting/ActivateForVoting.js')
          ActivateForVoting = ActivateForVotingFactory(document.querySelector('#activateForVoting'))
        }
        ActivateForVoting.openModal()
        loading(false)
        break
      case state.availiableSteps.userDisconnectedError:
        const { setIsLoggedIn, setAddress } = await import('../../services/userManager/userManager.js')
        setIsLoggedIn(false)
        setAddress('')
        location.hash = 'rightPanelContainer'
        setTimeout(() => location.hash = '', 100)
        loading(false)
        break
      case state.availiableSteps.balanceNotEnoughtError:
        $dialogNotEnoughBalanceError.show()
        setTimeout(() => $dialogNotEnoughBalanceError.close(), 5000)
        loading(false)
        break
      case state.availiableSteps.genericError:
        loading(false)
        $dialogLikeButtonError.show()
        setTimeout(() => $dialogLikeButtonError.close(), 5000)
        break
    }
  }

  function loading(boolean) {
    if(boolean) {
      $buttonLikeShortVideo.disabled = true
      $buttonLikeShortVideo.style.visibility = 'hidden'
    }
    else {
      $buttonLikeShortVideo.disabled = false
      $buttonLikeShortVideo.style.visibility = 'visible'
    }
  }

  $buttonLikeShortVideo.addEventListener('click', () => {
    state.setStep(state.availiableSteps.pressingButton, effects)
  })

  return {
    state,
    loading: (boolean) => { 
      state.setStep(state.availiableSteps.loading, () => loading(state.loading()), boolean) 
    },
    updateUtonomaIdentifier: (id) => { state.setStep(state.availiableSteps.updatingUtonomaIdentifier, undefined, id) }
  }
}