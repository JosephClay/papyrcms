import configureSettings from './configureSettings'


export default async (db) => {
  const defaultSettings = { enableEvents: false }
  return await configureSettings("event", defaultSettings, db)
}
