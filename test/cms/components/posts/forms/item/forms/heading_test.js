// import React from 'react';
// import { renderComponent, expect, sinon } from '../../../../../../helpers/utility';
// import Heading from 'cms/components/posts/forms/Item/Form/Heading/index';
//
// import RaisedButton from 'material-ui/lib/raised-button';
// import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';
//
// describe('HeadingForm', () => {
//   const handleDeleteItem = sinon.spy();
//   const handleUpdateItem = sinon.spy();
//   let component;
//   let props = {
//     targetType: 'ItemHeading',
//     cancelButton: <RaisedButton
//       label="Cancel"
//       labelPosition="after"
//       icon={<ContentRemoveCircle />}
//       onClick={handleDeleteItem}
//     />,
//     handleUpdateItem: handleUpdateItem
//   };
//
//   it('shows Save Button when item is new', () => {
//     component = renderComponent(Heading, props, {});
//     expect(component.find('button:eq(1)')).to.have.text('Save');
//     component.find('input[name=title]').simulate('change', 'hoge');
//     expect(component.find('input[name=title]')).to.have.value('hoge')
//   });
//  
//  
//   it('updates item', () => {
//     props = {
//       ...props,
//       initialValues: { title: 'hoge' }
//     };
//     component = renderComponent(Heading, props, {});
//     component.find('button:eq(1)').simulate('click');
//     expect(handleUpdateItem.calledOnce).to.be.true;
//   });
//  
//   it('fails to update item', () => {
//     component = renderComponent(Heading, props, {});
//     component.find('button:eq(1)').simulate('click');
//     expect(handleUpdateItem.calledOnce).to.be.false;
//   
//   })
//  
// });