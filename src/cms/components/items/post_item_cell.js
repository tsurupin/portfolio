import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from '../../constants';
import Heading from './displays/heading';
import Tooltip from './displays/tooltip';

export default class PostItemCell extends Component {
    constructor(props) {
        super(...props);
        this.state = { hovering: true };
        
        this.handleUpdateItem = this.handleUpdateItem.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    
    handleUpdateItem() {
        this.props.handleUpdateItem(this.props.sortRank, {...this.props.item, editing: true})    
    }
    
    handleMouseEnter() {
        if (this.state.hovering) { return; }
        this.setState({hovering: true})
    }

    handleMouseLeave() {
        if (!this.state.hovering) { return; }
        this.setState({hovering: false})
    }
    
    renderComponent() {
        switch(this.props.item.type) {
            case TARGET_TYPES.HEADING.NAME:
            case TARGET_TYPES.SUB_HEADING.NAME:
                return (
                    <Heading
                        title={this.props.item.title}
                        type={this.props.item.type}
                    />
                );
            default:
                return;
        }
    }
    
    renderTooltip() {
        if (!this.state.hovering) { return; }
        return(
            <Tooltip
                sortRank={this.props.sortRank}
                totalCount={this.props.totalCount}
                editButton={this.renderEditButton()}
                handleDeleteItem={this.props.handleDeleteItem}
                handleMoveItem={this.props.handleMoveItem}
            />
        )
    }

    renderEditButton() {
        return (
            <li
                className="item-tooltip__move-button"
                onClick={this.handleUpdateItem}>
                Edit
            </li>
        );
    }
    
    render() {
        return (
            <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                {this.renderTooltip()}
                {this.renderComponent()}
            </div>
        );
    }
}

PostItemCell.propTypes = {
    sortRank: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
    handleMoveItem: PropTypes.func.isRequired,
    handleUpdateItem: PropTypes.func.isRequired
};