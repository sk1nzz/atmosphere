import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { switchRoute, requestNowForecast, requestDailyForecast } from '../../Store/Actions/Actions';
import { UiIcon } from '../../Assets/IconsUI/icons';

function Navigation(props) {
    return (
        <div className='bottom-navigation blur-card'>
            <NavigationButton icon={<UiIcon icon='home'/>} active={props.currentRoute === 'Now' ? true : false} value="Сейчас" onclick={() => {
                if (props.currentRoute !== 'Now') {
                    props.switchRoute('Now');
                    props.requestNowForecast();
                }
            }}/>
            <NavigationButton icon={<UiIcon icon='forecast'/>} active={props.currentRoute === 'Forecast' ? true : false} value="Прогноз" onclick={() => {
                if (props.currentRoute !== 'Forecast') {
                    props.switchRoute('Forecast');
                    props.requestDailyForecast();
                }
            }}/>
            <NavigationButton icon={<UiIcon icon='settings'/>} active={props.currentRoute === 'Settings' ? true : false} value="Настройки" onclick={() => props.switchRoute('Settings')}/>
        </div>
    );
}

function NavigationButton(props){
    return(
        <button className={ classNames('nav-btn', props.active ? 'nav-btn-active': '') } onClick={props.onclick}>
            {props.icon}
            {props.value}
        </button>
    );
}

export default connect(
    (state) => ({
        currentRoute: state.currentRoute
    }),
    { switchRoute, requestNowForecast, requestDailyForecast }
)(Navigation);