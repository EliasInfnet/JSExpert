const item = {
  name: "Elias",
  age: 24,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  valueOf() {
    return 7
  },
  [Symbol.toPrimitive](coercionType) {
    console.log("trying to convert to", coercionType)
    const types = {
      string: JSON.stringify(this),
      number: "007",
    }
    return types[coercionType] || types.string
  },
}

