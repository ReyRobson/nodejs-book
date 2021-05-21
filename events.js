const EventEmitter = require("events")

class Emit extends EventEmitter { }

const emitter = new Emit.EventEmitter()

var user


emitter.on("carlo", () => {
    user = "carlos"
    console.log("user added " + user)
})

emitter.on("ann", (user) => {
    user = "ann"
    console.log("user added " + user)
})

emitter.emit("carlo", user)
emitter.emit("ann", user)