change-emitter
==============

Listen for changes. Like an event emitter that only emits a single event type. Really tiny.

I extracted this from Redux's `createStore()` because I found it to be useful in other contexts. Use it where you want the most minimal event subscription implementation possible.

## Usage

```js
import { createChangeEmitter } from 'change-emitter'

const emitter = createChangeEmitter()

// Called `listen` instead of `subscribe` to avoid confusion with observable spec
const unlisten = emitter.listen((...args) => {
  console.log(args)
})

emitter.log(1, 2, 3) // logs `[1, 2, 3]`
unlisten()
emitter.log(4, 5, 6) // doesn't log
```

## Larger example

Here's a (partial) implementation of Redux's `createStore`:

```js
const createStore = (reducer, initialState) => {
  let state = initialState
  const emitter = createChangeEmitter()

  function subscribe(listener) {
    return emitter.listen(listener)
  }

  function dispatch(action) {
    state = reducer(state, action)
    emitter.emit()
    return action
  }

  function getState() {
    return state
  }

  return {
    subscribe,
    dispatch,
    getState
  }
}
```
