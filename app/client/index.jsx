import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, NotFoundRoute, Link, browserHistory } from 'react-router';

class About extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <p>About section! Go back to</p>
        <Link to={`/`}>Home</Link>
      </div>
    )
  }

}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <p>Hello Folks! Go back to</p>
        <Link to={`/`}>Home</Link>
        <Link to={`/about`}>About</Link>
        <Link to={`/not`}>Not Found</Link>
      </div>
    )
  }

}

class NoMatch extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <p>Invalid scope! Go back to</p>
        <Link to={`/`}>Home</Link>
      </div>
    )
  }

}

class Wrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Wrapper}>
      <IndexRoute component={App}/>
      <Route path="/about" component={About}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById("mainNode"))
