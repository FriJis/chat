import React, { useState } from 'react'
import { io, sendMessage as ioSendMessage } from '../utils/socketWorker'
import { decrypt, encrypt } from '../utils/crypt'

import MessagesComponent from '../components/messages'

export default function Messenger() {
    let [messages, setMesseges] = useState([])

    const addMessage = ({nick, message, encrypt, socket_id}, type) => {
        messages.push({
            nick,
            message: encrypt ? decrypt(message) : message,
            type,
            socket_id
        })
        setMesseges([...messages])
    }

    io.once('chat/message/from-user', ({ nick, message, socket_id }) => {
        addMessage({nick, message, encrypt: true, socket_id}, 'message')
    })
    io.once('chat/message/server', ({ nick, message }) => {
        addMessage({nick, message, encrypt: false}, 'server_message')
    })
    const sendMessage = (e) => {
        e.preventDefault()
        let { target } = e
        ioSendMessage(encrypt(target.querySelector('input[name="message"]').value))
        // ioSendMessage(target.querySelector('input[name="message"]').value)
    }

    return (
        <div className="messenger">
            <div className="field__messages">
                <MessagesComponent messages={messages}></MessagesComponent>
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