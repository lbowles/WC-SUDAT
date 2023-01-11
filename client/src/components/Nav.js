import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import accountIcon from '../../src/img/accountFill.svg'
import logo from '../../src/img/logo.svg'

/**
 * Navigation bar
 */

const Nav = () => {
  const [url, setUrl] = useState(window.location.href) //Gets current url
  const [userInfo, setUserInfo] = useState(null) //Stores user info fetched from local storage
  const navigate = useNavigate() //React dom router

  /**
   * Check current page, if user is an admin then is displays the whitelist option in the nav bar
   */
  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === 'Admin') {
        //Sets which page is currently active
        if (url.includes('whitelist')) {
          document.getElementById('whitelistLink').classList.add('active')
        } else if (url.includes('home')) {
          document.getElementById('homeLink').classList.add('active')
        }
      }
    }
  }, [userInfo])

  //Gets user info from local storage
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
  }, [localStorage.getItem('userInfo')])

  //Detects if local userinfo updated, and sets user info
  window.addEventListener('storage', (e) => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
  })

  /**
   * Logs user out, clears user info stored in local storage
   */
  const logOut = () => {
    localStorage.removeItem('AuthToken')
    localStorage.removeItem('userInfo')
    navigate('/login')
    toast.success("You've been logged out")
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        {/* main logo */}
        <a className="navbar-brand" href="#">
          <img src={logo} style={{ width: '30px', marginRight: '10px' }}></img>
          WC-SUDAT
        </a>
        {/* dropdown button for mobile devices */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* navbar links */}
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link"
                aria-current="page"
                href="/home"
                id="homeLink"
              >
                Home
              </a>
            </li>
            {/* adds whitelist option if user is admin */}
            {userInfo && (
              <>
                {userInfo.role === 'Admin' && (
                  <li className="nav-item">
                    <a
                      className="nav-link "
                      aria-current="page"
                      href="/whitelist"
                      id="whitelistLink"
                    >
                      Whitelist
                    </a>
                  </li>
                )}
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            <li
              className="nav-item"
              onClick={() => {
                logOut()
              }}
            >
              <a className="nav-link active" aria-current="page" href="/login">
                Log Out
              </a>
            </li>
            {/* displays user role */}
            {userInfo && (
              <>
                {userInfo.role && (
                  <li
                    className="nav-item row align-items-center"
                    style={{ marginLeft: '5px' }}
                  >
                    <div>
                      <span class="badge text-bg-dark">
                        <img
                          src={accountIcon}
                          style={{ transform: ' translateY(-1px)' }}
                        ></img>{' '}
                        {userInfo.role}
                      </span>
                    </div>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
