import React from 'react'

import { io } from '../utils/socketWorker'

export default function Message({ mes }) {
    const isMyMessage = (id) => {
        return id === io.id
    }
    let messClasses = ['card col m6 s12', isMyMessage(mes.socket_id) ? 'offset-m6 blue lighten-3' : 'grey lighten-2']
    return (
        <div className="row">
            {mes.type === 'message' ? (
                <div className={messClasses.join(' ')}>
                    <div className="card-content">
                        {}
                        <span className="card-title">{mes.nick}</span>
                        <p className="grey-text text-darken-2">{mes.message}</p>
                    </div>
                </div>
            ) : (
                    <div className='card col m4 s10 offset-s1 offset-m4 green lighten-2'>
                        <div className="card-content center-align white-text">
                            <p>{mes.message}</p>
                        </div>
                    </div>
                )}
        </div>
    )

}