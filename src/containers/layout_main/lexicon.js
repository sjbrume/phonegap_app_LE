import React from 'react';
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
                icon: <Error/>,
                menu_hidden: false
            },
            complaints: {
                text: 'Жалобы',
                href: '/complaints',
                icon: <Warning/>,
                menu_hidden: false
            },
            complaints_map: {
                text: 'Выберите координаты',
                href: '/complaints_map',
                icon: '',
                menu_hidden: true
            },
            articles: {
                text: 'Статьи',
                href: '/articles',
                icon: <ViewHeadline/>,
                menu_hidden: false
            },
            contacts: {
                text: 'Контакты',
                href: '/contacts',
                icon: <AccountBox/>,
                menu_hidden: false
            },
            settings: {
                text: 'Настройки',
                href: '/settings',
                icon: <Settings/>,
                menu_hidden: false
            },
            exit: {
                text: 'Выход',
                onClick: () => {
                    console.log('Выход');
                    try{
                        let confirmed = function (buttonIndex) {
                            if (buttonIndex === 1) {
                                console.log("navigator.app.exitApp");
                                navigator.app.exitApp();
                            }
                        };
                        navigator.notification.confirm('', confirmed, 'Exit?');
                    } catch (err) {
                        console.log(err);
                    }
                },
                icon: <Settings/>,
                menu_hidden: false
            }
        }
    },
    'UKR':{
        menu: {
            list_of_places: {
                text: 'Список закладів',
                href: '/list_of_places',
                icon: <Error/>,
                menu_hidden: false,
            },
            complaints: {
                text: 'Скарги',
                href: '/complaints',
                icon: <Warning/>,
                menu_hidden: false,
            },
            complaints_map: {
                text: 'Выберите координаты',
                href: '/complaints_map',
                icon:  <Warning/>,
                menu_hidden: true
            },
            articles: {
                text: 'Статті',
                href: '/articles',
                icon: <ViewHeadline/>,
                menu_hidden: false,
            },
            contacts: {
                text: 'Контакти',
                href: '/contacts',
                icon: <AccountBox/>,
                menu_hidden: false,
            },
            settings: {
                text: 'Налаштування',
                href: '/settings',
                icon: <Settings/>,
                menu_hidden: false,
            },
            exit: {
                text: 'Вихід',
                onClick: () => {
                    console.log('Выход');
                    try{
                        let confirmed = function (buttonIndex) {
                            if (buttonIndex === 1) {
                                console.log("navigator.app.exitApp");
                                navigator.app.exitApp();
                            }
                        };
                        navigator.notification.confirm('', confirmed, 'Exit?');
                    } catch (err) {
                        console.log(err);
                    }
                },
                icon: <Settings/>,
                menu_hidden: false
            },
        }
    }
};