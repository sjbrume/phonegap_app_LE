import React, {Component} from 'react';
import Close from 'material-ui-icons/Close';

import AddAPhoto from 'material-ui-icons/AddAPhoto';
import {connect} from "react-redux";

const lexicon = {
    'RU':{
        validation: 'Неверный формат файла'
    }, 'UKR':{
        validation: 'Неправильний формат файлу'
    }
}


@connect(
    state => ({ // получаем данные из store
        currentLocal: state.intl
    })
)
export class InputFile extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onChange = this.onChange.bind(this);
        this.onRemoveFile = this.onRemoveFile.bind(this);
    }

    get initialState() {
        return {
            files: [],
            errors: []
        }
    }

    onChange(e) {
        let errors = [];
        const {input: {onChange},currentLocal} = this.props;
        const files = this.state.files;
        for (let i = 0; i < e.target.files.length; i++) {
            if(e.target.files[i].type.indexOf("image/") === -1){
                errors.push(`${lexicon[currentLocal].validation} ${e.target.files[i].name}`);
            } else {
                files.push(e.target.files[i]);
            }
        }
        this.setState({files: files, errors});
        onChange(files)
    }



    onRemoveFile(elem) {
        const {input: {onChange}} = this.props;

        let newState = [];
        this.state.files.map((item, index) => {
            if (elem !== index) {
                newState.push(item)
            }
        });
        this.setState({files: newState});
        onChange(newState)
    }


    render() {
        const {input, label} = this.props;
        const {files, errors} = this.state;
        return (
            <div>
                <button className="button_add-photo" style={{position: 'relative'}}>
                    <input multiple={true} onChange={this.onChange} style={{position: 'absolute', opacity: 0}} type="file"
                           placeholder="добавить фото"/>
                    <span className="button_add-photo-icon">
                        <AddAPhoto/>
                    </span>
                    <span className="button_add-photo-text">
                        {label}
                    </span>
                </button>
                <div className="complaints_file-list">
                    {
                        files && files.map((item, index) => {
                            return (<div key={index} className="complaints_file-item">
                                <div className="complaints_file-item-name">
                                    {item.name}
                                </div>
                                <button onClick={() => this.onRemoveFile(index)}
                                        className="complaints_file-item-delete">
                                    <Close/>
                                </button>
                            </div>)
                        })
                    }
                </div>

                    {errors && errors.map((item, index) => {
                        return ( <div key={'error-' + index} className="complaints_input-valid">{item}</div>)
                    })}
            </div>
        )
    }

}