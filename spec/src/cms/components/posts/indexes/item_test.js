const React = require('react');
const ReactDOM = require('react-dom');
import { $, expect, sinon } from '../../../utility';
import PostItem from '../../../../../../src/cms/components/posts/indexes/ItemRow/index';
const TestUtils = require('react-addons-test-utils');
describe("PostItem", () => {
  let post = { id: 1, title: 'title', description: 'description' };
  const handleDeletePost = sinon.spy();
  const handleTogglePost = sinon.spy();

  let props = {
    handleDeletePost,
    handleTogglePost
  };

  it('clicks toggle button and delete button', () => {
    post = { ...post, published: true };
    props = { ...props, post };
    const componentInstance = TestUtils.renderIntoDocument(
      <table><PostItem {...props} /></table>
    );
    const component = $(ReactDOM.findDOMNode(componentInstance));

    expect(component.find('tbody')).contain('title');
    expect(component.find('tbody')).contain('description');
    expect(component.find('button:nth-child(3)')).to.exist;
    component.find('button:nth-child(3)').simulate('click');
    expect(handleTogglePost.calledOnce).to.be.true;
    component.find('button:nth-child(4)').simulate('click');
    expect(handleDeletePost.calledOnce).to.be.true;
  });
  
});
