import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { requestDailyForecast } from '../../Store/Actions/Actions';
import { AppHeader } from '../AppHeader';
import { getWeatherIcon, getDateFromUnix, getConditionName } from '../Utils/Utils';

function ForecastPage(props) {
    // eslint-disable-next-line
    useEffect(() => { props.requestDailyForecast(); }, []);
    const forecast = props.weatherForecast.response;

    switch(props.weatherForecast.fetchStatus) {
        case 'fetching':
            return (
                <div className='loader' />
            );
        case 'fetched':
            const sortedForecast = Object.values(forecast.list.reduce((acc, n) => {
                const date = new Date(n.dt * 1000).toDateString();
                (acc[date] = acc[date] || []).push(n);
                return acc;
            }, {}));

            return (
                <div className='app-page forecast-page'>
                    <AppHeader 
                        title='Прогноз на 10 дней'
                        subtitle={props.weatherForecast.response.city.name}
                        refreshBtnCallback={() => props.requestDailyForecast()}
                        separated
                    />
                    <ForecastWrap 
                        data={sortedForecast}
                        unitType={props.unitType}
                    />
                </div>
            );
        default:
            return (
                <div className='app-page forecast-page'>
                    <AppHeader 
                        title='Прогноз на 10 дней'
                        subtitle='Данные не загружены'
                        refreshBtnCallback={() => props.requestDailyForecast()}
                        separated
                    />
                </div>
            );
    }
}

function ForecastWrap(props) {
    return (
        props.data.map((i, index) => (
            <div className='forecast-day' key={index}>
                <div className='forecast-day-date'>
                    { getDateFromUnix(i[0].dt).toLocaleDateString("ru", {weekday: "long", day: "numeric", month: "long"}) }
                </div>
                <div className='forecast-item-container'>
                    {
                        i.map((item) => (
                            <ForecastItem 
                                icon={ getWeatherIcon(item.weather[0].id, true) }
                                hour={ getDateFromUnix(item.dt).toLocaleTimeString("ru", {hour: "numeric", minute: "2-digit"}) }
                                temp={ Math.floor(item.main.temp) + '°' + props.unitType }
                                key={item.dt}
                                conditionText={getConditionName(item.weather[0].id)}
                            />
                        ))
                    }
                </div> 
            </div>
        ))
    );
}

function ForecastItem(props) {
    return (
        <div className='forecast-hour-item' title={props.conditionText}>
            <div className='hour'>{props.hour}</div>
            {props.icon}
            <div className='temp'>{props.temp}</div>
        </div>
    );
}

export default connect(
    (state) => ({
        weatherForecast: state.weatherForecast,
        unitType: state.unitType
    }), { requestDailyForecast }
)(ForecastPage);