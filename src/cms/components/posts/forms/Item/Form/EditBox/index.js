import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from '../../../../../../constants';
import List from 'material-ui/lib/lists/list';
import EditBoxItem from './EditBoxItem/index';
import styles from './styles.scss';

const TARGET_TYPE_LIST = [
  TARGET_TYPES.HEADING,
  TARGET_TYPES.SUB_HEADING,
  TARGET_TYPES.TEXT,
  TARGET_TYPES.IMAGE,
  TARGET_TYPES.TWITTER,
  TARGET_TYPES.LINK,
  TARGET_TYPES.QUOTE
];

const inlineStyles = {
  subHeader: {
    paddingLeft: 0, 
    lineHeight: '24px'
  }
};

export default class EditBox extends Component {

  constructor(props) {
    super(...props);
  }

  render() {
    return (
      <List className={styles.root}
            insetSubheader={true}
            subheader='Add Item'
            subheaderStyle={inlineStyles.subHeader}>
        <ul className={styles.list}>
          {TARGET_TYPE_LIST.map((targetType, index) => {
            return (
              <EditBoxItem
                key={index}
                name={targetType.NAME}
                label={targetType.LABEL}
                image={targetType.IMAGE}
                handleAddItem={this.props.handleAddItem}
              />
            );
          })}
        </ul>
      </List>
    );
  }
}

EditBox.propTypes = {
  handleAddItem: PropTypes.func.isRequired
};