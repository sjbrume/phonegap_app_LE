import React, {Component} from 'react';
import Error from 'material-ui-icons/Error';
import Warning from 'material-ui-icons/Warning';
import ViewHeadline from 'material-ui-icons/ViewHeadline';
import AccountBox from 'material-ui-icons/AccountBox';
import Settings from 'material-ui-icons/Settings';



export const lexicon = {
    'RU':{
        menu: {
            list_of_places: {
                text: 'Список заведений',
                href: '/',
                icon: <Error/>
            },
            complaints: {
                text: 'Жалобы',
                href: '/',
                icon: <Warning/>
            },
            articles: {
                text: 'Статьи',
                href: '/',
                icon: <ViewHeadline/>
            },
            contacts: {
                text: 'Контакты',
                href: '/',
                icon: <AccountBox/>
            },
            settings: {
                text: 'Настройки',
                href: '/',
                icon: <Settings/>
            },
        }
    },
    'UKR':{
        menu: {
            list_of_places: {
                text: 'Список закладів',
                href: '/',
                icon: <Error/>,
            },
            complaints: {
                text: 'Скарги',
                href: '/',
                icon: <Warning/>,
            },
            articles: {
                text: 'Статті',
                href: '/',
                icon: <ViewHeadline/>,
            },
            contacts: {
                text: 'Контакти',
                href: '/',
                icon: <AccountBox/>,
            },
            settings: {
                text: 'Налаштування',
                href: '/',
                icon: <Settings/>,
            },
        }
    }
};