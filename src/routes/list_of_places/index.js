import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';

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
        // const {title} = this.props;
        return (
            <div className="accordion_wrapper">
                <button onClick={this.isOpen} className="accordion_header">
                    <div className="accordion_title">
                        Заголовок
                    </div>
                    {
                        !open && <ArrowDropDown className="accordion_arrow"/>
                    }
                    {
                        open && <ArrowDropUp className="accordion_arrow"/>
                    }

                </button>
                <div className={"accordion_content " + (open? 'accordion_content--active': '')}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci assumenda consectetur corporis dolorem, eos esse ex illo maxime modi, quod, ratione recusandae tempore voluptates voluptatibus. Cupiditate eligendi iure quasi.
                </div>
            </div>
        )
    }
}


export class ListOfPlacesPage extends Component {

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
        let Array = [];
        for(let i = 0; i < 20; i++) {
            Array.push(<Accordion key={i}/>)
        }
        return Array;
    }
}