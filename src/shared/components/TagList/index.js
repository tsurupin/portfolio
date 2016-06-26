import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LabelOutline from 'material-ui/svg-icons/action/label-outline';
import styles from './styles.scss';

const propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  path: PropTypes.string.isRequired
};


const inlineStyles ={
  tagIcon: {
    marginLeft: 0,
    width: 18,
    height: 18
  }
};

function TagList({ tags, path }) {

  return (
    <div className={styles.root} >
      <LabelOutline color='#00AB6B' style={inlineStyles.tagIcon}/>
      {tags.map((tag) => {
        return (
          <Link key={tag.id} to={`${path}?tag=${tag.id}`} className={styles.item}>
            <span className={styles.name}>{tag.name}</span>
          </Link>
        )})}
    </div>
  );

}

TagList.propTypes = propTypes;

export default TagList;