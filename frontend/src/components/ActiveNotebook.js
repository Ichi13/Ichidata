const React = require('react');

class ActiveNotebook extends React.Component {
  render() {
    return (
    	<li>
         {this.props.notebook.title}
         <ol>
           {this.props.data.map(track => <li key={track.id}>{track.title}{track.content}</li>)}
         </ol>
      </li>
    );
  }
}

module.exports = ActiveNotebook;
