import { model, models } from 'mongoose'
import appState from '../schema/appState'

export const dbModel = models.AppState || model('AppState', appState)

// Defining an alias for readability
const AppState = dbModel

export const getAppState = async () => {
  const doc = await AppState.findOne()
  return doc
}
