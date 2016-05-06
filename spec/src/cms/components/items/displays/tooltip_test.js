const React = require('react');
import { renderComponent, expect, sinon } from '../../../utility';
import Tooltip from '../../../../../../src/cms/components/items/Display/tooltip';
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

describe('Tooltip', () => {

  const handleUpdateItem = sinon.spy();
  const handleMoveItem = sinon.spy();
  const handleDeleteItem = sinon.spy();

  let props = {
    totalCount: 1,
    handleMoveItem,
    handleUpdateItem,
    handleDeleteItem
  };

  // TODO: figure out how to test touchTap event on the material-ui component
  // it('does not show moveUp button and moveTop button', () => {
  //   props = { ...props, sortRank: 0 };
  //   const component = renderComponent(Tooltip, props, {});
  //
  //   component.find('.item-tooltip__menu').simulate('touchTap');
  //   console.log(component.find('.item-tooltip__button--down'));
  //   expect(component.find('.item-tooltip__menu')).not.to.have.class('item-tooltip__button--top');
  //   expect(component.find('.item-tooltip__menu')).not.to.have.class('item-tooltip__button--up');
  //   expect(component.find('.item-tooltip__menu')).to.have.class('item-tooltip__button--down');
  //   expect(component.find('.item-tooltip__menu')).to.have.class('item-tooltip__button--bottom');
  // });
  //
  //
  // it('clicks delete button', () => {
  //   props = { ...props, sortRank: 1 };
  //   const component = renderComponent(Tooltip, props, {});
  //   component.find('.item-tooltip__button--delete').simulate('click');
  //   expect(handleDeleteItem.calledOnce).to.be.true;
  // });
  //
  // it('clicks move buttons', () => {
  //   props = { ...props, sortRank: 1 };
  //   const component = renderComponent(Tooltip, props, {});
  //   component.find('.item-tooltip__button--top').simulate('click');
  //   expect(handleMoveItem.calledOnce).to.be.true;
  // });

});