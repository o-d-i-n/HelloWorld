import React, {PropTypes, Component} from 'react'
import marked from 'marked'

class Markdown extends Component {

	constructor(props) {
		super(props)
		marked.setOptions({
			gfm: true,
			tables: true,
			breaks: false,
			pedantic: false,
			sanitize: false,
			smartLists: true,
			smartypants: false
		})
	}

	render() {
		const  text  = this.props.desc.replace(/\\n/g,"\n")
		const html = marked(text || '')

		return (
			<div>
				<div dangerouslySetInnerHTML={{__html: html}}/>
			</div>
		)
	}
}

Markdown.propTypes = {
	text: React.PropTypes.string.isRequired
};

Markdown.defaultProps = {
	text: ''
};

export {Markdown}
