import React from 'react';
import { renderComponent, expect, sinon } from '../../../../../utility';
import Text from '../../../../../../../../src/cms/components/posts/forms/Item/Form/Text/index';

import RaisedButton from 'material-ui/lib/raised-button';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';
describe('TextForm', () => {
  
  const handleDeleteItem = sinon.spy();
  const handleUpdateItem = sinon.spy();
  let props = {
    targetType: 'ItemText',
    cancelButton: <RaisedButton
      label="Cancel"
      labelPosition="after"
      icon={<ContentRemoveCircle />}
      onClick={handleDeleteItem}
    />,
    handleUpdateItem: handleUpdateItem
  };


  it('fails to update item', () => {
    const component = renderComponent(Text, props, {});
    component.find('button:eq(1)').simulate('click');
    expect(handleUpdateItem.calledOnce).to.be.false;
  });
  
  //TODO: figure out how to input text in rich editor
  // it('updates item', () => {
  //   const component = renderComponent(Text, props, {});
  //   component.find('input[name=description]').simulate('change', 'hoge');
  //   expect(component.find('input[name=description]')).to.have.value('hoge');
  //   component.find('button:eq(1)').simulate('click');
  //   expect(handleUpdateItem.calledOnce).to.be.true;
  // });
  
});