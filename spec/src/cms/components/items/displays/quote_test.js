import { renderComponent, expect } from '../../../test_helper';
import ItemQuote from '../../../../../../src/cms/components/items/displays/quote';

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

