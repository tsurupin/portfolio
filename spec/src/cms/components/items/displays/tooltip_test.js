import React from 'react';
import { renderComponent, expect, sinon } from '../../../test_helper';
import Tooltip from '../../../../../../src/cms/components/items/displays/tooltip';

describe('Tooltip', () => {
    
    const handleUpdateItem = sinon.spy();
    const handleMoveItem   = sinon.spy();
    const handleDeleteItem = sinon.spy(); 
    
    let props = {
        totalCount: 1,
        editButton: <li className="item-tooltip__move-button" onClick={handleUpdateItem}>Edit</li>,
        handleMoveItem,
        handleDeleteItem
    };
    
    it('does not show moveUp button and moveTop button', () => {
        props = {...props, sortRank: 0 };
        const component = renderComponent(Tooltip, props, {});

        expect(component.find('li')).not.to.have.class('item-tooltip__move-button--top');
        expect(component.find('li')).not.to.have.class('item-tooltip__move-button--up');
        expect(component.find('li')).to.have.class('item-tooltip__move-button--down');
        expect(component.find('li')).to.have.class('item-tooltip__move-button--bottom');
    });



    it('clicks delete button', () => {
        props = {...props, sortRank: 1 };
        const component = renderComponent(Tooltip, props, {});
        component.find('.item-tooltip__delete-button').simulate('click');
        expect(handleDeleteItem.calledOnce).to.be.true;
    });

    it('clicks move buttons', () => {
        props = {...props, sortRank: 1 };
        const component = renderComponent(Tooltip, props, {});
        component.find('.item-tooltip__move-button').simulate('click');
        expect(handleMoveItem.calledOnce).to.be.true;
    });
  
});