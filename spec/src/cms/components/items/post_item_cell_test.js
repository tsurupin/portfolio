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
    let item = { editing: false, type: 'ItemImage' };
    props = { ...props, item };
    const component = renderComponent(PostItemCell, props, {});
    expect(component.find('.item-image__frame')).to.exist;
  });

  // TODO: test mouseEnter/Leave event

});
