import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link} from 'react-router-dom';
import renderIf from 'render-if';
import Icon from './Icon';

/**
 *
 */
const Header = ({
	referenceVersion,
	inPopup,
	title,
	onOptionsClick,
	onTogglePopup
}) => {
	const intl = useIntl();

	return (
		<header className="Header">
			<h1 className="Header-title">
				{renderIf(inPopup)(() => `${title} | `)}
				RGAA v{referenceVersion}
			</h1>

			<div className="Header-actions">
				<Link className="Header-themes Link" to="/">
					<FormattedMessage id="Header.themes" />
				</Link>

				<Link className="Header-help Link" to="/help">
					<FormattedMessage id="Header.help" />
				</Link>

				<div className="Header-dock" />

				<button
					type="button"
					onClick={onOptionsClick}
					className="Header-options Link"
					title={intl.formatMessage({id: 'Header.options'})}
				>
					<Icon
						name="cog"
						title={intl.formatMessage({id: 'Header.options'})}
					/>
				</button>
			</div>
		</header>
	);
};

Header.propTypes = {
	referenceVersion: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	inPopup: PropTypes.bool.isRequired,
	onOptionsClick: PropTypes.func.isRequired,
	onTogglePopup: PropTypes.func.isRequired
};

export default Header;
