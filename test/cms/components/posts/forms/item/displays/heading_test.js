import { renderComponent, expect } from '../../../../../utility';
import Heading from '../../../../../../../../src/cms/components/posts/forms/Item/Display/Heading/index';

describe('Heading', () => {

  it('show ItemHeading component', () => {
    const props = { targetType: 'ItemHeading', title: 'hoge' };
    const component = renderComponent(Heading, props, {});
    expect(component.find('h2')).to.contain('hoge');
  });

  it('show ItemSubHeading component', () => {
    const props = { targetType: 'ItemSubHeading', title: 'hoge' };
    const component = renderComponent(Heading, props, {});
    expect(component.find('h3')).to.contain('hoge');
  });

});

