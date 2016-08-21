import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, NotFoundRoute, Link, browserHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { RepoCard, RepoCardList } from './components/RepoCardComponents'
import { AccCard, AccCardList } from './components/AccCardComponents'
import { RepoDetailsHeader, RepoDetails } from './components/RepoDetails.js'

class Details extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.navUpdate("ToRepo")
  }

  render() {
    return (
        <div className="row">
          <section id="details" className="content col-md-offset-2 col-md-8">
            <RepoDetails n={this.props.params.appName}/>
          </section>
        </div>
    )
  }

}

class People extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.navUpdate("People")
  }

  render() {
    return (
        <AccCardList />
    )
  }

}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.navUpdate("Projects")
  }

  render() {
    return (
        <RepoCardList />
    )
  }

}

class NoMatch extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.navUpdate("404")
  }

  render() {
    return (
      <div className="err-div">
        <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
        <p>Looks like you're snooping around mate!</p>
      </div>
    )
  }

}

class Wrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      "nav": {
        "Projects": true,
        "People": false,
        "404": false
      }
    }
    this.changeRoute = this.changeRoute.bind(this)

  }

  changeRoute(newRoute) {
    let projects = newRoute === "Projects" ? true : false
    let people = newRoute === "People" ? true : false
    let testrepo = newRoute === "ToRepo" ? true : false
    let notFound = newRoute === "404" ? true : false
    this.setState({
      "nav": {
        "Projects": projects,
        "People": people
      }
    })
  }

  render() {
    return (
      <div>
        <div className="main-nav">
          <ul>
            <li className={ this.state.nav["Projects"] ? `active` : `off` }><Link to={`/`}>Projects</Link></li>
            <li className={ this.state.nav["People"] ? `active` : `off` }><Link to={`/people`}>People</Link></li>
          </ul>
        </div>
        <ReactCSSTransitionGroup component="div" style={{ position: 'relative' }} className="container" transitionName="view-transition" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          { React.cloneElement(this.props.children, { key: this.props.location.pathname, navUpdate: this.changeRoute }) }
        </ReactCSSTransitionGroup>
      </div>
    )
  }

}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Wrapper}>
      <IndexRoute component={App}/>
      <Route path="/people" component={People}/>
      <Route path="/apps/:appName" component={Details}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById("mainNode"))
