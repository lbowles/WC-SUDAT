const CryptoJS = require('crypto-js')

//EncryptUserKey
const encryptUserKey = (string) => {
  const crypt = CryptoJS.AES.encrypt(string.toString(), string).toString()
  const passphrase = window.btoa(string)
  localStorage.setItem('EncryptID', passphrase)
}

//Encrypt with users encryption key
const encrypt = (string) => {
  const passphrase = localStorage.getItem('EncryptID')
  return CryptoJS.AES.encrypt(string.toString(), passphrase).toString()
}

//Decrypt with user encryption key
const decrypt = (string) => {
  const passphrase = localStorage.getItem('EncryptID')
  const bytes = CryptoJS.AES.decrypt(string, passphrase)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}

export default { encrypt, decrypt, encryptUserKey }
