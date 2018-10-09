const _ = require('lodash');
const api = require('../helpers/api');
const notesActionReducer = require('./notes');

const INSERT = 'blog-frontend/notebooks/INSERT';
const CHANGE = 'blog-frontend/notebooks/CHANGE';
const REMOVE = 'blog-frontend/notebooks/REMOVE';
const SET_ACTIVE = 'blog-frontend/notebooks/SET_ACTIVE';



const initialState = {
  data: [
    { id: 5,
      title: "Example 1",
      createdAt: "2018-10-11T23:26:36.000Z",
      updatedAt: "2018-10-11T23:26:36.000Z"
    },
    {id: 4,
     title: "Example 2",
     createdAt: "2018-10-11T23:18:08.000Z",
     updatedAt: "2018-10-11T23:18:08.000Z"
    },
  ],
  activeNotebookId: -1,
  notes: [],
};

function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {

    case INSERT: {
      const unsortedNotebooks = _.concat(state.data, action.notebooks);
      const data = _.orderBy(unsortedNotebooks, 'createdAt','desc');
      return _.assign({}, state, {data} );
    }
    case CHANGE: {
      const data = _.clone(state.data);
      const changedIndex = _.findIndex(state.data, {id: action.notebook.id })
      data[changedIndex] = action.notebook;
      return _.assign({}, state, {data});
    }
    case REMOVE: {
      const data = _.reject(state.data, {id: action.id});
      return _.assign({}, state, {data});
    }
    case SET_ACTIVE: {
    	return _.assign({}, state, { activeNotebookId: action.notebookId });
    }

    default: return state;
  }
}


reducer.insertNotebooks = (notebooks) => {
  return { type: INSERT, notebooks };
};

reducer.removeNotebook = (id) => {
  return { type: REMOVE, id };
};

reducer.deleteNotebook = (notebookId) => {
   return (dispatch) => {
     api.delete('/notebooks/'+ notebookId)
     .then(() => {notesActionReducer
       dispatch(reducer.removeNotebook(notebookId));
     }).catch(() => {
       alert('Failed to delete');
     });
   };
};

reducer.saveNotebook = (editedNotebook, callback) => {
  return (dispatch) => {
    api.put('/notebooks/' + editedNotebook.id, editedNotebook).then((notebook) => {
      dispatch(reducer.changeNotebook(notebook));
      callback();
    }).catch(() => {
      alert('Failed to save notebook.');
    });
  };
};


reducer.createNotebook = (newNotebook, callback) => {
  return (dispatch) => {
    api.post('/notebooks', newNotebook).then((notebook) => {
      dispatch(reducer.insertNotREMOVEebooks([notebook]));
      callback();
    }).catch(() => {
      alert('Failed to create notebook.');
    });
  };
};

reducer.changeNotebook = (notebook) => {
  return { type: CHANGE, notebook };
};

reducer.loadData = (notebookId) => {
	return (dispatch) => {
      dispatch({ type: SET_ACTIVE, notebookId });
      dispatch(notesActionReducer.loadNotes(notebookId));
  };
};

module.exports = reducer;
