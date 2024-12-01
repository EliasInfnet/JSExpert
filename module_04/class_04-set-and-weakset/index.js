const assert = require("assert")

const arr1 = ["0", "1", "2"]
const arr2 = ["2", "0", "3"]

const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"])

const set = new Set()
arr1.forEach((item) => set.add(item))
arr2.forEach((item) => set.add(item))

assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"])

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
  "0",
  "1",
  "2",
  "3",
])

assert.ok(set.has("3"))

const users1 = new Set(["Elias", "Elias2", "Elias3"])
const users2 = new Set(["Elias4", "Elias3", "Elias5"])

const intersections = new Set([...users1].filter((user) => users2.has(user)))

assert.deepStrictEqual([...intersections], ["Elias3"])

const difference = new Set([...users1].filter((user) => !users2.has(user)))
assert.deepStrictEqual([...difference], ["Elias", "Elias2"])

const user = { id: 123 }
const user2 = { id: 321 }

const weakSet = new WeakSet([user])
weakSet.add(user2)
weakSet.delete(user)
weakSet.has(user)