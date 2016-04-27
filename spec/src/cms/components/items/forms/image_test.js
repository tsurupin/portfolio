import { expect, sinon, renderComponent } from '../../../utility';
import ItemFormImage from '../../../../../../src/cms/components/items/forms/image';
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';
describe('ItemFormImage', () => {

  const handleDeleteItem = sinon.spy();
  const handleUpdateItem = sinon.spy();
  let props = {
    targetType: 'ItemImage',
    submitButtonLabel: 'Update',
    sortRank: 1,
    cancelButton: <RaisedButton
      className="item-form__cancel-button"
      label="Cancel"
      labelPosition="after"
      icon={<ContentRemoveCircle />}
      onClick={handleDeleteItem}
    />,
    handleUpdateItem: handleUpdateItem
  };

  it('shows error message when updating without image', () => {
    const component = renderComponent(ItemFormImage, props, {});
    component.find('.item-form__submit-button').simulate('click');
    expect(component.find('.item-form__error-message')).to.have.text('Please upload image');
  });

  it('uploads a image', () => {
    props = { ...props, image: 'http://www.digital-clarity.com/wp-content/uploads/2009/03/google-.png' }
    const component = renderComponent(ItemFormImage, props, {});
    component.find('.item-form__submit-button').simulate('click');
    expect(handleUpdateItem.calledOnce).to.be.true
  });

  
  // TODO: figure out how to test drop event with image file
  // it('drops a image', () => {
  //     const files = [{
  //         name: 'image.png',
  //         size: 1111
  //     }];
  //     const component = shallow(<ItemFormImage {...props} />);
  //     component.find('input[type="file"]').simulate('drop', { dataTransfer: { files } });
  //     expect(component.find('item-form__preview-image')).to.exist
  // });

});