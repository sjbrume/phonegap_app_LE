import React, {Component} from 'react';
import {connect} from "react-redux";
import {Field, getFormValues, reduxForm} from "redux-form";
import Done from 'material-ui-icons/Done';
import {lexicon} from './lexicon';
import Button from 'material-ui/Button';
import {InputFile} from "../../input/input_file";
import List, { ListItem, } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import {isNumber} from "../../../utils/is_number";
import {isEmail} from "../../../utils/is_email";

const required = message => value => (value ? undefined : message);



@reduxForm({
    form: 'FormComplaints',
})
@connect(
    state => ({ // получаем данные из store
        currentLocal: state.intl,
        values: getFormValues('FormComplaints')(state),
    })
)
export class FormComplaints extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onSubmit = this.onSubmit.bind(this);
    }

    get initialState() {
        return {
            open: false,
            loading: false
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    async onSubmit(value) {
        console.log(value);
        if(value.type === 'anonim' && value.message === 'Разработчики') {
            this.handleClickOpen();
            return;
        }

        const options = {
            method: 'POST',
            mode: 'cors',
            header: {
                'Content-type': 'multipart/form-data'
            }
        };
        options.body = new FormData();

        const data = fetch('',options).then()

    }

    radioButtonGenerator = ({input, type, options, meta: {touched, error, warning}}) => (
        <div>
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
        </div>
    );

    renderTextarea = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
            <label className="complaints_input-label"> {label}</label>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <textarea className="complaints_input" {...input} type={type}/>
                <div className="complaints_input-valid">
                    {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
                </div>
            </div>
        </div>
    );

    renderField = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
            <label className="complaints_input-label"> {label}</label>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <input className="complaints_input" {...input} placeholder={label} type={type}/>
                <div className="complaints_input-valid">
                    {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
                </div>
            </div>
        </div>
    );

    renderPreloader =() =>(<div className="preloader__wrapper">
        <CircularProgress className="preloader" style={{
            display:'block',
            color:'#0277bd'
        }} size={60} thickness={7} />
    </div>);

    render() {
        const {currentLocal, error, handleSubmit, pristine, reset, submitting, type, values} = this.props;
        console.log(this.props);
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <div className="complaints_section">
                    {this.state.loading && this.renderPreloader()}
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle>{lexicon[currentLocal].develop.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText >
                                {lexicon[currentLocal].develop.desc}
                            </DialogContentText>
                            <List>
                                <ListItem button>
                                    <a href="">Макареев Федор - React/Phonegap</a>
                                </ListItem>
                                <Divider light />
                                <ListItem button>
                                    <a href="">Боброва Александра - Дизайн</a>
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <a href="">Рагимов Артур - Бэкэнд</a>
                                </ListItem>
                            </List>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                {lexicon[currentLocal].develop.close}
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Field
                        component={this.radioButtonGenerator}
                        name={'type'}
                        validate={[required(lexicon[currentLocal].validation.required)]}
                        options={[
                            {
                                title: lexicon[currentLocal].anonim,
                                value: 'anonim',
                            }, {
                                title: lexicon[currentLocal].no_anonim,
                                value: 'no_anonim',
                            }
                        ]}
                    />
                    {
                        values && values.type && values.type === 'no_anonim' &&
                        <Field
                            component={this.renderField}
                            name={'name'}
                            type="text"
                            validate={[required(lexicon[currentLocal].validation.required)]}
                            label={lexicon[currentLocal].fio}
                        />
                    }
                </div>
                <div className="complaints_section">
                    <Field
                        component={this.renderTextarea}
                        name={'message'}
                        type="textarea"
                        validate={[required(lexicon[currentLocal].validation.required)]}
                        label={lexicon[currentLocal].message}
                    />
                    <Field
                        component={InputFile}
                        name={'file'}
                        type="textarea"
                        label={lexicon[currentLocal].photo}
                    />
                </div>
                {
                    values && values.type && values.type === 'no_anonim'  &&
                    <div className="complaints_section">
                        <Field
                            component={this.renderField}
                            name={'phone'}
                            type="tel"
                            validate={[isNumber(lexicon[currentLocal].validation.phone)]}
                            label={lexicon[currentLocal].phone}
                        />
                    </div>
                }
                {
                    values && values.type && values.type === 'no_anonim'  &&
                    <div className="complaints_section">
                        <Field
                            component={this.renderField}
                            name={'email'}
                            type="email"
                            validate={[isEmail(lexicon[currentLocal].validation.email)]}
                            label={'E-mail'}
                        />
                    </div>
                }
                <div style={{padding: '20px'}} className="complaints_section">
                    <Button type="submit" raised style={{backgroundColor: '#b3e5fc', color: '#334148'}} color="primary">
                        {lexicon[currentLocal].send}
                    </Button>
                </div>
            </form>
        )
    }
}