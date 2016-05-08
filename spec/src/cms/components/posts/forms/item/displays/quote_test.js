import { renderComponent, expect } from '../../../../../utility';
import Quote from '../../../../../../../../src/cms/components/posts/forms/Item/Display/Quote/index';

describe('ItemQuote', () => {

  let component;
  beforeEach(() => {
    const props = { sourceURL: 'http://google.com', description: 'hoge' };
    component = renderComponent(Quote, props, {});
  });

  it('show ItemQuote component', () => {
    expect(component.find('p')).to.contain('hoge');
  });

});

