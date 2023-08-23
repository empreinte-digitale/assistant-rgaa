import React from 'react';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import classNames from 'classnames';
import createColor from 'color';

/**
 *
 */
const isValidColor = (color) => {
	try {
		createColor(color);
		return true;
	} catch (e) {
		return false;
	}
};

/**
 *
 */
const ColorInput = ({id, color, onChange, children}) => {
	const intl = useIntl();
	const handleChange = (event) => onChange(event.target.value);

	const isInvalid = !isValidColor(color);
	const className = classNames({
		'Form-input': true,
		isInvalid
	});

	const inputProps = {
		id,
		className,
		type: 'text',
		value: color,
		onChange: handleChange,
		'aria-invalid': isInvalid
	};

	if (isInvalid) {
		inputProps.title = intl.formatMessage({
			id: 'ColorInput.invalidFormatError'
		});
	}

	return (
		<div className="ColorInput">
			<input {...inputProps} />

			<div
				className="ColorInput-sample"
				aria-hidden="true"
				title={intl.formatMessage({
					id: 'ColorInput.sample'
				})}
				style={{
					backgroundColor: color
				}}
			/>

			{children}
		</div>
	);
};

ColorInput.propTypes = {
	id: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
};

export default ColorInput;
