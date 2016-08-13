import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, NotFoundRoute, Link, browserHistory } from 'react-router';
import { RepoCard, RepoCardList } from './components/RepoCardComponents'
import { AccCard, AccCardList } from './components/AccCardComponents'
import { RepoDetailsHeader, RepoDetails } from './components/RepoDetails.js'

class Details extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.navUpdate("TestRepo")
  }

  render() {
    return (
      <section id="details" className="content col-md-offset-2 col-md-8">
        <RepoDetails n={this.props.params.appName}/>
      </section>
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
      <div className="container">
        <AccCardList />
      </div>
    )
  }

}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.navUpdate("Home")
  }

  render() {
    return (
      <div className="container">
        <RepoCardList />
      </div>
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
      <p>Invalid scope! Go back to</p>
    )
  }

}

class Wrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      "nav": {
        "Home": true,
        "People": false,
        "404": false
      }
    }
    this.changeRoute = this.changeRoute.bind(this)

  }

  changeRoute(newRoute) {
    console.log(newRoute)
    let home = newRoute === "Home" ? true : false
    let people = newRoute === "People" ? true : false
    let testrepo = newRoute === "TestRepo" ? true : false
    let notFound = newRoute === "404" ? true : false
    this.setState({
      "nav": {
        "Home": home,
        "People": people,
        "404": notFound
      }
    })
  }

  render() {
    return (
      <div>
        <div className="main-nav">
          <ul>
            <li className={ this.state.nav["Home"] ? `active` : `off` }><Link to={`/`}>Home</Link></li>
            <li className={ this.state.nav["People"] ? `active` : `off` }><Link to={`/people`}>People</Link></li>
            <li className={ this.state.nav["404"] ? `active` : `off` }><Link to={`/not`}>404</Link></li>
          </ul>
        </div>
        { React.cloneElement(this.props.children, { navUpdate: this.changeRoute }) }
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
