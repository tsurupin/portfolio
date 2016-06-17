import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TagList from 'sharedComponents/TagList/index';
import TextDisplay from 'sharedComponents/textEditors/Display/index';
import styles from './styles.scss';

const propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    publishedAt: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
};

class Item extends Component {

  constructor(props) {
    super(props);
  }

  renderText() {
    if (this.props.project.description) {
      return (
        <div className={styles.description}>
          <TextDisplay description={this.props.project.description}/>
        </div>
      )
    }
  }


  render() {
    return (
    <div className={styles.root}>
      <h3 className={styles.title}>{this.props.project.title} </h3>
      <TagList tags={this.props.project.tags} path="projects" />
      <div className={styles.imageContainer}>
        <img className={styles.image} src={this.props.project.image} alt={this.props.project.title} />
        <span className={styles.caption}>Card Subtitle</span>
      </div>
      {this.renderText()}
      <Link to={this.props.project.sourceUrl} className={styles.button}>
        Fork on GitHub
      </Link>
    </div>
    )
  }
};

Item.propTypes = propTypes;

export default Item;
