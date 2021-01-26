const myIp = 'write-your-ip-here'
var app = new Vue({
    el: '#app',
    data: {
        trigger: false,
        socket: io.connect(`${myIp}:3000`)
    },
    computed: {
        socketConnected: function (){
            return this.socket.connected
        }
    },
    methods: {
        onTrigger: function(){
            this.trigger = !this.trigger
            this.socket.emit('trigger', {
                state: this.trigger
            })
        }
    }
})

app.socket.on('update', function(data){
    app.trigger = data.state
})
