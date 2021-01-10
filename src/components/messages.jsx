import React from 'react'

import Message from './message'

export default function Messages({ messages }) {
    return messages.map((mes, i) => (
        <Message mes={mes} key={i}></Message>
    ))
}