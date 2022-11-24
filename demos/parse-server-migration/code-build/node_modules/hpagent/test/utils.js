'use strict'

// We are using self-signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const proxy = require('proxy')
const { readFileSync } = require('fs')
const { join } = require('path')
const http = require('http')
const https = require('https')

const ssl = {
  key: readFileSync(join(__dirname, 'ssl.key')),
  cert: readFileSync(join(__dirname, 'ssl.cert'))
}

function createProxy () {
  return new Promise((resolve, reject) => {
    const server = proxy(http.createServer())
    server.listen(0, '127.0.0.1', () => {
      resolve(server)
    })
  })
}

function createSecureProxy () {
  return new Promise((resolve, reject) => {
    const server = proxy(https.createServer(ssl))
    server.listen(0, '127.0.0.1', () => {
      resolve(server)
    })
  })
}

function createServer (handler, callback) {
  return new Promise((resolve, reject) => {
    const server = http.createServer()
    server.listen(0, '127.0.0.1', () => {
      resolve(server)
    })
  })
}

function createSecureServer (handler, callback) {
  return new Promise((resolve, reject) => {
    const server = https.createServer(ssl)
    server.listen(0, '127.0.0.1', () => {
      resolve(server)
    })
  })
}

module.exports = {
  ssl,
  createProxy,
  createSecureProxy,
  createServer,
  createSecureServer
}
