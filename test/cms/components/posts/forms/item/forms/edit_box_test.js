import { renderComponent, expect, sinon } from '../../../../../../helpers/utility';
import EditBox from 'cms/components/posts/forms/Item/Form/EditBox/index';

describe('EditBox', () => {

  let component;

  beforeEach(() => {
    component = renderComponent(EditBox, null, {});
  });

  it('shows 7 edit box items', () => {
    expect(component.find('li').length).to.equal(7);
  });

});