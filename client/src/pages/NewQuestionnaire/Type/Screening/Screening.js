import Divider from '../../../../components/Divider'
import Introduction from './Sections/Introduction'
import InterviewInfo from './Sections/InterviewInfo'
import Result from './Sections/Result'
import PatientInfo from './Sections/PatientInfo'
import SubstanceUse from './Sections/SubstanceUse'
import screening from '../../../../util/screening'
import instance from '../../../../instance'
import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import NavScroll from '../../../../components/NavScroll'
import backIcon from '../../../../img/back.svg'

//The screening uses a pre defined object "screening.js" under /util to pass to the childer section compoenets,
//the childern components then create their own instance of the object to map all the questions with thier relivent information, add all thier local answers,
//this then gets passed back up to the assessment compoent which then updates the parent object which then get submitted.

const Screening = () => {
  const navigate = useNavigate()
  const [risk, setRisk] = useState(false) //Calculated risk which will use to display correct result (at risk/not at risk for SUD)
  const [answers, setAnwers] = useState(screening) //Screening obj, this gets updated and submitted to the server
  const [continueToAssessment, setContinueToAssessment] = useState(false) //Toggle if return to home or continue to assessment page
  const [loading, setLoading] = useState(false) //Displays loading in the btn when true
  const [scrollPos, setScrollPos] = useState('0%') //Scroll position of the page
  const authToken = localStorage.getItem('AuthToken') //Retrieve auth bearer token from local storage

  //Check if user is logged in, returns to homepage if session expired/not logged in
  useEffect(() => {
    if (authToken === null) {
      toast.warning('Session expired') //Shows msg
      navigate('/login') //Redirects to login page
    }
    setContinueToAssessment(false)
    document.getElementById('interviewInfo-nav').classList.add('active')
  }, [authToken])

  //To dynamically update the screening object when a child updates it, which is later submitted
  const wrapperSetAnswers = useCallback(
    (val) => {
      setAnwers(val)
    },
    [setAnwers],
  )

  //Set continueToAssessment to true to navigate to assessment page
  const continueToAssessmentPage = () => {
    setContinueToAssessment(true)
  }

  //Cancle screening and return to home page
  const cancleScreening = () => {
    let confirm = window.confirm(
      'Are you sure you want to cancle this screening? No data will be saved.',
    )
    if (confirm === true) {
      localStorage.removeItem('newQID')
      toast.warning('Screening cancelled')
      navigate('/home') //navigate to home page
    }
  }

  //Submit screening to db
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // sets button to disabled and show true
    let postScreening = { screening: answers, assessment: {} }
    try {
      //posts new questionnaire containing screening data, assessment is still empty at this point
      instance.defaults.headers.common = { Authorization: `${authToken}` }
      instance
        .post('/questionnaire', postScreening)
        .then((response) => {
          //Saves the current questionnaire id to local storage to be used in assessment page
          localStorage.setItem('newQID', response.data.id)
          if (continueToAssessment) {
            //Navigate to assessment page
            toast.success('Questionnaire saved, continuing to assessment')
            setLoading(false) //Set button back to normal
            navigate('/assessment')
          } else {
            //Navigate to home page
            localStorage.removeItem('newQID') //Removes the questionnaire id from local storage so that user cannot continue to assessment page
            toast.success('Screening saved and ended')
            setLoading(false) //Set button back to normal
            navigate('/home') //navigate to home page
          }
        })
        .catch((error) => {
          toast.error(error.response.data.general)
          setLoading(false) //Set button back to normal
        })
    } catch (error) {
      console.error(error)
    }
  }

  //detects when scroll is made
  useEffect(() => {
    listenToScrollEvent()
    listenToScrollSpy()
  }, [])

  //updated scroll progress bar
  const listenToScrollEvent = () => {
    document.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        setScrollPos(calculateScrollDistance())
      })
    })
  }

  //Remove all nav active
  const removeActive = () => {
    document.getElementById('resultSection-nav').classList.remove('active')
    document.getElementById('subUseQuestions-nav').classList.remove('active')
    document.getElementById('patientInfo-nav').classList.remove('active')
    document.getElementById('interviewInfo-nav').classList.remove('active')
  }

  //Updates which nav heading is acitve
  const listenToScrollSpy = () => {
    document.addEventListener('scroll', () => {
      //Results
      if (
        window.innerHeight >
        document.getElementById('resultSection').getBoundingClientRect().bottom
      ) {
        removeActive()
        document.getElementById('resultSection-nav').classList.add('active')
        return null
      }
      //SU Questions
      if (
        document.getElementById('subUseQuestions').getBoundingClientRect().top <
        60
      ) {
        removeActive()
        document.getElementById('subUseQuestions-nav').classList.add('active')
        return null
      }
      //Patient Info
      if (
        document.getElementById('patientInfo').getBoundingClientRect().top < 60
      ) {
        removeActive()
        document.getElementById('patientInfo-nav').classList.add('active')
        return null
      }
      //Interview Info
      if (
        document.getElementById('interviewInfo').getBoundingClientRect().top <
        60
      ) {
        removeActive()
        document.getElementById('interviewInfo-nav').classList.add('active')
        return null
      }
    })
  }

  //calculates scroll positon
  const calculateScrollDistance = () => {
    const scrollTop = window.pageYOffset // how much the user has scrolled by
    const winHeight = window.innerHeight
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    )
    const totalDocScrollLength = docHeight - winHeight
    const scrollPostion = Math.floor((scrollTop / totalDocScrollLength) * 100)
    return scrollPostion.toString() + '%' // returns how far the user has scrolled (in %)
  }

  return (
    <>
      <NavScroll scrollPos={scrollPos} />
      {/* {Nav bar displaying position in questionnaire with titles} */}
      <nav
        id="navbar-example3"
        class="navbar bg-light px-3 mb-3 fixed-top  movePosNav"
      >
        <ul class="nav nav-pills justify-content-center">
          <li class="nav-item">
            <a class="nav-link" href="#interviewInfo" id="interviewInfo-nav">
              Interview
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#patientInfo" id="patientInfo-nav">
              Patient
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#subUseQuestions"
              id="subUseQuestions-nav"
            >
              SU Questions
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#resultSection" id="resultSection-nav">
              Result
            </a>
          </li>
        </ul>
      </nav>
      <form onSubmit={onSubmit}>
        <div
          className=" container d-flex h-100 justify-content-center"
          style={{ height: '100vh' }}
        >
          <div
            className="row p10 mb-5"
            style={{
              maxWidth: '450px',
            }}
          >
            <div className="d-flex mt-5 px-0 justify-content-between">
              <h1
                className="text-left mt-0 mb-0 px-0 "
                style={{ fontWeight: 'bold' }}
              >
                Screening
              </h1>
              <button
                className="btn btn-outline-danger me-md-2 "
                type="button"
                onClick={cancleScreening}
              >
                <img
                  src={backIcon}
                  style={{
                    transform: ' translateY(-2px)',
                  }}
                ></img>{' '}
                Back
              </button>
            </div>

            <form className="px-0"> </form>
            <Divider />
            {/* Introdution */}
            {answers.sections.Introduction && (
              <>
                <Introduction answers={answers} />
                <Divider />
              </>
            )}
            {/* Interview Information */}
            {answers.sections.interviewInfo && (
              <>
                <div id="interviewInfo"></div>
                <InterviewInfo
                  answers={answers}
                  wrapperSetAnswers={wrapperSetAnswers}
                />
                <Divider />
              </>
            )}
            {/* Patient Information */}
            {answers.sections.patientInfo && (
              <>
                <div id="patientInfo"></div>
                <PatientInfo
                  answers={answers}
                  wrapperSetAnswers={wrapperSetAnswers}
                />
                <Divider />
              </>
            )}
            {/* Substance Use */}
            {answers.sections.substanceUse && (
              <>
                <div id="subUseQuestions"></div>
                <SubstanceUse
                  answers={answers}
                  wrapperSetAnswers={wrapperSetAnswers}
                  setRisk={setRisk}
                />
                <Divider />
              </>
            )}
            {/* Rsesults section */}
            <div id="resultSection"></div>
            <Result
              screening={screening}
              risk={risk}
              loading={loading}
              continueToAssessmentPage={continueToAssessmentPage}
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default Screening
