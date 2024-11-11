/**
 * Creates a read-only provider for interacting with the Utonoma contract.
 *
 * @module readOnlyProvider
 */

import { sepoliaEndpoint } from './rpcEndpoints.js'
import { JsonRpcProvider, Contract } from 'ethers'
import { utonomaSepoliaAddress, utonomaABI, contractDeployedInBlock } from '../utonomaSmartContract.js'


export const readOnlyProvider = (function() {
  /**
   * The JSON-RPC provider to the selected network
   * @type {JsonRpcProvider}
   */
  let provider = new JsonRpcProvider(sepoliaEndpoint)

  /**
   * The Utonoma contract instance.
   * @type {Contract}
   */
  let utonomaContract = new Contract(
    utonomaSepoliaAddress, 
    utonomaABI,
    provider
  )


  let filters = {
    /**
     * Retrieves content uploaded by a specific account.
     *
     * @async
     * @function getContentUploadedByThisAccount
     * @param {string} userAddress - The address of the user whose content uploads are being queried.
     * @returns {Promise<Array>} The list of contents uploaded by this account.
     * @note The second parameter of the uploaded method is the starting block of the query.
     * We start from the block that deployed the smart contract to improve performance and not filter
     * so many events unnecessarily
     */
    getContentUploadedByThisAccount: async(userAddress) => {
      return await utonomaContract.queryFilter(utonomaContract.filters.uploaded(userAddress), contractDeployedInBlock, 'latest')
    }
  }

  let genericRequests = {
    getCurrentFee: async() => {
      let usersInTheLastPeriod = await readOnlyProvider.utonomaContract.currentPeriodMAU()
      return await readOnlyProvider.utonomaContract.calculateFee(usersInTheLastPeriod)
    },
    getAllowance: async(address) => {
      return await readOnlyProvider.utonomaContract.allowance(address , utonomaSepoliaAddress)
    },
    getBalance: async(address) => {
      return await readOnlyProvider.utonomaContract.balanceOf(address)
    } 
  }

  return {
    provider,
    utonomaContract,
    filters,
    genericRequests
  }
})()