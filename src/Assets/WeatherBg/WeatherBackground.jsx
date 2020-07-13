import React from 'react';
import classNames from 'classnames';

export function WeatherBackground(props) {
    return <div className={classNames('weather-bg', 'bg-' + props.bg)}/>
}