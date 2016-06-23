import { renderComponent, expect, sinon } from '../../../../../helpers/utility';
import Item from 'cms/components/posts/forms/Item/index';

describe('Item', () => {
  let props = {
    sortRank: 1,
    totalCount: 1,
    handleDeleteItem: sinon.spy(),
    handleMoveItem: sinon.spy(),
    handleUpdateItem: sinon.spy()
  };
  it('shows postItemForm', () => {
    let item = { editing: true, targetType: 'ItemHeading' };
    props = { ...props, item };
    const component = renderComponent(Item, props, {});
    expect(component).to.contain('Save');
  });

  it('shows postItemCell', () => {
    let item = { editing: false, targetType: 'ItemHeading', title: 'hoge' };
    props = { ...props, item };
    const component = renderComponent(Item, props, {});
    expect(component).not.to.contain('Save');
    expect(component).to.contain("hoge");
  });
});
    