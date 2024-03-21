import { ObjectId } from 'mongodb'

export function songsByUser (userId) {
  const schema = [
    {
      $match: {
        user: new ObjectId(userId),
        action: 'Add Song'
      }
    }, {
      $group: {
        _id: '$oid'
      }
    }, {
      $lookup: {
        as: 'song',
        from: 'songs',
        foreignField: '_id',
        localField: '_id'
      }
    }
  ]
  return schema
}
