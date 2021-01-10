import React from 'react'

export default function Message({ mes }) {
    return (
        <div className="row">
            {mes.type === 'message' ? (
                <div className='card col s6 grey lighten-2'>
                    <div className="card-content">
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