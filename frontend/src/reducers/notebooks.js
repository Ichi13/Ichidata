const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
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

    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */

// Export the action creators and reducer
module.exports = reducer;
