const { readFile } = require("fs/promises")
const { error } = require("./constants")
const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
}

class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, "utf8")
    const validation = this.isValid(content)
    if (!validation.valid) throw new Error(validation.error)

    const result = this.parseCSVToJSON(content)
    return result
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split(/\r?\n/)
    // remove first line

    const firstLine = lines.shift()
    const header = firstLine.split(",")

    const users = lines.map((line) => {
      const columns = line.split(",")
      const user = {}
      for (const index in columns) {
        user[header[index]] = columns[index].trim()
      }
      return user
    })
    return users
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    // Check file content
    // fs.readFileSync("./mocks/threeItems-valid.csv","utf8")

    const [headers, ...fileWithoutHeaders] = csvString.split(/\r?\n/)
    const isHeaderValid = headers === options.fields.join(",")

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      }
    }

    if (
      !fileWithoutHeaders.length ||
      fileWithoutHeaders.length > options.maxLines
    ) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      }
    }

    return { valid: true }
  }
}

module.exports = File
