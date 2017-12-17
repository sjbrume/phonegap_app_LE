import React, {Component} from 'react';
import {connect} from "react-redux";
import {CHANGE_MENU,MENU_LEFT,MENU_BOTTOM} from "../../../store/menu-position/action_types";
import {lexicon} from "./lexicon";
import {InputRadio} from "../../input/input_radio";

@connect(
    state => ({ // получаем данные из store
        currentLocal: state.intl,
        menuPosition: state.menuPosition
    }), //
    dispatch => ({
        changeMenuPosition: (type, value) => {
            dispatch({type: type, payload: value})
        }
    })
)
export class MenuPosSwitcher extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        const {currentLocal} = this.props;

        return {

        }
    }

    handleChange = (event, value) => {
        console.log(event, value);
        const {changeMenuPosition} = this.props;
        changeMenuPosition(CHANGE_MENU, value);
        console.log()
    };

    render() {
        const {currentLocal,menuPosition} = this.props;
        return (
            <div>
                <label style={{
                    borderTop: '2px solid #e0e0e0'
                }} className="input_label">
                    {lexicon[currentLocal].label}
                </label>

                <InputRadio
                    style={{
                        marginLeft: '60px',
                        paddingRight: '40px',
                    }}
                    checked={menuPosition === MENU_LEFT}
                    id={MENU_LEFT}
                    onChange={(event)=>this.handleChange(event, MENU_LEFT)}
                    name={"menu"}
                    value={MENU_LEFT}
                    label={lexicon[currentLocal].radio_1}
                />
                <InputRadio
                    style={{
                        marginLeft: '60px',
                        paddingRight: '40px',
                    }}
                    checked={menuPosition === MENU_BOTTOM}
                    id={MENU_BOTTOM}
                    onChange={(event)=>this.handleChange(event, MENU_BOTTOM)}
                    name={"menu"}
                    value={MENU_BOTTOM}
                    label={lexicon[currentLocal].radio_2}
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

