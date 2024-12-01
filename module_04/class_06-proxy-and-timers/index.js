"use strict"

const Event = require("events")
const event = new Event()
const eventName = "counter"
event.on(eventName, (msg) => console.log("counter updated", msg))

const myCounter = { counter: 0 }

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] })
    target[propertyKey] = newValue
    return true
  },
  get: (object, prop) => {
    return object[prop]
  },
})

setInterval(function () {
  proxy.counter += 1
  if (proxy.counter === 10) clearInterval(this)
}, 200)

setTimeout(() => {
  proxy.counter = 4
  console.log("timeout!")
},0)

setImmediate(() => {
  console.log("setImmediate", proxy.counter)
})

process.nextTick(() => {
  proxy.counter = 2
})
