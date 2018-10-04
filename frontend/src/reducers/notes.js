const _ = require('lodash');
const api = require('../helpers/api');


// The initial state of blog post data
const initialState = {
  visibleNotes: [
    { activeNoteId: -1,
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

  return state;
}

module.exports = reducer;