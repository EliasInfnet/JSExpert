const assert = require("assert")

const uniqueKey = Symbol("username")
const user = {}

user["username"] = "eliasn"
user[uniqueKey] = "value for symbol"

assert.deepStrictEqual(user.username, "eliasn")
assert.deepStrictEqual(user[uniqueKey], "value for symbol")

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

const obj = {
  [Symbol.iterator]: () => ({
    items: ["c", "b", "a"],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop(),
      }
    },
  }),
}

// for (const item of obj) {
//   console.log(item)
// }

assert.deepStrictEqual([...obj], ["a", "b", "c"])

const kItems = Symbol("kItems")
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg))
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError()
    const items = this[kItems].map((item) =>
      new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(item)
    )

    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction",
    }).format(items)
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => Promise((r) => setTimeout(r, ms))
    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }

  get [Symbol.toStringTag]() {
    return "Teste"
  }
}

const myDate = new MyDate([2024, 4, 1], [2024, 5, 10])

const expectedDates = [new Date(2024, 4, 1), new Date(2024, 5, 10)]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), "[object Teste]")
assert.throws(() => myDate + 1, TypeError)

assert.deepStrictEqual(
  String(myDate),
  "01 de maio de 2024 e 10 de junho de 2024"
)
assert.deepStrictEqual([...myDate], expectedDates)

// ;(async () => {
//   for await (const item of [...myDate]) {
//     console.log(item)
//   }
// })()
;(async () => {
  const dates = await Promise.all([...myDate])
  assert.deepStrictEqual(dates, expectedDates)
})()
