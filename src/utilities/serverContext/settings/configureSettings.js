const configureSettings = async (name, defaultOptions, db) => {

  let appSettings

  // Search for the provided settings document
  // const settings = await Settings.findOne({ name }).lean()
  const settings = await db.collection('settings').findOne({ name })

  // If we found one
  if (settings) {
    appSettings = settings
  } else {
    // If we did not find one, create one
    appSettings = await db.collection('settings').insertOne({ name, options: defaultOptions })
  }

  return appSettings.options
}


export default configureSettings
