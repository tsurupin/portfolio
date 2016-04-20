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

const styles = {
    list: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        width: '80%',
        margin: '0 10%'
    }
};


export default class ItemFormEditBox extends Component {

    constructor(props) {
        super(...props);
    }

    render() {
        return (
            <List style={styles.list}>
            {TARGET_TYPE_LIST.map((targetType, index) => {
                return (
                    <ItemEditBoxItem
                        key={index}
                        name={targetType.NAME}
                        image={targetType.IMAGE}
                        handleAddItem={this.props.handleAddItem}
                    />
                );
            })}
            </List>
        );
    }
}

ItemFormEditBox.propTypes = {
    sortRank: PropTypes.number,
    targetType: PropTypes.string,
    addButtonLabel: PropTypes.string,
    cancelButton: PropTypes.object,
    handleAddItem: PropTypes.func.isRequired
};