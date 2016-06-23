import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TagList from 'shared/components/TagList/index';
import TextDisplay from 'shared/components/textEditors/Display/index';
import styles from './styles.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function renderLink(sourceUrl) {
  if (sourceUrl) {
    return (
      <Link to={sourceUrl} className={styles.button}>
        Fork on GitHub
      </Link>
    );
  }
}

function renderText(description) {
  if (description) {
    return (
      <div className={styles.description}>
        <TextDisplay description={description} />
      </div>
    )
  }
}

function Item({ title, description, image, caption, sourceUrl, tags }) {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>{title} </h3>
      <TagList tags={tags} path="projects" />
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt={title} />
        <span className={styles.caption}>{caption}</span>
      </div>
      {renderText(description)}
      {renderLink(sourceUrl)}
    </div>
  )
}

Item.propTypes = propTypes;

export default Item;
