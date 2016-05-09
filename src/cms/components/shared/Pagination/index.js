import React, { Component, PropTypes } from 'react';
import ChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/lib/icon-button';
import styles from './styles.scss';

class Pagination extends Component {

  constructor(props) {
    super(...props);
  }
  
  render() {
    const { total, limit, page } = this.props;

    return (
      <div className={styles.root}>
        <IconButton 
          disabled={page === 1} 
          onClick={this.props.onPageClick.bind(null, page-1)}>
          <ChevronLeft/>
        </IconButton>
        <IconButton 
          disabled={page*limit >= total}
          onClick={this.props.onPageClick.bind(null, page+1)}>
          <ChevronRight/>
        </IconButton>
        <div className={styles.text}>
          {`${Math.min(((page-1)*limit)+1, total)} - ${Math.min((page*limit), total)} of ${total}`}
        </div>
      </div>
    );
  }

}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired, 
  limit: PropTypes.number.isRequired, 
  onPageClick: PropTypes.func.isRequired
};

export default Pagination;