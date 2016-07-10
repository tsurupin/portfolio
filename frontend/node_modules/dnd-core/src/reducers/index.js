import { default as dragOffset } from './dragOffset';
import { default as dragOperation } from './dragOperation';
import { default as refCount } from './refCount';
import { default as dirtyHandlerIds } from './dirtyHandlerIds';
import { default as stateId } from './stateId';

export default function (state = {}, action) {
  return {
    dirtyHandlerIds: dirtyHandlerIds(state.dirtyHandlerIds, action, state.dragOperation),
    dragOffset: dragOffset(state.dragOffset, action),
    refCount: refCount(state.refCount, action),
    dragOperation: dragOperation(state.dragOperation, action),
    stateId: stateId(state.stateId)
  };
}