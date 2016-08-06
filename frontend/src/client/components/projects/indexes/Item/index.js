import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TagList from 'shared/components/TagList/index';
import TextDisplay from 'shared/components/textEditors/Display/index';
import styles from './styles';

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  caption: PropTypes.string,
  sourceUrl: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  adminPath: PropTypes.string,
};


class Item extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  renderLink(sourceUrl) {
    if (sourceUrl) {
      return (
        <a href={sourceUrl} className={styles.button}>
          Fork on GitHub
        </a>
      );
    }
  }

  render() {
    let imageClassName;
    if (this.state.loading) {
      imageClassName = styles.imageLoading;
    } else {
      imageClassName = styles.imageLoaded;
    }
    return (
      <div className={styles.root}>
        <h3 className={styles.title}>{this.props.title} </h3>
        <TagList tags={this.props.tags} path={`${this.props.adminPath}/projects`} />
        <div className={styles.imageBlock}>
          <img
            className={imageClassName}
            onLoad={() => this.setState({ loading: false })}
            src={this.props.image}
            alt={this.props.title}
          />
          <span className={styles.caption}>{this.props.caption}</span>
        </div>
        <div className={styles.description}>
          <TextDisplay description={this.props.description} />
        </div>
        {this.renderLink(this.props.sourceUrl)}
      </div>
    );
  }

}

Item.propTypes = propTypes;

export default Item;
