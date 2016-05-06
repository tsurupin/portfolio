import { renderComponent, expect } from '../../../utility';
import ItemLink from '../../../../../../src/cms/components/items/Display/link';

describe('ItemLink', () => {

  let component;
  beforeEach(() => {
    const props = { sourceURL: 'http://google.com', sourceTitle: 'hoge' };
    component = renderComponent(ItemLink, props, {});
  });

  it('show ItemLink component', () => {
    expect(component).to.contain('hoge');
  });

});

