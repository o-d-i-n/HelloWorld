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
		console.log("In Markdown");
		const  text  = this.props.desc,
		html = marked(text || '');
		console.log(text);
		return (
			<div>
				<div dangerouslySetInnerHTML={{__html: html}}/>
			</div>
		);
	}
}

Markdown.propTypes = {
	text: React.PropTypes.string.isRequired
};

Markdown.defaultProps = {
	text: ''
};

export {Markdown}
