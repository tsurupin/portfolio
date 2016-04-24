import React from 'react';
import ReactDOM from 'react-dom';
import { $, expect, sinon } from '../../test_helper';
import PostItem from '../../../../../src/cms/components/posts/item';
import TestUtils from 'react-addons-test-utils';
describe("PostItem", () => {
    let post = { id:1, title: 'title', description: 'description' };
    const handleDeletePost = sinon.spy();
    const handleTogglePost = sinon.spy();
    
    let props = {
        handleDeletePost,
        handleTogglePost
    };
    
    it('show action visibility icon', () => {
        post = {...post, published: true };
        props = { ...props, post };
        const componentInstance = TestUtils.renderIntoDocument(
            <table><PostItem {...props} /></table>
        );
        const component = $(ReactDOM.findDOMNode(componentInstance));
        
        expect(component.find('tbody')).contain('title');
        expect(component.find('tbody')).contain('description');
        expect(component.find('.post-item__visible-icon')).to.exist;
        expect(component.find('.post-item__invisible-icon')).not.to.exist;
        component.find('.post-item__toggle-button').simulate('click');
        expect(handleTogglePost.calledOnce).to.be.true;
        component.find('.post-item__delete-button').simulate('click');
        expect(handleDeletePost.calledOnce).to.be.true;
    })

    it('show action visibilityOff icon', () => {
        post = {...post, published: false };
        props = { ...props, post };
        const componentInstance = TestUtils.renderIntoDocument(
            <table><PostItem {...props} /></table>
        );
        const component = $(ReactDOM.findDOMNode(componentInstance));

        expect(component.find('.post-item__visible-icon')).not.to.exist;
        expect(component.find('.post-item__invisible-icon')).to.exist;
     
    })
    
});
