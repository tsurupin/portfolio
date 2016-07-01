import React, { Component, PropTypes } from 'react';

const widgetJS = '//platform.twitter.com/widgets.js';

const propTypes = {
  id: PropTypes.string.isRequired,
};

class TweetEmbed extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const renderTweet = () => {
      window.twttr.widgets.createTweetEmbed(this.props.id, this.div, { align: 'center', cards: 'hidden', conversation: 'none' });
    };

    window.twttr ? renderTweet() : this.appendScript(widgetJS, renderTweet);
  }

  appendScript(src, callback) {
    const script = document.createElement('script');
    script.setAttribute('src', src);
    script.onload = () => callback();
    document.body.appendChild(script);
  }

  render() {
    return <div ref={ref => this.div = ref} />;
  }
}

TweetEmbed.propTypes = propTypes;

export default TweetEmbed;
