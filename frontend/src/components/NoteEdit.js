const React = require('react');
const _ = require('lodash');
const MarkdownEditor = require('./MarkdownEditor');

class NoteEdit extends React.Component {
  constructor(props) {
    super(props);
    const note = props.note || {};

    this.state = {
      title: note.title || '',
      content: note.content || '',
    };
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {
      event.preventDefault();

      const editedNote = {
        title: this.state.title,
        content: this.state.content,
        notebookId: this.props.notebookId
      };
      this.props.onSave(editedNote);
    };

    const onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    };

    const onContentChange = (event) => {
      this.setState({ content: event.target.value });
    };

    return (
      <form className="blog-note">
        <div className="form-group">
          <input className="form-control input-lg" value={this.state.title}
            placeholder="Note title" onChange={onTitleChange}/>
        </div>

         <div className="form-group">
          <textarea
            className="form-control"
            style={{ height: 300 }}
            value={this.state.content}
            onChange={onContentChange}
          />
        </div>

        <button className="btn btn-default pull-right"
          onClick={submitAndStopEditing}>Save</button>

        <button className="btn btn-default pull-right"
          style={{ marginRight: '12px' }}
          onClick={revertAndStopEditing}>Cancel</button>
      </form>
    );
  }
}

module.exports = NoteEdit;
