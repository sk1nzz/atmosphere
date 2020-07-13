import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addCityRequest, removeCity, setUnitType, setDefaultCity, setApiKey } from '../../Store/Actions/Actions';
import { AppHeader } from '../AppHeader';
import classNames from 'classnames';
import { UiIcon } from '../../Assets/IconsUI/icons';

import { version } from '../../../package.json';

function SettingsPage(props) {
    const [cityInputVal, changeCityInputVal] = useState('');
    const [apiKeyInputVal, changeApiKeyInputVal] = useState(props.apiKey);

    return (
        <div className='app-page settings-page'>
            <AppHeader 
                title='Настройки'
                separated
            />
            <div className='city-list'>
                <h1 className='settings-header'>Список городов</h1>
                {
                    !props.cityList.length ?
                    <p className='muted-text'>Добавьте хотя бы один город, чтобы смотреть погоду.</p>
                    : props.cityList.map((i) => (
                        <CityListItem 
                            cityName={i.cityName}
                            cityCountry={i.cityCountry}
                            cityId={i.cityId}
                            key={i.cityId}
                            isDefault={i.default}
                            onDelete={() => props.removeCity(i.cityId)}
                            onSetDefault={() => !i.default && props.setDefaultCity(i.cityId)}
                        />
                    ))
                }
            </div>
            
            <div className='settings-section'>
                <div className='left-section'>
                    <h1 className='settings-header'>Добавить город</h1>
                </div>
                <div className='right-section'>
                    <input 
                        className={classNames('ui-input', props.cityListError && 'ui-input-error')}
                        type='text'
                        value={cityInputVal}
                        onChange={(e) => changeCityInputVal(e.target.value)}
                        placeholder={props.cityListError ? props.cityListError : 'Найти город...'}
                    />
                    <button className='ui-button button-blue' onClick={() => {props.addCityRequest(cityInputVal); changeCityInputVal('')}}>Добавить</button>
                </div>
            </div>
            
            <div className='settings-section'>
                <div className='left-section'>
                    <h1 className='settings-header'>Единица измерения</h1>
                </div>
                <div className='right-section unit-switcher'>
                    <button className={props.unitType === 'C' ? 'active' : ''} onClick={() => props.setUnitType('C')}>°C</button>
                    <button className={props.unitType === 'F' ? 'active' : ''} onClick={() => props.setUnitType('F')}>°F</button>
                </div>
            </div>
            
            <div className='settings-section'>
                <div className='left-section'>
                    <h1 className='settings-header'>Ключ API</h1>
                    <p className='muted-text'>
                        API: openweathermap.org<br />
                    Не меняйте это поле и оставьте ключ стандартным, если не знаете, что делаете!
                    </p>
                </div>
                <div className='right-section'>
                    <input className='ui-input' type='text' value={apiKeyInputVal} onChange={(e) => changeApiKeyInputVal(e.target.value)} />
                    <button className='ui-button button-blue' onClick={() => props.setApiKey(apiKeyInputVal)}>OK</button>
                </div>
            </div>
            
            <div className='settings-section'>
                <div className='left-section'>
                    <h1 className='settings-header'>Удалить данные</h1>
                    <p className='muted-text'>
                        Возникла странная ошибка? Очистите данные этого веб-приложения. Настройки будут удалены!
                    </p>
                </div>
                <div className='right-section'>
                    <button className='ui-button button-red' onClick={() => {
                        localStorage.clear();
                        document.location.reload();
                    }}>Сбросить настройки</button>
                </div>
            </div>
            
            <div className='settings-section'>
                <div className='left-section'>
                    <h1 className='settings-header'>О приложении</h1>
                </div>
                <div className='right-section'>
                    <p className='muted-text'>Версия: { version }</p>
                </div>
            </div>
        </div>
    );
}

function CityListItem(props) {
    return (
        <div className='city-list-item'>
            <button className='icon-button' onClick={props.onSetDefault} title='Использовать этот город'>
                {
                    props.isDefault ? <UiIcon icon='check-checked' /> : <UiIcon icon='check-blank' />
                }
            </button>
            <div className='city-list-item-text'>
                <h1 className='settings-header'>{props.cityName}</h1>
                <p className='muted-text'>{props.cityCountry}</p> 
            </div>
            <button className='icon-button' onClick={props.onDelete} title='Удалить город'><UiIcon icon='remove' /></button>
        </div>
    );
}

export default connect(
    (state) => ({
        cityList: state.cityList,
        unitType: state.unitType,
        apiKey: state.apiKey,
        cityListError: state.cityListError,
    }), { addCityRequest, removeCity, setUnitType, setDefaultCity, setApiKey }
)(SettingsPage);