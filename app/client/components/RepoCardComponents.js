import React, { Component } from 'react'

class RepoCard extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="repo-card col-md-4 col-lg-4">
        <figure>
		      <div className="pic">
			       <div className="img"></div>
			       <span>{ this.props.content.desc }</span>
          </div>
		      <figelement>
			      <h3>{ this.props.content.name }</h3>
			      <p>{ this.props.content.type }</p>
		      </figelement>
        </figure>
        <div className="stack-list">
          {
            this.props.content.technologies.map((v,k) => {
              return <i key={k} className={`devicon-${v}-plain colored`}></i>
            })
          }
        </div>
      </div>
    )
  }

}

class RepoCardList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      "cards": [
        {
          "name": "HelloWorld",
          "type": "Web-Application",
          "desc": "A webapp built with trending frameworks",
          "technologies": [
            "bootstrap",
            "css3",
            "django",
            "html5",
            "react"
          ]
        },
        {
          "name": "EvilWords",
          "type": "Command-Line Tool",
          "desc": "Python-App that takes care of words you type",
          "technologies": [
            "python"
          ]
        }
      ]
    }
  }

  render() {
    return (
      <div className="row">
        {
          this.state.cards.map((c,k) => {
            return <RepoCard key={k} content={c} />
          })
        }
      </div>
    )
  }

}

export { RepoCard, RepoCardList }
