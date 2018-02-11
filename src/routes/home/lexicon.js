export const lexicon = {
    'RU': {
        network_info: 'Для просмотра с карты пожалуйста включите интернет и перезагрузите приложение!',
        info_dialog: {
            title: 'В одесской области на',
            introtext: `С помощью Приложения Легальний акциз каждый может обезопасить себя и окружающих, сделаем
                            Украину Безопасней.`,
            content: [
                {
                    type: 'number_of_license_types',
                    title: `Количество субъектов хозяйствования`,
                    number: 4193
                }, {
                    type: 'number_of_licenses',
                    title: `Всеобщность лицензий`,
                    number: 13149
                }, {
                    type: 'with_license_number',
                    title: `бъект с лицензией`,
                    number: 13028
                }, {
                    type: 'alcohol',
                    title: `Алкогольных лицензий`,
                    number: 6884
                }, {
                    type: 'tobacco',
                    title: `Табачных лицензий`,
                    number: 5801
                },  {
                    type: 'number_without_a_license',
                    title: `Объект без соответствующих разрешительных документов`,
                    number: 121
                },
            ],
            close: 'Продолжить',
            help: 'Помощь'
        },
        company_desc: {
            type: 'Тип',
            company: 'Название',
            license_type: 'Тип лицензии',
            license_number: 'Номер лицензии',
            license_start_at: 'Дата начала',
            license_end_at: 'окончания',
            measures: 'Принятые меры',
            alcohol: 'Алкогольная',
            tobacco: 'Табачная',
            report_abuse: 'Сообщить о нарушении',
        },
        error: {
            db: 'Ошибка при cоздании базы данных',
            version: 'Ошибка при проверке версии базы данных',
            data: 'Ошибка при получении данных',
            set: 'Ошибка при записи данных'
        },
        loading: {
            db: 'Создание базы данных.',
            version: 'Проверка версии базы данных.',
            data: 'Получение данных.',
            set: 'Запись данных.'
        },
        load_map: ' Загрузка карты...',
        filter: {
            alcohol: 'Алкоголь',
            tobacco: 'Табак',
        }
    },
    'UKR': {
        network_info: 'Для перегляду з карти ласка включіть інтернет і перезавантажте додаток!\n',
        info_dialog: {
            title: 'В одеській області на',
            introtext: `За допомогою Додатка Легальний акциз кожен зможе захистити себе та оточуючих, зробимо Україну безпечною.`,

            content: [
                {
                    type: 'number_of_license_types',
                    title: `Кількість суб'єктів господарювання`,
                    number: 4193
                }, {
                    type: 'number_of_licenses',
                    title: `Загальна кількість ліцензій`,
                    number: 13149
                }, {
                    type: 'with_license_number',
                    title: `Об\`ектiв з лiцензiями`,
                    number: 13028
                }, {
                    type: 'alcohol',
                    title: `Алкогольних ліцензій`,
                    number: 6884
                }, {
                    type: 'tobacco',
                    title: `Тютюнових ліцензій`,
                    number: 5801
                },  {
                    type: 'number_without_a_license',
                    title: `Об’єктив без відповідних дозвiльнiх документів`,
                    number: 121
                },
            ],
            close: 'Продовжити',
            help: 'Допомога'
        },
        company_desc: {
            type: 'Тип',
            company: 'Назва',
            license_type: 'Тип ліцензії',
            license_number: 'Номер ліцензії',
            license_start_at: 'Дата початку',
            measures: 'Вжиті заходи',
            license_end_at: 'закінчення',
            alcohol: 'Алкогольна',
            tobacco: 'Тютюнова',
            report_abuse: 'Повідомити про порушення',
        },
        error: {
            db: 'Помилка при Створення бази даних',
            version: 'Не вдалося перевірити версії бази даних',
            data: 'Помилка при отриманні даних',
            set: 'Помилка при запису даних'
        },
        loading: {
            db: 'Створення бази даних.',
            version: 'Перевірка версії бази даних.',
            data: 'Отримання даних.',
            set: 'Запис даних.'
        },
        load_map: 'Завантаження карти ...',
        filter: {
            alcohol: 'Алкоголь',
            tobacco: 'Тютюн',
        },
    }
}