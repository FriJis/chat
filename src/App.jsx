import React from 'react'
import 'materialize-css'
import './css/index.scss'
import { setToken } from './utils/crypt'

import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom'

import { io } from './utils/socketWorker'

import Auth from './routes/auth'
import Messenger from './routes/messenger'

io.on('setCryptToken', e => {
  setToken(e)
})

export default function App() {
  let history = useHistory()
  io.on('redirect', e => {
    history.push(e)
  })
  return (
    <div className="container">
      <Switch>
        <Route path="/mess/">
          <Messenger></Messenger>
        </Route>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>
    </div>
  )
}


