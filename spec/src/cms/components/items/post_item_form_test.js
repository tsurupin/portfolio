import { renderComponent, expect, sinon } from '../../test_helper';
import PostItemForm from '../../../../../src/cms/components/items/post_item_form';

describe('PostItemForm', () => {
  const handleDeleteItem = sinon.spy();

  let props = {
    sortRank: 1,
    handleDeleteItem: handleDeleteItem,
    handleMoveItem: sinon.spy(),
    handleUpdateItem: sinon.spy()
  };

  it('shows postItemForm', () => {
    let item = { editing: true, type: 'ItemHeading' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    component.find('.item-form__cancel-button').simulate('click');
    expect(handleDeleteItem.calledOnce).to.be.true;

  });

  it('shows heading form', () => {
    let item = { editing: true, type: 'ItemHeading' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    expect(component).to.contain('ItemHeading')
  });

});
    