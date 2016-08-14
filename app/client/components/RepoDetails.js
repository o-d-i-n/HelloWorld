import React, { Component } from 'react'
import { Markdown } from '../utils/Markdown.js'
import axios from 'axios'

class RepoDetailsHeader extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let iconImg = {
      backgroundImage: 'url(' + this.props.icon + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }
    return(
      <header className="row">
        <div className="icon img-responsive col-xs-12 col-md-3" style={ iconImg } ></div>
        <div className="col-md-9">
          <div className="row">
            <div className="head">
              <h1>{this.props.name}</h1>
              <h4 className="tagline">{ this.props.desc }</h4>
	            <ul className="categories">
							{ this.props.technologies.map(c => <li className="grey-text">{c}</li>) }
              </ul>
            </div>
          </div>
          <div className="row git-details">
            <div className="col-md-8">
	            <h6>Contributers</h6>
							<ul className="categories">
							{ Object.keys(this.props.contributors).map((c,k) => <li key={k}><a className="grey-text" href={"https://www.github.com/"+this.props.contributors[c]}>{c}</a></li>) }
							</ul>
            </div>
            <div className="text-right col-md-4">
              <a className="btn btn-default btn-lg github" href={`https://www.github.com/o-d-i-n/${this.props.name}`}>
                <img src="/static/images/GitHub-Mark-64px.png"/>
                <img src="/static/images/GitHub_Logo.png"/>
              </a>
            </div>
          </div>
        </div>
      </header>
    )
  }

}

class RepoDetailsDesciption extends Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return(
			<div className="details row">
        <Markdown desc={this.props.long_desc}/>
			</div>
		)
	}

}

class RepoDetailsMeta extends Component {

	constructor(props) {
		super(props)
		this.state={}
	}

	render() {

		let rows=[];

		for (const index in this.props.meta) {
			rows.push(
        <li className="text-center col-md-3 col-xs-12 col-sm-4">
          <h3 className="details-heading">{ index }</h3>
          <div className="details-content">{ this.props.meta[index] }</div>
			  </li>
      )
		}

		return(
			<section className="meta">
				<ul className="row">{ rows }</ul>
			</section>
		)
	}

}

class RepoDetails extends Component {

  constructor(props) {
    super(props)
    //It's just a workaround to stop TypeErrors.
    //TODO: Look for a better solution
    this.state = {
      "technologies": [],
			"contributors": {},
      "images": [],
      "meta": {},
      "long_desc": ""
    }
  }

  componentWillMount(){
    axios.get(`/static/dummydata/apps/${this.props.n}.json`)
      .then(res => this.setState(res.data))
      .catch(res => console.log(res))
  }

  render() {
    return(
			<div>
        <RepoDetailsHeader technologies={this.state.technologies} name={this.props.n} type={this.state.type} desc={this.state.desc} icon={this.state.icon} contributors={this.state.contributors} />
				<RepoDetailsDesciption long_desc={this.state.long_desc} />
				<hr/>
				<RepoDetailsMeta meta={this.state.meta} />
			</div>
    )
  }

}

export {RepoDetailsHeader, RepoDetails}
