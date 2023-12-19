import {lifecycle} from 'recompose';
import frontmatter from 'frontmatter';
import {marked} from 'marked';
import {replaceLocalUrls} from '../../common/api/markdown';
import MarkdownPage from './MarkdownPage';

/**
 *
 */
const enhance = lifecycle({
	componentDidMount() {
		const basePath = `data/pages/${this.props.name}`;
		const url = browser.extension.getURL(`${basePath}/index.md`);

		fetch(url)
			.then((response) => response.text())
			.then(frontmatter)
			.then(({data, content}) => {
				this.setState({
					title: data.title,
					html: marked(replaceLocalUrls(content, basePath))
				});
			});
	}
});

export default enhance(MarkdownPage);
