import React from 'react';
import classNames from 'classnames';

export function WeatherBgGradient(props) {
    return <div className={classNames('weather-bg-gradient', 'bg-gradient-' + props.bg)}/>
}