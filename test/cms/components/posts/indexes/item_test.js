const React = require('react');

import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import PostItem from 'cms/components/posts/indexes/Item/index';
import styles from 'cms/components/posts/indexes/Item/styles';

describe("PostItem", () => {

  const handleToggle = sinon.spy();

  const props = {
    handleToggle,
    id: 1,
    title: 'title',
    sortRank: 1,
    accepted: false,
    status: 0
  };

  it("contains spec with an expectation", function() {
    expect(mount(<PostItem {...props } />).find('button').length).to.equal(1);
  });
  //let post = { id: 1, title: 'title', description: 'description' };


  // let props = {
  //   handleDeletePost,
  //   handleTogglePost
  // };

  // it('clicks toggle button and delete button', () => {
  //   const props = { handleToggle, id: 1, title: 'title', sortRank: 1, accepted: false, status: 0 }
  //   const wrapper = shallow(<PostItem {...props } />);
  //   const toggleButton = wrapper.find(`.${styles.toggleButton}`).debug()
  //   console.log(wrapper)
  //   console.log(toggleButton)
  //   toggleButton.simulate('click');
  //   expect(handleToggle.calledOnce).to.be.true;
  //
  //   //expect(shallow(<App />).contains(<div className={styles.root} />)).to.equal(true);
  //   // const componentInstance = TestUtils.renderIntoDocument(
  //   //   <table><PostItem {...props} /></table>
  //   // );
  //   // const component = $(ReactDOM.findDOMNode(componentInstance));
  //   //
  //   // expect(component.find('tbody')).contain('title');
  //   // expect(component.find('button:nth-child(3)')).to.exist;
  //   // component.find('button:nth-child(3)').simulate('click');
  //   // expect(handleTogglePost.calledOnce).to.be.true;
  //   // component.find('button:nth-child(4)').simulate('click');
  //   // expect(handleDeletePost.calledOnce).to.be.true;
  // });
  
});
