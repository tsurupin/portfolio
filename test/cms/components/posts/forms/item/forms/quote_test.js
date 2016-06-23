// import React from 'react';
// import { renderComponent, expect, sinon } from '../../../../../../helpers/utility';
// import Quote from 'cms/components/posts/forms/Item/Form/Quote/index';
//
// import RaisedButton from 'material-ui/lib/raised-button';
// import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';
// describe('QuoteForm', () => {
//  
//   const handleDeleteItem = sinon.spy();
//   const handleUpdateItem = sinon.spy();
//   let props = {
//     targetType: 'ItemQuote',
//     cancelButton: <RaisedButton
//       label="Cancel"
//       labelPosition="after"
//       icon={<ContentRemoveCircle />}
//       onClick={handleDeleteItem}
//     />,
//     handleUpdateItem: handleUpdateItem
//   };
//
//
//   it('fails to update item', () => {
//     const component = renderComponent(Quote, props, {});
//     component.find('input[name=description]').simulate('change', 'hoge');
//     expect(component.find('input[name=description]')).to.have.value('hoge');
//     component.find('button:eq(1)').simulate('click');
//     expect(handleUpdateItem.calledOnce).to.be.false;
//   });
//  
//   it('updates item', () => {
//     const component = renderComponent(Quote, props, {});
//     component.find('input[name=description]').simulate('change', 'hoge');
//     component.find('input[name=sourceURL]').simulate('change', 'http://google.com');
//     expect(component.find('input[name=description]')).to.have.value('hoge');
//     expect(component.find('input[name=sourceURL]')).to.have.value('http://google.com');
//     component.find('button:eq(1)').simulate('click');
//     expect(handleUpdateItem.calledOnce).to.be.true;
//   });
//  
// });