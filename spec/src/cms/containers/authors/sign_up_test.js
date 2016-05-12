import { renderComponent, expect, sinon } from '../../utility';
import SignUp from '../../../../.././src/cms/containers/authors/SignUp/index';

describe('SignUpForm', () => {
  const handleSubmit = sinon.spy();

  let props = {
    handleSubmit
  };
  
  // TODO: figure out how to test container.(so far, the parts of container are tested in rspec)

  // it('submits user account', () => {
  //   let item = { authenticated: false };
  //   props = { ...props, item };
  //   const component = renderComponent(SignUp, props, {});
  //   component.find('input[name=name]').simulate('click', 'hoge');
  //   component.find('input[name=email]').simulate('click', 'sample@gmail.com');
  //   component.find('input[name=password]').simulate('click', 'password');
  //   component.find('input[name=passwordConfirmation]').simulate('click', 'password');
  //   component.find('button').simulate('click');
  //   expect(handleSubmit.calledOnce).to.be.true;
  //
  // });

  // it('moves to Homde before mount', () => {
  //   let item = { authenticated: true };
  //   props = { ...props, item };
  //   const component = renderComponent(SignUp, props, {});
  //   //console.log(component)
  //   expect(component).not.to.contain('Sign Up')
  //
  // });
  //
});