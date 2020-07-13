import * as types from '../Actions/Types';

export function switchRoutes(state, action) {
    switch(action.type) {
        case types.SWITCH_ROUTES: return action.value;
        
        default: return state;
    }
}

export function fetchNowForecastReducer(state, action) {
    switch(action.type) {
        case types.FETCH_NOW_FORECAST_STARTED:
            return {
                fetchStatus: 'fetching',
                response: {},
                error: undefined,
            }
        case types.FETCH_NOW_FORECAST_SUCCESS:
            return {
                fetchStatus: 'fetched',
                response: action.response,
                error: undefined,
            }
        case types.FETCH_NOW_FORECAST_FAILED:
            return {
                fetchStatus: 'failed',
                response: {},
                error: action.error,
             }
        default:
            return state;
    }
}

export function fetchDailyForecastReducer(state, action) {
    switch(action.type) {
        case types.FETCH_DAILY_FORECAST_STARTED:
            return {
                fetchStatus: 'fetching',
                response: {},
                error: undefined,
            }
        case types.FETCH_DAILY_FORECAST_SUCCESS:
            return {
                fetchStatus: 'fetched',
                response: action.response,
                error: undefined,
            }
        case types.FETCH_DAILY_FORECAST_FAILED:
            return {
                fetchStatus: 'failed',
                error: action.error,
                response: undefined,
            }
        default:
            return state;
    }
}

export function cityListReducer(state, action) {
    switch(action.type) {
        case types.ADD_CITY_CHECK_SUCCESS:
            if(!state.filter(i => i.cityId === action.response.id).length) {
                return state.concat({
                    cityName: action.response.name,
                    cityCountry: action.response.sys.country,
                    cityId: action.response.id,
                    default: !state.length ? true : false,
                }) 
            }
        // eslint-disable-next-line
        case types.REMOVE_CITY:
            const newState = state.filter((item) => {
                return item.cityId !== action.value;
            });
            if(!newState.filter(item => item.default).length && newState.length) {
                newState[0].default = true;
                return newState;
            } else {
                return newState;
            }
        case types.SET_DEFAULT_CITY:
            return state.map(i => {
                if(i.cityId === action.value && !i.default) {
                    return {
                        ...i,
                        default: true,
                    };
                }

                return {
                    ...i,
                    default: false,
                };
            })
        default:
            return state;
    }
}

export function unitReducer(state, action) {
    switch(action.type) {
        case types.SET_UNIT:
            return action.value;
        default:
            return state;
    }
}

export function apiKeyReducer(state, action) {
    switch(action.type) {
        case types.SET_API_KEY:
            return action.value;
        default:
            return state;
    }
}

export function modalReducer(state, action) {
    switch(action.type) {
        case types.GENERATE_MODAL:
            return {
                modalType: action.value.modalType,
                modalTitle: action.value.modalTitle,
                modalBody: action.value.modalBody,
            }
        case types.DISMISS_MODAL:
            return null;
        default:
            return state;
    }
}

export function appReducer(state, action) {
    return {
        currentRoute: switchRoutes(state.currentRoute, action),
        cityList: cityListReducer(state.cityList, action),
        weatherNow: fetchNowForecastReducer(state.weatherNow, action),
        weatherForecast: fetchDailyForecastReducer(state.weatherForecast, action),
        unitType: unitReducer(state.unitType, action),
        apiKey: apiKeyReducer(state.apiKey, action),
        modal: modalReducer(state.modal, action),
    }
}