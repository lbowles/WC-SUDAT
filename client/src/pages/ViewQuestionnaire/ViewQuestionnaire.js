import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Divider from '../../components/Divider'
import PatientInfo from './PatientInfo'
import instance from '../../instance'
import { toast } from 'react-toastify'
import { SpinnerCircular } from 'spinners-react'
import Transcript from './Transcript'
import Report from './Report'
import backIcon from '../../../src/img/back.svg'

const ViewQuestionnaire = () => {
  const authToken = localStorage.getItem('AuthToken') //Rretrieve auth bearer token from local storage
  const [questionnaire, setQuestionnaire] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const qID = useParams().qID //Gets questionnaireID from url
  const [selectedView, setSelectedView] = useState(<></>) //Stores the selected view (view, edit, delete)

  //Check if screening was conducted before this, if not redirect to home page
  useEffect(() => {
    if (authToken === null) {
      toast.warning('Session expired') //Show success msg
      navigate('/login')
    }
  }, [authToken])

  //Call on page load/change
  useEffect(() => {
    getQuestionnaire()
  }, [qID])

  //Page selector changed
  const pageSelectorChanged = (e) => {
    if (questionnaire) {
      if (e.target.value === 'patientInfo') {
        setSelectedView(<PatientInfo questionnaire={questionnaire} />)
      } else if (e.target.value === 'transcript') {
        setSelectedView(<Transcript questionnaire={questionnaire} />)
      } else if (e.target.value === 'report') {
        setSelectedView(<Report questionnaire={questionnaire} />)
      }
    }
  }

  //Return to home page
  const backToHome = () => {
    navigate('/home') //navigate back to home page
  }

  //Get the questionnaire
  const getQuestionnaire = () => {
    setLoading(true)
    try {
      instance.defaults.headers.common = { Authorization: `${authToken}` }
      instance
        .get(`/questionnaire/${qID}`)
        .then((response) => {
          setQuestionnaire(response.data)
          setLoading(false)
        })
        .catch((error) => {
          toast.error('Error in retrieving the questionnaire')
          setLoading(false)
        })
    } catch (error) {
      toast.error('Error in retrieving the questionnaire')
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div
      className=" container d-flex h-100 justify-content-center"
      style={{ height: '100vh', maxWidth: '500px' }}
    >
      <div className="row p10">
        {/* View Questionnaire */}
        <div className="d-flex mt-5  mb-4 px-0 justify-content-between">
          <h2
            className="text-left mt-0 mb-0 px-0 "
            style={{ fontWeight: 'bold' }}
          >
            Questionnaire #{qID.substring(0, 4)}
          </h2>
          <button
            className="btn btn-outline-danger me-md-2 "
            type="button"
            onClick={() => {
              backToHome()
            }}
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
        {loading ? (
          <div className="d-flex justify-content-center">
            <SpinnerCircular
              size={50}
              color={'#0c6efd'}
              secondaryColor={'#fff'}
              style={{ paddingTop: '30px' }}
            />
          </div>
        ) : (
          <>
            <div
              className="btn-group w-100 mt-2 mb-2 px-0"
              role="group"
              id="viewSelector"
              aria-label={'Basic radio toggle button group'}
              onChange={(e) => {
                pageSelectorChanged(e)
              }}
            >
              <input
                type="radio"
                className="btn-check"
                name="viewSelector"
                id={'patientInfoRadio0'}
                autocomplete="off"
                value="patientInfo"
                required
              ></input>
              <label
                className="btn btn-outline-primary"
                for={'patientInfoRadio0'}
              >
                Patient Info
              </label>
              <input
                type="radio"
                className="btn-check"
                name="viewSelector"
                id={'transcriptRadio1'}
                autocomplete="off"
                value="transcript"
              ></input>
              <label
                className="btn btn-outline-primary"
                for={'transcriptRadio1'}
              >
                Transcript
              </label>
              <input
                type="radio"
                className="btn-check"
                name="viewSelector"
                id={'reportRadio2'}
                autocomplete="off"
                value="report"
              ></input>
              <label className="btn btn-outline-primary" for={'reportRadio2'}>
                Report
              </label>
            </div>
            <Divider />
          </>
        )}
        {selectedView}
      </div>
    </div>
  )
}

export default ViewQuestionnaire
