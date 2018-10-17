const React = require('react');
const NoteEdit = require('./NoteEdit');


 // A button for new note
const NoteNew = React.createClass({
  displayName: 'NoteNew',
  getInitialState: function() {
    return { editing: false };
  },
  openEdit: function() {
    this.setState({ editing: true });
    console.log(this.props.notebookIdentification);
  },
  closeEdit: function() {
    this.setState({ editing: false });
  },
  createNote: function(newNote) {
    this.props.createNote(newNote, (err) => {
      if(!err) this.closeEdit();
    });
  },
  render: function() {
    // To switch to edit mode when editing is clicked.
    if(!this.state.editing){
        return (
        <button className="blog-load-more btn btn-primary btn-lg"
          onClick={ this.openEdit }>
          Write new Note
        </button>
      );
    }else{
        return (
           <NoteEdit
          notebookIdentification={this.props.notebookIdentification}
          note={this.props.note}
          onSave={this.createNote}
          onCancel={this.closeEdit}
        />
        );
    }
  }
});

module.exports = NoteNew;