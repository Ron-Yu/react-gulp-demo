(function() {
  const React = require('react');
  const ReactDOM = require('react-dom');
  const CommentList = require('./components/commentList');
  const CommentForm = require('./components/commentForm');

  var CommentBox = React.createClass({
    render: function() {
      return (
        <div className="commentBox">
          <h1>Comments</h1>
          <CommentList />
          <CommentForm />
        </div>
      );
    }
  });

  ReactDOM.render(
    <CommentBox />,
    document.getElementById('example')
  );

})();
