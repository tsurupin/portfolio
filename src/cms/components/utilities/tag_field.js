import React, { Component, PropTypes } from 'react';
import {  WithContext as ReactTags } from 'react-tag-input';

class TagField extends Component {

	constructor(props) {
		super(...props);

    this.state = {
      tags: props.tags,
      suggestions: props.suggestions
    };

    this.handleDeleteTag = this.handleDeleteTag.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
	}

  componentWillReceiveProps(nextProps) {
    this.setState({
      tags: nextProps.tags,
      suggestions: nextProps.suggestions
    })
  };

  handleDeleteTag(sortRank) {
    this.props.handleDeleteTag(sortRank);
  }

  handleAddTag(text) {
    const tag = {
      id: this.state.tags.length + 1,
      text: text
    };
    this.props.handleAddTag(tag);
  }

  render() {
    return (
      <section className="article-side-form">
        <div className="article-side-form__header">タグの追加</div>
        <div className="article-side-form__content">
          <ReactTags
            tags={this.state.tags}
            suggestions={this.state.suggestions}
            handleDelete={this.handleDeleteTag}
            handleAddition={this.handleAddTag}
            draggable={false}
            autofocus={false}
            autocomplete={1}
            minQueryLength={1}
            placeholder='Enter Tag Name'
          />
        </div>
      </section>
    )
  }
}

TagField.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string
  })),
  suggestions: PropTypes.array.isRequired,
  handleAddTag: PropTypes.func.isRequired,
  handleDeleteTag: PropTypes.func.isRequired
};

TagField.defaultProps = {
  tags: [],
  suggestions: []
};

export default TagField

