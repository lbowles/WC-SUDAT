//initiaze firebase admin features, used in auth middleware
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()
module.exports = { admin, db }
