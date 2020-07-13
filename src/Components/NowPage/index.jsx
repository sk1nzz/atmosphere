import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { requestNowForecast } from '../../Store/Actions/Actions';
import { AppHeader } from '../AppHeader';
import { NowPageVisual } from '../NowPageVisual';

export function NowPage(props){
    // eslint-disable-next-line
    useEffect(() => { props.requestNowForecast(); }, []);
    const WeatherData = props.weatherNow.response;

    switch(props.weatherNow.fetchStatus) {
        case 'fetching':
            return (
                <div className='loader' />
            );
        case 'fetched':
            return (
                <div className='app-page now-page'>
                    <AppHeader 
                        title='Погода сейчас'
                        subtitle={WeatherData.name}
                        refreshBtnCallback={() => props.requestNowForecast()}
                    />
                    <NowPageVisual 
                        condition={WeatherData.weather[0].id}
                        temp={WeatherData.main.temp}
                        feelsTemp={WeatherData.main.feels_like}

                        pressure={WeatherData.main.pressure}
                        humidity={WeatherData.main.humidity}
                        wind={WeatherData.wind.speed}

                        currentTime={WeatherData.dt}
                        sunsetTime={WeatherData.sys.sunset}
                        sunriseTime={WeatherData.sys.sunrise}

                        unitType={props.unitType}
                    />
                </div>
            );
        default:
            return (
                <div className='app-page now-page'>
                    <AppHeader 
                        title='Погода сейчас'
                        subtitle='Данные не загружены'
                        refreshBtnCallback={() => props.requestNowForecast()}
                        separated
                    />
                </div>
            );
    }
}

export default connect(
    (state) => ({
        weatherNow: state.weatherNow,
        unitType: state.unitType
    }), { requestNowForecast }
)(NowPage);