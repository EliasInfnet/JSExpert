const assert = require("assert")

const myMap = new Map()

myMap
  .set(1, "one")
  .set("Elias", { text: "two" })
  .set(true, () => "three")

const mapWithConstructor = new Map([
  ["1", "one"],
  [2, "two"],
  [true, "three"],
])

assert.deepStrictEqual(myMap.get(1), "one")
assert.deepStrictEqual(myMap.get("Elias"), { text: "two" })
assert.deepStrictEqual(myMap.get(true)(), "three")

const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: "Elias" })

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: "Elias" })

assert.deepStrictEqual(myMap.size, 4)

assert.ok(myMap.has(onlyReferenceWorks))

assert.ok(myMap.delete(onlyReferenceWorks))
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([
    [1, "one"],
    ["Elias", { text: "two" }],
    [true, () => "three"],
  ])
)

// any key can colide

const actor = {
  name: "Elias",
  toString: "Meu nome e Elias",
}

myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

const weakMap = new WeakMap()
const hero = { name: "Flash" }

weakMap.set(hero, "Teste")
weakMap.get(hero)
weakMap.delete(hero)
weakMap.has(hero)
