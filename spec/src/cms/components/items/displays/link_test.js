import { renderComponent, expect } from '../../../test_helper';
import ItemLink from '../../../../../../src/cms/components/items/displays/link';

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

