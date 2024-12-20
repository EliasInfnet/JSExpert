const assert = require("assert")

const obj = {}
const arr = []
const fn = () => {}

assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

assert.deepStrictEqual(obj.__proto__, Object.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

function Employee() {}
Employee.prototype.salary = () => "salary"

function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => "profitShare"

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => "monthlyBonuses"

assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)

const manager = new Manager()
// console.log(manager.salary())
// console.log(manager.profitShare())
// console.log(manager.monthlyBonuses())

assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__,
  Employee.prototype
)
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
)
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
)

class T1 {
  ping() {
    return "ping"
  }
}

class T2 extends T1 {
  pong() {
    return "pong"
  }
}

class T3 extends T2 {
  shoot() {
    return "shoot"
  }
}

const t3 = new T3()
// console.log(t3.ping())
// console.log(t3.pong())
// console.log(t3.shoot())

assert.deepStrictEqual(t3.__proto__, T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
)
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
)
// assert.deepStrictEqual(t3.__proto__, T3.prototype)
