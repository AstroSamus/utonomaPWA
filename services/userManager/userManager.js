const isLoggedInKey = 'isUserLoggedIn'
const addressKey = 'userAddress'

let isLoggedIn
let address

export function getIsLoggedIn() {
  if(!isLoggedIn) {
    const isLoggedInFromLocalStorage = localStorage[isLoggedInKey]
    if(isLoggedInFromLocalStorage) {
      isLoggedInFromLocalStorage === 'true' ?  setIsLoggedIn(true) : setIsLoggedIn(false)      
    } else {
      //defaults false
      setIsLoggedIn(false)
    }
  } 
  return isLoggedIn
}

export function getUserAddress() {
  if(!address) {
    const addressFromLocalStorage = localStorage[addressKey]
    if(addressFromLocalStorage) {
      setAddress(addressFromLocalStorage)
    } else {
      //defaults empty string
      setAddress('')
    }
  }
  return address
}

export function setIsLoggedIn(newValue) {
  if(typeof newValue != 'boolean') throw 'Invalid type for the isLoggedIn value'
  if(isLoggedIn !== newValue) {
    isLoggedIn = newValue
    localStorage[isLoggedInKey] = newValue
    window.dispatchEvent(new StorageEvent('storage', { key: isLoggedInKey }))
  }
}

export function setAddress(newValue) {
  if(typeof newValue != 'string') throw 'Invalid type for the address value'
  if(address !== newValue) {
    address = newValue
    localStorage[addressKey] = newValue
    window.dispatchEvent(new StorageEvent('storage', { key: addressKey }))
  }
}