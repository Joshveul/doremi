import { model, models, Types } from 'mongoose'
import logSchema from '../schema/log'

const Log = models.Log || model('Log', logSchema)

export const add = async (userId = Types.ObjectId, action = String, schema = String, oid = Types.ObjectId) => {
  await Log.create({
    user: userId,
    action,
    schema,
    oid
  })
}

export default Log
