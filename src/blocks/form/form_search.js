import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from "redux-form";
// import {InputAutocomplete} from "../input/input_autocomplete";
import {withStyles} from 'material-ui/styles';

import {lexicon} from './lexicon';
import {connect} from "react-redux";


const styles = {
    formFullWidth: {
        width: '100%',
    },
};

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
@withStyles(styles)
@reduxForm({
    form: 'FormSearch',
})
export class FormSearch extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    onSubmit() {

    }

    render() {
        const {currentLocal, classes, error, handleSubmit, pristine, reset, submitting, roles, type} = this.props;

        return (
            <form className={classes.formFullWidth} onSubmit={handleSubmit(this.onSubmit)}>
                {/*<Field*/}

                    {/*name="search"*/}
                    {/*component={InputAutocomplete}*/}
                    {/*placeholder={lexicon[currentLocal].search_placeholder}*/}
                {/*/>*/}
            </form>
        )
    }
}