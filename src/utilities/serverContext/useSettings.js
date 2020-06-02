import fs from 'fs'

export default async (db) => {

  const files = fs.readdirSync("src/utilities/serverContext/settings")

  let settings = {}

  for (const file of files) {
    if (file === 'configureSettings.js') continue
    const settingsMiddleware = require(`./settings/${file}`).default
    const newSettings = await settingsMiddleware(db)
    settings = { ...settings, ...newSettings }
  }

  return settings
}
