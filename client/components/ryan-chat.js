
import React from 'react';
import ReactDOM from 'react-dom';

import marked from 'marked';

var
  data,
  Comment,
  CommentBox,
  CommentList,
  CommentForm;

data = [
  {
    author: 'Pete Hunt',
    text: 'This is one comment'
  },
  {
    author: 'Jordan Walke',
    text: 'This is *another* comment'
  }
];

Comment = React.createClass({
  displayName: 'Comment',
  rawMarkup() {
    var __html = marked( this.props.children.toString(), { sanitize: true });
    return { __html };
  },
  render() {
    return React.createElement(
      'div',
      { className: 'comment' },
      React.createElement(
        'h2',
        { className: 'comment-author' },
        this.props.author
      ),
      React.createElement(
        'span',
        {
          dangerouslySetInnerHTML: this.rawMarkup()
        }
      )
    );
  }
});

CommentList = React.createClass({
  displayName: 'CommentList',
  render() {
    var commentNodes = this.props.data.map( comment => React.createElement( Comment, comment, comment.text ));

    return React.createElement(
      'div',
      {
        className: 'comment-list'
      },
      ...commentNodes
    );
  }
});

CommentForm = React.createClass({
  displayName: 'CommentForm',
  render() {
    return React.createElement(
      'div',
      {
        className: 'comment-form'
      },
      'Hello, I am a CommentForm!'
    );
  }
});

CommentBox = React.createClass({
  displayName: 'CommentBox',
  render() {
    return React.createElement(
      'div',
      {
        className: 'comment-box'
      },
      React.createElement( 'h1', null, 'Comments' ),
      React.createElement( CommentList, { data: this.props.data }),
      React.createElement( CommentForm, null )
    );
  }
});

ReactDOM.render(
  React.createElement( CommentBox, { data }),
  document.getElementById( 'main-content' )
);
