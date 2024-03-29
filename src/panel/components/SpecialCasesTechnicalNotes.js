import React, {PropTypes} from 'react';
import {injectIntl} from 'react-intl';
import renderIf from 'render-if';

function SpecialCasesTechnicalNotes({data}) {
	return (
		<div className="SpecialCases">
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
	);
}

SpecialCasesTechnicalNotes.propTypes = {
	data: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

SpecialCasesTechnicalNotes.defaultProps = {
	data: null
};

export default injectIntl(SpecialCasesTechnicalNotes);
