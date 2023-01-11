const { admin, db } = require('../util/admin')
const config = require('../util/config')
const firebase = require('firebase')
firebase.initializeApp(config)
const { validateLogin, validateRegister } = require('../util/validate')

/**
 * API to handle any requests with user related data
 * Handles login with validation of email and password.
 * Handles registration of users with validation of emails on role specific whitelists.
 * Updating of users as well as accessing of all whitelists.
 */

// login
exports.login = (request, response) => {
  //populate user obj
  const user = {
    email: request.body.email,
    password: request.body.password,
  }

  //run user input validation function
  const { valid, errors } = validateLogin(user)
  if (!valid) {
    return response.status(400).json(errors)
  }

  //logs user in using Firebase Auth
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      //returns the new auth bearer token
      return data.user.getIdToken()
    })
    .then((token) => {
      //returns bearer token
      return response.json({ token })
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        //returns error if user not found
        return response.status(400).json({ general: 'Email not registered' })
      }
      if (error.code === 'auth/invalid-password') {
        //returns error if password is incorrect
        return response.status(400).json({ general: 'Invalid password' })
      }
      return response
        .status(403)
        .json({ general: 'Invalid credentials, please try again' })
    })
}

//register user
exports.register = async (request, response) => {
  //create user obj
  const user = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  }

  //runs user validation
  const { valid, errors } = validateRegister(user)
  console.log('valid = ' + valid)
  if (!valid) {
    return response.status(400).json(errors)
  }

  //booleans to store if account is a clinitian, researcher or admin, this is used to set thier role in the database
  clinician = false
  researcher = false
  superAdmin = false
  //get clinician whitelist and check if user email is on it
  await db
    .doc(`/userWhiteList/clinicianList`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        //returns error message
        return response
          .status(404)
          .json({ general: 'Could not get whitelist emails' })
      } else {
        whiteListUsers = doc.data()
        //check if user is on whitelist, set clinitian to true if found
        for (var i = 0; i < whiteListUsers.emails.length; i++) {
          if (whiteListUsers.emails[i] === user.email) {
            clinician = true
          }
        }
      }
    })
    .catch((error) => {
      //returns error message
      return response
        .status(500)
        .json({ general: 'Could not get clinician whitelist emails' })
    })

  //get researcher whitelist and check if user email is on it
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
          if (whiteListUsers.emails[i] === user.email) {
            researcher = true
          }
        }
      }
    })
    .catch((error) => {
      //return error message
      return response
        .status(500)
        .json({ general: 'Could not get whitelist emails' })
    })

  //get admin whitelist and check if user email is on it
  await db
    .doc(`/userWhiteList/superAdminList`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        //return error message
        return response
          .status(404)
          .json({ general: 'Could not get admin whitelist emails' })
      } else {
        whiteListUsers = doc.data()
        //check user is on whitelist
        for (var i = 0; i < whiteListUsers.emails.length; i++) {
          if (whiteListUsers.emails[i] === user.email) {
            superAdmin = true
          }
        }
      }
    })
    .catch((error) => {
      //return error message
      return response
        .status(500)
        .json({ general: 'Could not get whitelist emails' })
    })

  //uses Firebase Auth to create a new user
  if (researcher || clinician || superAdmin) {
    let token, userId
    await db
      .doc(`/users/${user.email}`)
      .get()
      .then((doc) => {
        //Check if user already exists
        if (doc.exists) {
          return response
            .status(401)
            .json({ general: 'This account is already registered ' })
        } else {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
        }
      })
      .then((data) => {
        //returns the new auth token
        userId = data.user.uid
        return data.user.getIdToken()
      })
      .then((idtoken) => {
        token = idtoken
        let useRole
        //Assigns user role
        if (clinician) {
          useRole = 'Clinician'
        } else if (researcher) {
          useRole = 'Researcher'
        } else if (superAdmin) {
          useRole = 'Admin'
        }
        //creates new user obj
        const userCredentials = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: new Date().toISOString(),
          role: useRole,
          userId,
        }
        return db.doc(`/users/${user.email}`).set(userCredentials)
      })
      .then(() => {
        //user created, return auth token
        return response.status(201).json({ token })
      })
      .catch((err) => {
        //returns error message
        if (err.code === 'auth/email-already-in-use') {
          return response.status(400).json({ email: 'Email already in use' })
        } else {
          return response
            .status(500)
            .json({ general: 'Something went wrong, please try again' })
        }
      })
  } else {
    //returns error message if user not on any whitelist
    return response.status(400).json({ general: 'Email not on a whitelist' })
  }
}

//get user details
exports.getUser = (request, response) => {
  let userData = {}
  //gets a user with email from url
  db.doc(`/users/${request.user.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        //returns user data
        userData.userCredentials = doc.data()
        return response.json(userData)
      } else {
        //returns error message
        return response.status(404).json({ general: 'Cannot find user' })
      }
    })
}

//Update a user details
exports.updateUser = (request, response) => {
  //updates user with email from url
  db.doc(`/users/${request.user.email}`)
    .update(request.body)
    .then(() => {
      //returns success message
      response.status(200).json({ message: 'Updated successfully' })
    })
    .catch((error) => {
      //returns error message
      return response.status(500).json({
        message: 'Cannot Update the value',
      })
    })
}

//get clinicians whitelist
exports.getClinicainWhitelist = (request, response) => {
  db.doc(`/userWhiteList/clinicianList`)
    .get()
    .then((doc) => {
      whitelistUsers = doc.data()
      //returns clinician whitelist as array
      return response.status(200).json(whitelistUsers)
    })
    .catch((error) => {
      //returns error message
      return response
        .status(404)
        .json({ general: 'Could not get clinician whitelist emails' })
    })
}

//add clinician to whitelist
exports.addEmailToClinicianWhitelist = (request, response) => {
  //check if body contains an email to add
  if (request.body.email === null) {
    return response
      .status(400)
      .json({ general: 'Email address must be provided' })
  }
  //get current whitelist users
  db.doc(`/userWhiteList/clinicianList`)
    .get()
    .then((doc) => {
      whiteListUsers = doc.data()
      //append user to whitelist array
      whiteListUsers.emails.push(request.body.email)
      //update whitelist with new array
      db.doc(`/userWhiteList/clinicianList`).update(whiteListUsers)
      //returns success message
      return response
        .status(200)
        .json({ general: 'Email added to clinician whitelist' })
    })
    .catch((error) => {
      //returns error message
      console.error(error)
      return response.status(500).json({
        general: 'Cannot add email to clinician whitelist',
      })
    })
}

//get researcher whitelist
exports.getResearcherWhitelist = (request, response) => {
  db.doc(`/userWhiteList/researcherList`)
    .get()
    .then((doc) => {
      //returns researcher whitelist as array
      whitelistUsers = doc.data()
      return response.status(200).json(whitelistUsers)
    })
    .catch((error) => {
      //returns error message
      return response
        .status(500)
        .json({ general: 'Could not get researcher whitelist emails' })
    })
}

//Add researcher to whitelist
exports.addEmailToResearcherWhitelist = (request, response) => {
  //check if body contains an email to add
  if (request.body.email === null) {
    //returns error message
    return response
      .status(400)
      .json({ general: 'Email address must be provided' })
  }
  db.doc(`/userWhiteList/researcherList`)
    .get()
    .then((doc) => {
      //add email to current whitelist array
      whiteListUsers = doc.data()
      whiteListUsers.emails.push(request.body.email)
      //update whitelist with new array
      db.doc(`/userWhiteList/researcherList`).update(whiteListUsers)
      return response
        .status(200)
        .json({ general: 'Email added to researcher whitelist' })
    })
    .catch((error) => {
      //returns error message
      return response.status(500).json({
        general: 'Cannot add email to researcher whitelist',
      })
    })
}

//get admin whitelist
exports.getAdminWhitelist = (request, response) => {
  db.doc(`/userWhiteList/superAdminList`)
    .get()
    .then((doc) => {
      whitelistUsers = doc.data()
      //returns admin whitelist as array
      return response.status(200).json(whitelistUsers)
    })
    .catch((error) => {
      //returns error message
      return response
        .status(500)
        .json({ general: 'Could not get admin whitelist emails' })
    })
}

//Add researcher to whitelist
exports.addEmailToAdminWhitelist = (request, response) => {
  //check if body contains an email to add
  if (request.body.email === null) {
    return response
      .status(400)
      .json({ general: 'Email address must be provided' })
  }
  db.doc(`/userWhiteList/superAdminList`)
    .get()
    .then((doc) => {
      //add email to current whitelist array
      whiteListUsers = doc.data()
      whiteListUsers.emails.push(request.body.email)
      //update whitelist with new array
      db.doc(`/userWhiteList/superAdminList`).update(whiteListUsers)
      return response
        .status(200)
        .json({ general: 'Email added to admin whitelist' })
    })
    .catch((error) => {
      //returns error message
      return response.status(500).json({
        general: 'Cannot add email to admin whitelist',
      })
    })
}
