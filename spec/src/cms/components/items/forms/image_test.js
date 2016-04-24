import { renderComponent, expect } from '../../../test_helper';
import ItemFormImage from '../../../../../../src/cms/components/items/forms/image';

describe('ItemFormImage', () => {
  
    it('show error message when updating without image', () =>{
        const props = { type: 'ItemImage', submitButtonLabel: 'Create'};
        let component = renderComponent(ItemFormImage, props, {});
        component.find('.item-form__submit-button').simulate('click');
        expect(component.find('.item-form__error-message')).to.have.text('Please upload image');
    });
    // it('shows Create Button when item is new', () => {
    //     const props = { type: 'ItemHeading', isNew: true };
    //     component = renderComponent(ItemHeadingForm, props, {});
    //     expect(component.find('button')).to.have.text('Create');
    //     component.find('input[name=title]').simulate('change', 'hoge');
    //     expect(component.find('input[name=title]')).to.have.value('hoge')
    // });
    //
    // it('shows Update Button when item is persisted', () => {
    //     const props = { type: 'ItemHeading', isNew: false, initialValues: { title: 'hoge' } };
    //     component = renderComponent(ItemHeadingForm, props, {});
    //     expect(component.find('button')).to.have.text('Update');
    //     expect(component.find('input[name=title]')).to.have.value('hoge');
    // });
    //
});