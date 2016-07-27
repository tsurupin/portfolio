import { expect } from '../helpers/utility';
import { trimPost, trimProject } from 'cms/utilities';

describe('Trim Post', () => {
  it('trims post params', () => {
    const params = {
      title: 'aa', description: 'de', publishedAt: 'hoge',
      itemsAttributes: [
        { type: 'hoge', editing: false, sourceTitle: 'hoge' },
        { type: 'hoga', editing: true, sourceTitle: 'hoga' },
        { type: 'hogo', editing: false, sourceTitle: 'hogo' },
      ],
      taggingsAttributes: [
        { id: 1, text: 'text' },
        { id: 2, text: 'text' },
      ],
    };

    const expectedResponse = {
      title: 'aa', description: 'de', published_at: 'hoge',
      items_attributes: [
        { type: 'hoge', editing: false, source_title: 'hoge' },
        { type: 'hogo', editing: false, source_title: 'hogo' },
      ],
      taggings_attributes: [
        { id: 1, text: 'text' },
        { id: 2, text: 'text' },
      ],
    };

    expect(trimPost(params)).to.eql(expectedResponse);
  });
});

describe('Trim Project', () => {
  it('trims project params', () => {
    const params = {
      id: 1,
      title: 'title',
      description: 'description',
      image: 'http://image.png',
      sourceUrl: 'http://google.com',
      caption: 'caption',
      taggingsAttributes: [
        { id: 1, text: 'text' },
        { id: 2, text: 'text' },
      ],
    };

    const expectedResponse = {
      id: 1,
      title: 'title',
      description: 'description',
      image: 'http://image.png',
      source_url: 'http://google.com',
      caption: 'caption',
      taggings_attributes: [
      { id: 1, text: 'text' },
      { id: 2, text: 'text' },
      ],
    };

    expect(trimProject(params)).to.eql(expectedResponse);
  });
});
