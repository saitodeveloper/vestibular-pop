#!/usr/bin/env node

import app from './app.js'
import http from 'http'

/** Server events */
const onListening = () => {
    const addr = server.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port

    console.debug('Listening on ' + bind)
}

const normalizePort = val => {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    } else if (port >= 0) {
        return port
    }

    return false
}

/** App settings */
const port = normalizePort(process.env.PORT || '8000')
app.set('port', port)

/** Server spin up */
const server = http.createServer(app)
server.listen(port)
server.on('listening', onListening)
