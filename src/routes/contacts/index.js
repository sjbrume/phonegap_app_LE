import React, {Component} from 'react';
import {lexicon} from './lexicon';
import {connect} from "react-redux";
import './contacts.css';
import {LogoFacebook} from "./logo_facebook";
import {LogoTwitter} from "./logo_twitter";
import {LogoYoutube} from "./logo_youtube";

@connect(
    state => ({ // получаем данные из store
        currentLocal: state.intl
    })
)
export class ContactsPage extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.createSection = this.createSection.bind(this);
    }

    get initialState() {
        return {}
    }

    createSection(currentLocal,type) {
        let sections = [];
        let index = 0;
        // const {currentLocal} = this.props;
        for (let prop in lexicon[currentLocal][type]) {
            sections.push((<div className="contact_section" key={index++}>
                <div className="contact_title">
                    {lexicon[currentLocal][type][prop].title}
                </div>
                <ul className="contact_list">
                    {lexicon[currentLocal][type][prop].list.map((item, index) => {
                        if(lexicon[currentLocal][type][prop].hasOwnProperty('type')){
                            return (<li className="contact_item" key={lexicon[currentLocal][type][prop].title + '-' + index}>
                                <a href={lexicon[currentLocal][type][prop].type+item}>{item}</a>
                            </li>)
                        } else {
                            return (<li className="contact_item" key={lexicon[currentLocal][type][prop].title + '-' + index}>
                                {item}
                            </li>)
                        }
                    })}
                </ul>
            </div>))
        }
        return sections;
    }

    render() {
        const {currentLocal} = this.props;
        return (
            <div>
                {
                    this.createSection(currentLocal, 'tax')
                }
                {
                    this.createSection(currentLocal, 'police')
                }
                <div className="contact_social-list">
                    <div className="contact_social-item">
                        <a href="https://www.facebook.com/sfs.odesa/" className="contact_social-link">
                            <LogoFacebook/>
                        </a>
                    </div>
                    <div className="contact_social-item">
                        <a href="https://twitter.com/SFSofUkraine" className="contact_social-link">
                            <LogoTwitter/>
                        </a>
                    </div>
                    <div className="contact_social-item">
                        <a href="https://www.youtube.com/user/SFSofUkraine" className="contact_social-link">
                            <LogoYoutube/>
                        </a>
                    </div>

                </div>
            </div>
        )
    }
}