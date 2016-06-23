import { renderComponent, expect } from '../../../../../../helpers/utility';
import Twitter from 'shared/components/posts/Twitter/index';

describe('ItemTwitter', () => {

  let component;
  beforeEach(() => {
    const props = { image: 'http://www.digital-clarity.com/wp-content/uploads/2009/03/google-.png' };
    component = renderComponent(Twitter, props, {});
  });

  it('show ItemTwitter component', () => {
    expect(component).to.exist;
  });

});

