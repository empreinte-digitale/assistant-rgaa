import React, {Component, PropTypes} from 'react';
import {FormattedMessage, intlShape} from 'react-intl';
import renderIf from 'render-if';
import {map, noop, debounce} from 'lodash';
import {ThemeShape} from '../../common/types/theme';
import ThemesListContainer from './ThemesListContainer';
import DevToolsContainer from './DevToolsContainer';
import ThemeContainer from './ThemeContainer';
import Icon from './Icon';

/**
 *
 */
export default class ReferencePage extends Component {
	constructor(props) {
		super(props);
		this.bindThemes = this.bindThemes.bind(this);
		this.toggleStyles = this.toggleStyles.bind(this);
		this.onScroll = debounce(this.props.onScroll, 500);

		this.state = {
			isCssDisabled: false
		};
	}

	componentDidMount() {
		if (!this.themesElement) {
			return;
		}

		if (this.props.initialScrollPosition) {
			this.themesElement.scrollTop = this.props.initialScrollPosition;
		}

		this.themesElement.addEventListener('scroll', this.onScroll, false);
	}

	componentWillUnmount() {
		if (!this.themesElement) {
			return;
		}

		this.themesElement.removeEventListener('scroll', this.onScroll, false);
	}

	bindThemes(domElement) {
		this.themesElement = domElement;
	}

	toggleStyles() {
		this.props.toggleStyles(!this.state.isCssDisabled);
		this.setState((state) => ({
			...state,
			isCssDisabled: !state.isCssDisabled
		}));
	}

	render() {
		const {isCssDisabled} = this.state;

		return (
			<div className="ReferencePage">
				{renderIf(process.env.NODE_ENV !== 'production')(() => (
					<DevToolsContainer />
				))}
				<div className="ReferencePage-actions">
					<ThemesListContainer />
					<button
						className="ActionButton"
						type="button"
						onClick={this.toggleStyles}
						title={this.props.intl.formatMessage({
							id: `ReferencePage.styles.toggle.disabled.${
								isCssDisabled ? 'true' : 'false'
							}`
						})}
					>
						{isCssDisabled ? (
							<Icon name="visible" />
						) : (
							<Icon name="hidden" />
						)}
						<FormattedMessage id="ReferencePage.styles.toggle.label" />
					</button>
				</div>
				<div ref={this.bindThemes} className="ReferencePage-themes">
					{map(this.props.themes, (theme, n) => (
						<ThemeContainer key={n} theme={theme} />
					))}
				</div>
			</div>
		);
	}
}

ReferencePage.propTypes = {
	themes: PropTypes.arrayOf(ThemeShape).isRequired,
	initialScrollPosition: PropTypes.number.isRequired,
	onScroll: PropTypes.func,
	toggleStyles: PropTypes.func.isRequired,
	intl: intlShape.isRequired
};

ReferencePage.defaultProps = {
	onScroll: noop
};
