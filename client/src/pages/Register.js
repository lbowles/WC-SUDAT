import instance from '../instance'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import cryption from '../util/cryption'
import emailIcon from '../../src/img/email.svg'
import passwordIcon from '../../src/img/password.svg'
import accountIcon from '../../src/img/account.svg'
import registerIcon from '../../src/img/login.svg'
import logoMain from '../../src/img/logoMain.svg'

const Register = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }) //form inputs
  const [loading, setLoading] = useState(false) //displays loading in the btn when true
  const { firstName, lastName, email, password, confirmPassword } = inputs

  //Save values when user types them into inputs
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  //Register User
  const onSubmit = async (e) => {
    e.preventDefault() // prevents page from refreshing
    setLoading(true) // sets button to disabled and show true
    cryption.encryptUserKey(password)
    //Body to send to server
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }
    try {
      //Send registration post to server
      await instance
        .post('/register', body)
        .then((response) => {
          toast.success('Accout created successfully') //Show success msg
          localStorage.setItem('AuthToken', `Bearer ${response.data.token}`)
          if (getUserInfo(response.data.token)) {
            navigate('/home') //Redirect to home page
            setLoading(false) //Set button back to normal
          } else {
            toast.success('Could not fetch user info')
            setLoading(false) //Set button back to normal
          }
        })
        .catch((error) => {
          toast.error(error.response.data.general) //Show general error msg
          setLoading(false) //Set button back to normal
        })
    } catch (error) {
      console.error(error)
    }
  }

  //Fetch user information when page loads
  const getUserInfo = async (authToken1) => {
    localStorage.removeItem('userInfo')
    let userInfo
    try {
      instance.defaults.headers.common = {
        Authorization: `Bearer ${authToken1}`,
      }
      await instance
        .get('/user')
        .then((response) => {
          //Stores user info in local storage
          userInfo = response.data.userCredentials
        })
        .catch((error) => {
          if (error.response.status === 403) {
            navigate('/login')
          }
        })
    } catch (error) {
      console.error(error)
    }
    if (userInfo) {
      console.log(userInfo)
      //Store user info in local storage
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      return true
    } else {
      return false
    }
  }

  return (
    <div
      className=" container d-flex h-100 justify-content-center"
      style={{ height: '100vh' }}
    >
      <div
        className="row p10"
        style={{
          maxWidth: '420px',
        }}
      >
        <img src={logoMain} className="pl-0 pt-5 "></img>
        <h4 className="px-0 mt-5 mb-3">Register</h4>
        <div className="card round">
          <div className="card-body px-2">
            <form onSubmit={onSubmit}>
              <h6 className="mt-2">
                <img
                  src={accountIcon}
                  style={{ transform: ' translateY(-2px)' }}
                ></img>{' '}
                First Name
              </h6>
              <input
                required
                type="text"
                name="firstName"
                placeholder="John"
                className="form-control"
                value={firstName}
                onChange={(e) => onChange(e)}
              />
              <h6 className="mt-3">
                <img
                  src={accountIcon}
                  style={{ transform: ' translateY(-2px)' }}
                ></img>{' '}
                Last Name
              </h6>
              <input
                required
                type="text"
                name="lastName"
                placeholder="Doe"
                className="form-control"
                value={lastName}
                onChange={(e) => onChange(e)}
              />
              <h6 className="mt-3">
                <img
                  src={emailIcon}
                  style={{ transform: ' translateY(-1px)' }}
                ></img>{' '}
                Email
              </h6>
              <input
                required
                type="email"
                name="email"
                placeholder="joe@example.com"
                className="form-control"
                value={email}
                onChange={(e) => onChange(e)}
              />
              <h6 className=" mt-3">
                <img
                  src={passwordIcon}
                  style={{ transform: ' translateY(-2px)' }}
                ></img>{' '}
                Password{' '}
              </h6>
              <input
                minLength="6"
                required
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => onChange(e)}
              />
              <h6 className=" mt-3">
                <img
                  src={passwordIcon}
                  style={{ transform: ' translateY(-2px)' }}
                ></img>{' '}
                Confirm Password
              </h6>
              <input
                minLength="6"
                required
                type="password"
                name="confirmPassword"
                placeholder="Password"
                className="form-control mb-4"
                value={confirmPassword}
                onChange={(e) => onChange(e)}
              />
              {/* Disable button with false data validation */}
              <button
                type="submit"
                className="btn btn-primary col-12 mb-2"
                disabled={
                  !(
                    email &&
                    password &&
                    confirmPassword &&
                    firstName &&
                    lastName &&
                    !loading
                  )
                }
              >
                {loading ? (
                  'Loading...'
                ) : (
                  <>
                    Register{' '}
                    <img
                      src={registerIcon}
                      style={{ transform: ' translateY(-1px)' }}
                    ></img>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="row flex justify-content-center text-center">
          <p className="mt-5 mb-5">
            Already have an account?{' '}
            <a href="/login" className="link-primary">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
