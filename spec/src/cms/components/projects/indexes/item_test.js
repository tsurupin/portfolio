const React = require('react');
const ReactDOM = require('react-dom');
import { $, expect, sinon } from '../../../utility';
import ProjectItem from '../../../../../../src/cms/components/projects/indexes/Item/index';
const TestUtils = require('react-addons-test-utils');
describe("ProjectItem", () => {
  let project = { id: 1, title: 'title', description: 'description' };
  const handleEdit = sinon.spy();
  const handleToggle = sinon.spy();

  let props = {
    tags: [],
    handleEdit,
    handleToggle
  };

  it('clicks toggle button and delete button', () => {
    project = { ...project, published: true };
    props = { ...props, project };
    const componentInstance = TestUtils.renderIntoDocument(
      <table><ProjectItem {...props} /></table>
    );
    const component = $(ReactDOM.findDOMNode(componentInstance));

    expect(component.find('tbody')).contain('title');
    expect(component.find('button:nth-child(3)')).to.exist;
    component.find('button:nth-child(3)').simulate('click');
    expect(handleEdit.calledOnce).to.be.true;
    component.find('button:nth-child(4)').simulate('click');
    expect(handleToggle.calledOnce).to.be.true;
   
  });

});
