import { expect } from '../test_helper';
import postReducer from '../../../../src/cms/reducers/posts';
import { FETCH_POSTS } from '../../../../src/cms/constants';

describe('Articles Reducer', () => {

    it('handles action with unknown type', () => {
        expect(postReducer([], {})).to.eql([]);
    });

    it('handles action of type FETCH_POSTS', () => {
        const action = { type: FETCH_POSTS, payload: [] };
        //expect(articleReducer([], action)).to.eql(['']);
    });
});