import database from "./../database.json"
import Person from "./person.js"
import TerminalController from "./terminalController.js"
import { save } from "./repository.js"

const DEFAULT_LANG = "pt-BR"
const STOP_TERM = ":q"
const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question("Enter item: ")
    if (answer === STOP_TERM) {
      terminalController.closeTermina()
      return
    }
    const person = Person.generateInstanceFromString(answer)
    terminalController.update(person.formatted(DEFAULT_LANG))
    await save(person)
    return mainLoop()
  } catch (error) {
    console.log(error)
    return mainLoop()
  }
}

await mainLoop()
