import React from 'react'

import { io } from '../utils/socketWorker'

export default function Message({ mes }) {
    const isMyMessage = (id) => {
        return id == io.id
    }
    let messClasses = ['card col s6 grey lighten-2', !isMyMessage(mes.socket_id) ? 'offset-s6' : '']
    return (
        <div className="row">
            {mes.type === 'message' ? (
                <div className={messClasses.join(' ')}>
                    <div className="card-content">
                        {}
                        <span className="card-title">{mes.nick}</span>
                        <p>{mes.message}</p>
                    </div>
                </div>
            ) : (
                    <div className='card col s4 offset-s4 red lighten-2'>
                        <div className="card-content center-align white-text">
                            <p>{mes.message}</p>
                        </div>
                    </div>
                )}
        </div>
    )

}