import React, { Component, PropTypes } from 'react'
import styles from './styles.scss';


export function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.text}>
        <span>© 2016 Tomoaki Tsuruta</span>
        <a href="https://github.com/tsurupin">
          <img className={styles.githubIcon} src="images/githubIcon.png" />
        </a>
      </div>
    </footer>
  )
};
