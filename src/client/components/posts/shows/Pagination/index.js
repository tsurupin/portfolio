import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import styles from './styles.scss';

const propTypes = {
  prevId: PropTypes.number,
  prevTitle: PropTypes.string,
  nextId: PropTypes.number,
  nextTitle: PropTypes.string
};

const inlineStyles = {
  prevIcon: {
    width: '15%',
    display: 'inline-block',
    height: '40px',
    margin: 'auto 0',
    verticalAlign: 'middle'
  },
  nextIcon: {
    width: '15%',
    display: 'inline-block',
    height: '40px',
    margin: 'auto 0',
    verticalAlign: 'middle'
  }
};

class Pagination extends Component {
  constructor(props) {
    super(props)
  }

  renderPrev() {
    if (!this.props.prevId) { return <span className={styles.prevBox} />;  }
    return(
      <Link to={`${this.props.adminPath}/posts/${this.props.prevId}`} className={styles.prevBox}>
        <NavigationChevronLeft color='#8F8F8F' style={inlineStyles.prevIcon} />
        <div className={styles.prevTitle}>{this.props.prevTitle}</div>
      </Link>
    )
  }

  renderNext() {
    if (!this.props.nextId) { return <span className={styles.nextBox} /> }
    return(
      <Link to={`${this.props.adminPath}/posts/${this.props.nextId}`} className={styles.nextBox}>
        <div className={styles.nextTitle}>{this.props.nextTitle}</div>
        <NavigationChevronRight color='#8F8F8F' style={inlineStyles.nextIcon} />
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

Pagination.propTypes = propTypes;

export default Pagination;