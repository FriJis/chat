import React from 'react'

import { join } from '../utils/socketWorker'

const onSubmit = (e) => {
    const { target } = e
    e.preventDefault()
    join({
        nick: target.querySelector('input[name="nickname"]').value,
        pass: target.querySelector('input[name="pass"]').value
    })
    
}

export default function Auth() {
    return (
        <div className="auth valign-wrapper row">
            <form className="card col s12 blue-grey darken-1" onSubmit={onSubmit}>
                <div className="card-content white-text">
                    <span className="card-title ">Write room password</span>
                    <div className="input-field ">
                        <input id="nickname" min="3" name="nickname" type="text" className="validate white-text" />
                        <label htmlFor="nickname" className=" grey-text text-lighten-3">Nickname</label>
                    </div>
                    <div className="input-field ">
                        <input id="pass" min="3" name="pass" type="text" className="validate white-text" />
                        <label htmlFor="pass" className=" grey-text text-lighten-3">Room name</label>
                    </div>
                </div>
                <div className="card-action">
                    <input type="submit" className="btn" value="Auth" />
                </div>
            </form>
        </div>
    )
}