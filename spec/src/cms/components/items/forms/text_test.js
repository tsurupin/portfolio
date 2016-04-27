import { renderComponent, expect, sinon } from '../../../utility';
import ItemTextForm from '../../../../../../src/cms/components/items/forms/text';
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';

describe('ItemTextForm', () => {
  
  const handleDeleteItem = sinon.spy();
  const handleUpdateItem = sinon.spy();
  let props = {
    type: 'ItemText',
    submitButtonLabel: 'Update',
    cancelButton: <RaisedButton
      className="item-form__cancel-button"
      label="Cancel"
      labelPosition="after"
      icon={<ContentRemoveCircle />}
      onClick={handleDeleteItem}
    />,
    handleUpdateItem: handleUpdateItem
  };


  it('fails to update item', () => {
    const component = renderComponent(ItemTextForm, props, {});
    component.find('.item-form__submit-button').simulate('click');
    expect(handleUpdateItem.calledOnce).to.be.false;
  });
  
  it('updates item', () => {
    const component = renderComponent(ItemTextForm, props, {});
    component.find('input[name=description]').simulate('change', 'hoge');
    expect(component.find('input[name=description]')).to.have.value('hoge');
    component.find('.item-form__submit-button').simulate('click');
    expect(handleUpdateItem.calledOnce).to.be.true;
  });
  
});