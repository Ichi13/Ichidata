const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');//*

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notesActionCreators = require('../reducers/notes');
const notebooksActionCreators = require('../reducers/notebooks');
const Note = require('./Note');//*
const NoteNew = require('./NoteNew');//*
/*
  *** TODO: Build more functionality into the NoteList component ***
  At the moment, the NoteList component simply renders the notes
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NoteList extends React.Component {
  constructor(props) {//*
    super(props);
    this.state = { loading: false };
  }

  render() {
    const onLoadButtonClick = () => {
      if(!this.state.loading) {
        this.setState({ loading: true });
        this.props.loadMorePosts(() => {
          this.setState({ loading: false });
        });
      }
    };

    const createNoteListItem = (note) => {

     return (
        <Note
          key={note.id}
          note={note}
          saveNote={this.props.saveNote}
          deleteNote={this.props.deleteNote}
          notebookId={this.props.notebooks.activeNotebookId}
        />
      );
    };

    return (
      <div className="row">
        <div className="blog-main">
          <h2>Notes</h2>
          <NoteNew
              createNote={this.props.createNote}
              notebookId={this.props.notebooks.activeNotebookId}
            />

          <ul>
            {this.props.notes.notes.map(createNoteListItem)}

          </ul>
        </div>
      </div>

    );
  }
}

const NoteListContainer = ReactRedux.connect(
  state => ({
    notes: state.notes,
    notebooks: state.notebooks,
    data: state.data,
  }),
  createActionDispatchers(notesActionCreators, notebooksActionCreators)
)(NoteList);

module.exports = NoteListContainer;
