import {Store} from '../store/store';
const lexicon = {
        'RU': {
            confirm_exit_app: {
                message: 'Вы уверены что хотите покинуть приложение?',
                title: 'Выход',
                buttonName: ['Отмена', 'Выход'],
            },
        },
        'UKR': {
            confirm_exit_app: {
                message: 'Ви впевнені що хочете залишити додаток?',
                title: 'Вихід',
                buttonName: ['Скасувати', 'Вихід']
            },
        }
    }
;
export const exit_app = () => {
    navigator.notification.confirm(
        lexicon[ Store.getState().intl].confirm_exit_app.message,
        (buttonIndex) => {
            console.log('buttonIndex: ', buttonIndex);
            if (buttonIndex === 2) {
                console.log("navigator.app.exitApp");
                // navigator.app.exitApp();
                if (navigator.app && navigator.app.exitApp) {
                    navigator.app.exitApp();
                } else if (navigator.device && navigator.device.exitApp) {
                    navigator.device.exitApp();
                }
            }
        },
        lexicon[ Store.getState().intl].confirm_exit_app.title,
        lexicon[ Store.getState().intl].confirm_exit_app.buttonName,
    )
}