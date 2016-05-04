import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from '../../../constants';
import List from 'material-ui/lib/lists/list';
import ItemEditBoxItem from './edit_box_item';

const TARGET_TYPE_LIST = [
  TARGET_TYPES.HEADING,
  TARGET_TYPES.SUB_HEADING,
  TARGET_TYPES.TEXT,
  TARGET_TYPES.IMAGE,
  TARGET_TYPES.TWITTER,
  TARGET_TYPES.LINK,
  TARGET_TYPES.QUOTE
];

export default class ItemFormEditBox extends Component {

  constructor(props) {
    super(...props);
  }

  render() {
    return (
      <List className='item-edit-box'
            insetSubheader={true}
            subheader='Add Item'
            subheaderStyle={{paddingLeft: 0, lineHeight: '24px'}}>
        <ul className='item-edit-box__list'>
          {TARGET_TYPE_LIST.map((targetType, index) => {
            return (
              <ItemEditBoxItem
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

ItemFormEditBox.propTypes = {
  handleAddItem: PropTypes.func.isRequired
};