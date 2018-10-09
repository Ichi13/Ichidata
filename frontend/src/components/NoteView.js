const React = require('react');
const moment = require('moment');


const NoteMeta = (props) => {
  return (
    <div className="blog-note-meta">

      <a role="button" title="Delete note"
        onClick={props.onDelete}>
      <span className="fa fa-remove" />
        </a>
    </div>
  );

};



const NoteView = (props) => {

  return (
    <div className="blog-note">
      <h3 className="blog-note-title">{props.note.title}</h3>
      <NoteMeta {...props}/>
      <div className='blog-note-content'>{props.note.content}</div>
    </div>
  );

};


module.exports = NoteView;
