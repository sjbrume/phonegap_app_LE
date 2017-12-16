import React, {Component} from 'react';
import {connect} from "react-redux";

const lexicon = {
    'RU': {
        title: 'Заголовок'
    },
    'UKR': {
        title: 'Zaholovok'
    }
};

@connect(
    state => ({
        intl: state.intl
    })
)
export class Test extends Component {
    static propTypes = {}

    static defaultProps = {}


    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        console.log(this);
        const {intl} = this.props;
        return (
            <div>
                {lexicon[intl].title}
            </div>
        )
    }
}

