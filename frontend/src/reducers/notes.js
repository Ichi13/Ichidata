const _ = require('lodash');
const api = require('../helpers/api');
const notesbooksActionReducer = require('./notebooks');

const INSERT = 'blog-frontend/notes/INSERT';
const CHANGE = 'blog-frontend/notes/CHANGE';
const REMOVE = 'blog-frontend/notes/REMOVE';
const FETCH = 'blog-frontend/notes/FETCH';
const GET_NOTES = 'blog-frontend/notebooks/GET_NOTES';

const initialState = {
  notes: [
    { id: 5,
      title: "Example 1",
      content: "stuff",
      notebookId: 5,
    },
    {id: 4,
     title: "Example 2",
     content: "more stuff",
     notebookId: 4,
    },
  ],
};

function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {

    case INSERT: {
      const unsortedNotes = _.concat(state.notes, action.notes);
      const notes = _.orderBy(unsortedNotes, 'createdAt','desc');
      return _.assign({}, state, {notes} );
    }
    case CHANGE: {
      const notes = _.clone(state.notes);
      const changedIndex = _.findIndex(state.notes, {id: action.note.id })
      notes[changedIndex] = action.note;
      return _.assign({}, state, {notes});
    }
    case REMOVE: {
      (action.id);
      const notes = _.reject(state.notes, {id: action.id});
      return _.assign({}, state, {notes});
    }
    case FETCH: {
    	return _.assign({}, state, { activeNotebookId: action.notebookId, notes: action.notes });
    }

    case GET_NOTES: {
      const notes = _.orderBy(action.notes, 'createdAt','desc');
      return _.assign({}, state, {notes} );
    }

    default: return state;
  }
}


reducer.insertNotes = (notes) => {
  return { type: INSERT, notes };
};

reducer.removeNote = (id) => {
  return { type: REMOVE, id };
};

reducer.deleteNote = (noteId) => {
   return (dispatch) => {
     api.delete('/notes/'+ noteId)
     .then(() => {
       dispatch(reducer.removeNote(noteId));
     }).catch(() => {
       ('Failed to delete');
     });
   };
};

reducer.saveNote = (editedNote, callback) => {
  return (dispatch) => {
    api.put('/notes/' + editedNote.notebookId, editedNote).then((note) => {
      dispatch(reducer.changeNote(note));
      callback();
    }).catch(() => {
      ('Failed to save note.');
    });
  };
};




reducer.createNote = (newNote, callback) => {
  return (dispatch) => {
    api.post('/notes', newNote).then((notes) => {
      dispatch(reducer.insertNotes(notes));
      callback();
    }).catch(() => {
      ('Failed to create note.');
    });
  };
};

reducer.changeNote = (note) => {
  return { type: CHANGE, note };
};

// reducer.loadNotes = (notebookId) => {
// 	return (dispatch) => {reducer.changeNote = (note) => {
//     api.get('/notebooks/' + notebookId + '/notes').then((data) => {
//       dispatch({ type: UPDATE, notebookId, data })
//     });
//   };
//  };
// };

reducer.loadNotes = (notebookId) => {
	return (dispatch) => {
    api.get('/notebooks/' + notebookId + '/notes').then((notes) => {
      dispatch({ type: GET_NOTES, notebookId, notes })
    }).catch((error) => {
      (error);
    });
 };
};

module.exports = reducer;
