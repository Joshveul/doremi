/* eslint-disable no-console */
import { model, models } from 'mongoose'
import sessionSchema from '../schema/session'
import * as AppState from './appState'
const Log = require('./log')

export const dbModel = models.Session || model('Session', sessionSchema)

const Session = dbModel

export const add = async (userId = '') => {
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

/**
 * @param {String} userId
 * @returns {Session} the active session
 */
export async function joinActiveSession (userId = '') {
  let sessionDoc = await getActiveSession()
  if (sessionDoc !== null) {
    console.info(`Session found! Adding user: ${userId}`)
    await Session.updateOne(
      { _id: sessionDoc._id, users: { $ne: userId } },
      { $push: { users: userId } }
    )
  } else {
    console.info(`Session not found! Starting one and adding user: ${userId}`)
    sessionDoc = await add(userId)
    await AppState.dbModel.create({ currentSession: sessionDoc._id })
  }

  Log.add(
    userId, 'Join session', 'Sessions', sessionDoc._id
  )

  return sessionDoc
}

/**
 * @param {String} userId
 * @returns {import('mongoose').Document} the active session
 */
export async function getActiveSession () {
  const appState = await AppState.getAppState()
  let sessionId
  if (appState !== null && 'currentSession' in appState) {
    console.info(`Session found! ${appState.currentSession}`)
    sessionId = appState.currentSession
    return await Session.findById(sessionId)
  }
  return null
}

export async function updatePlaylist (userId = '', playlist = []) {
  const sessionDoc = await getActiveSession()
  if (sessionDoc !== null) {
    sessionDoc.playlist = playlist
    sessionDoc.save()
  }

  Log.add(
    userId, 'Update session playlist', 'Sessions', sessionDoc._id
  )
}

export async function getPlaylist () {
  const sessionDoc = await getActiveSession()
  return sessionDoc.playlist
}

export default Session
