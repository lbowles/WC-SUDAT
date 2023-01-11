/**
 * The Western Cape Substance Use Disorder Assessment Tool (WC-SUDAT) is a web app designed for use
 * by local health care professionals (clinicians) for the screening and assessing of potential SUDs in patients
 * and their associated riks factors. There is also access of raw anonymised data for analysis and observations of trends
 * to be done by researchers. The project was initated by Associate Prof. M Kuttel and Prof L. Holtzhausen of the UCT Computer Science
 * and Social Sciences departments respectively. The project was undertaken and executed by undergraduate Computer Science
 * stduents at UCT as a capstone project.
 * @version: 27/09/2022
 * @authors Luke Bowles, Thomas Schroeder, Zaidh Imran
 */

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Assessment from './pages/NewQuestionnaire/Type/Assessment/Assessment'
import Screening from './pages/NewQuestionnaire/Type/Screening/Screening'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import ViewQuestionnaire from './pages/ViewQuestionnaire/ViewQuestionnaire'
import Whitelist from './pages/Whitelist'
import { useState, useEffect } from 'react'
import NotFound from './pages/NotFound'
import helpIcon from '../src/img/help.svg'

/**
 * The App component acts as the highest parent component after the default root/index component. It renders all other
 * sub components/web pages and their respective routes.
 */
function App() {
  const navigate = useNavigate()
  const [url, setUrl] = useState(window.location.href) //Current page url

  //Check current page
  useEffect(() => {
    //Redirects to not found page if user is not logged in
    if (url.substring(url.length - 1) === '/') {
      navigate('/login')
    } else if (
      !url.includes('home') &
      !url.includes('whitelist') &
      !url.includes('home') &
      !url.includes('login') &
      !url.includes('register') &
      !url.includes('newquestionnaire') &
      !url.includes('assessment') &
      !url.includes('questionnaire')
    ) {
      navigate('/notFound')
    }
  }, [url])

  return (
    <div>
      {/* Error dialog box (we can call this from any component in the app) */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Routes for all the pages */}
      <Routes>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/newquestionnaire" element={<Screening />}></Route>
        <Route exact path="/assessment" element={<Assessment />}></Route>
        <Route
          exact
          path="/questionnaire/:qID"
          element={<ViewQuestionnaire />}
        ></Route>
        <Route exact path="/whitelist" element={<Whitelist />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/notFound/" element={<NotFound />} />
      </Routes>
      <div className="footer">
        <a
          href="https://thundering-morning-845.notion.site/WC-SUDAT-User-Manual-fbec5295cae441e1a0e5779a79e536f7"
          target="_blank"
          style={{ paddingleft: '10px' }}
        >
          <span
            className="badge text-bg-secondary"
            style={{ opacity: '0.5 !important' }}
          >
            <img
              src={helpIcon}
              style={{ transform: ' translateY(-1px)' }}
            ></img>{' '}
            Need Help?
          </span>
        </a>
      </div>
    </div>
  )
}

export default App
