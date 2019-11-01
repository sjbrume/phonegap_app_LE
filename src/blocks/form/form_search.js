import React, {Component} from 'react';
import {connect} from "react-redux";
import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
import './form.css';
import {TABLE_NAME} from "../../config";
import {MAP_GET_ADDRESS_INFO} from "../../store/map/action_types";


function mapStateToProps(state) {
    return {
        currentLocal: state.intl,
        info_dialog: state.info_dialog.toggle,
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
        },
        version: {
            version: state.websql.version.version,
            loading: state.websql.version.loading,
            error: state.websql.version.error,
            success: state.websql.version.success,
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

                        this.props.dispatch(MAP_GET_ADDRESS_INFO ,  [sqlResultSet.rows[0]]);
                    }, (sqlTransaction, sqlError) => {
                        console.log(sqlTransaction, sqlError);
                    })
            })
        } else {
            this.props.dispatch(MAP_GET_ADDRESS_INFO , null);

        }
    }

    getOptions(substr) {
        if (!substr || substr.length < 3) {
            return Promise.resolve({options: []});
        }
        const query = `SELECT company_type, ID FROM ${TABLE_NAME} WHERE company_type LIKE '%${substr}%';`;

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
        const {db, data, set, version, info_dialog} = this.props;

        return true;
        /*
        return (
            <div style={{
                width: '100%',
                position: 'relative',
                zIndex: 1000
            }}>
                <Select.Async
                    value={value}
                    labelKey="company_type"
                    valueKey="ID"
                    autoload={false}
                    onChange={this.onChange}
                    onValueClick={this.addSearch}
                    loadOptions={this.getOptions}
                    placeholder="Легальний Акциз"
                    searchPromptText="Нет результатов"
                    disabled={set.loading || version.loading || data.loading || db.loading || info_dialog}
                />
            </div>
        )
        */
    }
}
