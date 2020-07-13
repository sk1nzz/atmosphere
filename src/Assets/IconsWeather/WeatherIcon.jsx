import React from 'react';

import ClearD from './clear_d.svg'; 
import ClearN from './clear_n.svg'; 

import LcloudyD from './lcloudy_d.svg';
import LcloudyN from './lcloudy_n.svg';

import McloudyD from './mcloudy_d.svg';
import McloudyN from './mcloudy_n.svg';

import Hicloudy from './hicloudy.svg'; 

import RainLight from './rain_light.svg';
import RainMed from './rain_med.svg';
import RainHi from './rain_hi.svg';

import SnowLight from './snow_light.svg';
import SnowMed from './snow_med.svg';
import SnowHi from './snow_hi.svg';

import Ts from './ts.svg';
import TsDry from './ts-dry.svg';

import Fog from './fog.svg';

import Sleet from './sleet.svg';

export function WeatherIcon(props) {
    switch(props.icon) {
        case 'clear_d':
            return <img src={ClearD} className='weather-icon' alt=''/>;
        case 'clear_n':
            return <img src={ClearN} className='weather-icon' alt=''/>;
        case 'lcloudy_d':
            return <img src={LcloudyD} className='weather-icon' alt=''/>;
        case 'lcloudy_n':
            return <img src={LcloudyN} className='weather-icon' alt=''/>;
        case 'mcloudy_d':
            return <img src={McloudyD} className='weather-icon' alt=''/>;
        case 'mcloudy_n':
            return <img src={McloudyN} className='weather-icon' alt=''/>;

        case 'hicloudy':
            return <img src={Hicloudy} className='weather-icon' alt=''/>;

        case 'rain_light':
            return <img src={RainLight} className='weather-icon' alt=''/>;
        case 'rain_med':
            return <img src={RainMed} className='weather-icon' alt=''/>;
        case 'rain_hi':
            return <img src={RainHi} className='weather-icon' alt=''/>;
        
        case 'snow_light':
            return <img src={SnowLight} className='weather-icon' alt=''/>;
        case 'snow_med':
            return <img src={SnowMed} className='weather-icon' alt=''/>;
        case 'snow_hi':
            return <img src={SnowHi} className='weather-icon' alt=''/>;

        case 'ts':
            return <img src={Ts} className='weather-icon' alt=''/>;
        case 'ts_dry':
            return <img src={TsDry} className='weather-icon' alt=''/>;

        case 'fog':
            return <img src={Fog} className='weather-icon' alt=''/>;

        case 'sleet':
            return <img src={Sleet} className='weather-icon' alt=''/>;

        default:
            return null;
    }
}