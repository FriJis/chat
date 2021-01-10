import React from 'react'
import { io, sendMessage as ioSendMessage } from '../utils/socketWorker'
import { decrypt, encrypt } from '../utils/crypt'


export default function Messenger() {
    let [messages, setMesseges] = React.useState([])

    io.on('chat/message/from-user', ({ nick, message }) => {
        messages.push({
            nick,
            message: decrypt(message)
        })
        setMesseges([...messages])
    })

    const sendMessage = (e) => {
        e.preventDefault()
        let { target } = e

        ioSendMessage(encrypt(target.querySelector('input[name="message"]').value))
    }

    return (
        <div className="messenger">
            <div className="field__messages">
                {messages.map((mes, i) => {
                    return (
                        <div className="row" key={i}>
                            <div className="card col s6 grey lighten-2">
                                <div className="card-content">
                                    <span className="card-title">{mes.nick}</span>
                                    <p>{mes.message}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <form className="field__text row valign-wrapper" onSubmit={sendMessage}>
                <div className="input-field col s10">
                    <input id="icon_prefix" name="message" type="text" className="validate" />
                    <label htmlFor="icon_prefix">Message</label>
                </div>
                <input className="btn col s2" type="submit" value="Send" />
            </form>
        </div>
    )
}