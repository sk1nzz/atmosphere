import React from 'react';

import { WeatherIcon } from '../../Assets/IconsWeather/WeatherIcon';
import { WeatherBgGradient } from '../../Assets/WeatherBgGradient/WeatherBgGradient';
import { WeatherBackground } from '../../Assets/WeatherBg/WeatherBackground';

export function getDateFromUnix(date) {
    return new Date(date * 1000);
}

export function isDay(currentTime, sunsetTime, sunriseTime) {
    if (currentTime < sunsetTime && currentTime > sunriseTime) {
        return true;
    } else if ((currentTime > sunsetTime && currentTime < sunriseTime) || (currentTime > sunsetTime && currentTime > sunriseTime) || (currentTime < sunsetTime && currentTime < sunriseTime)) {
        return false;
    } else {
        return true;
    }
}

export function getWeatherIcon(id, isDay) {
    if(isDay) {
        // Без осадков

        if (id === 800) return <WeatherIcon icon='clear_d' />;
        if (id === 801) return <WeatherIcon icon='lcloudy_d' />;
        if (id === 802) return <WeatherIcon icon='lcloudy_d' />;
        if (id === 803) return <WeatherIcon icon='mcloudy_d' />;
        if (id === 804) return <WeatherIcon icon='hicloudy' />;
        
        // Гроза

        if (id >= 200 && id <= 202) return <WeatherIcon icon='ts' />;
        if (id >= 230 && id <= 232) return <WeatherIcon icon='ts' />;

        if (id >= 210 && id <= 221) return <WeatherIcon icon='ts_dry' />;

        // Морось

        if (id >= 300 && id <= 321) return <WeatherIcon icon='rain_light' />;

        // Дождь

        if (id === 500 || id === 520) return <WeatherIcon icon='rain_light' />;
        if (id === 501 || id === 521 || id === 511) return <WeatherIcon icon='rain_med' />;
        if ((id >= 502 && id <= 504) || (id >= 522 && id <= 531)) return <WeatherIcon icon='rain_hi' />;

        // Снег, мокрый снег

        if (id === 600 || id === 620) return <WeatherIcon icon='snow_light' />
        if (id === 601 || id === 621) return <WeatherIcon icon='snow_med' />
        if (id === 602 || id === 622) return <WeatherIcon icon='snow_hi' />
        if (id >= 611 && id <= 616) return <WeatherIcon icon='sleet' />
 
        // Туман, дымка

        if (id >= 701 && id <= 781) return <WeatherIcon icon='fog' />;
    } else {
        // Без осадков

        if (id === 800) return <WeatherIcon icon='clear_n' />;
        if (id === 801) return <WeatherIcon icon='lcloudy_n' />;
        if (id === 802) return <WeatherIcon icon='lcloudy_n' />;
        if (id === 803) return <WeatherIcon icon='mcloudy_n' />;
        if (id === 804) return <WeatherIcon icon='hicloudy' />;
        
        // Гроза

        if (id >= 200 && id <= 202) return <WeatherIcon icon='ts' />;
        if (id >= 230 && id <= 232) return <WeatherIcon icon='ts' />;

        if (id >= 210 && id <= 221) return <WeatherIcon icon='ts_dry' />;

        // Морось

        if (id >= 300 && id <= 321) return <WeatherIcon icon='rain_light' />;

        // Дождь

        if (id === 500 || id === 520) return <WeatherIcon icon='rain_light' />;
        if (id === 501 || id === 521 || id === 511) return <WeatherIcon icon='rain_med' />;
        if ((id >= 502 && id <= 504) || (id >= 522 && id <= 531)) return <WeatherIcon icon='rain_hi' />;

        // Снег, мокрый снег

        if (id === 600 || id === 620) return <WeatherIcon icon='snow_light' />
        if (id === 601 || id === 621) return <WeatherIcon icon='snow_med' />
        if (id === 602 || id === 622) return <WeatherIcon icon='snow_hi' />
        if (id >= 611 && id <= 616) return <WeatherIcon icon='sleet' />
 
        // Туман, дымка

        if (id >= 701 && id <= 781) return <WeatherIcon icon='fog' />;
    }
}

export function getConditionName(id) {
    // Осадки

    if (id >= 200 && id <= 202) return 'Дождь с грозой';
    if (id >= 230 && id <= 232) return 'Дождь с грозой';
    if (id >= 210 && id <= 221) return 'Гроза';

    if(id >= 300 && id <= 321) return 'Морось';
    if(id === 500 || id === 520) return 'Небольшой дождь';
    if(id === 501 || id === 521) return 'Дождь';
    if((id >= 502 && id <= 504) || (id >= 522 && id <= 531)) return 'Сильный дождь';
    if(id === 511) return 'Замерзающий дождь';
    if(id === 600 || id === 620) return 'Небольшой снег';
    if(id === 601 || id === 621) return 'Снег';
    if(id === 602 || id === 622) return 'Снегопад';
    if(id >= 611 && id <= 616) return 'Дождь со снегом';

    // Туман или дымка

    if(id >= 701 && id <= 781) return 'Туман, дымка';

    // Ясно, облака

    if(id === 800) return "Ясно";
    if(id === 801) return "Малооблачно";
    if(id === 802) return "Переменная облачность";
    if(id === 803) return "Облачно";
    if(id === 804) return "Пасмурно";
}

export function getWeatherBgGradient(id, isDay) {
    if(isDay) {
        if((id >= 200 && id <= 622) || id === 804) return <WeatherBgGradient bg='hcl_d' />;
        if(id >= 701 && id <= 781) return <WeatherBgGradient bg='cl_d' />;
        if(id === 800) return <WeatherBgGradient bg='clear_d' />;
        if(id >= 801 && id <= 803) return <WeatherBgGradient bg='cl_d' />;
    } else {
        if((id >= 200 && id <= 622) || id === 804) return <WeatherBgGradient bg='hcl_n' />;
        if(id >= 701 && id <= 781) return <WeatherBgGradient bg='cl_n' />;
        if(id === 800) return <WeatherBgGradient bg='clear_n' />;
        if(id >= 801 && id <= 803) return <WeatherBgGradient bg='cl_n' />;
    }
}

export function getWeatherBg(id) {
    if (id === 800) return null;
    if (id === 801) return <WeatherBackground bg='clouds_light' />;
    if (id === 802) return <WeatherBackground bg='clouds_light' />;
    if (id === 803) return <WeatherBackground bg='clouds_med' />;
    if (id === 804) return <WeatherBackground bg='clouds_hi' />;

    if (id >= 200 && id <= 202) return <WeatherBackground bg='rain_hi' />;
    if (id >= 230 && id <= 232) return <WeatherBackground bg='rain_hi' />;
    if (id >= 210 && id <= 221) return <WeatherBackground bg='rain_hi' />;

    if(id >= 300 && id <= 321) return <WeatherBackground bg='rain_light' />;
    if(id === 500 || id === 520) return <WeatherBackground bg='rain_light' />;
    if(id === 501 || id === 521) return <WeatherBackground bg='rain_med' />;
    if((id >= 502 && id <= 504) || (id >= 522 && id <= 531)) return <WeatherBackground bg='rain_hi' />;
    if(id === 511) return <WeatherBackground bg='rain_med' />;
    if(id === 600 || id === 620) return <WeatherBackground bg='snow_light' />;
    if(id === 601 || id === 621) return <WeatherBackground bg='snow_med' />;
    if(id === 602 || id === 622) return <WeatherBackground bg='snow_hi' />;
    if(id >= 611 && id <= 616) return <WeatherBackground bg='sleet' />;

    // Туман или дымка

    if(id >= 701 && id <= 781) return <WeatherBackground bg='clouds_light' />;
}