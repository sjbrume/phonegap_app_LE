import React, {Component} from 'react';
import './complaints.css';
import {FormComplaints} from "../../blocks/form/form_complaints/form_complaints";

export class ComplaintsPage extends Component {

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
        return (
            <div className="complaints_wrapper">
                <FormComplaints/>
            </div>
        )
    }
}