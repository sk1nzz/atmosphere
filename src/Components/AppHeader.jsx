import React from 'react';

import { UiIcon } from '../Assets/IconsUI/icons';
import classNames from 'classnames';

export function AppHeader(props) {
    return (
        <div className={classNames('app-header', props.separated && 'app-header-separated')}>
            <div className='app-title'>
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
            </div>
            {
                props.refreshBtnCallback &&
                <button className='icon-button' onClick={props.refreshBtnCallback} title='Обновить'>
                    <UiIcon icon='update' />
                </button>
            }
        </div>
    );
}