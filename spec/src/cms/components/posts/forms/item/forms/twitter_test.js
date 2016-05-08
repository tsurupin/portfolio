import React from 'react';
import { renderComponent, expect, sinon } from '../../../../../utility';
import Twitter from '../../../../../../../../src/cms/components/posts/forms/Item/Form/Twitter/index';

import RaisedButton from 'material-ui/lib/raised-button';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';

describe('TwitterForm', () => {

  const handleDeleteItem = sinon.spy();
  const handleUpdateItem = sinon.spy();
  let props = {
    targetType: 'ItemTwitter',
    cancelButton: <RaisedButton
      label="Cancel"
      labelPosition="after"
      icon={<ContentRemoveCircle />}
      onClick={handleDeleteItem}
    />,
    handleUpdateItem: handleUpdateItem
  };


  it('fails to update item', () => {
    const component = renderComponent(Twitter, props, {});
    component.find('input[name=sourceURL]').simulate('change', 'hoge');
    component.find('button:eq(1)').simulate('click');
    expect(handleUpdateItem.calledOnce).to.be.false;
  });

  // TODO: figure out how to test aynchronous validation
  // it('updates item', () => {
  //   const component = renderComponent(Twitter, props, {});
  //   component.find('input[name=sourceURL]').simulate('change', 'https://twitter.com/appmarkelabo/status/717272847383564288');
  //   expect(component.find('input[name=sourceURL]')).to.have.value('https://twitter.com/appmarkelabo/status/717272847383564288');
  //   component.find('.item-form__submit-button').simulate('click');
  //   expect(handleUpdateItem.calledOnce).to.be.true;
  // });

});