const React = require('react');

const NotebookEdit = require('./NotebookEdit');
const NotebookView = require('./NotebookView');

class Notebook extends React.Component {
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

    const saveEdit = (editedNotebook) => {
      this.props.saveNotebook(editedNotebook, (err) => {
        if(!err) closeEdit();
      });
    };

    const deleteThisNotebook = () => {
      this.props.deleteNotebook(this.props.notebook.id);
    };

    if(this.state.editing) {
      return (
        <NotebookEdit
          notebook={this.props.notebook}
          onSave={saveEdit}
          onCancel={closeEdit}
        />
      );
    }

    return (
      <NotebookView
        notebook={this.props.notebook}
        onDelete={deleteThisNotebook}
        loadData={this.props.loadData}
        onEdit={openEdit}
      />
    );
  }
}

module.exports = Notebook;
