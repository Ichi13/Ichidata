const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
// Action type constants
const INSERT = 'blog-frontend/Notebooks/INSERT';
const CHANGE = 'blog-frontend/Notebooks/CHANGE';
const REMOVE = 'blog-frontend/Notebooks/REMOVE';
/* *** TODO: Put action constants here *** */

const initialState = {
  visibleNotebooks: [
    {
      activeNotebookId: -1,
      activeNote: null,
      notes: [],
    }

  ]
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
 case INSERT: {


      // Add in the new posts
      // Notice that we do not need to increment the post id. Since the post that we
      // are putting in is one that is returned by the api server which already has
      // the id incremented.
      const unsortedPosts = _.concat(state.visiblePosts, action.posts);

      const visiblePosts = _.orderBy(unsortedPosts, 'createdAt','desc');

      // Return updated state
      return _.assign({}, state, { visiblePosts} );
    }
    // Changes a single post's data in the local store
    case CHANGE: {
      const visiblePosts = _.clone(state.visiblePosts);
      const changedIndex = _.findIndex(state.visiblePosts, {id: action.Notebook.id })
      visiblePosts[changedIndex] = action.Notebook;
      return _.assign({}, state, { visiblePosts });
    }

    // Removes a single post from the visible post list
    case REMOVE: {
      const visibleNotebooks = _.reject(state.visibleNotebooks, {id: action.NotebookId});
      return _.assign({}, state, { visibleNotebooks });
    }

    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */

// Inserts Notebooks into the Notebook list
reducer.insertNotebook = (Notebooks) => {
  return { type: INSERT, NotebooksId };
};

// Removes a Notebook from the visible Notebook list
reducer.removeNotebook = (NotebookId) => {
  return { type: REMOVE, NotebookId };
};

// Attempts to delete a Notebook from the server and removes it from the visible
// Notebook list if successful
reducer.deleteNotebook = (NotebookId) => {
   // TODO Section 8: Add code to perform delete
   return (dispatch) => {
    api.delete('/Notebooks/' + NotebookId ).then(() => {
      // Saves local Notebook.
      dispatch(reducer.removeNotebook(NotebookId));
    }).catch(() => {
      alert('Failed to delete Notebook.  Are all of the fields filled in correctly?');
    });
  };
};

// Attempts to update a Notebook on the server and updates local Notebook data if
// successful
reducer.saveNotebook = (editedNotebook, callback) => {
  return (dispatch) => {
    api.put('/Notebooks/' + editedNotebook.id, editedNotebook).then((Notebook) => {
      // Saves local Notebook.
      dispatch(reducer.changeNotebook(Notebook));
      callback();
    }).catch(() => {
      alert('Failed to save Notebook.  Are all of the fields filled in correctly?');
    });
  };
};

// Attempts to create a Notebook on the server and inserts it into the local Notebook
// list if successful
reducer.createNotebook = (newNotebook, callback) => {
  return (dispatch) => {
    api.Notebook('/Notebooks', newNotebook).then((Notebook) => {
      // This Notebook is one that the store returns us! It has Notebook id incremented to the next available id
      dispatch(reducer.insertNotebooks([Notebook]));
      callback();
    }).catch(() => {
      alert('Failed to create Notebook. Are all of the fields filled in correctly?');
    });
  };
};

// Changes local Notebook data
reducer.changeNotebook = (Notebook) => {
  return { type: CHANGE, Notebook };
};

// Attempts to load more Notebooks from the server and inserts them into the local
// Notebook list if successful
reducer.loadMoreNotebooks = (callback) => {
  return (dispatch, getState) => {
    const state = _.assign({}, initialState, getState().Notebooks);

    let path = '/Notebooks';
    if (state.visiblePosts.length > 0) {
        const oldestPost =_.last(state.visiblePosts);
        path = '/Notebooks?olderThan=' + oldestPost.createdAt;
    }
    api.get(path).then((newPosts) => {
      dispatch(reducer.insertNotebooks(newPosts));
      callback();
    }).catch(() => {
      alert('Failed to load more Notebooks');
      callback('Failed to load more Notebooks');
    });

  };


};

// Export the action creators and reducer
module.exports = reducer;

