const rewiremock = require("rewiremock/node")
const { deepStrictEqual } = require("assert")

const dbData = [{ name: "Lucas" }, { name: "Roberto" }]
class MockDatabase {
  connect = () => this
  find = async (query) => dbData
}

rewiremock(() => require("../src/util/database")).with(MockDatabase)
;(async () => {
  {
    const expected = [{ name: "LUCAS" }, { name: "ROBERTO" }]
    rewiremock.enable()
    const UserFactory = require("../src/factory/userFactory")

    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()
    deepStrictEqual(result, expected)

    rewiremock.disable()
  }

  {
    const expected = [{ name: "ELIAS" }]
    const UserFactory = require("../src/factory/userFactory")

    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()
    deepStrictEqual(result, expected)
  }
})()
