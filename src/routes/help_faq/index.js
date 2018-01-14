import React, {Component} from 'react';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import {connect} from "react-redux";
import {lexicon} from './lexicon';


class Accordion extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.isOpen = this.isOpen.bind(this);
    }

    get initialState() {
        return {
            open: false
        }
    }

    isOpen() {
        this.setState({open: !this.state.open})
    }

    render() {
        const {open} = this.state;
        const {data, currentLocal} = this.props;
        console.log(this.props);
        return (
            <div className="accordion_wrapper">
                <button onClick={this.isOpen} className="accordion_header">
                    <div className="accordion_title">
                        {data.title}
                    </div>
                    {
                        !open && <ArrowDropDown className="accordion_arrow"/>
                    }
                    {
                        open && <ArrowDropUp className="accordion_arrow"/>
                    }

                </button>
                <div className={"accordion_content " + (open ? 'accordion_content--active' : '')}>
                    <p className="places-description_text" style={{
                        wordWrap: 'break-word'
                    }}>
                        {data.content}
                    </p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentLocal: state.intl,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: (type, payload) => {
            dispatch({type, payload})
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class HelpFAQPage extends Component {

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
        const {currentLocal} = this.props;
        return (
            <div>
                <Accordion data={{
                    title: 'Заголовок',
                    content: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem '
                }}/>
            </div>
        )
    }
}