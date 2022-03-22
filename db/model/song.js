import mongoose from '../mongo'
import songSchema from '../schema/song'
const { model } = mongoose

const Song = model('Song', songSchema)

export default Song
