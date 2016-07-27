import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from 'cms/containers/App/index';
import styles from 'cms/containers/App/styles.scss';

describe('App', () => {
  it('contains spec with an expectation', () => {
    expect(shallow(<App />).contains(<div className={styles.root} />)).to.equal(true);
  });
});

