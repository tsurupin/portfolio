import React from 'react';
import styles from './styles';

const NotFound = () => (
  <section className={styles.root}>
    <h1 className={styles.title}>Sorry, but this page does not exist.</h1>
    <p className={styles.text}>you may have mistyped the address or the page may have moved.</p>
  </section>
);


export default NotFound;
