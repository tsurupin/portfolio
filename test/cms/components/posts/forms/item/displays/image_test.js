import { renderComponent, expect } from '../../../../../../helpers/utility';
import Image from 'shared/components/posts/Image/index';

describe('ItemImage', () => {
  let component;
  beforeEach(() => {
    const props = { image: 'http://www.digital-clarity.com/wp-content/uploads/2009/03/google-.png' };
    component = renderComponent(Image, props, {});
  });

  it('shows ItemImage component', () => {
    expect(component).to.exist;
  });

});

