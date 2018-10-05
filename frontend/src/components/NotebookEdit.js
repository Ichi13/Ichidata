const React = require('react');
const _ = require('lodash');

/**
 * A form for editing a blog Notebook.
 */
class NotebookEdit extends React.Component {
  constructor(props) {
    super(props);
    const Notebook = props.Notebook || {};

    this.state = {
      title: Notebook.title || '',
      content: Notebook.content || ''
    };
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {
      event.preventDefault();
      // Creates a new Notebook object and saves it.
      const editedNotebook = _.assign({}, this.props.Notebook, {
        title: this.state.title,
        content: this.state.content
      });
      this.props.onSave(editedNotebook);
    };

    const onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    };

    const onContentChange = (event) => {
      this.setState({ content: event.target.value });
    };

    return (
      <form className="blog-Notebook">
        {/* Title field */}
        <div className="form-group">
          <input className="form-control input-lg" value={this.state.title}
            placeholder="Notebook title" onChange={onTitleChange}
          />
        </div>
        {/* Content field */}
        <div className="form-group">
          <textarea
            className="form-control"
            style={{ height: 300 }}
            value={this.state.content}
            onChange={onContentChange}
          />
        </div>
        {/* Save button */}
        <button className="btn btn-default pull-right"
          onClick={submitAndStopEditing}
        >
          Save
        </button>
        {/* Cancel button */}
        <button className="btn btn-default pull-right"
          style={{ marginRight: '12px' }}
          onClick={revertAndStopEditing}
        >
          Cancel
        </button>
      </form>
    );
  }
}

module.exports = NotebookEdit;
