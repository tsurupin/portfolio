import React, { Component, PropTypes } from 'react';
import Tag from '../Tag/index';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    publishedAt: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
};

const inlineStyles = {
  root: {
    marginBottom: 20
  },
  titleContainer: {
    width: '100%',
    paddingBottom: 10
  },
  title: {
    letterSpacing: '0.2rem',
    fontWeight: 'bold',
    fontSize: '1.8rem',
    color: '#69808C',
    fontFamily: 'Raleway,sans-serif',
  },
  subTitleContainer: {
    paddingTop: 10,
    paddingBottom: 0
  },
  subTitle: {
    fontStyle: 'italic',
    fontSize: '1.4rem',
    textAlign: 'center'
  },
  image: {
    width: '94%',
    marginLeft: '3%',
    marginRight: '3%'
  },
  description: {
    paddingTop: 10,
    paddingBottom: 0,
    lineHeight: '1.6',
    fontSize: '1.6rem',
    fontFamily: 'Source Serif Pro,Helvetica Neue,Helvetica,Arial,sans-serif',
  },
  buttonContainer: {
    textAlign: 'right'
  },
  githubButton: {
    color: '#69808C',
    fontFamily: 'Raleway,sans-serif'
  }
};




class Item extends Component {

  constructor(props) {
    super(props);
  }

  renderLink() {
    if (this.props.project.sourceUrl) {
      return(
        <FlatButton
          style={inlineStyles.githubButton}
          href={this.props.project.sourceUrl}
          label="FORK ON GITHUB"
          linkButton={true}
          icon={<FontIcon className="muidocs-icon-custom-github" />}
      />
      );
    }
  }
  
  render() {
    return (
    <Card style={inlineStyles.root}>
      <CardHeader
        title={this.props.project.title}
        titleStyle={inlineStyles.title}
        style={inlineStyles.titleContainer}
        subtitle={this.props.project.tags.map((tag) => {
        return (
          <Tag
            key={tag.id}
            id={tag.id}
            name={tag.name}
          />
          )
         })}
      />
      <CardMedia style={inlineStyles.image}>
        <img src={this.props.project.image} />
      </CardMedia>
      <CardTitle
        title=""
        style={inlineStyles.subTitleContainer}
        subtitle="Card subtitle"
        subtitleStyle={inlineStyles.subTitle}
      />
      <CardText style={inlineStyles.description}>
        {this.props.project.description}
      </CardText>
      <CardActions style={inlineStyles.buttonContainer}>
        {this.renderLink()}
      </CardActions>

    </Card>
    )
  }
};

Item.propTypes = propTypes;

export default Item;
