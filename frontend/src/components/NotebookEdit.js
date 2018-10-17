const React = require('react');
const _ = require('lodash');

/**
 * A form for editing a blog Notebook.
 */
const NotebookEdit = React.createClass({
  displayName: 'NotebookEdit',
  getInitialState: function() {
    const notebook = this.props.notebook || {};
    return {
      title: notebook.title || ''
    };
  },
  revertAndStopEditing: function(event) {
    event.preventDefault();
    this.props.onCancel();
  },
  submitAndStopEditing: function(event) {
    event.preventDefault();
    // Creates a new notebook object and saves it.
    const editedNotebook = _.assign({}, this.props.notebook, {
      title: this.state.title
    });
    this.props.onSave(editedNotebook);
  },
  onTitleChange: function(event) {
    const title = event.target.value;
    this.setState({ title });
  },
  render: function() {
    return (
      <form className="blog-notebook" id="newNotebook">
        {/* Title field */}
        <div className="form-group">
          <input className="form-control input-lg" value={this.state.title}
            placeholder="Notebook title" onChange={this.onTitleChange}
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

module.exports = NotebookEdit;
