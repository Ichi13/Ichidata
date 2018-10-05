const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');

const notesActionCreators = require('../reducers/notes');
const createActionDispatchers = require('../helpers/createActionDispatchers');
const Note = require('./Note');
const NoteNew = require('./NoteNew');

/**
 * A list of blog Notes, along with buttons for writing a new Note
 * and loading more Notes.
 */
class NoteList extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // Set initial internal state for this component
  //   this.state = { loading: false };
  // }

  render() {
    // const onLoadButtonClick = () => {
    //   // If we are not already in the process of loading Notes,
    //   // start loading more Notes.
    //   if(!this.state.loading) {
    //     this.setState({ loading: true });
    //     this.props.loadMoreNotes(() => {
    //       this.setState({ loading: false });
    //     });
    //   }//this.props.Notes.visibleNotes
    // };



    // Function which creates a Note component from a Note ID
    const createNoteComponent = (currentNote) => {
      /* TODO Section 8: Add code for delete */
      return (
        <Note
          key={currentNote.id}
          Note={currentNote}
          saveNote={this.props.saveNote}
          deleteNote={this.props.deleteNote}
        />
      );
    };


    return (
      <div className="row">
        <div className="blog-main">
          {/* Button for writing a new Note */}
          <NoteNew
            createNote={this.props.createNote}
          />

          {/* TODO Section 3: Write code to list all the Notes */}

           {this.props.notes.visibleNotes.map(p => createNoteComponent(p))}

          {/* Button for loading more Notes */}
          {/*<button className="blog-load-more btn btn-default btn-lg"
            onClick={onLoadButtonClick}
            disabled={this.state.loading}
          >
            {this.state.loading ? 'Loading...' : 'Load more Notes'}
          </button>*/}
        </div>
      </div>
    );
  }
}

// Connect NoteList component to the Redux store
const NoteListContainer = ReactRedux.connect(
  // Map store state to props
  (state) => ({
    notes: state.notes,
  }),
  createActionDispatchers(notesActionCreators)
)(NoteList);

module.exports = NoteListContainer;
