import React, {Component} from 'react';
import Done from 'material-ui-icons/Done';

export class InputRadio extends Component {

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
        const {style, checked,id,onChange,name,value, label} = this.props;

        return (
            <div style={style} className="input_radio-wrapper">
                <label htmlFor={id} className="input_radio-text">
                    {label}
                </label>
                <input className="input_radio" checked={checked} type="radio" id={id} onChange={onChange} name={name} value={value}/>

                <div className="input_radio-dot">
                    <Done/>
                </div>
            </div>
        )
    }
}