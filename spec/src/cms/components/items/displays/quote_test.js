import { renderComponent, expect } from '../../../utility';
import ItemQuote from '../../../../../../src/cms/components/items/Display/quote';

describe('ItemQuote', () => {

  let component;
  beforeEach(() => {
    const props = { sourceURL: 'http://google.com', description: 'hoge' };
    component = renderComponent(ItemQuote, props, {});
  });

  it('show ItemQuote component', () => {
    expect(component.find('p')).to.contain('hoge');
  });

});

