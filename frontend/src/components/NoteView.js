const React = require('react');
const moment = require('moment');

/**
 * Render edit/delete buttons and Note timestamp.
 *
 * List of props: Note, time, onEdit, onDelete
 */

const NoteMeta = (props) => {
  return (
    <div className="blog-Note-meta">
      <a role="button" title="Edit Note"
        style={{ paddingRight: '8px' }}
        onClick={ props.onEdit }
      >
        <span className="fa fa-eocker-compose run --rm frontend gulpdit" />
      </a>

      {/* TODO Section 8: Add a delete button */}
       <a role="button" title="Delete Note"
        style={{ paddingRight: '8px' }}
        onClick={ props.onDelete }
        >
      <span className="fa fa-remove" />
       </a>
      { moment(props.Note.createdAt).from(props.time.now) }
    </div>
  );
};

/**
 * A read-only view of a blog Note.ocker-compose run --rm frontend gulp
 * This is a stateless functional component.
 * It takes props as its args and returns what the render method would return.
 *
 * List of props: Note, time, onEdit, onDelete
 */
const NoteView = (props) => {
  return (
    <div className="blog-Note">
      <h2 className="blog-Note-title">{props.Note.title}</h2>

      {/* TODO Section 4: Display blog metadata */}

     <NoteMeta
{...props} />

      {/* TODO Section 4: Display blog content */}
     <div className= "blog-Note-content">{props.Note.content} </div>
    </div>
  );
};

module.exports = NoteView;
