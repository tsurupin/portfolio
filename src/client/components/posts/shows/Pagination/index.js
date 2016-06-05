import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import styles from './styles.scss';

const inlineStyles = {
  prevIcon: {
    width: '15%',
    display: 'inline-block'
  },
  nextIcon: {
    width: '15%',
    display: 'inline-block'
  }
};

class Pagination extends Component {
  constructor(props) {
    super(props)
  }

  renderPrev() {
    if (!this.props.prevId) { return; }
    return(
      <Link to={`/posts/${this.props.prevId}`} className={styles.prevBox}>
        {this.props.prevTitle}
      </Link>
    )
  }

  renderNext() {
    if (!this.props.nextId) { return; }
    return(
      <Link to={`/posts/${this.props.nextId}`} className={styles.nextBox}>
        {this.props.nextTitle}
      </Link>
    )
  }

  render() {
    return(
      <section className={styles.root}>
        {this.renderPrev()}
        {this.renderNext()}
      </section>
    );
  }
}

Pagination.propTypes = {
  prevId: PropTypes.number,
  prevTitle: PropTypes.string,
  nextId: PropTypes.number,
  nextTitle: PropTypes.string
};

export default Pagination;