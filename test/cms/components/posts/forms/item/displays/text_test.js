import { renderComponent, expect } from '../../../../../utility';
import Text from '../../../../../../../../src/cms/components/posts/forms/Item/Display/Text/index';

describe('ItemText', () => {

  let component;
  beforeEach(() => {
    const props = { style: 1, description: '{"entityMap":{},"blocks":[{"key":"f04i3","text":"hoge","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}' };
    component = renderComponent(Text, props, {});
  });

  it('show ItemText component', () => {
    expect(component).to.contain('hoge');
  });

});

