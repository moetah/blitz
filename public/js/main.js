Vue.use(VueMarkdown)
const app = new Vue({
  el: '.main',
  data: {
    // sections
    intro: true,
    blitz: false,
    result: false,
    // data
    userData: {},
    blitzData: {},
    score: {},
    // counter
    currentId: 0,
    //html vars
    source: '',
    answer: ''
  },
  computed: {
    // current question
    current: function() {
      return this.blitzData[this.currentId]
    }
  },
  methods: {
    // emiters
    emitUserData: function(cb) {
      if ( this.userData.age && this.userData.age ) {
        socket.emit('userData', this.userData)
      } else {
        alert('Пожалуйста введите данные! TehePelo')
      }
    },
    emitNextQ: function(qId, a) {
      // console.log(key,this.current.answers[key])
      socket.emit('answer', qId, a)
    },
    // section changers
    toBlitz: function() {
      this.intro = false
      this.blitz = true
    },
    toResults: function() {
      this.blitz = false
      this.result = true
    },
    // global
    nextQ: function() {
      // checks for
      // dont use toResults here cuz results can 'blink' after showing
      if (this.currentId === ( this.blitzData.length - 1 )) socket.emit('getScore')
      this.currentId++
    },
    jo: function(...args) {
      console.log(...args)
    }
  }
})

// socket.io defination
const socket = io.connect(document.location.origin)

// socket.io handlers
socket.on('blitzData', function(data) {
  app.toBlitz()
  app.blitzData = data
})

socket.on('score', function(score) {
  app.toResults()
  app.score = score
})