import React, { Component } from 'react'
import axios from 'axios'

class IssuesWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  render() {
    return (
      <div className="row">
        {
          this.state.data.map((issue, i) => {
            return <Issue meta={issue} key={i}/>
          })
        }
      </div>
    )
  }

}

class Issue extends Component {

  constructor() {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <a href="#">
        <div>Placeholder</div>
      </a>
    )
  }

}

export { IssuesWrapper }
