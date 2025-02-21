import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Done from 'material-ui-icons/Done';

export class CheckboxButtonMessageGenerator extends Component {
	static propTypes = {};

	static defaultProps = {};

	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.onChange = this.onChange.bind(this);
	}

	get initialState() {
		return {};
	}

	onChange({target}) {
		let {
			input: {onChange, value}
		} = this.props;
		if (typeof value === 'string') {
			value = [];
		}
		console.log(target.value);
		console.log(value);

		// if(target.value === 'textarea'){
		//     if (value.find((element, index) => element === 'textarea')) {
		//         onChange([]);
		//         return
		//     } else {
		//         onChange(['textarea']);
		//         return
		//     }
		// } else {
		//     value = value.filter(word => word !== 'textarea');
		// }
		if (!value.find((element, index) => element === target.value)) {
			value.push(target.value);
			onChange(value);
		} else {
			const result = value.filter(word => word !== target.value);
			console.log(result);
			onChange(result);
		}
		console.log(value);
	}

	render() {
		const {
			input,
			type,
			options,
			meta: {touched, error, warning}
		} = this.props;
		return (
			<div>
				{options.map(o => {
					let check =
						input.value &&
						Array.isArray(input.value) &&
						input.value.find(item => item === o.value);
					return (
						<div key={o.value} className="input_radio-wrapper">
							<label htmlFor={o.value} className="input_radio-text">
								{o.title}
							</label>
							<input
								className="input_radio"
								type="radio"
								id={o.value}
								onChange={this.onChange}
								value={o.value}
								checked={check}
							/>

							<div className="input_radio-dot">
								<Done/>
							</div>
						</div>
					);
				})}
				<div className="complaints_input-valid">
					{touched &&
					((error && <span>{error}</span>) ||
						(warning && <span>{warning}</span>))}
				</div>
			</div>
		);
	}
}

export const CheckboxButtonMessageGeneratorStateless = ({
																													input,
																													type,
																													options,
																													meta: {touched, error, warning}
																												}) => {
	const onChange = ({target}) => {
      let targetValue = target.value;
		let {onChange, value} = input;
		if (!Array.isArray(value)) {
			value = [];
		}
		if (value.find((element) => element === targetValue)) {
			const result = value.filter(word => word !== targetValue);
			onChange(result);

			return;
		} else {

			value.push(targetValue);
			onChange(value);

			return;
		}
	};

	return (
		<div>
			{
				options.map((o, index) => {
					let check =
						input.value &&
						Array.isArray(input.value) &&
						input.value.find(item => item === o.value);
					let id = o.value;
					return (
						<label
							htmlFor={id}
              key={index}
              className="input_radio-wrapper">
							<div className="input_radio-text">
								{o.title}
							</div>
							<input
								className="input_radio"
								type="checkbox"
								id={id}
								onChange={onChange}
								value={o.value}
								checked={check}
							/>

							<div className="input_radio-dot">
								<Done/>
							</div>
						</label>
					);
				})
			}
			<div className="complaints_input-valid">
				{touched &&
				((error && <span>{error}</span>) ||
					(warning && <span>{warning}</span>))}
			</div>
		</div>
	);
};
