const jwt = require('jsonwebtoken')

const logger = (req, res, next) => {
  console.log('Logging route:', req.path, newDate().toISOString())
  next()
}

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const [bearer, token] = authHeader.split(' ')
    const decoded = jwt.verify(token, 'secret')
    if (!decoded) {
      throw new Error('Invalid token')
    }
    req.user = decoded
    next()
  } catch (error) {
    res.sendStatus(401)
  }
}

module.exports = {
  logger,
  authenticate
}