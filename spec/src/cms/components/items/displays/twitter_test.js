import { renderComponent, expect } from '../../../utility';
import ItemTwitter from '../../../../../../src/cms/components/items/displays/twitter';

describe('ItemTwitter', () => {

  let component;
  beforeEach(() => {
    const props = { image: 'http://www.digital-clarity.com/wp-content/uploads/2009/03/google-.png' };
    component = renderComponent(ItemTwitter, props, {});
  });

  it('show ItemTwitter component', () => {
    expect(component).to.exist;
  });

});

