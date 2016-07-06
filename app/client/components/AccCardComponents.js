import React, { Component } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

class AccCard extends Component{

	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		let bgImg = {
			backgroundImage: 'url(' + this.props.content.img + ')',
			width: '100%'
		}

		return (
      <div className="mem-card col-md-4 col-lg-4 col-xs-8 col-centered">
      	<figure>
		    <Link className="img front" style={ bgImg } to={`/not`}></Link>
			<div className="img back">
				<span>{ this.props.content.name }</span>
				<span>{ this.props.content.post }</span>
				<div className="share">
			      {
			        this.props.content.contact.map((r,s) => {
			        	return this.props.content.contact_link.map((v,k) => {
			        		return <a key={s} className="contact" href={v}><i key={s} className={`fa fa-${r}-square`} aria-hidden="true"></i></a>
			        	})
			        })
			      }
			    </div>
			</div>
		</figure>
      </div>
    )
  }

}

class AccCardList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      "members": []
    }
  }

  componentWillMount() {
    axios.get('/static/dummydata/projects2.json')
      .then(res => this.setState(res.data))
      .catch(res => console.log(res))
  }

  render() {
    console.log(this.state)
    return (
      <div className="row">
        {
          this.state.members.map((c,k) => {
            return <AccCard key={k} content={c} />
          })
        }
      </div>
    )
  }

}

export { AccCard, AccCardList }