const React = require('react');
const _ = require('lodash');

class NotebookEdit extends React.Component {
  constructor(props) {
    super(props);
    const notebook = props.notebook || {};

    this.state = {
      title: notebook.title || ''
    };
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {
      event.preventDefault();
      const editedNotebook = _.assign({}, this.props.notebook, {
        title: this.state.title,
        content: this.state.content,
      });
      this.props.onSave(editedNotebook);
    };

    const onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    };

    return (
      <form className="blog-notebook">
        <div className="form-group">
          <input className="form-control input-lg" value={this.state.title}
            placeholder="Notebook title" onChange={onTitleChange}/>
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

module.exports = NotebookEdit;
