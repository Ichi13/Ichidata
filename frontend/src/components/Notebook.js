const React = require('react');

const NotebookView = require('./NotebookView');
const NotebookEdit = require('./NotebookEdit');
const NoteList = require('./NoteList');

const Notebook = React.createClass({
  displayName: 'Notebook',
  getInitialState: function() {
    return { editing: false, showNotesBoolean: false };
  },
  openEdit: function() {
    this.setState({ editing: true });
  },
  closeEdit: function() {
    this.setState({ editing: false });
  },
  saveEdit: function(editedNotebook) {
    this.props.saveNotebook(editedNotebook, (err) => {
      if(!err) this.closeEdit();
    });
  },
  deleteThisNotebook: function() {
    this.props.deleteNotebook(this.props.notebook.id);
  },
  disableShowNotes: function() {
      this.setState({ showNotesBoolean: false });
  },
  enableShowNotes: function() {
      console.log("Id of notebook:" + this.props.notebook.id);
      this.setState({ showNotesBoolean: true });
  },

  render: function() {
       if(!this.state.showNotesBoolean && this.state.editing) {
      // Render component for editing the notebook
      return (
        <NotebookEdit
          notebook={this.props.notebook}
          onSave={this.saveEdit}
          onCancel={this.closeEdit}
        />
      );
      }if(!this.state.showNotesBoolean && !this.state.editing){
      return (
          <NotebookView
          notebook={this.props.notebook}
          onDelete={this.deleteThisNotebook}
          onEdit={this.openEdit}
          showNotes={this.enableShowNotes}
        />
      );
    }if(this.state.showNotesBoolean && this.state.editing){
          return (
        <div>
          <NotebookEdit
            notebook={this.props.notebook}
            onSave={this.saveEdit}
            onCancel={this.closeEdit}
          />
          <NoteList notebookIdentification={this.props.notebook.id}/>
        </div>
        );
    }if(this.state.showNotesBoolean && !this.state.editing){
        return (
        <div>
          <NotebookView
            notebook={this.props.notebook}
            onDelete={this.deleteThisNotebook}
            onEdit={this.openEdit}
            showNotes={this.disableShowNotes}
          />
          <NoteList notebookIdentification={this.props.notebook.id}/>
        </div>
      );
    }
  }
});

// Export the notebook component
module.exports = Notebook;