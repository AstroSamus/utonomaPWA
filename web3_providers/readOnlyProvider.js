/**
 * Creates a read-only provider for interacting with the Utonoma contract.
 *
 * @module readOnlyProvider
 */

import { sepoliaRpcEndpoint, sepoliaEventFilterEndpoint } from './rpcEndpoints.js'
import { JsonRpcProvider, Contract } from 'ethers'
import { utonomaSepoliaAddress, utonomaABI } from '../utonomaSmartContract.js'


export const readOnlyProvider = (function() {
  /**
   * The JSON-RPC provider to the selected network
   * @type {JsonRpcProvider}
   */
  let provider = new JsonRpcProvider(sepoliaRpcEndpoint)

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
      try {
        const rawResponse = await fetch(sepoliaEventFilterEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: `
              {
                uploadeds(
                  where: {
                    contentCreator:"${userAddress}"
                  }
                  orderBy: index
                  orderDirection: desc
                ){
                  index,
                  contentType
                }
              }
            `
          })  
        })
        const response = await rawResponse.json()
        return response.data.uploadeds
      } catch (error) {
        throw new Error('Error when filtering the contents uploaded by this account:', error)
      }
    }
  }

  let genericRequests = {
    getCurrentFee: async() => {
      let usersInTheLastPeriod = await readOnlyProvider.utonomaContract.currentPeriodMAU()
      return await readOnlyProvider.utonomaContract.calculateFee(usersInTheLastPeriod)
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