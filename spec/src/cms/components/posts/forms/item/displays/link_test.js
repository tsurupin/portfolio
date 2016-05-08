import { renderComponent, expect } from '../../../../../utility';
import Link from '../../../../../../../../src/cms/components/posts/forms/Item/Display/Link/index';

describe('ItemLink', () => {

  let component;
  beforeEach(() => {
    const props = { sourceURL: 'http://google.com', sourceTitle: 'hoge' };
    component = renderComponent(Link, props, {});
  });

  it('show ItemLink component', () => {
    expect(component).to.contain('hoge');
  });

});

