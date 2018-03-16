import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Done from 'material-ui-icons/Done';

export class radioButtonMessageGenerator extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        const {input, type, options, meta: {touched, error, warning}} = this.props;

        return (<div>
            {
                options.map(o =>
                    <div key={o.value} className="input_radio-wrapper">
                        <label htmlFor={o.value} className="input_radio-text">
                            {o.title}
                        </label>
                        <input className="input_radio"
                               type="radio"
                               id={o.value}
                               {...input}
                               value={o.value}
                               checked={o.value === input.value}
                        />

                        <div className="input_radio-dot">
                            <Done/>
                        </div>
                    </div>
                )
            }
            <div className="complaints_input-valid">
                {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
            </div>
        </div>)
    }
}