import * as types from './Types';

export const switchRoute = (value) => ({
    type: types.SWITCH_ROUTES,
    value: value
});

export const requestNowForecast = () => (
    async (dispatch, getState) => {
        dispatch(requestNowForecastStarted());
        const store = getState();

        if(!store.cityList.length) {
            dispatch(failNowForecast('Города отсутствуют!'));
            dispatch(generateModal({
                modalType: 'warning',
                modalTitle: 'Города отсутствуют!',
                modalBody: 'Список городов пуст. Перейдите в Настройки и добавьте хотя бы один город для просмотра погоды.'
            }));
            return;
        }

        const currentCityId = store.cityList.find(i => i.default).cityId;

        try {
            const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${currentCityId}&units=${store.unitType === 'C' ? 'metric': store.unitType === 'F' ? 'imperial' : 'metric'}&lang=ru&appid=${store.apiKey}`);
            if(request.ok) {
                const json = await request.json();
                dispatch(successNowForecast(json));
            } else {
                dispatch(failNowForecast(request.statusText));
                dispatch(generateModal({
                    modalType: 'error',
                    modalTitle: 'Не удалось получить погоду',
                    modalBody: 'При загрузке погоды возникла ошибка: ' + request.statusText
                }));
            }
        } catch(e) {
            dispatch(failNowForecast(e.message));
            dispatch(generateModal({
                modalType: 'error',
                modalTitle: 'Не удалось получить погоду',
                modalBody: 'При загрузке погоды возникла ошибка: ' + e.message
            }));
        }
    }
);

export const requestDailyForecast = () => (
    async (dispatch, getState) => {
        dispatch(requestDailyForecastStarted());
        const store = getState();

        if(!store.cityList.length) {
            dispatch(failDailyForecast('Города отсутствуют!'));
            dispatch(generateModal({
                modalType: 'warning',
                modalTitle: 'Города отсутствуют!',
                modalBody: 'Список городов пуст. Перейдите в Настройки и добавьте хотя бы один город для просмотра погоды.'
            }));
            return;
        }

        const currentCityId = store.cityList.find(i => i.default).cityId;

        try {
            const request = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${currentCityId}&units=${store.unitType === 'C' ? 'metric': store.unitType === 'F' ? 'imperial' : 'metric'}&lang=ru&appid=${store.apiKey}`);
            if(request.ok) {
                const json = await request.json();
                dispatch(successDailyForecast(json));
            } else {
                dispatch(failDailyForecast(request.statusText));
                dispatch(generateModal({
                    modalType: 'error',
                    modalTitle: 'Не удалось получить погоду',
                    modalBody: 'При загрузке погоды возникла ошибка: ' + request.statusText
                }));
            }
        } catch(e) {
            dispatch(failDailyForecast(e.message));
            dispatch(generateModal({
                modalType: 'error',
                modalTitle: 'Не удалось получить погоду',
                modalBody: 'При загрузке погоды возникла ошибка: ' + e.message
            }));
        }
    }
);


export const successNowForecast = (value) => ({
    type: types.FETCH_NOW_FORECAST_SUCCESS,
    response: value
});

export const successDailyForecast = (value) => ({
    type: types.FETCH_DAILY_FORECAST_SUCCESS,
    response: value
});

export const failNowForecast = (value) => ({
    type: types.FETCH_NOW_FORECAST_FAILED,
    error: value
});

export const failDailyForecast = (value) => ({
    type: types.FETCH_DAILY_FORECAST_FAILED,
    error: value
});

export const requestNowForecastStarted = () => ({
    type: types.FETCH_NOW_FORECAST_STARTED
});

export const requestDailyForecastStarted = () => ({
    type: types.FETCH_DAILY_FORECAST_STARTED
});


export const addCityRequest = (cityName) => (
    async (dispatch, getState) => {
        const store = getState();
        dispatch(addCityRequestStarted());

        try {
            const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&appid=${store.apiKey}`);
            if(request.ok) {
                const json = await request.json();
                dispatch(addCityRequestSuccess(json));
            } else {
                dispatch(generateModal({
                    modalType: 'error',
                    modalTitle: 'Не удалось добавить город',
                    modalBody: request.status === 404 ? 'Этот город не найден. Измените запрос.' : 'Не удалось добавить город - ошибка ' + request.status
                }));
            }
        } catch(e) {
            dispatch(generateModal({
                modalType: 'error',
                modalTitle: 'Не удалось добавить город',
                modalBody: 'Не удалось добавить город - ошибка ' + e.message
            }));
        }
    }
);

export const addCityRequestStarted = () => ({
    type: types.ADD_CITY_CHECK_START
});

export const addCityRequestSuccess = (value) => ({
    type: types.ADD_CITY_CHECK_SUCCESS,
    response: value
});

export const removeCity = (value) => ({
    type: types.REMOVE_CITY,
    value: value
});

export const setDefaultCity = (value) => ({
    type: types.SET_DEFAULT_CITY,
    value: value
})

export const setUnitType = (value) => ({
    type: types.SET_UNIT,
    value: value
})

export const setApiKey = (value) => ({
    type: types.SET_API_KEY,
    value: value
})

export const saveStorePartsToLocal = () => (
    (dispatch, getState) => {
        const store = getState();
        localStorage.setItem('cityList', JSON.stringify(store.cityList));
        localStorage.setItem('unitType', store.unitType);
        localStorage.setItem('apiKey', store.apiKey);
    }
);

export const generateModal = (value) => ({
    type: types.GENERATE_MODAL,
    value: value
})

export const dismissModal = () => ({
    type: types.DISMISS_MODAL,
})