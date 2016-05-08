import React from 'react';
import { renderComponent, expect, sinon } from '../../../../../utility';
import Link from '../../../../../../../../src/cms/components/posts/forms/Item/Form/Link/index';

import RaisedButton from 'material-ui/lib/raised-button';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';
describe('LinkForm', () => {
  
  const handleDeleteItem = sinon.spy();
  const handleUpdateItem = sinon.spy();
  let props = {
    targetType: 'ItemLink',
    cancelButton: <RaisedButton
      label="Cancel"
      labelPosition="after"
      icon={<ContentRemoveCircle />}
      onClick={handleDeleteItem}
    />,
    handleUpdateItem: handleUpdateItem
  };


  it('fails to update item', () => {
    const component = renderComponent(Link, props, {});
    component.find('input[name=sourceURL]').simulate('change', 'hoge');
    component.find('input[name=sourceTitle]').simulate('change', 'hoge');
    component.find('button').simulate('click');
    expect(handleUpdateItem.calledOnce).to.be.false;
  });
  
  it('updates item', () => {
    const component = renderComponent(Link, props, {});
    component.find('input[name=sourceTitle]').simulate('change', 'hoge');
    component.find('input[name=sourceURL]').simulate('change', 'http://google.com');
    expect(component.find('input[name=sourceTitle]')).to.have.value('hoge');
    expect(component.find('input[name=sourceURL]')).to.have.value('http://google.com');
    component.find('button').last().simulate('click');
    expect(handleUpdateItem.calledOnce).to.be.true;
  });
  
});