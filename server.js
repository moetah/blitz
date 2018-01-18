// modules
const express   = require('express')
const fs        = require('fs')
const app       = express()
const server    = require('http').Server(app)
const io        = require('socket.io')(server)

const blitz     = require('./blitz.js')

// let blitz = fs.readFile('blitz11-1.json', 'utf8', (err, data) => {
//   return hmm = JSON.parse(data)
// })

function isAnswerTrue(qId, a) {
  if ( blitz.check[qId] == a ) {
    return 1
  } else {
    return 0
  }
}

// set post
const port = process.env.PORT || 8000

// deploy
server.listen(port)
app.use(express.static(__dirname + '/public'))

app.get('/project', (req, res) => res.send('https://docs.google.com/document/d/1-FHKz1L9J6VpRLgHlrQrI2NBYBrnYnH6O5LaQ7kAy1I/edit?usp=sharing'))

// emiters
io.on('connection', function (socket) {
  let userData = {}
  let score = {
    true: 0,
    false: 0,
    total: 0
  }
  socket.on('userData', function(_userData) {
    userData = _userData
    console.log(`new user: ${userData.name}:${userData.age} `)
    socket.emit('blitzData', blitz.task)
  })

  socket.on('answer', function(qId, a) {
    let answer = isAnswerTrue(qId, a)
    io.sockets.emit('isAnswerTrue', qId, answer)
    if ( answer ) {
      score.true++
    } else {
      score.false++
    }
    score.total++
    console.log(`${qId} - ${a} : ${answer}`)
    console.log(score)
  })

  socket.on('getScore', function() {
    socket.emit('score', score)
  })

  socket.on('done', function(){
    console.log(`${name}:${age} is done`)
    if (name) socket.broadcast.emit('userLeave', name, connected)
  });
});