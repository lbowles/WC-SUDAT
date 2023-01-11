const { admin, db } = require('./admin')

/**
 * Checks if request from user has a valid auth token.
 * Uses a security measure to prevent people who have not logged in from accessing certain routes
 */

module.exports = (request, response, next) => {
  let idToken
  //checks if request has bearer token
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = request.headers.authorization.split('Bearer ')[1]
  } else {
    console.error('No token found')
    return response.status(403).json({ error: 'Unauthorized' })
  }
  //uses firebase addmin feature to verify the auth token
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      request.user = decodedToken
      return db
        .collection('users')
        .where('userId', '==', request.user.uid)
        .limit(1)
        .get()
    })
    .then((data) => {
      return next()
    })
    .catch((err) => {
      //if token is invalid
      console.error('Error while verifying token', err)
      return response.status(403).json(err)
    })
}
