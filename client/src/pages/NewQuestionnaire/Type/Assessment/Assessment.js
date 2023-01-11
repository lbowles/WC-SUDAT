import Divider from '../../../../components/Divider'
import RiskOfSelfHarm from './Sections/RiskOfSelfHarm'
import Trauma from './Sections/Trauma'
import assessment from '../../../../util/assessment'
import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import DepressionAnxiety from './Sections/DepressionAnxiety'
import FamilyPeer from './Sections/FamilyPeer'
import School from './Sections/School'
import Community from './Sections/Community'
import FamilyProtective from './Sections/FamilyProtective'
import CommunityProtective from './Sections/CommunityProtective'
import Treatment from './Sections/Treatment'
import instance from '../../../../instance'
import NavScroll from '../../../../components/NavScroll'
import cancelIcon from '../../../../img/cancel.svg'
import saveIcon from '../../../../img/save.svg'
import { useLocation } from 'react-router-dom'

/**
 * The assessment component is one of two constituting the full WC-SUDAT questionnaire.
 * The assessment uses a pre defined object "assessment.js" under /util to pass to the childer section compoenets. 
 * The children components then create their own instance of the object to map all the questions with therr relevant
 * information, and adds all thier local answers.
 * This then gets passed back up to the assessment component which then updates the parent object which then itself get
 * submitted.
 */

const Assessment = () => {
  const authToken = localStorage.getItem('AuthToken') //Retrieve auth bearer token from local storage
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) //Displays loading in the btn when true
  const [answers, setAnwers] = useState(assessment) //Assessment obj, this gets updated by childer components and submitted to the server
  const [scrollPos, setScrollPos] = useState('0%') //Scroll position of the page
  const { pathname } = useLocation() //Current screen location

  //Check if user is logged in, returns to homepage if session expired/not logged in
  useEffect(() => {
    if (authToken === null) {
      toast.warning('Session expired') //Shows msg
      navigate('/login') //Redirects to login page
    }
  }, [authToken])

  //Scroll to top of page when it loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  //Check if screening was conducted before this, if not redirect to home page
  useEffect(() => {
    if (!localStorage.getItem('newQID')) {
      toast.warning(
        'You have to complete the screening before conducting an assessment',
      )
      navigate('/home') //Navigate to home page
    }
  }, [])

  //Listens to any change to the assessment obj, used for debugging
  useEffect(() => {
    if (answers) {
      //console.log(answers)
    }
  }, [answers])

  //To dynamically update the screening object when a child updates it, which is later submitted
  const wrapperSetAnswers = useCallback(
    (val) => {
      setAnwers(val)
    },
    [setAnwers],
  )

  //Cancel screening and return to home page
  const cancleAssessment = () => {
    let confirm = window.confirm(
      'Are you sure you want to cancle this assessment? No data will be saved.',
    )
    if (confirm === true) {
      localStorage.removeItem('newQID')
      toast.warning('Assessment cancelled')
      navigate('/home') //navigate to home page
    }
  }

  //Update questionnaire, adds assessment to questionnaire in DB
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // Sets button to disabled and show true
    try {
      let body = { assessment: answers }
      instance.defaults.headers.common = {
        Authorization: `${authToken}`,
      }
      instance
        .put(`/questionnaire/${localStorage.getItem('newQID')}`, body)
        .then((response) => {
          toast.success('Questionnaire completed and saved')
          localStorage.removeItem('newQID') //Removes the questionnaire id from local storage so that user cannot access it in the assignment page after it is submitted
          setLoading(false) //Set button back to normal
          navigate('/home') //Navigate to home page
        })
        .catch((error) => {
          toast.error("Couldn't save questionnaire")
          setLoading(false) //Set button back to normal
        })
    } catch (error) {
      console.error(error)
      setLoading(false) //Set button back to normal
    }
  }

  //Detects when scroll is made
  useEffect(() => {
    listenToScrollEvent()
    listenToScrollSpy()
  }, [])

  //Updated scroll progress bar
  const listenToScrollEvent = () => {
    document.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        setScrollPos(calculateScrollDistance())
      })
    })
  }

  //Remove all nav active
  const removeActive = () => {
    document.getElementById('comRisk-nav').classList.remove('active')
    document.getElementById('famProtective-nav').classList.remove('active')
    document.getElementById('treatment-nav').classList.remove('active')
    document.getElementById('comProtective-nav').classList.remove('active')
    document.getElementById('schoolRisk-nav').classList.remove('active')
    document.getElementById('famRisk-nav').classList.remove('active')
    document.getElementById('depression-nav').classList.remove('active')
    document.getElementById('trauma-nav').classList.remove('active')
    document.getElementById('selfHarm-nav').classList.remove('active')
  }

  
  /**
   * Updates which nav heading is active. With regards to progress indication of current position in questionnaire
   */
  const listenToScrollSpy = () => {
    document.addEventListener('scroll', () => {
      //Teatement
      if (
        document.getElementById('treatment').getBoundingClientRect().top < 60
      ) {
        removeActive()
        document.getElementById('treatment-nav').classList.add('active')
        return null
      }
      //Community Protective
      if (
        document.getElementById('comProtective').getBoundingClientRect().top <
        60
      ) {
        removeActive()
        document.getElementById('comProtective-nav').classList.add('active')
        return null
      }
      //Family Protective
      if (
        document.getElementById('famProtective').getBoundingClientRect().top <
        60
      ) {
        removeActive()
        document.getElementById('famProtective-nav').classList.add('active')
        return null
      }
      //Comunity Risk
      if (document.getElementById('comRisk').getBoundingClientRect().top < 60) {
        removeActive()
        document.getElementById('comRisk-nav').classList.add('active')
        return null
      }
      //School Risk
      if (
        document.getElementById('schoolRisk').getBoundingClientRect().top < 60
      ) {
        removeActive()
        document.getElementById('schoolRisk-nav').classList.add('active')
        return null
      }
      //Family Risk
      if (document.getElementById('famRisk').getBoundingClientRect().top < 60) {
        removeActive()
        document.getElementById('famRisk-nav').classList.add('active')
        return null
      }
      //Depression
      if (
        document.getElementById('depression').getBoundingClientRect().top < 60
      ) {
        removeActive()
        document.getElementById('depression-nav').classList.add('active')
        return null
      }
      //Trauma
      if (document.getElementById('trauma').getBoundingClientRect().top < 60) {
        removeActive()
        document.getElementById('trauma-nav').classList.add('active')
        return null
      }
      //Self harm
      if (
        document.getElementById('selfHarm').getBoundingClientRect().top < 60
      ) {
        removeActive()
        document.getElementById('selfHarm-nav').classList.add('active')
        return null
      }
    })
  }

  //Calculates scroll positon
  const calculateScrollDistance = () => {
    const scrollTop = window.pageYOffset
    const winHeight = window.innerHeight
    //How much the user has scrolled by
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    )
    //Reutrns % scrolled
    const totalDocScrollLength = docHeight - winHeight
    const scrollPostion = Math.floor((scrollTop / totalDocScrollLength) * 100)
    return scrollPostion.toString() + '%' // Returns how far the user has scrolled (in %)
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
            <a class="nav-link" href="#selfHarm" id="selfHarm-nav">
              Self Harm
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#trauma" id="trauma-nav">
              Trauma
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#depression" id="depression-nav">
              Depression
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#famRisk" id="famRisk-nav">
              Family Risk
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#schoolRisk" id="schoolRisk-nav">
              School Risk
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#comRisk" id="comRisk-nav">
              Community Risk
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#famProtective" id="famProtective-nav">
              Family Protective
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#comProtective" id="comProtective-nav">
              Community Protective
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#treatment" id="treatment-nav">
              Treatment
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
            className="row p10"
            style={{
              maxWidth: '450px',
            }}
          >
            <div className="d-flex mt-5 px-0 justify-content-between">
              <h1
                className="text-left mt-0 mb-0 px-0 "
                style={{ fontWeight: 'bold' }}
              >
                Assessment
              </h1>
              <button
                className="btn btn-outline-danger me-md-2 "
                type="button"
                onClick={cancleAssessment}
              >
                Cancel{' '}
                <img
                  src={cancelIcon}
                  style={{
                    transform: ' translateY(-1px)',
                  }}
                ></img>
              </button>
            </div>
            <form className="px-0"> </form>
            <Divider />
            {/* Section 1 Individual Risks */}
            <h3 className="font-weight-bold px-0 pb-3">
              <strong>{answers.sections.individualRisks.name}</strong>
            </h3>
            <div id="selfHarm"></div>
            <RiskOfSelfHarm
              answers={answers}
              wrapperSetAnswers={wrapperSetAnswers}
            />
            <div id="trauma"></div>
            <Trauma answers={answers} wrapperSetAnswers={wrapperSetAnswers} />
            <div id="depression"></div>
            <DepressionAnxiety
              answers={answers}
              wrapperSetAnswers={wrapperSetAnswers}
            />
            <Divider />
            {/* Section 2 Family and Community Risk */}
            <h3 className="font-weight-bold px-0 pb-3">
              <strong>{answers.sections.familyCommunity.name}</strong>
            </h3>
            <p className="fs-6 px-0 fw-light">
              {answers.sections.familyCommunity.subtext1}
            </p>
            <p className="fs-6 px-0 fw-light mb-0">
              {answers.sections.familyCommunity.subtext2}
            </p>
            <div id="famRisk"></div>
            <FamilyPeer
              answers={answers}
              wrapperSetAnswers={wrapperSetAnswers}
            />
            <div id="schoolRisk"></div>
            <School answers={answers} wrapperSetAnswers={wrapperSetAnswers} />
            <div id="comRisk"></div>
            <Community
              answers={answers}
              wrapperSetAnswers={wrapperSetAnswers}
            />
            <Divider />
            {/* Section 3 Protective Factors for Substance Use Disorders */}
            <h3 className="font-weight-bold px-0 pb-3">
              <strong>{answers.sections.protectiveFactors.name}</strong>
            </h3>
            <p className="fs-6 px-0 fw-light">
              {answers.sections.protectiveFactors.subtext1}
            </p>
            <div id="famProtective"></div>
            <p className="fs-6 px-0 fw-light mb-0">
              {answers.sections.protectiveFactors.subtext2}
            </p>
            <FamilyProtective
              answers={answers}
              wrapperSetAnswers={wrapperSetAnswers}
            />
            <div id="comProtective"></div>
            <CommunityProtective
              answers={answers}
              wrapperSetAnswers={wrapperSetAnswers}
            />
            <div id="treatment"></div>
            <Divider />
            {/* Section 4 Treatment */}
            <h3 className="font-weight-bold px-0 pb-3">
              <strong>{answers.sections.treatment.name}</strong>
            </h3>
            <p className="fs-6 px-0 fw-light">
              {answers.sections.treatment.subtext1}
            </p>
            <p className="fs-6 px-0 fw-light mb-0">
              {answers.sections.treatment.subtext2}
            </p>
            <Treatment
              answers={answers}
              wrapperSetAnswers={wrapperSetAnswers}
            />
            <Divider />
            {/* Submit button loads when posting assessment */}
            <button
              type="submit"
              className="btn btn-primary col-12 mb-5"
              disabled={loading}
            >
              {loading ? (
                'Loading...'
              ) : (
                <>
                  Submit{' '}
                  <img
                    src={saveIcon}
                    style={{
                      transform: ' translateY(-2px)',
                    }}
                  ></img>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Assessment
