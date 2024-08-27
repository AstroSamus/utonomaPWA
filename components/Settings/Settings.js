import { userManager } from '../../services/userManager/userManager.js'
import { useUtonomaContractForSignedTransactions, useSignedProvider } from '../../web3_providers/signedProvider.js'
import { utonomaSepoliaAddress } from '../../utonomaSmartContract.js'
import { parseUnits } from 'ethers'

export function Settings($container) {
  const $modalConfirmActivateForVoting = $container.querySelector('#modalConfirmActivateForVoting')
  const $dialogActivateForVotingCheckWallet = $container.querySelector('#dialogActivateForVotingCheckWallet')
  const $dialogActivateForVotingTransactionSent = $container.querySelector('#dialogActivateForVotingTransactionSent')
  const $dialogActivateForVotingError = $container.querySelector('#dialogActivateForVotingError')
  const $dialogSendOrReceiveTokens = $container.querySelector('#dialogSendOrReceiveTokens')
  const $buttonActivateForVoting = $container.querySelector('#buttonActivateForVoting')
  const $buttonManageAccount = $container.querySelector('#buttonManageAccount')
  const $buttonSendTokens = $container.querySelector('#buttonSendTokens')
  const $buttonDialogCloseSendTokens = $container.querySelector('#buttonDialogCloseSendTokens')
  
  $buttonManageAccount.addEventListener('click', async () => {
    $buttonManageAccount.disabled = true
    const { useSignedProvider } = await import('../../web3_providers/signedProvider.js')
    const { modal } = await useSignedProvider()
    modal.open()
    $buttonManageAccount.disabled = false
  })
  
  $buttonActivateForVoting.addEventListener('click', async() => {
    $buttonActivateForVoting.disabled = true
    $modalConfirmActivateForVoting.showModal()
    $container.querySelector('#buttonConfirmActivateForVotingYes').addEventListener('click', () => {
      activateForVoting()
      $modalConfirmActivateForVoting.close()
      $dialogActivateForVotingCheckWallet.show()
      setTimeout(() => $dialogActivateForVotingCheckWallet.close(), 5000)
      $buttonActivateForVoting.disabled = false
    })
    $container.querySelector('#buttonConfirmActivateForVotingNo').addEventListener('click', () => {
      $modalConfirmActivateForVoting.close()
      $buttonActivateForVoting.disabled = false
    })
  })
  
  async function activateForVoting() {
    try {
      const { utonomaContractForSignedTransactions } = await useUtonomaContractForSignedTransactions()
      const approveResult = await utonomaContractForSignedTransactions.approve(utonomaSepoliaAddress, parseUnits("100000.0", 18))
      $dialogActivateForVotingTransactionSent.show()
      setTimeout(() => $dialogActivateForVotingTransactionSent.close(), 5000)
      const transactionResp = await approveResult.wait()
      //Alert the success
      console.log(transactionResp)
    }
    catch(error) {
      console.log('Error message: ', error)
      $dialogActivateForVotingError.show()
      setTimeout(() => $dialogActivateForVotingError.close(), 5000)
    }
  }
  
  $buttonSendTokens.addEventListener('click', () => {
    $dialogSendOrReceiveTokens.showModal()
  })
  
  $buttonDialogCloseSendTokens.addEventListener('click', () => {
    $dialogSendOrReceiveTokens.close()
  })
}