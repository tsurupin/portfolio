import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TagList from 'sharedComponents/TagList/index';
import TextDisplay from 'sharedComponents/textEditors/Display/index';
import styles from './styles.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  sourceUrl: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function Item({ title, description, image, sourceUrl, tags }) {

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>{title} </h3>
      <TagList tags={tags} path="projects" />
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt={title} />
        <span className={styles.caption}>Card Subtitle</span>
      </div>
      {renderText(description)}
      <Link to={sourceUrl} className={styles.button}>
        Fork on GitHub
      </Link>
    </div>
    )
  
};


function renderText(description) {
  if (description) {
    return (
      <div className={styles.description}>
        <TextDisplay description={description} />
      </div>
    )
  }
}
Item.propTypes = propTypes;

export default Item;
