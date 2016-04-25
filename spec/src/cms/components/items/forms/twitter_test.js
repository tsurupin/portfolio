import { renderComponent, expect, sinon } from '../../../test_helper';
import ItemFormTwitter from '../../../../../../src/cms/components/items/forms/twitter';
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../../../../../src/cms/reducers'
describe('ItemFormTwitter', () => {

  const handleDeleteItem = sinon.spy();
  const handleUpdateItem = sinon.spy();
  let props = {
    type: 'ItemTwitter',
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

  // handleUpdateItemit('shows error message when updating item with wrong url', () => {
  //   const component = shallow(
  //     <Provider store={createStore(reducers, {})}>
  //       <ItemFormTwitter {...props} />);
  //     </Provider>
  //   );
  //   console.log(component.debug());
  //   //console.log(component.find('input[name="sourceURL"]').debug());
  //   component.find('input[name="sourceURL"]').simulate('change', 'hoge');
  //   expect(component.find('.item-form')).to.have.text('URL is not valid');
  // });
  //
  // it('uploads a image', () => {
  //   props = { ...props, image: 'http://www.digital-clarity.com/wp-content/uploads/2009/03/google-.png' }
  //   const component = shallow(<ItemFormImage {...props} />);
  //   component.find('.item-form__submit-button').simulate('click');
  //   expect(handleUpdateItem.calledOnce).to.be.true
  // });

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