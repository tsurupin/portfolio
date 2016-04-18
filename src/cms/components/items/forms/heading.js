import React, { Component, PropTypes } from 'react';

const propTypes = {
    sortRank: PropTypes.number,
    targetType: PropTypes.string,
    addButtonLabel: PropTypes.string,
    cancelButton: PropTypes.object,
    handleSubmit: PropTypes.func
};


export default class ItemFormHeading extends Component {

    constructor(props) {
        super(...props);
    }

    render() {
        return (
          <div></div>
        );
    }
}

ItemFormHeading.propTypes = propTypes;