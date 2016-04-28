import { expect, renderComponent } from '../../../utility';
import ItemImage from '../../../../../../src/cms/components/items/displays/image';

describe('ItemImage', () => {
  let component;
  beforeEach(() => {
    const props = { image: 'http://www.digital-clarity.com/wp-content/uploads/2009/03/google-.png' };
    component = renderComponent(ItemImage, props, {});
  });

  it('show ItemImage component', () => {
    expect(component).to.exist;
  });

});

