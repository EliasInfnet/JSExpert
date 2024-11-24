import { writeFile, readFile } from "fs/promises"

export const save = async (data) => {
  const { pathname: databaseFile } = new URL(
    "./../database.json",
    import.meta.url
  )

  // remover / do path
  const _databaseFile = databaseFile.slice(1)
  const currentData = JSON.parse(await readFile(_databaseFile))
  currentData.push(data)

  await writeFile(_databaseFile, JSON.stringify(currentData))
}
