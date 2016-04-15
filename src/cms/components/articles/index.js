import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from '../../actions/articles';
import { Link } from 'react-router';

class ArticlesIndex extends Component {
    componentWillMount() {
        this.props.fetchArticles();
    }

    render() {
        return (
          <div>Hoge
          </div>
        );
    }
}

function mapStateToProps(state) {
    return { articles: state.articles.all }
}

export default connect(mapStateToProps, { fetchArticles })(ArticlesIndex);