import { renderComponent, expect, sinon } from '../../test_helper';
import PostItemCell from '../../../../../src/cms/components/items/post_item_cell';

describe('PostItemCell', () => {

  let props = {
    sortRank: 1,
    totalCount: 1,
    handleDeleteItem: sinon.spy(),
    handleMoveItem: sinon.spy(),
    handleUpdateItem: sinon.spy()
  };

  it('does not show tooltip', () => {
    let item = { editing: false, type: 'ItemHeading' };
    props = { ...props, item };
    const component = renderComponent(PostItemCell, props, {});
    expect(component.find('.item-tooltip')).not.to.exist;
  });

  it('shows Hading component', () => {
    let item = { editing: false, type: 'ItemHeading' };
    props = { ...props, item };
    const component = renderComponent(PostItemCell, props, {});
    expect(component.find('.item-heading__title')).to.exist;
  });

  it('shows SubHeading component', () => {
    let item = { editing: false, type: 'ItemSubHeading' };
    props = { ...props, item };
    const component = renderComponent(PostItemCell, props, {});
    expect(component.find('.item-heading__sub-title')).to.exist;
  });

  it('shows Image component', () => {
    let item = { editing: false, type: 'ItemImage', image: 'http://www.digital-clarity.com/wp-content/uploads/2009/03/google-.png' };
    props = { ...props, item };
    const component = renderComponent(PostItemCell, props, {});
    expect(component.find('.item-image__frame')).to.exist;
  });

  it('shows Twitter component', () => {
    let item = { editing: false, type: 'ItemTwitter' };
    props = { ...props, item };
    const component = renderComponent(PostItemCell, props, {});
    expect(component.find('.item-twitter__link')).to.exist;
  });

  it('shows Quote component', () => {
    let item = { editing: false, type: 'ItemQuote', sourceURL: 'https://google.com', description: 'hoge' };
    props = { ...props, item };
    const component = renderComponent(PostItemCell, props, {});
    expect(component.find('.item-quote')).to.exist;
  });

  it('shows Link component', () => {
    let item = { editing: false, type: 'ItemLink', sourceURL: 'https://google.com', sourceTitle: 'google' };
    props = { ...props, item };
    const component = renderComponent(PostItemCell, props, {});
    expect(component.find('.item-link')).to.exist;
  });


  it('shows Text component', () => {
    let item = { editing: false, type: 'ItemText', style: 1, description: 'hoge' };
    props = { ...props, item };
    const component = renderComponent(PostItemCell, props, {});
    expect(component.find('.item-text__description')).to.exist;
  });


  // TODO: test mouseEnter/Leave event

});
