import { renderComponent, expect, sinon } from '../../../../../helpers/utility';
import Display from 'cms/components/posts/forms/Item/Display/index';

describe('Display', () => {

  let props = {
    sortRank: 1,
    totalCount: 1,
    handleDeleteItem: sinon.spy(),
    handleMoveItem: sinon.spy(),
    handleUpdateItem: sinon.spy()
  };

  it('shows tooltip', () => {
    let item = { editing: false, targetType: 'ItemHeading' };
    props = { ...props, item };
    const component = renderComponent(Display, props, {});
    expect(component.find('button')).to.exist;
  });

  it('shows Hading component', () => {
    let item = { editing: false, targetType: 'ItemHeading' };
    props = { ...props, item };
    const component = renderComponent(Display, props, {});
    expect(component.find('h2')).to.exist;
  });

  it('shows SubHeading component', () => {
    let item = { editing: false, targetType: 'ItemSubHeading' };
    props = { ...props, item };
    const component = renderComponent(Display, props, {});
    expect(component.find('h3')).to.exist;

  });

  it('shows Image component', () => {
    let item = { editing: false, targetType: 'ItemImage', image: 'http://www.digital-clarity.com/wp-content/uploads/2009/03/google-.png' };
    props = { ...props, item };
    const component = renderComponent(Display, props, {});
    expect(component.find('img')).to.exist;
  });

  it('shows Twitter component', () => {
    let item = { editing: false, targetType: 'ItemTwitter' };
    props = { ...props, item };
    const component = renderComponent(Display, props, {});
    expect(component.find('blockquote a')).to.exist;
  });

  it('shows Quote component', () => {
    let item = { editing: false, targetType: 'ItemQuote', sourceURL: 'https://google.com', description: 'hoge' };
    props = { ...props, item };
    const component = renderComponent(Display, props, {});
    expect(component.find('a blockquote p')).to.exist;
  });

  it('shows Link component', () => {
    let item = { editing: false, targetType: 'ItemLink', sourceURL: 'https://google.com', sourceTitle: 'google' };
    props = { ...props, item };
    const component = renderComponent(Display, props, {});
    expect(component.find('div a')).to.exist;
  });


  it('shows Text component', () => {
    const item = {
      editing: false,
      targetType: 'ItemText',
      description: '{"entityMap":{},"blocks":[{"key":"f04i3","text":"hoge","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}',
    };
    props = { ...props, item };
    const component = renderComponent(Display, props, {});
    expect(component).contain('hoge')
  });


  // TODO: test mouseEnter/Leave event

});
