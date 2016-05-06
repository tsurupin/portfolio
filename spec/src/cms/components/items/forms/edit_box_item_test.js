const React = require('react');
import { renderComponent, expect, sinon } from '../../../utility';
import EditBoxItem from '../../../../../../src/cms/components/items/Form/edit_box_item';

describe('EditBoxItem', () => {

  let component;
  const handleAddItem = sinon.spy();
  beforeEach(() => {
    const props = {
      image: 'image',
      name: "name",
      handleAddItem
    };
    component = renderComponent(EditBoxItem, props, {});
  });

  it('clicks', () => {
    component.find('.item-edit-box-item__button').simulate('click');
    expect(handleAddItem.calledOnce).to.be.true
  });

});