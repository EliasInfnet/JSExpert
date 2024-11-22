const { faker } = require("@faker-js/faker")
const Car = require("./../src/entities/car")
const CarCategory = require("./../src/entities/carCategory")
const Customer = require("./../src/entities/customer")

const { join } = require("path")
const { writeFile } = require("fs/promises")

const seederBaseFolder = join(__dirname, "../", "database")
const ITEMS_AMOUNT = 2

const carCategory = new CarCategory({
  carIds: [],
  id: faker.string.uuid(),
  name: faker.vehicle.vehicle(),
  price: faker.number.int({ max: 100, min: 20 }),
})

const cars = []
const customers = []

for (let index = 0; index < ITEMS_AMOUNT; index++) {
  const car = new Car({
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
    id: faker.string.uuid(),
    name: faker.vehicle.model(),
  })
  carCategory.carIds.push(car.id)
  cars.push(car)

  const customer = new Customer({
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    age: faker.number.int({ max: 50, min: 18 }),
  })
  customers.push(customer)
}

const write = (filename, data) =>
  writeFile(join(seederBaseFolder, filename), JSON.stringify(data))

;(async () => {
  await write("cars.json", cars)
  await write("carCategories.json", [carCategory])
  await write("customers.json", customers)
})()
