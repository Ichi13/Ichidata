const React = require('react');

//const NoteEdit = require('./NoteEdit');
const NoteView = require('./NoteView');
const NoteEdit = require('./NoteEdit');

const Note = React.createClass({
  displayName: 'Note',
  getInitialState: function() {
    console.log("Note id from note.js:" + this.props.note.notebookId);
    return { editing: false };
  },
  openEdit: function() {
    this.setState({ editing: true });
  },
  closeEdit: function() {
    this.setState({ editing: false });
  },
  saveEdit: function(editedNote) {
    this.props.saveNote(editedNote, (err) => {
      if(!err) this.closeEdit();
    });
  },
  deleteThisNote: function() {
    this.props.deleteNote(this.props.note.id);
  },

  render: function() {
       if(this.state.editing) {
      // Render component for editing the post
      return (
        <NoteEdit
          note={this.props.note}
          onSave={this.saveEdit}
          onCancel={this.closeEdit}
        />
      );
    }else
    return (
        <NoteView
        note={this.props.note}
        onDelete={this.deleteThisNote}
        onEdit={this.openEdit}
      />
    );
  }
});

// Export the Post component
module.exports = Note;