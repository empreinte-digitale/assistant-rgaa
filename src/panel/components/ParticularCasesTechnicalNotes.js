import React, {PropTypes} from 'react';
import {injectIntl} from 'react-intl';
import renderIf from 'render-if';

function ParticularCasesTechnicalNotes({data}) {
	return (
		<div className="Particular-cases-container">
			<div className="Particular-cases">
				{renderIf(data !== null)(() =>
					data.map((values, i) => {
						if (typeof values === 'string') {
							return (
								<div
									// eslint-disable-next-line react/no-array-index-key
									key={i}
									// eslint-disable-next-line react/no-danger
									dangerouslySetInnerHTML={{__html: values}}
								/>
							);
						}
						return Object.values(values).map((value, k) => (
							<div
								// eslint-disable-next-line react/no-array-index-key
								key={k}
								// eslint-disable-next-line react/no-danger
								dangerouslySetInnerHTML={{__html: value}}
							/>
						));
					})
				)}
			</div>
		</div>
	);
}

ParticularCasesTechnicalNotes.propTypes = {
	data: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

ParticularCasesTechnicalNotes.defaultProps = {
	data: null
};

export default injectIntl(ParticularCasesTechnicalNotes);
