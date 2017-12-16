import React, {Component} from 'react';
import {connect} from "react-redux";
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import {CHANGE_LANG} from "../../store/intl/action_types";
import {lexicon} from "./lexicon";

@connect(
    state => ({ // получаем данные из store
        currentLocal: state.intl
    }), //
    dispatch => ({
        changeLang: (type, value) => {
            dispatch({type: type, payload: value})
        }
    })
)
export class LanguageSwitcher extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {
        }
    }

    handleChange = (event, value) => {
        const {changeLang} = this.props;
        changeLang(CHANGE_LANG, value);
        console.log()
    };


    render() {
        const {currentLocal} = this.props;
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">{lexicon[currentLocal].language}</FormLabel>
                <RadioGroup
                    name="intl"
                    value={currentLocal}
                    onChange={this.handleChange}
                >
                    <FormControlLabel value="RU" control={<Radio />} label="Русский" />
                    <FormControlLabel value="UKR" control={<Radio />} label="Український" />
                </RadioGroup>
            </FormControl>
        )
    }
}

