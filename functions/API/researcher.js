const { admin, db } = require('../util/admin')
const config = require('../util/config')

/**
 * this is an API for research purposes to be able to access all the questionnaires and their data
 * it will not be able to see any confidential patient infomation as that can only be decrypted by the
 * creater of the questionnaire.
 * 
 * Gets access to all anonymised questionnaires 
 * Gets researcher whitelist to check if user is on it
 */

//get all questionnaires
exports.getAllQuestionnairesResearch = async (request, response) => {
  console.log(request.user.email)
  //get researcher whitelist and check if user is on it
  researcher = false
  await db
    .doc(`/userWhiteList/researcherList`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        //return error message
        return response
          .status(404)
          .json({ general: 'Could not get researcher whitelist emails' })
      } else {
        whiteListUsers = doc.data()
        //check user is on whitelist
        for (var i = 0; i < whiteListUsers.emails.length; i++) {
          if (whiteListUsers.emails[i] === request.user.email) {
            researcher = true
          }
        }
      }
    })
    .catch((error) => {
      //return error message
      console.log(error)
      return response
        .status(500)
        .json({ general: 'Could not get whitelist emails' })
    })

  //get super admin whitelist and check if user is on it
  superAdmin = false
  await db
    .doc(`/userWhiteList/superAdminList`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        //return error message
        return response
          .status(404)
          .json({ general: 'Could not get researcher whitelist emails' })
      } else {
        whiteListUsers = doc.data()
        //check user is on whitelist
        for (var i = 0; i < whiteListUsers.emails.length; i++) {
          if (whiteListUsers.emails[i] === request.user.email) {
            superAdmin = true
          }
        }
      }
    })
    .catch((error) => {
      //return error message
      console.log(error)
      return response
        .status(500)
        .json({ general: 'Could not get whitelist emails' })
    })

  //if user is a researcher or super admin then they are authorized to access all questionnaires
  if (researcher || superAdmin) {
    await db
      .collection('questionnairesCollection')
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
        return response.status(500).json({ general: err.code })
      })
  } else {
    //return error message
    return response.status(403).json({ general: 'Not authorized' })
  }
}
