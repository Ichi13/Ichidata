const React = require('react');
const moment = require('moment');
const NoteList = require('./NoteList');
const api = require('../helpers/api');

 // MetaData
const NoteMeta = ({ note, onDelete, onEdit }) => (
  <div className="note-meta">
  <a role="button" title="Delete note"
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
  </div>
);

// A read-only view of a note.
const NoteView = ({ note, onDelete, onEdit }) => (
  <div className="note">
    <h2 className="note-title">
      <a role="button">
        {note.title}
      </a>
    </h2>
    <div className="blog-post-content">{note.content}</div>
    <NoteMeta note={note} onEdit={onEdit} onDelete={onDelete}/>
  </div>
);

module.exports = NoteView;