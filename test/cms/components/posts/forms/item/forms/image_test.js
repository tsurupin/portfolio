import React from 'react';
import { renderComponent, expect, sinon } from '../../../../../utility';
import Image from '../../../../../../../../src/cms/components/posts/forms/Item/Form/Image/index';

import RaisedButton from 'material-ui/lib/raised-button';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';
describe('ImageForm', () => {

  const handleDeleteItem = sinon.spy();
  const handleUpdateItem = sinon.spy();
  let props = {
    targetType: 'ItemImage',
    sortRank: 1,
    cancelButton: <RaisedButton
      label="Cancel"
      labelPosition="after"
      icon={<ContentRemoveCircle />}
      onClick={handleDeleteItem}
    />,
    handleUpdateItem: handleUpdateItem
  };

  it('shows error message when updating without image', () => {
    const component = renderComponent(Image, props, {});
    component.find('button:eq(1)').simulate('click');
    expect(component).to.contain('Please upload image');
  });

  it('uploads a image', () => {
    props = { ...props, image: 'http://www.digital-clarity.com/wp-content/uploads/2009/03/google-.png' }
    const component = renderComponent(Image, props, {});
    component.find('button:eq(1)').simulate('click');
    expect(handleUpdateItem.calledOnce).to.be.true
  });

  
  // TODO: figure out how to test drop event with image file
  // it('drops a image', () => {
  //     const files = [{
  //         name: 'image.png',
  //         size: 1111
  //     }];
  //     const component = shallow(<Image {...props} />);
  //     component.find('input[type="file"]').simulate('drop', { dataTransfer: { files } });
  //     expect(component.find('item-form__preview-image')).to.exist
  // });

});