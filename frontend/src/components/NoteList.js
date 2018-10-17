const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');

const notesActionCreators = require('../reducers/notes');
const createActionDispatchers = require('../helpers/createActionDispatchers');
const Note = require('./Note');
const NoteNew = require('./NoteNew');

// A list of notes
const NoteList = React.createClass({
  displayName: 'NoteList',
  // Setting initial state
  getInitialState: function() {
    return { loading: false };
  },
  // Function which creates a note component from a notebook ID
  createNoteComponent: function(currentNote) {
    console.log("Note id from notelist:" + this.props.notebookIdentification)
    if(this.props.notebookIdentification == currentNote.notebookId){
      return (
        <Note
          key={currentNote.id}
          note={currentNote}
          deleteNote={this.props.deleteNote}
          saveNote={this.props.saveNote}
      />
      );
   }
  },
  render: function() {
    return (
      <div className="row">
        <div className="blog-main">
          {/* Button for writing a new note */}
             <NoteNew
            createNote={this.props.createNote}
            notebookIdentification={this.props.notebookIdentification}
          />
          {/*Listing all notes*/}

          {_.map(this.props.notes.visibleNotes, x => this.createNoteComponent(x))}
        </div>
      </div>
    );
  }
});

// Connect NoteList component to the Redux store
const NoteListContainer = ReactRedux.connect(
  // Map store state to props
  (state) => ({
    notes: state.notes,
    time: state.time
  }),
  createActionDispatchers(notesActionCreators)
)(NoteList);

module.exports = NoteListContainer;