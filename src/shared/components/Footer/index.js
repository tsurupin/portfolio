import React, { Component, PropTypes } from 'react'
import config from 'shared/config';
import icon from './gitHubIcon.png';
import styles from './styles';


export function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.text}>
        <span>{`© 2016 ${config.authorName}`}</span>
        <a href={config.githubUrl}>
          <img className={styles.githubIcon} src={icon} />
        </a>
      </div>
    </footer>
  )
};
