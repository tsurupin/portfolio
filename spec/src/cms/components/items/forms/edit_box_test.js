import React from 'react';
import { renderComponent, expect, sinon } from '../../../test_helper';
import EditBox from '../../../../../../src/cms/components/items/forms/edit_box';

describe('EditBox', () => {

    let component;
    
    beforeEach(() => {
        component = renderComponent(EditBox, null, {});
    });

    it('shows 7 edit box items', () => {
        expect(component.find('li').length).to.equal(7);
    });

});