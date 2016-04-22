import { expect } from '../test_helper';
import {
    fetchItems, createItem, updateItem, 
    deleteItem, moveItem 
} from '../../../../src/cms/actions/items';

import {
    FETCH_ITEMS, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM,
    MOVE_ITEM_TOP,
} from '../../../../src/cms/constants';

describe('item actions', () => {
    describe('fetchItems', () => {
        it('creates FETCH_ITEMS and items', () => {
            const action = fetchItems([{type: 'ItemHeading'}]);
            const expectedResponse = {
                type: FETCH_ITEMS,
                payload: {
                    items: [{type: 'ItemHeading'}]
                }
            };
            expect(action).to.eql(expectedResponse);
        });
    });

    describe('createItem', () => {
        it('creates CREATE_ITEM and item', () => {
            const action = createItem('ItemHeading');
            const expectedResponse = {
                type: CREATE_ITEM,
                payload: {
                    item: {
                        type: 'ItemHeading',
                        editing: true,
                        isNew: true
                    }
                }
            };
            expect(action).to.eql(expectedResponse);
        });
    });

    describe('updateItem', () => {
        it('creates UPDATE_ITEM, item and sortRank', () => {
            const action = updateItem(1, {type: 'ItemHeading'});
            const expectedResponse = {
                type: UPDATE_ITEM,
                payload: {
                    sortRank: 1,
                    item: {
                        type: 'ItemHeading'
                    }
                }
            };
            expect(action).to.eql(expectedResponse);
        });
    });

    describe('deleteItem', () => {
        it('creates DELETE_ITEM and sortRank', () => {
            const action = deleteItem(1);
            const expectedResponse = {
                type: DELETE_ITEM,
                payload: {
                    sortRank: 1
                }
            };
            expect(action).to.eql(expectedResponse);
        });
    });

    describe('moveItem', () => {
        it('creates MOVE_ITEM_TOP and sortRank', () => {
            const action = moveItem(1, MOVE_ITEM_TOP);
            const expectedResponse = {
                type: MOVE_ITEM_TOP,
                payload: {
                    sortRank: 1
                }
            };
            expect(action).to.eql(expectedResponse);
        });
    });
    
});
