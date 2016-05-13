import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import styles from './styles.scss';


const inlineStyles = {
  button: {
    
  }
}
class ItemRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <li className={styles.root}>
        <div className={styles.title}>{this.props.title}</div>
        <div className={styles.description}>{this.props.description}</div>
        <a href={this.props.sourceURL} target="_blank">
          <RaisedButton label="FORK ON GITHUB" styles={inlineStyles.button} />
        </a>
      </li>
    );
  }
}

ItemRow.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageURL: PropTypes.string,
  sourceURL: PropTypes.string,
  sampleURL: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  }))
};

export default ItemRow;