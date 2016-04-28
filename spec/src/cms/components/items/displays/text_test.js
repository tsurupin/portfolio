import { renderComponent, expect } from '../../../utility';
import ItemText from '../../../../../../src/cms/components/items/displays/text';

describe('ItemQuote', () => {

  let component;
  beforeEach(() => {
    const props = { style: 1, description: 'hoge' };
    component = renderComponent(ItemText, props, {});
  });

  it('show ItemText component', () => {
    expect(component.find('p')).to.contain('hoge');
  });

});

