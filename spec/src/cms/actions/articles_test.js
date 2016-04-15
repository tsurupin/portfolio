import { expect } from '../test_helper';
import { FETCH_ARTICLES } from '../../../../src/cms/constants';
import { fetchArticles } from '../../../../src/cms/actions';

describe('actions', () => {
   describe('fetchArticles', () => {
     it('has the correct type', () => {
         const action = fetchArticles();
         expect(action.type).to.equal(FETCH_ARTICLES);
     });
   });
});