/**
 * The Home component contains the bulk of the user interface. Other React
 * components for viewing notes and notebooks are nested beneath the Home
 * component.
 */

const React = require('react');
const NotebookList = require('./NotebookList');

/* *** TODO: Create and export the Home component from here *** */
  const Home = () => (
    <div>
      {/* The heading area of the page */}
      <div className="blog-header">
        <h1 className="blog-title">Neverwrote</h1>
        <p className="lead blog-description">Go easy on me</p>
      </div>
      {/* A list of blog posts, including a couple of buttons */}
      <NotebookList/>
    </div>
  );



module.exports = Home;