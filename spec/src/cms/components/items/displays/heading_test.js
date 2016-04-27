import { renderComponent, expect } from '../../../utility';
import ItemHeading from '../../../../../../src/cms/components/items/displays/heading';

describe('ItemHeading', () => {

  it('show ItemHeading component', () => {
    const props = { type: 'ItemHeading', title: 'hoge' };
    const component = renderComponent(ItemHeading, props, {});
    expect(component.find('h2')).to.have.class('item-heading__title');
    expect(component.find('h2')).to.contain('hoge');
  });

  it('show ItemSubHeading component', () => {
    const props = { type: 'ItemSubHeading', title: 'hoge' };
    const component = renderComponent(ItemHeading, props, {});
    expect(component.find('h3')).to.have.class('item-heading__sub-title');
    expect(component.find('h3')).to.contain('hoge');
  });

});

