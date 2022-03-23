import { model, models } from 'mongoose'
import songSchema from '../schema/song'

const Song = models.Song || model('Song', songSchema)

export default Song
