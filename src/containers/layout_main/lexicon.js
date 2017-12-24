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
                href: '/list_of_places',
                icon: <Error/>
            },
            complaints: {
                text: 'Жалобы',
                href: '/complaints',
                icon: <Warning/>
            },
            articles: {
                text: 'Статьи',
                href: '/articles',
                icon: <ViewHeadline/>
            },
            contacts: {
                text: 'Контакты',
                href: '/contacts',
                icon: <AccountBox/>
            },
            settings: {
                text: 'Настройки',
                href: '/settings',
                icon: <Settings/>
            },
            exit: {
                text: 'Выход',
                onClick: () => {
                    console.log('Выход');
                    try{
                        let confirmed = function (buttonIndex) {
                            if (buttonIndex == 1) {
                                console.log("navigator.app.exitApp");
                                navigator.app.exitApp();
                            }
                        };
                        navigator.notification.confirm('', confirmed, 'Exit?');
                    } catch (err) {
                        console.log(err);
                    }
                },
                icon: <Settings/>
            }
        }
    },
    'UKR':{
        menu: {
            list_of_places: {
                text: 'Список закладів',
                href: '/list_of_places',
                icon: <Error/>,
            },
            complaints: {
                text: 'Скарги',
                href: '/complaints',
                icon: <Warning/>,
            },
            articles: {
                text: 'Статті',
                href: '/articles',
                icon: <ViewHeadline/>,
            },
            contacts: {
                text: 'Контакти',
                href: '/contacts',
                icon: <AccountBox/>,
            },
            settings: {
                text: 'Налаштування',
                href: '/settings',
                icon: <Settings/>,
            },
            exit: {
                text: 'Вихід',
                href: '/exit',
                icon: <Settings/>
            },
        }
    }
};