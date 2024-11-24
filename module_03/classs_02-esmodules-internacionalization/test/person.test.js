import Person from "./../src/person.js"
import chai from "chai"
import mocha from "mocha"
const { describe, it } = mocha
const { expect } = chai

describe("Person", () => {
  it("should returna  person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "2 Bike,Caminhão 20000 2024-05-14 2024-11-28"
    )

    const expected = {
      id: "2",
      kmTraveled: "20000",
      from: "2024-05-14",
      to: "2024-11-28",
      vehicles: ["Bike", "Caminhão"],
    }

    expect(person).to.be.deep.equal(expected)
  })

  it("should format values", () => {
    const person = new Person({
      id: "2",
      kmTraveled: "20000",
      from: "2024-05-14",
      to: "2024-11-28",
      vehicles: ["Bike", "Caminhão"],
    })

    const result = person.formatted("pt-BR")
    const expected = {
      id: 2,
      vehicles: "Bike e Caminhão",
      kmTraveled: "20.000 km",
      from: "14 de maio de 2024",
      to: "28 de novembro de 2024",
    }

    expect(result).to.be.deep.equal(expected)
  })
})
