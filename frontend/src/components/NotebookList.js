const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');//*

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const Notebook = require('./Notebook');//*
const ActiveNotebook = require('./ActiveNotebook');//*
const NotebookView = require('./NotebookView');//*
const NotebookNew = require('./NotebookNew');//*
/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NotebookList extends React.Component {
  constructor(props) {//*
    super(props);
    this.state = { loading: false };
  }

  render() {
    const onLoadButtonClick = () => {
      if(!this.state.loading) {
        this.setState({ loading: true });
        this.props.loadMorePosts(() => {
          this.setState({ loading: false });
        });
      }
    };

    const createNotebookListItem = (notebook) => {
     if(notebook.id === this.props.activeNotebookId) {
     return (
         <ActiveNotebook
          key={Notebook.id}
          Notebook={Notebook}
          data={this.props.data}
          />
     );
    }
     return (
         <Notebook
          key={notebook.id}
          notebook={notebook}
          saveNotebook={this.props.saveNotebook}
          loadData={this.props.loadData}
          deleteNotebook={this.props.deleteNotebook}
        />
     );
    }

    return (
      <div className="row">
        <div className="blog-main">
          <h2>Notebooks</h2>
          <NotebookNew
              createNotebook={this.props.createNotebook}
          />
          <ul>
            {this.props.notebooks.data.map(createNotebookListItem)}
          </ul>
        </div>
      </div>

    );
  }
}

const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebooks: state.notebooks,
    activeNotebookId: state.activeNotebookId,
    data: state.data,
  }),
  createActionDispatchers(notebooksActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
