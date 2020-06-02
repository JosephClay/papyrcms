import configureSettings from './configureSettings'


export default async (db) => {
  const defaultSettings = { enableCommenting: false }
  return await configureSettings("comment", defaultSettings, db)
}
