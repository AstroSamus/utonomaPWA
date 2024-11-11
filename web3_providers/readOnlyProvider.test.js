import { readOnlyProvider } from '../web3_providers/readOnlyProvider'

test('useReadOnlyProvider should return three not null objects: provider and utonomaContract, and filters', () => {
  expect(readOnlyProvider.provider).toBeTruthy()
  expect(readOnlyProvider.utonomaContract).toBeTruthy()
  expect(readOnlyProvider.filters).toBeTruthy()
})

/*
List of some of the external methods from the Utonoma smart contract:
approve
createUser
deletion
dislike
harvestLikes
like
reply
updateUserMetadataHash
upload
voluntarilyDelete
getContentById
*/
test('In ReadOnlyProvider, the returned utonomaContract object should contain the most important methods from the smart contract', () => {
  expect(readOnlyProvider.utonomaContract.approve).toBeTruthy()
  expect(readOnlyProvider.utonomaContract.createUser).toBeTruthy()
  expect(readOnlyProvider.utonomaContract.deletion).toBeTruthy()
  expect(readOnlyProvider.utonomaContract.dislike).toBeTruthy()
  expect(readOnlyProvider.utonomaContract.harvestLikes).toBeTruthy()
  expect(readOnlyProvider.utonomaContract.like).toBeTruthy()
  expect(readOnlyProvider.utonomaContract.reply).toBeTruthy()
  expect(readOnlyProvider.utonomaContract.updateUserMetadataHash).toBeTruthy()
  expect(readOnlyProvider.utonomaContract.upload).toBeTruthy()
  expect(readOnlyProvider.utonomaContract.voluntarilyDelete).toBeTruthy()
  expect(readOnlyProvider.utonomaContract.getContentById).toBeTruthy()

})