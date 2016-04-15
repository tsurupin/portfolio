import { expect } from '../test_helper';
import articleReducer from '../../../../src/cms/reducers/articles';
import { FETCH_ARTICLES } from '../../../../src/cms/constants';

describe('Articles Reducer', () => {

    it('handles action with unknown type', () => {
        expect(articleReducer([], {})).to.eql([]);
    });

    it('handles action of type FETCH_ARTICLES', () => {
        const action = { type: FETCH_ARTICLES, payload: [] };
        //expect(articleReducer([], action)).to.eql(['']);
    });
});