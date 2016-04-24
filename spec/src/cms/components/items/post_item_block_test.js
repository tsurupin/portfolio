import { renderComponent, expect, sinon } from '../../test_helper';
import PostItemBlock from '../../../../../src/cms/components/items/post_item_block';

describe('PostItemBlock', () => {
    let props = {
        sortRank: 1,
        totalCount: 1,
        handleDeleteItem: sinon.spy(),
        handleMoveItem: sinon.spy(),
        handleUpdateItem: sinon.spy()
    };
    it('shows postItemForm', () => {
        let item = { editing: true, type: 'ItemHeading' };
        props = { ...props, item };
        const component = renderComponent(PostItemBlock, props, {});
        expect(component.find('.item-form-component')).to.exist
        expect(component.find('.post-item-cell')).not.to.exist
    });
    
    it('shows postItemCell', () => {
        let item = { editing: false };
        props = { ...props, item };
        const component = renderComponent(PostItemBlock, props, {});
        expect(component.find('.item-form-component')).not.to.exist
        expect(component.find('.post-item-cell')).to.exist
    });
    
});
    