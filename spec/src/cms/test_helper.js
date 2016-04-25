import jsdom from 'jsdom';
import _$ from 'jquery';
global.document = jsdom.jsdom('<html><body></body></html>');
global.window = global.document.defaultView;
const Chrome49 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36';
const $ = _$(global.window);
global.navigator = { userAgent: Chrome49 };

require('fbjs/lib/ExecutionEnvironment').canUseDOM = true;

const ReactDOM = require('react-dom');
const React = require('react');
const TestUtils = require('react-addons-test-utils');

import chai, { expect } from 'chai';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../../src/cms/reducers';
import chaiJquery from 'chai-jquery';
import sinon from 'sinon';

function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass { ...props } />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance));
}

$.fn.simulate = function (eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

chaiJquery(chai, chai.util, $);


export { renderComponent, $, expect, sinon };
