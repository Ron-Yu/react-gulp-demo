const React = require('react');
const ReactDOM = require('react-dom');
const Home = require('./components/homePage');

const basic = require('./basic');

ReactDOM.render(<Home />, document.getElementById('example'));

console.log(basic.uiui);
