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
      <div className="mem-card col-sm-6 col-md-3 col-lg-3 col-xs-12">
      	<figure className="img-circle">
					<div className="img front img-circle" style={ bgImg }></div>
					<div className="img back img-circle">
						<div className="info">
							<p>{ this.props.content.name }</p>
							<p>{ this.props.content.post }</p>
						</div>
						<div className="share">
			    	{
			      	this.props.content.contacts.map((r,s) => {
								return <a key={s} className="contact" href={r.link}><i className={`fa fa-${r.name}-square fa-lg`} aria-hidden="true"></i></a>
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
    axios.get('/api/members/')
      .then(res => this.setState({"members": res.data}))
      .catch(res => console.log(res))
  }

  render() {
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
