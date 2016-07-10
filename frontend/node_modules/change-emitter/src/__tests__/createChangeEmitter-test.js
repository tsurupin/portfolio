import test from 'ava'
import { createChangeEmitter } from '../'
import sinon from 'sinon'

test('calls listeners with arguments passed to emit()', t => {
  const emitter = createChangeEmitter()
  let calledWith
  emitter.listen((...args) => {
    calledWith = args
  })
  emitter.emit('a', 'b', 'c')
  t.deepEqual(calledWith, ['a', 'b', 'c'])
})

test('supports multiple listeners', t => {
  const emitter = createChangeEmitter()
  const listenerA = sinon.spy()
  const listenerB = sinon.spy()

  let unlistenA = emitter.listen(listenerA)
  emitter.emit()
  t.is(listenerA.callCount, 1)
  t.is(listenerB.callCount, 0)

  emitter.emit()
  t.is(listenerA.callCount, 2)
  t.is(listenerB.callCount, 0)

  const unlistenB = emitter.listen(listenerB)
  t.is(listenerA.callCount, 2)
  t.is(listenerB.callCount, 0)

  emitter.emit()
  t.is(listenerA.callCount, 3)
  t.is(listenerB.callCount, 1)

  unlistenA()
  t.is(listenerA.callCount, 3)
  t.is(listenerB.callCount, 1)

  emitter.emit()
  t.is(listenerA.callCount, 3)
  t.is(listenerB.callCount, 2)

  unlistenB()
  t.is(listenerA.callCount, 3)
  t.is(listenerB.callCount, 2)

  emitter.emit()
  t.is(listenerA.callCount, 3)
  t.is(listenerB.callCount, 2)

  unlistenA = emitter.listen(listenerA)
  t.is(listenerA.callCount, 3)
  t.is(listenerB.callCount, 2)

  emitter.emit()
  t.is(listenerA.callCount, 4)
  t.is(listenerB.callCount, 2)
})

test('only removes listener once when unlisten is called', t => {
  const emitter = createChangeEmitter()
  const listenerA = sinon.spy()
  const listenerB = sinon.spy()

  const unlistenA = emitter.listen(listenerA)
  emitter.listen(listenerB)

  unlistenA()
  unlistenA()

  emitter.emit()
  t.is(listenerA.callCount, 0)
  t.is(listenerB.callCount, 1)
})

test('only removes relevant listener when unlisten is called', t => {
  const emitter = createChangeEmitter()
  const listener = sinon.spy()

  emitter.listen(listener)
  const unlisten = emitter.listen(listener)

  unlisten()
  unlisten()

  emitter.emit()
  t.is(listener.callCount, 1)
})

test('supports unlistening within a listener', t => {
  const emitter = createChangeEmitter()
  const listenerA = sinon.spy()
  const listenerB = sinon.spy()
  const listenerC = sinon.spy()

  emitter.listen(listenerA)
  const unlistenB = emitter.listen(() => {
    listenerB()
    unlistenB()
  })
  emitter.listen(listenerC)

  emitter.emit()
  emitter.emit()

  t.is(listenerA.callCount, 2)
  t.is(listenerB.callCount, 1)
  t.is(listenerC.callCount, 2)
})

test('when a listener is removed from inside another listener, it is still ' +
'called for the current change', t => {
  const emitter = createChangeEmitter()

  const unlistens = []
  const unlistenAll = () => unlistens.forEach(
    unlisten => unlisten()
  )

  const listener1 = sinon.spy()
  const listener2 = sinon.spy()
  const listener3 = sinon.spy()

  unlistens.push(emitter.listen(listener1))
  unlistens.push(emitter.listen(() => {
    listener2()
    unlistenAll()
  }))
  unlistens.push(emitter.listen(listener3))

  emitter.emit()
  t.is(listener1.callCount, 1)
  t.is(listener2.callCount, 1)
  t.is(listener3.callCount, 1) // Still called

  // Confirm all listeners were removed
  emitter.emit()
  t.is(listener1.callCount, 1)
  t.is(listener2.callCount, 1)
  t.is(listener3.callCount, 1)
})

test('when listener is added inside another listener, the new listener is ' +
'not called for the current change', t => {
  const emitter = createChangeEmitter()

  const listener1 = sinon.spy()
  const listener2 = sinon.spy()
  const listener3 = sinon.spy()

  let listener3Added = false
  const maybeAddThirdListener = () => {
    if (!listener3Added) {
      listener3Added = true
      emitter.listen(listener3)
    }
  }

  emitter.listen(listener1)
  emitter.listen(() => {
    listener2()
    maybeAddThirdListener()
  })

  emitter.emit()
  t.is(listener1.callCount, 1)
  t.is(listener2.callCount, 1)
  t.is(listener3.callCount, 0) // Not called

  emitter.emit()
  t.is(listener1.callCount, 2)
  t.is(listener2.callCount, 2)
  t.is(listener3.callCount, 1) // Called
})

test('uses the last snapshot of listeners during nested change events', t => {
  const emitter = createChangeEmitter()

  const listener1 = sinon.spy()
  const listener2 = sinon.spy()
  const listener3 = sinon.spy()
  const listener4 = sinon.spy()

  let unlisten4
  const unlisten1 = emitter.listen(() => {
    listener1()
    t.is(listener1.callCount, 1)
    t.is(listener2.callCount, 0)
    t.is(listener3.callCount, 0)
    t.is(listener4.callCount, 0)

    unlisten1()
    unlisten4 = emitter.listen(listener4)
    emitter.emit()

    t.is(listener1.callCount, 1)
    t.is(listener2.callCount, 1)
    t.is(listener3.callCount, 1)
    t.is(listener4.callCount, 1)
  })
  emitter.listen(listener2)
  emitter.listen(listener3)

  emitter.emit()
  t.is(listener1.callCount, 1)
  t.is(listener2.callCount, 2)
  t.is(listener3.callCount, 2)
  t.is(listener4.callCount, 1)

  unlisten4()
  emitter.emit()
  t.is(listener1.callCount, 1)
  t.is(listener2.callCount, 3)
  t.is(listener3.callCount, 3)
  t.is(listener4.callCount, 1)
})
