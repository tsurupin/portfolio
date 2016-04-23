import React, { Component, PropTypes } from 'react';
import ListItem from 'material-ui/lib/lists/list-item';

export default class ItemEditBoxItem extends Component {

    constructor(props) {
        super(...props);
        this.handleAddItem = this.handleAddItem.bind(this);
    }

    handleAddItem() {
        this.props.handleAddItem(this.props.name);
    }

    render() {
        return (
            <li>
                <ListItem
                    leftAvatar={
                        <img
                            style={{width: '100%', height: '100%', top: 0, left: 0}}
                            src={this.props.image}
                        />
                        }
                    onClick={this.handleAddItem}
                />
            </li>
        );
    }
}

ItemEditBoxItem.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleAddItem: PropTypes.func.isRequired
};
