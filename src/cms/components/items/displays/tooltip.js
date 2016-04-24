import React, { Component, PropTypes } from 'react';
import { MOVE_ITEM_TOP, MOVE_ITEM_UP, MOVE_ITEM_DOWN, MOVE_ITEM_BOTTOM } from '../../../constants';

export default class Tooltip extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleMove(type) {
        this.props.handleMoveItem(this.props.sortRank, type);
    }
    

    handleDelete() {
        this.props.handleDeleteItem(this.props.sortRank);
    }


    renderMoveTopButton() {
        if (this.props.sortRank === 0) { return; }
        return(
            <li
                className="item-tooltip__move-button item-tooltip__move-button--top"
                onClick={this.handleMove.bind(this, MOVE_ITEM_TOP)}>
                Top
            </li>
        );
    }

    renderMoveUpButton() {
        if (this.props.sortRank === 0) { return; }
        return(
            <li
                className="item-tooltip__move-button item-tooltip__move-button--up"
                onClick={this.handleMove.bind(this, MOVE_ITEM_UP)}>
                Up
            </li>
        );
    }

    renderMoveDownButton() {
        if (this.props.sortRank === (this.props.totalCount)) { return; }
        return(
            <li
                className="item-tooltip__move-button item-tooltip__move-button--down"
                onClick={this.handleMove.bind(this, MOVE_ITEM_DOWN)}>
                Down
            </li>
        );
    }

    renderMoveBottomButton() {
        if (this.props.sortRank === (this.props.totalCount)) { return; }
        return(
            <li
                className="item-tooltip__move-button item-tooltip__move-button--bottom"
                onClick={this.handleMove.bind(this, MOVE_ITEM_BOTTOM)}>
                Bottom
            </li>
        );
    }
    
    render() {
        return (
            <div className="item-tooltip">
                <ul className="item-tooltip__move-button-list">
                    {this.renderMoveTopButton()}
                    {this.renderMoveUpButton()}
                    {this.renderMoveDownButton()}
                    {this.renderMoveBottomButton()}
                    <li
                        className="item-tooltip__delete-button"
                        onClick={this.handleDelete}>
                        Delete
                    </li>
                    {this.props.editButton}
                </ul>
            </div>
        )
    }
}

Tooltip.propTypes = {
    sortRank: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    editButton: PropTypes.element.isRequired,
    handleMoveItem: PropTypes.func.isRequired,
    handleDeleteItem: PropTypes.func.isRequired
};
