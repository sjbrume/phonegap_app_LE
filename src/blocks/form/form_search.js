import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {lexicon} from './lexicon';
import {connect} from "react-redux";
import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
import './form.css';
import {WEBSQL_SEARCH_REMOVE, WEBSQL_SEARCH_SET} from "../../store/websql/action_types";
import {toTimestamp} from "../../utils/to_timestamp";
import {TABLE_NAME} from "../../config";


function mapStateToProps(state) {
    return {
        currentLocal: state.intl,
        list_of_places: state.websql.list_of_places,

        db: {
            db: state.websql.db.db,
            loading: state.websql.db.loading,
            error: state.websql.db.error,
            success: state.websql.db.success,
        },
        data: {
            loading: state.websql.data.loading,
            error: state.websql.data.error,
            success: state.websql.data.success,
        },
        set: {
            loading: state.websql.set.loading,
            error: state.websql.set.error,
            success: state.websql.set.success,
        }
    }
}
//
function mapDispatchToProps(dispatch) {
    return {
        dispatch: (type,payload) => {
            dispatch({type,payload})
        }
    }
}
@connect(mapStateToProps,mapDispatchToProps)
export class FormSearch extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onChange = this.onChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
    }

    get initialState() {
        const {disabled} = this.props;
        return {
            value: '',
            options: [],
        }
    }


    onChange(value) {
        console.log(value);
        this.setState({
            value: value
        });
        if(value){
            this.props.db.db.transaction((tx) => {
                tx.executeSql(`SELECT * FROM ${TABLE_NAME} WHERE id = ?;`,
                    [value.id],
                    (sqlTransaction, sqlResultSet) => {
                        console.log(sqlResultSet.rows);
                        // this.props.dispatch(WEBSQL_SEARCH_SET,sqlResultSet.rows[0])
                        this.props.dispatch(WEBSQL_SEARCH_SET,sqlResultSet.rows[0])
                    }, (sqlTransaction, sqlEerror) => {
                        console.log(sqlTransaction, sqlEerror);
                    })
            })
        } else {
            this.props.dispatch(WEBSQL_SEARCH_REMOVE,null)
        }
    }

    getOptions(substr) {
        if (!substr || substr.length < 3) {
            return Promise.resolve({options: []});
        }
        const query = `SELECT company, ID FROM ${TABLE_NAME} WHERE company LIKE '%${substr}%';`;

        return new Promise((resolve, reject) => {
            this.props.db.db.transaction((tx) => {
                tx.executeSql(query,
                    [],
                    (sqlTransaction, sqlResultSet) => {
                        console.log(sqlResultSet.rows);
                        resolve(Object.values(sqlResultSet.rows))
                    }, (sqlTransaction, sqlEerror) => {
                        console.log(sqlTransaction, sqlEerror);
                        reject(sqlEerror);
                    })
            })
        })
            .then((res) => {
                return {options: res}
            })
    }

    addSearch(data){
        console.log(data);
    }

    render() {
        const {value} = this.state;
        return (
            <div style={{
                width: '100%',
                position: 'relative',
                zIndex: 1000
            }}>
                <Select.Async
                    value={value}
                    labelKey="company"
                    valueKey="ID"
                    autoload={false}
                    onChange={this.onChange}
                    onValueClick={this.addSearch}
                    loadOptions={this.getOptions}
                />
            </div>
        )
    }
}