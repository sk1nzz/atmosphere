import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import NowPage from './Components/NowPage';
import ForecastPage from './Components/ForecastPage';
import SettingsPage from './Components/SettingsPage';
import Navigation from './Components/Navigation';
import ModalController from './Components/Modal';

import { store } from './Store/store';

function App(props) {
    switch(props.currentRoute) {
        case 'Now':
            return <>
                <ModalController />
                <NowPage />
                <Navigation />
            </>;
        case 'Forecast':
            return <>
                <ModalController />
                <ForecastPage />
                <Navigation />
            </>;
        case 'Settings':
            return <>
                <ModalController />
                <SettingsPage />
                <Navigation />
            </>;
        
        default:
            return <>
                <ModalController />
                <NowPage />
                <Navigation />
            </>;
    }
}

store.subscribe(() => {
    localStorage.setItem('cityList', JSON.stringify(store.getState().cityList));
    localStorage.setItem('unitType', store.getState().unitType);
    localStorage.setItem('apiKey', store.getState().apiKey);
})

const mapStateToProps = (state) => ({
    currentRoute: state.currentRoute,
});

export default connect(mapStateToProps, null)(App);