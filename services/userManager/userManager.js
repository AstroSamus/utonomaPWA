const isLoggedInKey = 'isUserLoggedIn'
const addressKey = 'userAddress'

let isLoggedIn
let address

export const USER_ADDRESS_KEY = 'userAddress'

export const userManager = {
  _isLoggedIn: null,
  _lastKnownUserAddress: localStorage[USER_ADDRESS_KEY] ?? null,

  get lastKnownUserAddress() {
    return this._lastKnownUserAddress
  },
  
  get isLoggedIn() { 
    return !!this._lastKnownUserAddress;
  },

  set lastKnownUserAddress(address) {
    this._lastKnownUserAddress = address
    localStorage[USER_ADDRESS_KEY] = address
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: USER_ADDRESS_KEY,
        value: address,
      })
    )
  },

  /*
  logout() {
    this.lastKnownUserAddress = null
  },*/
}

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
  }
}