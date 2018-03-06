require('dotenv').config()

CONFIG = {
  'app': process.env.APP || 'development',
  'port': process.env.PORT || '8083',
  'db': {
    'dialect': process.env.DB_DIALECT || 'mongo',
    'host': process.env.DB_HOST || 'localhost',
    'port': process.env.DB_PORT || '27017',
    'name': process.env.DB_NAME || 'cbt',
    'user': process.env.DB_USER || '',
    'password': process.env.DB_PASSWORD || ''
  },

  'jwt': {
    'secret': process.env.JWT_SECRET || "wjnahvq6qqbqqqvmcqgqquqnRvsbyacCCNmVRgC",
    'expiration': process.env.JWT_EXPIRATION || '10000'
  }
}
