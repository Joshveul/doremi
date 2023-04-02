import { model, models } from 'mongoose'
import logSchema from '../schema/log'

const Log = models.Log || model('Log', logSchema)

export const add = async (userId = String, action = String, schema = String, oid = String) => {
  if (userId !== 'undefined') {
    const obj = {
      user: userId,
      action,
      schema,
      oid
    }
    console.log(obj)
    await Log.create(obj)
  }
}

export default Log
