const React = require('react');
const moment = require('moment');
const NoteList = require('./NoteList');
const api = require('../helpers/api');
/**
 * Render edit/delete buttons and post timestamp.
 */
const NotebookMeta = ({ notebook, onDelete, onEdit }) => (
  <div className="notebook-meta">
  <a role="button" title="Delete notebook"
    style={{ paddingRight: '8px' }}
    onClick={ onDelete }
  >
  <span className="fa fa-remove" />
  </a>
   <a role="button" title="Edit post"
      style={{ paddingRight: '8px' }}
      onClick={ onEdit }
    >
      <span className="fa fa-edit" />
    </a>
     {/* TODO Task 7: Add a delete button */}
  </div>
);


/**
 * A read-only view of a notebook.
 * This is a pure functional component.
 * It takes props as its args and returns what the render method would return.
  */
  // Add code for delete
const NotebookView = ({ notebook, onDelete, onEdit, showNotes }) => (
  <div className="notebook">
    <h2 className="notebook-title">
      <a role="button" onClick={showNotes}>
        {notebook.title}
      </a>
    </h2>
    <NotebookMeta notebook={notebook} onEdit={onEdit} onDelete={onDelete}/>
  </div>
);

module.exports = NotebookView;
