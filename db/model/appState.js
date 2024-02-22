import { model, models } from 'mongoose'
import appState from '../schema/appState'
const Log = require('./log')

export const dbModel = models.AppState || model('AppState', appState)

// Defining an alias for readability
const AppState = dbModel

export const getAppState = async () => {
  const doc = await AppState.findOneAndUpdate({}, {}, { upsert: true, new: true })
  return doc
}

export async function setPlay (userId = '', value = true) {
  const appStateDoc = await getAppState()
  if (appStateDoc !== null) {
    appStateDoc.play = value
    appStateDoc.save()
  }

  const operation = value ? 'played' : 'paused'

  Log.add(
    userId, `Karaoke ${operation}`, 'AppState', appStateDoc._id
  )
}
