import { renderComponent, expect, sinon } from '../../utility';
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
    let item = { editing: true, targetType: 'ItemHeading' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    component.find('.item-form__cancel-button').simulate('click');
    expect(handleDeleteItem.calledOnce).to.be.true;

  });

  it('shows heading form', () => {
    let item = { editing: true, targetType: 'ItemHeading' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    expect(component).to.contain('Heading')
  });

  it('shows image form', () => {
    let item = { editing: true, targetType: 'ItemImage' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    expect(component).to.contain('Image')
  });

  it('shows twitter form', () => {
    let item = { editing: true, targetType: 'ItemTwitter' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    expect(component).to.contain('Twitter')
  });

  it('shows quote form', () => {
    let item = { editing: true, targetType: 'ItemQuote' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    expect(component).to.contain('Quote')
  });

  it('shows link form', () => {
    let item = { editing: true, targetType: 'ItemLink' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    expect(component).to.contain('SourceURL')
  });

  it('shows text form', () => {
    let item = { editing: true, targetType: 'ItemText' };
    props = { ...props, item };
    const component = renderComponent(PostItemForm, props, {});
    expect(component).to.contain('Text')
  });

});
    