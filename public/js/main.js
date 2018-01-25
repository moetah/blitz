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
    history: [],
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
      if ( this.userData.name && this.userData.var ) {
        socket.emit('userData', this.userData)
      } else {
        alert('Пожалуйста введите данные! TehePelo')
      }
    },
    emitNextQ: function(qId, a) {
      // console.log(key,this.current.answers[key])
      console.log('em')
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
      console.log('q')
      // checks for
      // dont use toResults here cuz results can 'blink' after showing
      if (this.currentId === ( this.blitzData.length - 1 )) socket.emit('getScore')
      else this.currentId++
      setTimeout(function() { app.highlightSyntax() }, 100)
      // app.highlightSyntax()
    },
    highlightSyntax: function() {
      console.log('hl')
      let pre = document.querySelectorAll('pre')
      console.log(pre)
      for (let i = 0; i < pre.length; i++) {
        Prism.highlightAllUnder(pre[i], true, function() { console.log('highliting')})
      }
    },
    jo: function(...args) {
      console.log(...args)
    },
    test: function() {
      // this.emitUserData()
        socket.emit('userData', this.userData)
      for (let i = 0; i < 23; i++) {
        document.querySelectorAll('input')[0].
        document.querySelectorAll('button')[0].click()
      }
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

socket.on('score', function(score, history) {
  console.log(score, history)
  app.toResults()
  app.score = score
  app.history = history
})