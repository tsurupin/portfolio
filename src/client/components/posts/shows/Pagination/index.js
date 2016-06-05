import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import styles from './styles.scss';

class Pagination extends Component {
  constructor(props) {
    super(props)
  }

  renderPrev() {
    if (!this.props.prevId) { return; }
    return(
      <Link to={`/posts/${this.props.prevId}`}>
        <FlatButton
          label={this.props.prevTitle}
          labelPosition="after"
          labelStyle={styles.label}
          icon={<NavigationChevronLeft style={styles.iconStyle} />}
        />
      </Link>
    )
  }

  renderNext() {
    if (!this.props.nextId) { return; }
    return(
      <Link to={`/posts/${this.props.nextId}`}>
        <FlatButton
          label={this.props.nextTitle}
          labelPosition="before"
          labelStyle={styles.label}
          icon={<NavigationChevronRight style={styles.iconStyle} />}
        />
      </Link>
    )
  }

  render() {
    return(
      <div className={styles.root}>
        {this.renderPrev()}
        {this.renderNext()}
      </div>
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