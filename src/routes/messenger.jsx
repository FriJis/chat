import React from 'react'
import { io, sendMessage as ioSendMessage } from '../utils/socketWorker'
import { decrypt, encrypt } from '../utils/crypt'

import MessagesComponent from '../components/messages'

export default function Messenger() {
    let [messages, setMesseges] = React.useState([])



    io.once('chat/message/from-user', ({ nick, message }) => {
        messages.push({
            nick,
            // message: message,
            message: decrypt(message),
            type: 'message'
        })
        setMesseges([...messages])
        console.log(messages);
    })
    io.once('chat/message/server', ({ nick, message }) => {
        messages.push({
            nick,
            message,
            type: 'server_message'
        })
        setMesseges([...messages])
        console.log(messages);
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