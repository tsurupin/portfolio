import { renderComponent, expect, sinon } from '../../../../../helpers/utility';
import Form from 'cms/components/posts/forms/Item/Form/index';

describe('Form', () => {
  const handleDeleteItem = sinon.spy();

  let props = {
    sortRank: 1,
    handleDeleteItem: handleDeleteItem,
    handleMoveItem: sinon.spy(),
    handleUpdateItem: sinon.spy()
  };

  it('shows ItemForm', () => {
    let item = { editing: true, targetType: 'ItemHeading' };
    props = { ...props, item };
    const component = renderComponent(Form, props, {});
    component.find('button:eq(0)').simulate('click');
    expect(handleDeleteItem.calledOnce).to.be.true;

  });

  it('shows heading form', () => {
    let item = { editing: true, targetType: 'ItemHeading' };
    props = { ...props, item };
    const component = renderComponent(Form, props, {});
    expect(component).to.contain('Heading')
  });

  it('shows image form', () => {
    let item = { editing: true, targetType: 'ItemImage' };
    props = { ...props, item };
    const component = renderComponent(Form, props, {});
    expect(component).to.contain('Image')
  });

  it('shows twitter form', () => {
    let item = { editing: true, targetType: 'ItemTwitter' };
    props = { ...props, item };
    const component = renderComponent(Form, props, {});
    expect(component).to.contain('Twitter')
  });

  it('shows quote form', () => {
    let item = { editing: true, targetType: 'ItemQuote' };
    props = { ...props, item };
    const component = renderComponent(Form, props, {});
    expect(component).to.contain('Quote')
  });

  it('shows link form', () => {
    let item = { editing: true, targetType: 'ItemLink' };
    props = { ...props, item };
    const component = renderComponent(Form, props, {});
    expect(component).to.contain('SourceURL')
  });

  it('shows text form', () => {
    let item = { editing: true, targetType: 'ItemText' };
    props = { ...props, item };
    const component = renderComponent(Form, props, {});
    expect(component).to.contain('Text')
  });

});
    