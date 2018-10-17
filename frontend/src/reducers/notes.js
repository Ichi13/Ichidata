const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
const INSERT = 'frontend/notes/INSERT';
const REMOVE = 'frontend/notes/REMOVE';
const CHANGE = 'frontend/notes/CHANGE';

// Note data initial state
const initialState = {
  visibleNotes: [
    { id: 5,
      title: "From Redux Store: Companies that make computers",
      createdAt: "2016-09-11T23:26:36.000Z",
      updatedAt: "2016-09-11T23:26:36.000Z"
    },
    {id: 4,
     title: "From Redux Store: Dell",
     createdAt: "2016-09-11T23:18:08.000Z",
     updatedAt: "2016-09-11T23:18:08.000Z"
    },
    { id: 3,
      title: "From Redux Store: Lego Nexo Knights",
      createdAt: "2016-09-11T07:47:30.000Z",
      updatedAt: "2016-09-11T07:47:30.000Z"
    },
    { id: 2,
      title: "From Redux Store: React",
      createdAt: "2016-09-11T07:46:55.000Z",
      updatedAt: "2016-09-11T07:46:55.000Z"
    },
    { id: 1,
      title: "From Redux Store: Deep Learning",
      createdAt: "2016-09-11T07:46:28.000Z",
      updatedAt: "2016-09-11T07:46:28.000Z"
    }

  ]
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    // Inserts new notes into the local store
    case INSERT: {


      // Add in the new notes
      const unsortedNotes = _.concat(state.visibleNotes, action.notes);

      const visibleNotes = _.orderBy(unsortedNotes, 'createdAt','desc');

      // Return updated state
      return _.assign({}, state, { visibleNotes} );
    }
    // Changes a single note's data in the local store
    case CHANGE: {
      const visibleNotes = _.clone(state.visibleNotes);
      const changedIndex = _.findIndex(state.visibleNotes, {id: action.note.id })
      visibleNotes[changedIndex] = action.note;
      return _.assign({}, state, { visibleNotes });
    }

    // Removes a single note from the visible notes list
    case REMOVE: {
      const visibleNotes = _.reject(state.visibleNotes, {id: action.id});
      return _.assign({}, state, { visibleNotes });
    }

    default: return state;
  }
}

// Now we define a whole bunch of action creators

// Inserts notes into the note list
reducer.insertNotes = (notes) => {
  return { type: INSERT, notes };
};

// Removes a note from the visible note list
reducer.removeNote = (id) => {
  return { type: REMOVE, id };
};

// Attempts to delete a note from the server and removes it from the visible
// note list if successful
reducer.deleteNote = (noteId) => {
     return (dispatch) => {
    api.delete('/notes/' + noteId).then(() => {
      dispatch(reducer.removeNote(noteId));
    }).catch(() => {
      alert('Failed to delete note.');
    });
  };
};

// Attempts to update a note on the server and updates local note data if
// successful
reducer.saveNote = (editedNote, callback) => {
  return (dispatch) => {
    api.put('/notes/' + editedNote.id, editedNote).then((note) => {
      // Saves local notebook.
      dispatch(reducer.changeNote(note));
      callback();
    }).catch((err) => {
      console.error(err);
      alert('Failed to save note.  Are all of the fields filled in correctly?');
    });
  };
};

// Attempts to create a note on the server and inserts it into the local note
// list if successful
reducer.createNote = (newNote, callback) => {
  return (dispatch) => {
    api.post('/notes', newNote).then((note) => {
      // This note is one that the store returns us! It has note id incremented to the next available id
      console.log('what up g');
      dispatch(reducer.insertNotes([note]));
      console.log('what up g');
      callback();
    }).catch((err) => {
      console.error(err);
      alert('Failed to create note. Are all of the fields filled in correctly?');
    });
  };
};

// Changes local note data
reducer.changeNote = (note) => {
  return { type: CHANGE, note };
};

// Attempts to load more notes from the server and inserts them into the local
// note list if successful
reducer.loadMoreNotes = (callback) => {
  return (dispatch, getState) => {
    const state = _.assign({}, initialState, getState().notes);

    let path = '/notes';
    if (state.visibleNotes.length > 0) {
        const oldestNote =_.last(state.visibleNotes);
        path = '/notes?olderThan=' + oldestNote.createdAt;
    }
    api.get(path).then((newNotes) => {
      dispatch(reducer.insertNotes(newNotes));
      callback();
    }).catch(() => {
      alert('Failed to load more notes');
      callback('Failed to load more notes');
    });

  };


};

// Export the action creators and reducer
module.exports = reducer;
