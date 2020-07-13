import React from 'react';
import { UiIcon } from '../Assets/IconsUI/icons';

import { isDay, getWeatherIcon, getConditionName, getWeatherBgGradient, getWeatherBg } from './Utils/Utils';

export function NowPageVisual(props) {
    const currentTime = new Date(props.currentTime * 1000);
    const sunsetTime = new Date(props.sunsetTime * 1000);
    const sunriseTime = new Date(props.sunriseTime * 1000);

    return (
        <div className='now-page-visual'>
            { getWeatherBgGradient(props.condition, isDay(currentTime, sunsetTime, sunriseTime)) }
            { getWeatherBg(props.condition) }
            
            <div className='now-page-weather-data'>
                <div className='wdata-temp'>
                    { getWeatherIcon(props.condition, isDay(currentTime, sunsetTime, sunriseTime)) }
                    { Math.floor(props.temp) }
                    <span className='wdata-temp-units'>
                        {'°' + props.unitType}
                    </span>
                </div>
                <div className='wdata-condition'>
                    <div className='wdata-condition-text'>
                        { getConditionName(props.condition) }
                    </div>
                    <div className='wdata-condition-feelsLike'>
                        { 'Ощущается как ' + Math.floor(props.feelsTemp) + '°' + props.unitType}
                    </div>
                </div>
                <div className='wdata-facts'>
                    <div className='fact'>
                        <UiIcon icon='pressure' />
                        { Math.floor(props.pressure * 0.75006375541921) + '  мм рт.ст.' }
                    </div>
                    <div className='fact'>
                        <UiIcon icon='humidity' />
                        { props.humidity + '%' }
                    </div>
                    <div className='fact'>
                        <UiIcon icon='wind' />
                        { props.wind + ' м/с' }
                    </div>
                </div>
            </div>
        </div>
    );
}