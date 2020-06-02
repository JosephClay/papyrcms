import configureSettings from './configureSettings'


export default async (db) => {
  const defaultSettings = { enableRegistration: true }
  return await configureSettings("auth", defaultSettings, db)
}
