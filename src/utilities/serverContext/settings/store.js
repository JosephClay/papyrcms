import configureSettings from './configureSettings'


export default async (db) => {
  const defaultSettings = { enableStore: false }
  return await configureSettings("store", defaultSettings, db)
}
