import React from 'react';
import config from 'shared/config';
import icon from './gitHubIcon.png';
import styles from './styles';


export default function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.text}>
        <span>{`© 2016 ${config.authorName}`}</span>
        <a href={config.gitHubUrl}>
          <img
            className={styles.gitHubIcon}
            src={icon}
            role="presentation"
          />
        </a>
      </div>
    </footer>
  );
}
