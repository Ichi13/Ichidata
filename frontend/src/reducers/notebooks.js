const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
const INSERT = 'frontend/notebooks/INSERT';
const REMOVE = 'frontend/notebooks/REMOVE';
const CHANGE = 'frontend/notebooks/CHANGE';

// Notebook data initial state
const initialState = {
  visibleNotebooks: [
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
    // Inserts new notebooks into the local store
    case INSERT: {


      // Add in the new notebooks

      const unsortedNotebooks = _.concat(state.visibleNotebooks, action.notebooks);

      const visibleNotebooks = _.orderBy(unsortedNotebooks, 'createdAt','desc');

      // Return updated state
      return _.assign({}, state, { visibleNotebooks} );
    }
    // Changes a single notebook's data in the local store
    case CHANGE: {
      const visibleNotebooks = _.clone(state.visibleNotebooks);
      const changedIndex = _.findIndex(state.visibleNotebooks, {id: action.notebook.id })
      visibleNotebooks[changedIndex] = action.notebook;
      return _.assign({}, state, { visibleNotebooks });
    }

    // Removes a single notebook from the visible notebooks list
    case REMOVE: {
      const visibleNotebooks = _.reject(state.visibleNotebooks, {id: action.id});
      return _.assign({}, state, { visibleNotebooks });
    }

    default: return state;
  }
}

// Now we define a whole bunch of action creators

// Inserts notebookss into the notebook list
reducer.insertNotebooks = (notebooks) => {
  return { type: INSERT, notebooks };
};

// Removes a notebook from the visible notebook list
reducer.removeNotebook = (id) => {
  return { type: REMOVE, id };
};

// Attempts to delete a notebook from the server and removes it from the visible
// notebook list if successful
reducer.deleteNotebook = (notebookId) => {
     return (dispatch) => {
    api.delete('/notebooks/' + notebookId).then(() => {
      dispatch(reducer.removeNotebook(notebookId));
    }).catch(() => {
      alert('Failed to delete notebook.');
    });
  };
};

// Attempts to update a notebook on the server and updates local notebook data if
// successful
reducer.saveNotebook = (editedNotebook, callback) => {
  return (dispatch) => {
    console.log(editedNotebook.id);
    api.put('/notebooks/' + editedNotebook.id, editedNotebook).then((notebook) => {
      // Saves local notebook.
      dispatch(reducer.changeNotebook(notebook));
      callback();
    }).catch((err) => {
      console.error(err);
      alert('Failed to save notebook.  Are all of the fields filled in correctly?');
    });
  };
};

// Attempts to create a notebook on the server and inserts it into the local notebook
// list if successful
reducer.createNotebook = (newNotebook , callback) => {
  return (dispatch) => {
    api.post('/notebooks', newNotebook).then((notebook) => {
      // This notebook is one that the store returns us! It has notebook id incremented to the next available id
      dispatch(reducer.insertNotebooks([notebook]));
      callback();
    }).catch((err) => {
      console.error(err);
      alert('Failed to create notebook. Are all of the fields filled in correctly?');
    });
  };
};

// Changes local notebook data
reducer.changeNotebook = (notebook) => {
  return { type: CHANGE, notebook };
};

// Attempts to load more notebooks from the server and inserts them into the local
// notebook list if successful
reducer.loadMoreNotebooks = (callback) => {
  return (dispatch, getState) => {
    const state = _.assign({}, initialState, getState().notebooks);

    let path = '/notebooks';
    if (state.visibleNotebooks.length > 0) {
        const oldestNotebook =_.last(state.visibleNotebooks);
        path = '/notebooks?olderThan=' + oldestNotebook.createdAt;
    }
    api.get(path).then((newNotebooks) => {
      dispatch(reducer.insertNotebooks(newNotebooks));
      callback();
    }).catch(() => {
      alert('Failed to load more notebooks');
      callback('Failed to load more notebooks');
    });

  };


};

// Export the action creators and reducer
module.exports = reducer;
