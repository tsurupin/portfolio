import React, { Component, PropTypes } from 'react';

const propTypes = {
    sortRank: PropTypes.number,
    targetType: PropTypes.string,
    addButtonLabel: PropTypes.string,
    cancelButton: PropTypes.object,
    handleSubmit: PropTypes.func
};


export default class ItemFormLink extends Component {

    constructor(props) {
        super(...props);
    }

    render() {
        return (
          <div></div>
        );
    }
}

ItemFormLink.propTypes = propTypes;