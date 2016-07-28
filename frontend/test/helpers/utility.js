const ReactDOM = require('react-dom');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from 'cms/reducers';
import { expect } from 'chai';
import sinon from 'sinon';
import _$ from 'jquery';
const $ = _$(global.window);

function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance));
}

export { renderComponent, $, expect, sinon };
