import configureSettings from './configureSettings'


export default async (db) => {
  const defaultSettings = { enableBlog: false }
  return await configureSettings('blog', defaultSettings, db)
}
