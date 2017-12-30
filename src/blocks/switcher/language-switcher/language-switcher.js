import React, {Component} from 'react';
import {connect} from "react-redux";
import {CHANGE_LANG} from "../../../store/intl/action_types";
import {lexicon} from "./lexicon";
import {InputRadio} from "../../input/input_radio";

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
        console.log(event, value);
        const {changeLang} = this.props;
        changeLang(CHANGE_LANG, value);
        console.log()
    };

    render() {
        const {currentLocal} = this.props;
        return (
            <div>
                <label className="input_label">
                    {lexicon[currentLocal].language}
                </label>

                <InputRadio
                    style={{
                        marginLeft: '60px',
                        paddingRight: '40px',
                    }}
                    checked={currentLocal === 'RU'}
                    id={"RU"}
                    onChange={(event)=>this.handleChange(event, 'RU')}
                    name={"intl"}
                    value={"RU"}
                    label={"Русский"}
                />
                <InputRadio
                    style={{
                        marginLeft: '60px',
                        paddingRight: '40px',
                        border: 'none'
                    }}
                    checked={currentLocal === 'UKR'}
                    id={"UKR"}
                    onChange={(event)=>this.handleChange(event, 'UKR')}
                    name={"intl"}
                    value={"UKR"}
                    label={"Український"}
                />
            </div>
        )
    }

    // render() {
    //     const {currentLocal} = this.props;
    //     return (
    //         <FormControl component="fieldset">
    //             <FormLabel component="legend">{lexicon[currentLocal].language}</FormLabel>
    //             <RadioGroup
    //                 name="intl"
    //                 value={currentLocal}
    //                 onChange={this.handleChange}
    //             >
    //                 <FormControlLabel value="RU" control={<Radio />} label="Русский" />
    //                 <FormControlLabel value="UKR" control={<Radio />} label="Український" />
    //             </RadioGroup>
    //         </FormControl>
    //     )
    // }
}

