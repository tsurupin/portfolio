import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { moveItemTop, moveItemUp,  moveItemDown, moveItemBottom, deleteItem } from '../../../actions/items';

class Tooltip extends Component {
    constructor(props) {
        super(props);
        
        this.handleMoveTop = this.handleMoveTop.bind(this);
        this.handleMoveUp = this.handleMoveUp.bind(this);
        this.handleMoveDown = this.handleMoveDown.bind(this);
        this.handleMoveBottom = this.handleMoveBottom.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleMoveTop() {
        this.props.moveItemTop(this.props.sortRank);
    }

    handleMoveUp() {
        this.props.moveItemUp(this.props.sortRank);
    }

    handleMoveDown() {
        this.props.moveItemDown(this.props.sortRank);
    }

    handleMoveBottom() {
        this.props.moveItemBottom(this.props.sortRank);
    }

    handleDelete() {
        this.props.deleteItem(this.props.sortRank);
    }


    renderMoveTopButton() {
        if (this.props.sortRank === 0) { return; }
        return(
            <li
                className="item-tooltip__move-button item-tooltip__move-button--top"
                onClick={this.handleMoveTop}>
                Top
            </li>
        );
    }

    renderMoveUpButton() {
        if (this.props.sortRank === 0) { return; }
        return(
            <li
                className="item-tooltip__move-button item-tooltip__move-button--up"
                onClick={this.handleMoveUp}>
                Up
            </li>
        );
    }

    renderMoveDownButton() {
        if (this.props.sortRank === (this.props.totalCount)) { return; }
        return(
            <li
                className="item-tooltip__move-button item-tooltip__move-button--down"
                onClick={this.handleMoveDown}>
                Down
            </li>
        );
    }

    renderMoveBottomButton() {
        if (this.props.sortRank === (this.props.totalCount)) { return; }
        return(
            <li
                className="item-tooltip__move-button item-tooltip__move-button--bottom"
                onClick={this.handleMoveBottom}>
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
                        className="item-tooltip__move-button"
                        onClick={this.handleDelete}>
                        Delete
                    </li>
                    {this.props.editButton}
                </ul>
            </div>
        )
    }
}

export default connect(null, { moveItemTop, moveItemUp, moveItemDown, moveItemBottom, deleteItem})(Tooltip);