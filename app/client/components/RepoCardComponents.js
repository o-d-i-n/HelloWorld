import React, { Component } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

class RepoCard extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let cardImg = {
      backgroundImage: 'url(' + this.props.content.img + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '200px'
    }
    return (
      <div className="repo-card col-md-4 col-lg-4">
        <figure>
		      <Link className="pic" to={`/apps/${this.props.content.name}`}>
			       <div style={ cardImg } className="img"></div>
			       <span>{ this.props.content.desc }</span>
          </Link>
		      <figelement>
			      <h3>{ this.props.content.name }</h3>
			      <p>{ this.props.content.type }</p>
		      </figelement>

          <div className="stack-list">
            {
              this.props.content.technologies.map((v,k) => {
                return <i key={k} className={`devicon-${v}-plain colored`}></i>
              })
            }
          </div>

        </figure>
      </div>
    )
  }

}

class RepoCardList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      "cards": []
    }
  }

  componentWillMount() {
    axios.get('/static/dummydata/projects.json')
      .then(res => this.setState(res.data))
      .catch(res => console.log(res))
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
