import { renderComponent, expect } from '../../../../../utility';
import Image from '../../../../../../../../src/cms/components/posts/forms/Item/Display/Image/index';

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

