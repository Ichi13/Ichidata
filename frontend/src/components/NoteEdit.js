const React = require('react');
const _ = require('lodash');


 // A form for editing a Note.

const NoteEdit = React.createClass({
  displayName: 'NoteEdit',
  getInitialState: function() {
    const note = this.props.note || {};
    return {
      title: note.title || '',
      content: post.content || ''
    };
  },
  revertAndStopEditing: function(event) {
    event.preventDefault();
    this.props.onCancel();
  },
  submitAndStopEditing: function(event) {
    event.preventDefault();
    // Creates a new note object and saves it.
    console.log(this.props.notebookIdentification);
    const editedNote = _.assign({}, this.props.note, {
      title: this.state.title,
      content: this.state.content,
      notebookId: this.props.notebookIdentification
    });
    this.props.onSave(editedNote);
  },
  onTitleChange: function(event) {
    const title = event.target.value;
    this.setState({ title });
  },
  render: function() {
    return (
      <form className="blog-note" id="newNote">
        {/* Title field */}
        <div className="form-group">
          <input className="form-control input-lg" value={this.state.title}
            placeholder="Note title" onChange={this.onTitleChange}
          />
        </div>
        {/* Content field */}
        <div className="form-group">
          <textarea
            className="form-control"
            style={{ height: 300 }}
            value={this.state.content}
            onChange={this.onContentChange}
          />
        </div>
        {/* Save button */}
        <button className="btn btn-default pull-right"
          onClick={this.submitAndStopEditing}
        >
          Save
        </button>
        {/* Cancel button */}
        <button className="btn btn-default pull-right"
          style={{ marginRight: '12px' }}
          onClick={this.revertAndStopEditing}
          >
          Cancel
        </button>
      </form>
    );
  }
});

module.exports = NoteEdit;