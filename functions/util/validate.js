/**
 * Checks if value is a string
 */
const isStringValid = (string) => {
  if (string.trim() === '') {
    return false
  } else {
    return true
  }
}

/**
 * runs validation for user input when logging in
 */
exports.validateLogin = (data) => {
  let errorLog = {}
  if (!isStringValid(data.email)) {
    errorLog.general = 'Fill in email'
  }
  if (!isStringValid(data.password)) {
    errorLog.general = 'Fill in password'
  }
  //returns if valid is true or false
  //return error is one is found
  return {
    errorLog,
    valid: Object.keys(errorLog).length === 0 ? true : false,
  }
}

/**
 * Checks if email is a real email, by checking pattern
 */
const checkRealEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.match(emailRegEx)) return true
  else return false
}

/**
 * runs validation for user input when registering
 */
exports.validateRegister = (data) => {
  let errorLog = {}
  if (!isStringValid(data.email)) {
    errorLog.general = 'Fill in email'
  } else if (!isStringValid(data.email)) {
    errorLog.general = 'Fill in Password'
  }
  if (!checkRealEmail(data.email)) {
    errorLog.general = 'Must be a valid email address'
  }
  if (!isStringValid(data.firstName)) {
    errorLog.general = 'Fill in first name'
  }
  if (!isStringValid(data.lastName)) {
    errorLog.general = 'Fill in last name'
  }
  if (!isStringValid(data.password)) {
    errorLog.general = 'Fill in password'
  }
  if (data.password !== data.confirmPassword) {
    errorLog.general = 'Passwords do not match'
  }
  //returns if valid is true or false
  //return error is one is found
  return {
    errors: errorLog,
    valid: Object.keys(errorLog).length === 0 ? true : false,
  }
}
