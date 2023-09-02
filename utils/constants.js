/**
 * Файл с константами
 * */
// Роуты
module.exports.ROUTE_PATH_ALL = '/*';
module.exports.ROUTE_PATH_LOGIN = '/signin';
module.exports.ROUTE_PATH_REGISTER = '/signup';
/**
 * path: '/users/me'
 * */
module.exports.ROUTE_PATH_USER_ME = '/users/me';

module.exports.ROUTE_PATH_MOVIES = '/movies';
/**
 * path: '/movies/:id'
 * */
module.exports.ROUTE_PATH_MOVIES_ID = '/movies/:id';

// Коды ошибок
module.exports.CODE_201 = 201;
module.exports.CODE_202 = 202;
module.exports.ERROR_CODE_400 = 400;
module.exports.ERROR_CODE_401 = 401;
module.exports.ERROR_CODE_404 = 404;
module.exports.ERROR_CODE_403 = 403;
module.exports.ERROR_CODE_409 = 409;
module.exports.ERROR_CODE_500 = 500;
module.exports.ERROR_CODE_11000 = 11000;

// Имена эксепшинов
module.exports.ERROR_CAST = 'CastError';
module.exports.ERROR_VALIDATION = 'ValidationError';
module.exports.ERROR_NOT_FOUND = 'NotFound';

// Стандартные сообщения
module.exports.PAGE_NOT_FOUND_RU = 'Страница не найдена';
module.exports.ACCESS_AUTH_RU = 'Вы вошли в систему';

module.exports.USER_RU = 'Пользователя';

module.exports.MOVIE_RU = 'Фильм';
module.exports.MOVIE_OWNER = 'owner';
module.exports.MESSAGE_MOVIE_DELETE_RU = 'Фильм удален из избранного';

// Текст сообщений ошибок
module.exports.ERR_MESSAGE_USER_BAD_EMAIL = 'Данный email невозможно использовать';
module.exports.ERR_MESSAGE_MOVIE_DELETE_OTHER = 'Нельзя удалить фильм других пользователей';
module.exports.ERROR_CODE_409_REG_MESSAGE_RU = 'Регистрация с данным email невозможна';
module.exports.ERROR_CODE_409_UPD_MESSAGE_RU = 'Пользователь с таким email уже существует.';

module.exports.ERR_MESSAGE_SERVER_ERROR_RU = 'Ошибка на сервере';
module.exports.ERR_MESSAGE_NO_AUTH_RU = 'Необходимо авторизоваться';
module.exports.ERR_MESSAGE_BAD_AUTH_RU = 'Неправильные почта или пароль';

module.exports.ERR_MESSAGE_MIN_VALID_USER_NAME_RU = 'Имя должно быть не менее 2 символов';
module.exports.ERR_MESSAGE_MAX_VALID_USER_NAME_RU = 'Имя должно быть не более 30 символов';

module.exports.ERR_MESSAGE_FORBIDDEN_DATA_REQUEST_RU = 'Переданы некорректные данные';
module.exports.ERR_MESSAGE_FORBIDDEN_ELEMENT_ID = (elementName, id) => `${elementName} с данным _id: ${id} не найдено`;
module.exports.ERR_MESSAGE_BAD_URL_IN = (elementName) => `Неверный URL в ${elementName}`;
