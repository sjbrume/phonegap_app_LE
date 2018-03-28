import React, {Component} from 'react';
import {connect} from "react-redux";
import {Field, getFormValues, reduxForm} from "redux-form";
import Done from 'material-ui-icons/Done';
import Clear from 'material-ui-icons/Clear';
import {lexicon} from './lexicon';
import Button from 'material-ui/Button';
import {InputFile} from "../../input/input_file";
import List, {ListItem,} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import Modal from 'material-ui/Modal';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import {isNumber} from "../../../utils/is_number";
import {isEmail} from "../../../utils/is_email";
import {Store} from '../../../store/store';
import {Link} from "react-router-dom";
import {ComplaintsMap} from "../../../routes/complaints_map/complaints_map";
import {FORM_REMOVE_LATLNG} from "../../../store/reducers";
import {COMPLAINTS_MAP_TOGGLE} from "../../../store/complaints_map/reducer";
import {radioButtonMessageGenerator} from "./radioButtonMessageGenerator";
import {checkboxButtonMessageGenerator} from "./checkboxButtonMessageGenerator";

const required = message => value => {
    console.log(value);
    return value ? undefined : message
};

const sync_validate = values => {
    const errors = {};
    console.log(values);
    if (!values.type) {
        errors.type = lexicon[Store.getState().intl].validation.required
    }
    if (!values.company) {
        errors.company = lexicon[Store.getState().intl].validation.required
    }
    if (!values.message) {
        errors.message = lexicon[Store.getState().intl].validation.required
    }
    return errors
};


const NOT_ANONYMOUSLY = 'NOT_ANONYMOUSLY';
const ANONYMOUSLY = 'ANONYMOUSLY';
const COMPLAINTS_URL = 'http://185.25.117.8/complaint';

@reduxForm({
    form: 'FormComplaints',
    validate: sync_validate
})
@connect(
    state => ({ // получаем данные из store
        currentLocal: state.intl,
        complaints_map: state.complaints_map,
        values: getFormValues('FormComplaints')(state),
    }),
    dispatch => ({
        dispatch: (type, payload) => {
            dispatch({type, payload})
        }
    })
)
export class FormComplaints extends Component {


    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onSubmit = this.onSubmit.bind(this);
        this.renderMessageDialog = this.renderMessageDialog.bind(this);
        this.modalMapHandle = this.modalMapHandle.bind(this);
        this.disabledSubmit = this.disabledSubmit.bind(this);
    }

    get initialState() {
        return {
            open: false,
            loading: false,
            openMessageDialog: false,
            submitSuccess: false,
            modalMap: false,
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    async onSubmit(value) {
        console.log(value);
        if (value.message.find((item) => item === 'textarea')) {
            if (value.type === ANONYMOUSLY && value.message_textarea === 'Разработчики') {
                this.handleClickOpen();
                return;
            }
            value.message = value.message.filter(word => word !== 'textarea');
            value.message.push(value.message_textarea);
            delete value.message_textarea;
        } else {
            delete value.message_textarea;
        }
        value.message = value.message.join(' ');
        console.log(value);
        // if (!value.message) return;
        // if (!value.company) return;
        // if (value.type === NO_ANONYMOUSLY && !value.name) return;
        this.setState({loading: true});
        let formData = new FormData();
        const resetForm = this.props.reset;


        for (let prop in value) {
            if (prop === 'image') {
                for (let i = 0; i < value[prop].length; i++) {
                    formData.append('image[]', value[prop][i]);
                }
            } else {
                formData.append(prop, value[prop]);
            }
        }

        const data = await new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("POST", COMPLAINTS_URL);
            request.onload = function () {
                console.log(request);

                resolve(request)
            };
            request.onerror = function () {
                console.log(request);
                reject(request)
            };
            request.send(formData);
        })
            .then((res) => res)
            .catch((err) => {
                console.log(err);
                return err
            })
        console.log(data);
        if (data.status >= 200 || data.status < 300) {
            resetForm();
            this.setState({loading: false, openMessageDialog: true, submitSuccess: true});
        } else {

            this.setState({loading: false, openMessageDialog: true});
        }
        // const data = fetch('', options).then()

    }

    radioButtonGenerator = ({input, type, options, meta: {touched, error, warning}}) => (<div>
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
    </div>);

    renderTextarea = ({input, label, type, meta: {touched, error, warning}}) => (<div>
        <label className="complaints_input-label"> {label}</label>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <textarea className="complaints_input" {...input} type={type}/>
            <div className="complaints_input-valid">
                {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>);

    renderField = ({input, label, type, meta: {touched, error, warning}, disabled, placeholder}) => (<div>
        {
            label && <label className="complaints_input-label"> {label}</label>
        }

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <input className="complaints_input" disabled={disabled} {...input} placeholder={placeholder} type={type}/>
            <div className="complaints_input-valid">
                {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>);

    renderPreloader = () => (<div className="preloader__wrapper">
        <CircularProgress className="preloader" style={{
            display: 'block',
            color: '#0277bd'
        }} size={60} thickness={7}/>
    </div>);

    renderMessageDialog() {
        const {currentLocal} = this.props;

        return (<Dialog
            open={this.state.openMessageDialog}
            onClose={() => {
                this.setState({openMessageDialog: false})
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                {
                    this.state.submitSuccess && <DialogContentText>
                        {lexicon[currentLocal].submitMessage.success}
                    </DialogContentText>
                }
                {
                    !this.state.submitSuccess && <DialogContentText>
                        {lexicon[currentLocal].submitMessage.error}
                    </DialogContentText>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    this.setState({openMessageDialog: false})
                }} color="primary">
                    {lexicon[currentLocal].develop.close}
                </Button>
            </DialogActions>
        </Dialog>)
    }

    modalMapHandle(isOpen) {
        this.props.dispatch(COMPLAINTS_MAP_TOGGLE, isOpen);
    }

    disabledSubmit() {
        const {pristine, submitting, values} = this.props;
        if (values && values.type && values.type === NOT_ANONYMOUSLY) {
            return !(values && ('type' in values) && ('message' in values) && ('company' in values) && ('name' in values));
        } else {
            return !(values && ('type' in values) && ('message' in values) && ('company' in values));
        }

    }

    render() {
        const {params, currentLocal, error, handleSubmit, pristine, complaints_map, values} = this.props;
        const Required = required(lexicon[currentLocal].validation.required);
        console.log(this.props);
        return (
            <form onSubmit={handleSubmit(this.onSubmit)} required>
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
                            <DialogContentText>
                                {lexicon[currentLocal].develop.desc}
                            </DialogContentText>
                            <List>
                                <ListItem button>
                                    <a href="">Макареев Федор - React/Phonegap</a>
                                </ListItem>
                                <Divider light/>
                                <ListItem button>
                                    <a href="">Боброва Александра - Дизайн</a>
                                </ListItem>
                                <Divider/>
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

                    <ComplaintsMap
                        open={complaints_map}
                        toggleHandle={this.modalMapHandle}
                    />

                    {
                        this.state.openMessageDialog && this.renderMessageDialog()
                    }

                    <Field
                        component={this.radioButtonGenerator}
                        name={'type'}
                        validate={[Required]}
                        options={[
                            {
                                title: lexicon[currentLocal].anonim,
                                value: ANONYMOUSLY,
                            }, {
                                title: lexicon[currentLocal].no_anonim,
                                value: NOT_ANONYMOUSLY,
                            }
                        ]}
                    />
                    {
                        values && values.type && values.type === NOT_ANONYMOUSLY &&
                        <Field
                            component={this.renderField}
                            name={'name'}
                            type="text"
                            validate={[Required]}
                            label={lexicon[currentLocal].fio}
                        />
                    }
                </div>
                <div className="complaints_section">
                    <Field
                        component={this.renderField}
                        name={'company'}
                        type="text"
                        validate={required(lexicon[currentLocal].validation.required)}
                        label={lexicon[currentLocal].company}
                    />
                    <Field
                        component={checkboxButtonMessageGenerator}
                        name={'message'}
                        validate={[Required]}
                        options={[
                            {
                                title: lexicon[currentLocal].default_message.not_issued_a_check,
                                value: lexicon[currentLocal].default_message.not_issued_a_check,
                            }, {
                                title: lexicon[currentLocal].default_message.no_license,
                                value: lexicon[currentLocal].default_message.no_license,
                            }, {
                                title: lexicon[currentLocal].default_message.sale_without_excise_stamps,
                                value: lexicon[currentLocal].default_message.sale_without_excise_stamps,
                            }, {
                                title: lexicon[currentLocal].default_message.sale_to_minors,
                                value: lexicon[currentLocal].default_message.sale_to_minors,
                            }, {
                                title: lexicon[currentLocal].default_message.other,
                                value: 'textarea',
                            },
                        ]}
                    />
                    {
                        values && values.message && Array.isArray(values.message) && values.message.find((item) => item === 'textarea') &&
                        <Field
                            component={this.renderTextarea}
                            name={'message_textarea'}
                            type="textarea"
                            validate={required(lexicon[currentLocal].validation.required)}
                            label={lexicon[currentLocal].message}
                        />
                    }
                    <Field
                        component={InputFile}
                        name={'image'}
                        type="textarea"
                        label={lexicon[currentLocal].photo}
                    />
                </div>
                {
                    values && values.type && values.type === NOT_ANONYMOUSLY && <div className="complaints_section">
                        <Field
                            component={this.renderField}
                            name={'phone'}
                            type="tel"
                            validate={isNumber(lexicon[currentLocal].validation.phone)}
                            label={lexicon[currentLocal].phone}

                        />
                    </div>
                }
                {
                    values && values.type && values.type === NOT_ANONYMOUSLY && <div className="complaints_section">
                        <Field
                            component={this.renderField}
                            name={'email'}
                            type="email"
                            validate={isEmail(lexicon[currentLocal].validation.email)}
                            label={'E-mail'}
                        />
                    </div>
                }
                {
                    error && <div className="complaints_section">
                        <div className="complaints_input-valid">{error}</div>
                    </div>
                }

                <div style={{padding: '20px'}} className="complaints_section">

                    {
                        ('id' in params) || (values && values.lat) &&
                        <Field
                            component={this.renderField}
                            name={'lat'}
                            type="text"
                            placeholder={'lat'}
                            disabled={true}
                        />
                    }

                    {
                        ('id' in params) || (values && values.lng) &&
                        <Field
                            component={this.renderField}
                            name={'lng'}
                            type="text"
                            placeholder={'lng'}
                            disabled={true}
                        />
                    }
                    {
                        values && !values.address_id &&
                        <Button type="button" raised
                                onClick={() => {
                                    this.props.dispatch(COMPLAINTS_MAP_TOGGLE, true);
                                }}
                                style={{backgroundColor: '#b3e5fc', color: '#334148', margin: '0 8px 0 0'}}
                                color="primary">
                            {lexicon[currentLocal].attach_coordinates}
                        </Button>
                    }
                    {
                        (values && values.lng) &&
                        <Button raised type="button"
                                style={{
                                    verticalAlign: 'middle',
                                    backgroundColor: '#ff4081',
                                    color: '#334148',
                                    padding: '8px',
                                    width: 'auto',
                                    minWidth: 'inherit'
                                }}
                                color="accent"
                                onClick={() => {
                                    delete this.props.values.lat;
                                    delete this.props.values.lng;
                                    this.props.dispatch(FORM_REMOVE_LATLNG, this.props.values);
                                }}>
                            <Clear style={{
                                width: '20px',
                                height: '20px'
                            }}/>
                        </Button>
                    }
                </div>

                <div style={{padding: '20px'}} className="complaints_section">

                    <Button disabled={this.disabledSubmit()} type="submit" raised
                            style={{backgroundColor: '#b3e5fc', color: '#334148'}} color="primary">
                        {lexicon[currentLocal].send}
                    </Button>

                </div>
            </form>
        )
    }
}