import { renderComponent, expect } from '../../../../../../helpers/utility';
import Text from 'shared/components/posts/Text/index';

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

