import client from './mongo'

const db = client.db('doremi')

export function getQueryParam (url, param) {
  const rx = new RegExp('[?&]' + param + '=([^&]+).*$')
  const returnVal = url.match(rx)
  return returnVal === null ? '' : returnVal[1]
}

export function getDbCollection (collectionName) {
  return db.collection(collectionName)
}
