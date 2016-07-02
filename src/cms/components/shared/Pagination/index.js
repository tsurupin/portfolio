import React, { PropTypes } from 'react';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';
import styles from './styles';

const propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
};

function Pagination({ total, limit, page, handlePageClick }) {
  return (
    <div className={styles.root}>
      <IconButton
        disabled={page === 1}
        disableTouchRipple={true}
        onClick={handlePageClick.bind(null, page - 1)}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        disabled={page * limit >= total}
        disableTouchRipple={true}
        onClick={handlePageClick.bind(null, page + 1)}
      >
        <ChevronRight />
      </IconButton>
      <div className={styles.text}>
        {`${Math.min(((page - 1) * limit) + 1, total)} - ${Math.min((page * limit), total)} of ${total}`}
      </div>
    </div>
  );
}

Pagination.propTypes = propTypes;

export default Pagination;
