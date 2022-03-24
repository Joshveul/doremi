import { model, models } from 'mongoose'
import favoriteSchema from '../schema/favorite'

const Favorite = models.Favorite || model('Favorite', favoriteSchema)

export default Favorite
