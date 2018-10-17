const React = require('react');
const NotebookEdit = require('./NotebookEdit');

/**
 * A button which expands into a form for writing a new Notebook.
 */
const NotebookNew = React.createClass({
  displayName: 'NotebookNew',
  getInitialState: function() {
    return { editing: false };
  },
  openEdit: function() {
    this.setState({ editing: true });
  },
  closeEdit: function() {
    this.setState({ editing: false });
  },
  createNotebook: function(newNotebook) {
    this.props.createNotebook(newNotebook, (err) => {
      if(!err) this.closeEdit();
    });
  },
  render: function() {
    // TODO Task 6: Write code to switch to edit mode when editing is clicked.
    if(!this.state.editing){
        return (
        <button className="blog-load-more btn btn-primary btn-lg"
          onClick={ this.openEdit }>
          Write new Notebook
        </button>
      );
    }else{
        return (
           <NotebookEdit
          notebook={this.props.notebook}
          onSave={this.createNotebook}
          onCancel={this.closeEdit}
        />
        );
    }
  }
});

module.exports = NotebookNew;
