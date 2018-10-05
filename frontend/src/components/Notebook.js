const React = require('react');

const NotebookEdit = require('./NotebookEdit');
const NotebookView = require('./NotebookView');

class Notebook extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
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
      this.props.deleteNotebook(this.props.Notebook.id);
      };


    // TODO Section 8: Add code for delete

    if(this.state.editing) {
      // Render component for editing the Notebook
      return (
        <NotebookEdit
          Notebook={this.props.Notebook}
          onSave={saveEdit}
          onCancel={closeEdit}
        />
      );
    }
    // Render read-only view of the Notebook
    // TODO Section 8: add code for delete
    return (
      <NotebookView
        notebook={this.props.Notebook}
        time={this.props.time}
        onDelete={deleteThisNotebook}
        onEdit={openEdit}
      />
    );
  }
}

// Export the Notebook component
module.exports = Notebook;
