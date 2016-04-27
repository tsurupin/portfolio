import { renderComponent, expect, sinon } from '../../../utility';
import ItemLinkForm from '../../../../../../src/cms/components/items/forms/link';
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';

describe('ItemLinkForm', () => {
  
  const handleDeleteItem = sinon.spy();
  const handleUpdateItem = sinon.spy();
  let props = {
    type: 'ItemLink',
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
    const component = renderComponent(ItemLinkForm, props, {});
    component.find('input[name=sourceURL]').simulate('change', 'hoge');
    component.find('input[name=sourceTitle]').simulate('change', 'hoge');
    component.find('.item-form__submit-button').simulate('click');
    expect(handleUpdateItem.calledOnce).to.be.false;
  });
  
  it('updates item', () => {
    const component = renderComponent(ItemLinkForm, props, {});
    component.find('input[name=sourceTitle]').simulate('change', 'hoge');
    component.find('input[name=sourceURL]').simulate('change', 'http://google.com');
    expect(component.find('input[name=sourceTitle]')).to.have.value('hoge');
    expect(component.find('input[name=sourceURL]')).to.have.value('http://google.com');
    component.find('.item-form__submit-button').simulate('click');
    expect(handleUpdateItem.calledOnce).to.be.true;
  });
  
});