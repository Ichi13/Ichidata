const React = require('react');
const moment = require('moment');
const NoteList = require('./NoteList');

const NotebookMeta = (props) => {
  return (
    <div className="blog-notebook-meta">

      <a role="button" title="Delete notebook"
        onClick={props.onDelete}>
      <span className="fa fa-remove" />
        </a>
    </div>
  );
};

class NotebookView extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
      const onClickNotebook = (event) => {
    	event.preventDefault();
    	this.props.loadData(this.props.notebook.id);
  };

  return (
    <div className="blog-notebook">
      <h3 className="blog-notebook-title">
        <a onClick={onClickNotebook}>
        <li>{this.props.notebook.title}</li>
        </a>
      </h3>

      <NotebookMeta {...this.props}/>
    </div>
  );
};
}



module.exports = NotebookView;
