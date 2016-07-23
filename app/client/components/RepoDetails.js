import React, { Component } from 'react'
import axios from 'axios'

class RepoDetailsHeader extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <header className="row">
        <img className="icon img-responsive col-xs-12 col-md-3" src={this.props.icon} alt=""/>
        <div className="col-md-9">
          <div className="row"> 
            <div className="head">
              <h1>{this.props.name}</h1>
              <h4 className="tagline">{this.props.desc}</h4>
	      <ul className="categories">
	       { this.props.technologies.map(c => <li>{c}</li>)}
              </ul>
            </div>
          </div>

          <div className="row git-details">
            <div className="col-md-6">
              <h7>Contributers</h7>
              <p>{this.props.contributors}</p>
            </div>

            <div className="text-right col-md-6">
              <button className="github">
                <img src="/static/images/GitHub-Mark-64px.png"/>
                <img src="/static/images/GitHub_Logo.png"/>
              </button>
            </div>
          </div>
        </div>
          
      </header>
    )
  }
}

class Gallery extends Component {
	constructor(props){
		super(props)
		this.state={}
	}	

	render() {
		if (this.props.images) {
			return(
				<div className="gallery row">
					<ul>
						{this.props.images.map(c => <li><img src={c}/></li>)}
					</ul>
				</div>
			)
		}
		else
			return(
				<div className="gallery">
				</div>
			)
	}
}

class RepoDetailsDesciption extends Component {
	constructor(props) {
		super(props)
		this.state={}
	}

	render() {
		return(
			<div className="details row">
			{this.props.long_desc.split("\n").map(p=><p>{p}</p>)}
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
			rows.push(<li className="text-center col-md-3 col-xs-12 col-sm-4">
				<h3 className="details-heading">{index}</h3>
				<div className="details-content">{this.props.meta[index]}</div>
			</li>);
		}
		return(
			<section className="meta">
				<header className="row">
					<h2>Additional Information</h2>
				</header>

				<ul className="row">
				{
					rows
				}
				</ul>
			</section>
		)
	}
}

class RepoDetails extends Component {

  constructor(props) {
    super(props)
    //It's just a workaround to stop TypeErrors.
    //TODO: Look for a better solution
    this.state={
    	"technologies": [],
	"images": [],
	"meta":{},
	"long_desc":""
    }
  }

  componentWillMount(){
    axios.get(`/static/dummydata/apps/${this.props.n}.json`)
      .then(res => this.setState(res.data))
      .catch(res => console.log(res))
  }

  render() {
    console.log("State : "+this.state)
    return(
			<div>
        <RepoDetailsHeader technologies={this.state.technologies} name={this.props.n} type={this.state.type} desc={this.state.desc} icon={this.state.icon} contributors={this.state.contributors} />
				<Gallery images={this.state.images}/>
				<RepoDetailsDesciption long_desc={this.state.long_desc} />
				<hr/>
				<RepoDetailsMeta meta={this.state.meta}/>
			</div>
    )
  }
}

export {RepoDetailsHeader, RepoDetails}
