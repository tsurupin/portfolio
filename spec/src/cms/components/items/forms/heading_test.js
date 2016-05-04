import { renderComponent, expect, sinon } from '../../../utility';
import ItemHeadingForm from '../../../../../../src/cms/components/items/forms/heading';
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';

describe('ItemHeadingForm', () => {
  const handleDeleteItem = sinon.spy();
  const handleUpdateItem = sinon.spy();
  let component;
  let props = {
    targetType: 'ItemHeading',
    cancelButton: <RaisedButton
      className="item-form__cancel-button"
      label="Cancel"
      labelPosition="after"
      icon={<ContentRemoveCircle />}
      onClick={handleDeleteItem}
    />,
    handleUpdateItem: handleUpdateItem
  };

  it('shows Save Button when item is new', () => {
    component = renderComponent(ItemHeadingForm, props, {});
    expect(component.find('.item-form__submit-button')).to.have.text('Save');
    component.find('input[name=title]').simulate('change', 'hoge');
    expect(component.find('input[name=title]')).to.have.value('hoge')
  });
  
  
  it('updates item', () => {
    props = {
      ...props,
      initialValues: { title: 'hoge' }
    };
    component = renderComponent(ItemHeadingForm, props, {});
    component.find('.item-form__submit-button').simulate('click');
    expect(handleUpdateItem.calledOnce).to.be.true;
  });
  
  it('fails to update item', () => {
    component = renderComponent(ItemHeadingForm, props, {});
    component.find('.item-form__submit-button').simulate('click');
    expect(handleUpdateItem.calledOnce).to.be.false;
   
  })
  
});