const React = require('react');
const ReactRedux = require('react-redux');
const Notebook = require('./Notebook');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NotebookList extends React.Component {
   constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { loading: false };
  }
  render() {
    const createNotebookListItem = (notebook) => {
      return (

        <li key={notebook.id}>
          <Notebook
            Notebook={notebook}
          />
        </li>
      )
    }

    return (
      <div>
        <h2>Notebooks</h2>
        <ul>

          {this.props.notebooks.visibleNotebooks.map(createNotebookListItem)}
        </ul>
      </div>
    );
  }
}

const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebooks: state.notebooks
  }),
  createActionDispatchers(notebooksActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
