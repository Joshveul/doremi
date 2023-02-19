import { model, models } from 'mongoose'
import sessionSchema from '../schema/session'
import * as AppState from './appState'
const Log = require('./log')

export const dbModel = models.Session || model('Session', sessionSchema)

const Session = dbModel

export const add = async (userId) => {
  const doc = await Session.create({
    users: [userId],
    songs: [],
    sessionStartDate: Date.now(),
    sessionEndDate: null
  })

  Log.add(
    userId, 'Start session', 'Sessions', doc._id
  )

  return doc
}

export async function joinActiveSession (userId) {
  const appState = await AppState.getAppState(userId)
  let sessionId
  let doc
  if (appState !== null && 'currentSession' in appState) {
    console.info(`Session found! Adding user: ${userId}`)
    sessionId = appState.currentSession
    doc = await Session.findById(sessionId)
    await Session.updateOne(
      { _id: sessionId, users: { $ne: userId } },
      { $push: { users: userId } }
    )
  } else {
    console.info(`Session not found! Starting one and adding user: ${userId}`)
    doc = await add(userId)
    sessionId = doc._id
    await AppState.dbModel.create({ currentSession: sessionId })
  }

  Log.add(
    userId, 'Join session', 'Sessions', sessionId
  )

  return doc
}

export default Session
