import instance from '../instance'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Nav from '../components/Nav'
import Divider from '../components/Divider'
import { SpinnerCircular } from 'spinners-react'
import cryption from '../util/cryption'
import { downloadSVG } from '../util/tools'
import newQIcon from '../../src/img/newQuestionnaire.svg'
import viewIcon from '../../src/img/view.svg'
import deleteIcon from '../../src/img/deleteRed.svg'
import downloadIcon from '../../src/img/download.svg'
import downloadBlueIcon from '../../src/img/downloadBlue.svg'
const { Parser } = require('json2csv')

const Home = () => {
  const navigate = useNavigate()
  const authToken = localStorage.getItem('AuthToken') //Retrieve auth bearer token from local storage
  const [usersQuestionnaires, setUsersQuestionnaires] = useState([]) //Stores all questionnaires for the user
  const [researchersQuestionnaires, setResearchersQuestionnaires] = useState([]) //Stores all researchers questionnaires
  const [fetchingQuestionnaires, setFetchingQuestionnaires] = useState(true) //Shows spinner when fetching questionnaires
  const [
    fetchingResearcherQuestionnaires,
    setFetchingResearcherQuestionnaires,
  ] = useState(true) //Shows spinner when fetching researcher questionnaires
  const [fetchingUserInfo, setFetchingUserInfo] = useState(true) //Shows spinner when fetching user info
  const [userInfo, setUserInfo] = useState(null)

  //Check if user is logged in, returns to homepage if session expired/not logged in
  useEffect(() => {
    if (authToken === null) {
      toast.warning('Session expired') //Show success msg
      navigate('/login')
    } else {
      //fetch all questionnaires
      getAllQuestionnaires()
      getAllResearcherQuestionnaires()
    }
  }, [authToken])

  //Gets user info
  useEffect(() => {
    console.log('s')
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
  }, [localStorage.getItem('userInfo')])

  //Detects if local userinfo updated
  window.addEventListener('storage', (e) => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
    setFetchingUserInfo(false)
    //Check if user is logged in, returns to homepage if session expired/not logged in
    if (localStorage.getItem('AuthToken') === null) {
      toast.warning('Session expired') //Show msg
      navigate('/login')
    }
  })

  //Updates spinner if user info is loaded
  useEffect(() => {
    if (userInfo !== null) {
      setFetchingUserInfo(false) //stops loading homepage spinner
    }
  }, [userInfo])

  //Link to new questionnaire
  const newQuestionnaire = () => {
    navigate('/newquestionnaire')
  }

  //Download all questionnaires
  const downLoadAllQuestionnaires = () => {
    let questionnairesSVG
    researchersQuestionnaires.map((questionnaire) => {
      questionnairesSVG += questionnaireToSVG(questionnaire)
    })
    downloadSVG(questionnairesSVG, 'allQuestionnaires')
  }

  //Combine questionnaire sections into csv
  const questionnaireToSVG = (input) => {
    let questionnaire = input.questionaireData
    console.log(questionnaire)
    const parser = new Parser()
    //Screening Questions
    //Adds questionnaire info
    let questionnaireInfoArr =
      questionnaire.screening.sections.interviewInfo.questions
    questionnaireInfoArr.unshift({
      placeholder: '02/03/2022',
      name: 'createdDate',
      answer: questionnaire.createdAt,
      title: 'Date Created',
    })
    questionnaireInfoArr.unshift({
      placeholder: 'email@email.com',
      name: 'clinicianEmail',
      answer: questionnaire.email,
      title: 'Clinician Email',
    })
    questionnaireInfoArr.unshift({
      placeholder: 'QuestionnaireID',
      name: 'QuestionnaireID',
      answer: questionnaire.qId,
      title: 'QuestionnaireID',
    })
    const questionnaireInfo = parser.parse(questionnaireInfoArr)

    const patientInfo = parser.parse(
      questionnaire.screening.sections.patientInfo.questions,
    )
    console.log(questionnaire.screening.sections.patientInfo.questions)
    const subUseA = parser.parse(
      questionnaire.screening.sections.substanceUse.sectionA.questions,
    )
    const subUseB = parser.parse(
      questionnaire.screening.sections.substanceUse.sectionB.questions,
    )
    const screening = questionnaireInfo + patientInfo + subUseA + subUseB

    //Assessment
    const assess = questionnaire.assessment.sections
    let arrAssess = []
    if (assess) {
      //Family and Community Questions
      arrAssess[0] = parser.parse(assess.familyCommunity.community.questions)
      arrAssess[1] = parser.parse(assess.familyCommunity.familyPeer.questions)
      arrAssess[2] = parser.parse(assess.familyCommunity.school.questions)
      //Indivudal Risk Questions
      arrAssess[3] = parser.parse(
        assess.individualRisks.depressionAnxiety.sectionA.questions,
      )
      arrAssess[4] = parser.parse(
        assess.individualRisks.depressionAnxiety.sectionB.questions,
      )
      arrAssess[5] = parser.parse(
        assess.individualRisks.riskOfSelfHarm.questions,
      )
      arrAssess[6] = parser.parse(assess.individualRisks.trauma.questions)
      //ProtectiveFactors
      arrAssess[7] = parser.parse(
        assess.protectiveFactors.communityProtective.questions,
      )
      arrAssess[8] = parser.parse(
        assess.protectiveFactors.familyProtective.questions,
      )
      //Treatment
      arrAssess[9] = parser.parse(assess.treatment.treatment.questions)

      //Combines assessment svg sections
      let assessmentCombine
      arrAssess.map((item) => {
        assessmentCombine += item
      })
      return screening + assessmentCombine
    } else {
      return screening
    }
  }

  //Get all questionnaires for researchers, gets all the users questionnaires
  const getAllResearcherQuestionnaires = () => {
    setFetchingResearcherQuestionnaires(true)
    try {
      instance.defaults.headers.common = { Authorization: `${authToken}` }
      instance
        .get('/getAllQuestionnaires')
        .then((response) => {
          //QuestionnaireToSVG(response.data[1].questionaireData)
          setResearchersQuestionnaires(response.data)
          setFetchingResearcherQuestionnaires(false)
        })
        .catch((error) => {
          toast.error(error) //Display error msg
          setFetchingResearcherQuestionnaires(false)
        })
    } catch (error) {
      console.error(error)
      setFetchingResearcherQuestionnaires(false)
    }
  }

  //Get all questionnaires, gets all the users questionnaires
  const getAllQuestionnaires = () => {
    setFetchingQuestionnaires(true)
    try {
      instance.defaults.headers.common = { Authorization: `${authToken}` }
      instance
        .get('/questionnaires')
        .then((response) => {
          setUsersQuestionnaires(response.data)
          setFetchingQuestionnaires(false)
        })
        .catch((error) => {
          console.log(error)
          setFetchingQuestionnaires(false)
        })
    } catch (error) {
      console.error(error)
      setFetchingQuestionnaires(false)
    }
  }

  //Delete Questionnaire
  const deleteQuestionnaire = (qID) => {
    //Get confirmation from user
    if (
      window.confirm(
        'Are you sure you want to delete this questionnaire, this action can not be undone.',
      )
    ) {
      try {
        //Delete questionnaire
        instance.defaults.headers.common = { Authorization: `${authToken}` }
        instance
          .delete(`/questionnaire/${qID}`)
          .then((response) => {
            toast.success('Questionnaire deleted')
            getAllQuestionnaires()
          })
          .catch((error) => {
            console.log(error)
            toast.error('Could not delete questionnaire')
          })
      } catch (error) {
        console.error(error)
      }
    }
  }

  //View questionnaire
  const viewQuestionnaire = (qID) => {
    navigate(`/questionnaire/${qID}`)
  }

  return (
    <div>
      <Nav />
      {fetchingUserInfo ? (
        <div className="d-flex justify-content-center">
          <SpinnerCircular
            size={50}
            color={'#0c6efd'}
            secondaryColor={'#fff'}
            style={{ paddingTop: '30px' }}
          />
        </div>
      ) : (
        <div
          className=" container d-flex h-100 justify-content-center"
          style={{ height: '100vh', maxWidth: '550px' }}
        >
          {' '}
          {userInfo && (
            <>
              {userInfo.role === 'Researcher' || userInfo.role === 'Admin' ? (
                <div className="row p10">
                  {/* New Assessment */}
                  <h2
                    className="text-left mt-5  mb-4 px-0"
                    style={{ fontWeight: 'bold' }}
                  >
                    Global Access
                  </h2>
                  <p className="px-0 pb-0 mb-4">
                    You have access to download any questionnaire or all
                    questionnaires stored on the database in CSV format
                  </p>

                  {fetchingResearcherQuestionnaires ? (
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
                      <button
                        className="btn btn-primary mb-2"
                        onClick={() => {
                          downLoadAllQuestionnaires()
                        }}
                      >
                        Download All Questionnaires{' '}
                        <img
                          src={downloadIcon}
                          style={{
                            transform: ' translateY(-1px)',
                          }}
                        ></img>
                      </button>
                      {researchersQuestionnaires.length > 0 && (
                        <>
                          {/* Table with all the users pervious questionnaires */}
                          <div
                            className="table-responsive px-0 mt-4"
                            style={{ maxHeight: '400px' }}
                          >
                            <table className="table table-hover h-100">
                              <thead
                                className="table-light"
                                style={{ top: '0', position: 'sticky' }}
                              >
                                <tr>
                                  <th scope="col">#ID</th>
                                  <th scope="col">Date</th>
                                  <th scope="col">Clinician Email</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody className="table-group-divider">
                                {researchersQuestionnaires.map(function (
                                  questionnaire,
                                  i,
                                ) {
                                  return (
                                    <tr
                                      className="align-middle"
                                      key={
                                        questionnaire.questionaireData.qId + i
                                      }
                                    >
                                      <th scope="row">
                                        {questionnaire.questionaireData.qId.substring(
                                          0,
                                          4,
                                        )}
                                      </th>
                                      <td>
                                        {questionnaire.questionaireData.createdAt
                                          .substring(0, 10)
                                          .replace(/-/g, '/')}
                                      </td>
                                      <td>
                                        {questionnaire.questionaireData.email}
                                      </td>
                                      <td>
                                        <button
                                          type="button"
                                          className="btn btn-outline-primary px-10 py-0  h-30"
                                          style={{ marginRight: '10px ' }}
                                          onClick={() => {
                                            downloadSVG(
                                              questionnaireToSVG(
                                                researchersQuestionnaires[i],
                                              ),
                                              'Questionnaire-' +
                                                questionnaire.questionaireData
                                                  .qId,
                                            )
                                          }}
                                        >
                                          Download{' '}
                                          <img src={downloadBlueIcon}></img>
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="row p10">
                  {/* New Assessment */}
                  <h2
                    className="text-left mt-5  mb-4 px-0"
                    style={{ fontWeight: 'bold' }}
                  >
                    New Assessment
                  </h2>
                  <button
                    onClick={newQuestionnaire}
                    className="btn btn-primary"
                  >
                    Start New Questionnaire{' '}
                    <img
                      src={newQIcon}
                      style={{ transform: ' translateY(-1px)' }}
                    ></img>
                  </button>
                  <Divider />
                  {/* View Assessments */}

                  {fetchingQuestionnaires ? (
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
                      {usersQuestionnaires.length > 0 && (
                        <>
                          <h2
                            className="text-left mt-0  mb-4 px-0"
                            style={{ fontWeight: 'bold' }}
                          >
                            {userInfo.firstName + "'s Questionnaires"}
                          </h2>
                          {/* Table with all the users pervious questionnaires */}
                          <div
                            className="table-responsive px-0"
                            style={{ maxHeight: '300px' }}
                          >
                            <table className="table table-hover h-100">
                              <thead
                                className="table-light"
                                style={{ top: '0', position: 'sticky' }}
                              >
                                <tr>
                                  <th scope="col">#ID</th>
                                  <th scope="col">Date</th>
                                  <th scope="col">Patient</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody className="table-group-divider">
                                {usersQuestionnaires.map(function (
                                  questionnaire,
                                  i,
                                ) {
                                  return (
                                    <tr
                                      className="align-middle"
                                      key={
                                        questionnaire.questionaireData.qId + i
                                      }
                                    >
                                      <th scope="row">
                                        {questionnaire.questionaireData.qId.substring(
                                          0,
                                          4,
                                        )}
                                      </th>
                                      <td>
                                        {questionnaire.questionaireData.createdAt
                                          .substring(0, 10)
                                          .replace(/-/g, '/')}
                                      </td>
                                      <td>
                                        {cryption.decrypt(
                                          questionnaire.questionaireData
                                            .screening.sections.patientInfo
                                            .questions[0].answer,
                                        ) +
                                          ' ' +
                                          cryption.decrypt(
                                            questionnaire.questionaireData
                                              .screening.sections.patientInfo
                                              .questions[1].answer,
                                          )}
                                      </td>
                                      <td>
                                        <button
                                          type="button"
                                          className="btn btn-primary px-10 py-0  h-30"
                                          style={{ marginRight: '10px ' }}
                                          onClick={() => {
                                            viewQuestionnaire(
                                              questionnaire.questionaireData
                                                .qId,
                                            )
                                          }}
                                        >
                                          View <img src={viewIcon}></img>
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-outline-danger px-10 py-0 h-30"
                                          onClick={() => {
                                            deleteQuestionnaire(
                                              questionnaire.questionaireData
                                                .qId,
                                            )
                                          }}
                                        >
                                          Delete <img src={deleteIcon}></img>
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
