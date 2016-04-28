import { renderComponent, expect, sinon } from '../../../utility';
import ItemTwitterForm from '../../../../../../src/cms/components/items/forms/twitter';
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';

describe('ItemTwitterForm', () => {

  const handleDeleteItem = sinon.spy();
  const handleUpdateItem = sinon.spy();
  let props = {
    targetType: 'ItemTwitter',
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
    const component = renderComponent(ItemTwitterForm, props, {});
    component.find('input[name=sourceURL]').simulate('change', 'hoge');
    component.find('.item-form__submit-button').simulate('click');
    expect(handleUpdateItem.calledOnce).to.be.false;
  });

  // TODO: figure out how to test aynchronous validation
  // it('updates item', () => {
  //   const component = renderComponent(ItemTwitterForm, props, {});
  //   component.find('input[name=sourceURL]').simulate('change', 'https://twitter.com/appmarkelabo/status/717272847383564288');
  //   expect(component.find('input[name=sourceURL]')).to.have.value('https://twitter.com/appmarkelabo/status/717272847383564288');
  //   component.find('.item-form__submit-button').simulate('click');
  //   expect(handleUpdateItem.calledOnce).to.be.true;
  // });

});