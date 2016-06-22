import { expect } from './utility';
import { trimPost } from '../../../src/cms/utilities';

describe('Trim Post', () => {
  it('trims post params', () => {
    const params = {
      title: "aa", description: "de", publishedAt: 'hoge',
      itemsAttributes: [
        { type: 'hoge', editing: false, sourceTitle: 'hoge' },
        { type: 'hoga', editing: true, sourceTitle: 'hoga' },
        { type: 'hogo', editing: false, sourceTitle: 'hogo' }
      ]
    };
    
    const expectedResponse = {
      title: "aa", description: "de", published_at: 'hoge',
      items_attributes: [
        { type: 'hoge', editing: false, source_title: 'hoge' },
        { type: 'hogo', editing: false, source_title: 'hogo' }
      ]
    };
    
    expect(trimPost(params)).to.eql(expectedResponse);
  });
  
});