import configureSettings from './configureSettings'


export default async (db) => {
  const defaultSettings = {
    enableEmailingToAdmin: true,
    enableEmailingToUsers: false
  }
  return await configureSettings("email", defaultSettings, db)
}
