export const createChangeEmitter = () => {
  let currentListeners = []
  let nextListeners = currentListeners

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  function listen(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return () => {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  function emit(...args) {
    currentListeners = nextListeners
    const listeners = currentListeners
    for (let i = 0; i < listeners.length; i++) {
      listeners[i](...args)
    }
  }

  return {
    listen,
    emit
  }
}
