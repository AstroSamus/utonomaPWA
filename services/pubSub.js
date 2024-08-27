export const storageEventKeys = {
  connectedUserAddress: 'com.utonoma.app.pubsub.connectedUserAddress',
}

export const pubSub = (() => {
  const subscribers = {}

  const publishAndStore = (eventKey, value) => {
    // this will trigger an storage event that can be heared in other tabs
    localStorage.setItem(eventKey, value)
    // this will trigger an storage event that can be heared in the same tab
    window.dispatchEvent(new StorageEvent('storage', { key: eventKey }))
  }

  const subscribe = (event, callback) => {
    if (!subscribers[event]) {
      subscribers[event] = []
    }
    subscribers[event].push(callback)
  }

  window.addEventListener('storage', (event) => {
    if (event.key && subscribers[event.key]) {
      subscribers[event.key].forEach(callback => callback())
    }
  })

  return {
    publishAndStore,
    subscribe
  }
})()