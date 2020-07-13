import { createStore, applyMiddleware, compose } from 'redux';
import { appReducer } from './Reducers/Reducers';
import thunk from 'redux-thunk';

const initialState = {
    currentRoute: 'Now',
    cityList: JSON.parse(localStorage.getItem('cityList')) || [],
    weatherNow: {
        fetchStatus: undefined,
        response: {},
    },
    weatherForecast: {
        fetchStatus: undefined,
        response: {},
    },
    unitType: localStorage.getItem('unitType') || 'C',
    apiKey: localStorage.getItem('apiKey') || 'b2e7926c2fe12f7560476f3d91cc9adf',
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(appReducer, initialState, composeEnhancers(applyMiddleware(thunk)));