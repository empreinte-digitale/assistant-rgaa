import {partial} from 'lodash';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import renderIf from 'render-if';
import {
	getConfig,
	getHumanReadableErrors,
	getVersion as getImportVersion,
	isPending,
	isValid
} from '../../common/selectors/imports';
import {getVersion as getReferenceVersion} from '../../common/selectors/reference';
import {
	setErrors,
	setConfig,
	setContent,
	setPending,
	apply,
	reset
} from '../../common/actions/imports';
import {getCsv} from '../../common/api/imports';

/**
 *
 */
export default function ImportForm() {
	const globalVersion = useSelector(getReferenceVersion);

	if (!globalVersion) {
		return null;
	}

	const importVersion = useSelector(getImportVersion);
	const pending = useSelector(isPending);
	const valid = useSelector(isValid);
	const errors = useSelector(getHumanReadableErrors);
	const config = useSelector(getConfig);
	const dispatch = useDispatch();

	const handleFileSelection = (content) => {
		dispatch(setPending(true));
		getCsv(content, config).then(({data, errors: csvErrors}) => {
			dispatch(csvErrors.length ? setErrors(csvErrors) : setContent(data));
			setPending(false);
		});
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		if (valid) {
			dispatch(apply());
		}
	};

	const onFormReset = () => {
		dispatch(reset());
	};

	const onFileChange = (event) => {
		if (!event.target.files || !event.target.files.length) {
			return;
		}
		const reader = new FileReader();
		reader.onloadend = () => {
			handleFileSelection(reader.result);
		};
		reader.readAsText(event.target.files[0]);
	};

	const onTextChange = (name, event) => {
		dispatch(setConfig(name, event.target.value));
	};

	return (
		<form onSubmit={onFormSubmit}>
			<fieldset className="ImportForm-config">
				<legend>Configuration</legend>
				<div className="ImportForm-input">
					<label htmlFor="ImportForm-delimiterInput">
						<FormattedMessage id="Import.delimiter.label" />
					</label>
					<input
						id="ImportForm-delimiterInput"
						name="delimiter"
						type="text"
						onChange={partial(onTextChange, 'delimiter')}
						value={config.delimiter}
					/>
				</div>

				<div className="ImportForm-input">
					<label htmlFor="ImportForm-quoteInput">
						<FormattedMessage id="Import.quoteChar.label" />
					</label>
					<input
						id="ImportForm-quoteInput"
						name="quote"
						type="text"
						onChange={partial(onTextChange, 'quoteChar')}
						value={config.quoteChar}
					/>
				</div>
			</fieldset>

			<div className="ImportForm-file">
				<label htmlFor="ImportForm-fileInput">
					<FormattedMessage id="Import.file.label" />
				</label>
				{/* `value=""` is a dirty trick to allow selection of same file
				multiples times in a row... but this messes up the UI,
				not that great */}
				<input
					id="ImportForm-fileInput"
					className="ImportForm-fileInput"
					name="file"
					type="file"
					accept="application/json"
					onChange={onFileChange}
					value=""
				/>
			</div>

			{renderIf(valid)(() => (
				<p className="ImportForm-success">
					<FormattedMessage id="Import.success" />
				</p>
			))}
			{renderIf(valid && importVersion !== globalVersion)(() => (
				<p className="ImportForm-warning">
					<FormattedMessage
						id="Import.versionDifference"
						values={{
							version: importVersion
						}}
					/>
				</p>
			))}
			{renderIf(pending && !valid)(() => (
				<details className="ImportForm-failure" open={errors.length < 10}>
					<summary>
						<FormattedMessage id="Import.failure" />
					</summary>
					<ul className="ImportForm-errors">
						{errors.map((error, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<li key={i}>{error}</li>
						))}
					</ul>
				</details>
			))}

			<div className="ImportForm-buttons">
				<button
					type="submit"
					disabled={!valid}
					className="ImportForm-button"
				>
					<FormattedMessage id="Import.submit" />
				</button>

				<button
					type="button"
					onClick={onFormReset}
					className="ImportForm-button"
				>
					<FormattedMessage id="Import.reset" />
				</button>
			</div>
		</form>
	);
}
