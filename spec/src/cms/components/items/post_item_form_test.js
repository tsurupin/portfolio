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

  it('shows image form', () => {
    let item = { editing: true, type: 'ItemImage' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    expect(component).to.contain('ItemImage')
  });

  it('shows twitter form', () => {
    let item = { editing: true, type: 'ItemTwitter' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    expect(component).to.contain('ItemTwitter')
  });

  it('shows quote form', () => {
    let item = { editing: true, type: 'ItemQuote' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    expect(component).to.contain('ItemQuote')
  });

  it('shows link form', () => {
    let item = { editing: true, type: 'ItemLink' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    expect(component).to.contain('ItemLink')
  });

  it('shows text form', () => {
    let item = { editing: true, type: 'ItemText' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    expect(component).to.contain('ItemText')
  });



});
    