const assert = require("assert")

function* calculation(arg1, arg2) {
  yield arg1 * arg2
  yield arg1 + arg2
  yield arg1 - arg2
}

function* main() {
  yield* calculation(20, 10)
}

const generator = main()

assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: 30, done: false })
assert.deepStrictEqual(generator.next(), { value: 10, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

assert.deepStrictEqual(Array.from(main()), [200, 30, 10])
assert.deepStrictEqual([...main()], [200, 30, 10])

const { readFile, stat, readdir } = require("fs/promises")

function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve("Hey dude")
}

async function* systemInfo() {
  const file = await readFile(__filename)
  yield { file: file.toString() }

  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

;(async () => {
  for await (const item of systemInfo()) {
    console.log(item)
  }
})()
