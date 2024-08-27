import { storageEventKeys, pubSub } from "../pubSub.js"

export const userManager = (function() {

  let connectedUserAddress = localStorage.getItem(storageEventKeys.connectedUserAddress) || ''
  let isLoggedIn = connectedUserAddress ? true : false

  function setIsLoggedIn(newValue) {
    if(typeof newValue != 'boolean') throw 'Invalid type for the isLoggedIn value'
    if(isLoggedIn === newValue) return
    isLoggedIn = newValue
  }

  function setconnectedUserAddress(newValue) {
    if(typeof newValue != 'string') throw 'Invalid type for the address value'
    if(connectedUserAddress === newValue) return
    connectedUserAddress = newValue
  }

  const actionLoginUser = (userAddress) => {
    setconnectedUserAddress(userAddress)
    setIsLoggedIn(true)
    effectLogUser()
  }

  const actionLogoutUser = () => {
    setconnectedUserAddress('')
    setIsLoggedIn(false)
    effectLogUser()
  }

  function effectLogUser() {
    pubSub.publishAndStore(storageEventKeys.connectedUserAddress, connectedUserAddress)
  }
  
  return {
    isLoggedIn: () => isLoggedIn,
    address: () => address,
    actionLoginUser,
    actionLogoutUser
  }
})()