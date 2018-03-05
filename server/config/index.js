
const CONFIG = {
  'jwt': {
    'secret': process.env.JWT_SECRET || "wjnahvq6qqbqqqvmcqgqquqnRv sbyacC CNmVRgC"
  },
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/cbt'
}


module.exports = CONFIG
