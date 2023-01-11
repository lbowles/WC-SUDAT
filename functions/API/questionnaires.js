const { db } = require('../util/admin')
const { doc, deleteDoc } = require('firebase/firestore')

//API to handle anything relating to questionnaires
/**
 * API to handle questionnaire related functions.
 * Including getting questionnaires for a particular user as well as getting a single questionnaire.
 * Creating, updating and deleting of a questionnaire on the database.
 */

//gets all questionnaires that a user has created
exports.getAllQuestionnaires = (request, response) => {
  //only fetch questionnaires user has created (where email matches)
  db.collection('questionnairesCollection')
    .where('email', '==', request.user.email)
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      //populate array with questionnaires
      let questionnaires = []
      data.forEach((doc) => {
        console.log(doc.data().questions)
        questionaireData = doc.data()
        questionaireData.qId = doc.id
        questionnaires.push({
          questionaireData,
        })
      })
      //return the questionnaires as an array
      return response.json(questionnaires)
    })
    .catch((err) => {
      console.error(err)
      //return error message
      return response.status(500).json({ error: err.code })
    })
}

//get a questionnaire
exports.getQuestionnaire = (request, response) => {
  //fetch questionnaire with url qId
  db.doc(`/questionnairesCollection/${request.params.qId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        //return error message if questionnaire does not exist
        return response.status(404).json({
          error: 'Questionnaire not found',
        })
      }
      //only get questionnaire if user created it
      if (doc.data().email !== request.user.email) {
        //return error message if user did not create questionnaire
        return response.status(403).json({ error: 'UnAuthorized' })
      }
      questionaireData = doc.data()
      questionaireData.qId = doc.id
      //returns questionnaire
      return response.json(questionaireData)
    })
    .catch((err) => {
      console.error(err)
      //return error message
      return response.status(500).json({ error: error.code })
    })
}

//create a questionnaire
exports.createQuestionnaire = (request, response) => {
  //check if screening is populated
  if (request.body.screening === null) {
    //return error message
    return response
      .status(400)
      .json({ screening: 'Outstanding screening information' })
  }
  //creates object to send to db
  const newQuestionnaire = {
    screening: request.body.screening,
    createdAt: new Date().toISOString(),
    email: request.user.email,
    assessment: request.body.assessment,
  }
  db.collection('questionnairesCollection')
    .add(newQuestionnaire)
    .then((doc) => {
      const responseQuestionnaire = newQuestionnaire
      responseQuestionnaire.id = doc.id
      return response.json(responseQuestionnaire)
    })
    .then((docRef) => {
      //returns the new documents id
      console.log('Document written with ID: ', docRef.id)
      return docRef.id
    })
    .catch((err) => {
      //return error message
      response.status(500).json({ error: 'Error storing questionnaire' })
      console.error(err)
    })
}

//update questoinnaire
exports.updateQuestionnaire = (request, response) => {
  //updated questionnaire qId from url
  let document = db.doc(`/questionnairesCollection/${request.params.qId}`)
  document
    .update(request.body)
    .then(() => {
      //return confirmation message
      response.json({ message: 'Updated successfully' })
    })
    .catch((err) => {
      console.error(err)
      //return error message
      return response.status(500).json({
        error: "Couldn't update questionnaire",
      })
    })
}

//delete a questionnaire
exports.deleteQuestionnaire = async (request, response) => {
  //delete questionniare with qId form url
  let document = db.doc(`/questionnairesCollection/${request.params.qId}`)
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        //return error message if questionnaire does not exist
        return response.status(404).json({ error: 'Questionnaire not found' })
      }
      //Only the user who created the questionnaire can delete it
      if (doc.data().email !== request.user.email) {
        //return error message if user did not create questionnaire
        return response.status(403).json({ error: 'Unauthorized' })
      } else {
        //deletes questionnaire
        return document.delete()
      }
    })
    .then(() => {
      //return confirmation message
      response.json({ message: 'Delete successfull' })
    })
    .catch((err) => {
      console.error(err)
      //return error message
      return response
        .status(500)
        .json({ error: 'Could not delete questionnaire' })
    })
}
