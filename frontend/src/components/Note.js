const React = require('react');

const NoteEdit = require('./NoteEdit');
const NoteView = require('./NoteView');

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  render() {
    const openEdit = () => {
      this.setState({ editing: true });
    };

    const closeEdit = () => {
      this.setState({ editing: false });
    };

    const saveEdit = (editedNote) => {
      this.props.saveNote(editedNote, (err) => {
        if(!err) closeEdit();
      });
    };

    const deleteThisNote = () => {
      this.props.deleteNote(this.props.note.id);
    };


    return (
      <NoteView
        note={this.props.note}
        onDelete={deleteThisNote}
        onEdit={openEdit}
      />
    );
  }
}

module.exports = Note;
