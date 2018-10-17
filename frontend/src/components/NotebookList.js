const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');

const notebooksActionCreators = require('../reducers/notebooks');
const createActionDispatchers = require('../helpers/createActionDispatchers');
const Notebook = require('./Notebook');
const NotebookNew = require('./NotebookNew');

/**
 * A list of blog posts, along with buttons for writing a new post
 * and loading more posts.
 */
const NotebookList = React.createClass({
  displayName: 'NotebookList',
  // Function which creates a notebook component from a notebook ID
  createNotebookComponent: function(currentNotebook) {
      /* TODO Task 7: Add code for delete */
    return (
      <Notebook
        key={currentNotebook.id}
        notebook={currentNotebook}
        deleteNotebook={this.props.deleteNotebook}
        saveNotebook={this.props.saveNotebook}
     />
    );
  },
  render: function() {
    return (
      <div className="row">
        <div className="blog-main">
          {/* Button for writing a new notebook */}
             <NotebookNew
            createNotebook={this.props.createNotebook}
          />
          {/* TODO Task 2: Write code to list all the notebooks */}

          {_.map(this.props.notebooks.visibleNotebooks, x => this.createNotebookComponent(x))}
        </div>
      </div>
    );
  }
});

// Connect NotebookList component to the Redux store
const NotebookListContainer = ReactRedux.connect(
  // Map store state to props
  (state) => ({
    notebooks: state.notebooks,
    time: state.time
  }),
  createActionDispatchers(notebooksActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
