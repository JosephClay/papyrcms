import configureSettings from './configureSettings'


export default async (db) => {
  const defaultSettings = { enableMenu: false }
  return await configureSettings("app", defaultSettings, db)
}
