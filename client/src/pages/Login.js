import instance from '../instance'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import cryption from '../util/cryption'
import emailIcon from '../../src/img/email.svg'
import passwordIcon from '../../src/img/password.svg'
import loginIcon from '../../src/img/login.svg'
import logoMain from '../../src/img/logoMain.svg'

const Login = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  }) //inputs var
  const [loading, setLoading] = useState(false) //displays loading in the btn when true
  const { email, password } = inputs

  //Save values when user types them into inputs
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  //Submitting form
  const onSubmit = async (e) => {
    e.preventDefault() // Prevents page from refreshing
    setLoading(true) // Sets button to disabled and show true
    cryption.encryptUserKey(password)
    const body = { email, password }
    try {
      //Send login request to server
      await instance
        .post('/login', body)
        .then((response) => {
          toast.success('Logged in successfully')
          //Save token to local storage to be used for authentication on other pages
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
          console.log(error)
          toast.error(error.response.data.general) //Show error msg
          setLoading(false) //Set button back to normal
        })
    } catch (error) {
      console.error(error)
      setLoading(false) //Set button back to normal
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
          //Stores fetched user info
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
      //Assigns fetched user info to local storage
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
        className="row p10 pt-5"
        style={{
          maxWidth: '420px',
        }}
      >
        <img src={logoMain} className="pl-0 pt-5 pb-5"></img>
        <h4 className="px-0 mt-5 pb-2">Login</h4>
        <div className="card round">
          <div className="card-body px-2">
            <form onSubmit={onSubmit}>
              <h6 className="mt-2">
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
                Password
              </h6>
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
                className="form-control mb-4"
                value={password}
                onChange={(e) => onChange(e)}
              />
              {/* Disable btn with false data validation */}
              <button
                type="submit"
                className="btn btn-primary col-12 mb-2"
                disabled={!(email && password.length > 5 && !loading)}
              >
                {loading ? (
                  'Loading...'
                ) : (
                  <>
                    Login{' '}
                    <img
                      src={loginIcon}
                      style={{ transform: ' translateY(-1px)' }}
                    ></img>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="row flex justify-content-center text-center">
          <p className="mt-5">
            Dont have an account?{' '}
            <a href="/register" className="link-primary">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
