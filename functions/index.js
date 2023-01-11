const functions = require('firebase-functions')
const app = require('express')()
const auth = require('./util/auth')

//This creates rutes and uses the API functions

//Importing API functions
const {
  login,
  register,
  getUser,
  updateUser,
  getClinicainWhitelist,
  addEmailToClinicianWhitelist,
  getResearcherWhitelist,
  addEmailToResearcherWhitelist,
  getAdminWhitelist,
  addEmailToAdminWhitelist,
} = require('./API/users')

const {
  getAllQuestionnaires,
  createQuestionnaire,
  deleteQuestionnaire,
  getQuestionnaire,
  updateQuestionnaire,
} = require('./API/questionnaires')

const { getAllQuestionnairesResearch } = require('./API/researcher')

//Routes for questionnaires
app.get('/questionnaires', auth, getAllQuestionnaires)
app.get('/questionnaire/:qId', auth, getQuestionnaire)
app.post('/questionnaire', auth, createQuestionnaire)
app.delete('/questionnaire/:qId', auth, deleteQuestionnaire)
app.put('/questionnaire/:qId', auth, updateQuestionnaire)

//Routes for users
app.post('/login', login)
app.post('/register', register)
app.get('/user', auth, getUser)
app.post('/user', auth, updateUser)
app.get('/clinicianWhitelist', auth, getClinicainWhitelist)
app.post('/clinicianWhitelist', auth, addEmailToClinicianWhitelist)
app.get('/researcherWhitelist', auth, getResearcherWhitelist)
app.post('/researcherWhitelist', auth, addEmailToResearcherWhitelist)
app.get('/adminWhitelist', auth, getAdminWhitelist)
app.post('/adminWhitelist', auth, addEmailToAdminWhitelist)

//Routes for researcher
app.get('/getAllQuestionnaires', auth, getAllQuestionnairesResearch)

exports.api = functions.https.onRequest(app)
