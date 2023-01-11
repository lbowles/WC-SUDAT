import Divider from '../../components/Divider'
import ResultsBar from '../../components/ResultsBar'
import cryption from '../../util/cryption'
import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import ReactToPrint from 'react-to-print'
import ResultsDisplayReport from '../../components/ResultsDisplayReport'
import ReportPrint from './ReportPrint'
import printIcon from '../../img/print.svg'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import { SpinnerCircular } from 'spinners-react'

const Report = ({ questionnaire }) => {
  const patientInfo = questionnaire.screening.sections.patientInfo.questions
  const [emailLoading, setEmailLoading] = useState(false) // Email loading btn state
  const componentRef = useRef()
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [p3, setP3] = useState('')
  const [p4, setP4] = useState('')
  const [p5, setP5] = useState('')
  const [p6, setP6] = useState('')
  const [patientName, setPatientName] = useState('')

  const form = useRef()
  var templateParams = {
    to_name: 'James',
    message: 'Check this out!',
    reply_to: 'wcsudatapp@gmail.com',
  }
  //Set screening paragraph for email
  const setParagraph1 = () => {
    let body = ''
    if (!(questionnaire.screening.sections.substanceUse.result.value > 1)) {
      body = 'The report suggests you are not at risk of an SUD. '
      setP1(body)
    } else {
      body = 'The repost suggests you are at risk of an SUD. '
      setP1(body)
    }
  }

  //set individual risk of self harm paragram for email
  const setParagraph2 = () => {
    let body
    {
      questionnaire.assessment.sections.individualRisks.riskOfSelfHarm.result.text.map(
        function (textString, index) {
          if (
            questionnaire.assessment.sections.individualRisks.riskOfSelfHarm
              .result.selectedText === index
          ) {
            body = textString
          }
        },
      )
    }
    setP2(body)
  }
  //Set individual of truama paragraph for email
  const setParagraph3 = () => {
    let body
    {
      questionnaire.assessment.sections.individualRisks.trauma.result.text.map(
        function (textString, index) {
          if (
            questionnaire.assessment.sections.individualRisks.trauma.result
              .selectedText === index
          ) {
            body = textString
          }
        },
      )
    }
    setP3(body)
  }
  //Set treatment total recognitition paragraph for email
  const setParagraph4 = () => {
    let body
    {
      questionnaire.assessment.sections.treatment.treatment.result.totalRecognition.text.map(
        function (textString, index) {
          if (
            questionnaire.assessment.sections.treatment.treatment.result
              .totalRecognition.selectedText === index
          ) {
            body = textString
          }
        },
      )
    }
    setP4(body)
  }
  //Set treatment total ambivalence paragraph for email
  const setParagraph5 = () => {
    let body
    {
      questionnaire.assessment.sections.treatment.treatment.result.totalAmbivalence.text.map(
        function (textString, index) {
          if (
            questionnaire.assessment.sections.treatment.treatment.result
              .totalAmbivalence.selectedText === index
          ) {
            body = textString
          }
        },
      )
    }
    setP5(body)
  }
  //Set treatment taking steps paragraph for email
  const setParagraph6 = () => {
    let body
    {
      questionnaire.assessment.sections.treatment.treatment.result.totalTakingSteps.text.map(
        function (textString, index) {
          if (
            questionnaire.assessment.sections.treatment.treatment.result
              .totalTakingSteps.selectedText === index
          ) {
            body = textString
          }
        },
      )
    }
    setP6(body)
  }
  //Get patient name
  const getPatientName = () => {
    console.log()
    if (questionnaire.screening.sections.patientInfo.questions) {
      setPatientName(
        cryption.decrypt(
          questionnaire.screening.sections.patientInfo.questions[0].answer,
        ) +
          ' ' +
          cryption.decrypt(
            questionnaire.screening.sections.patientInfo.questions[1].answer,
          ),
      )
    }
  }

  useEffect(() => {
    setParagraph1()
    if (Object.keys(questionnaire.assessment).length !== 0) {
      setParagraph2()
      setParagraph3()
      setParagraph4()
      setParagraph5()
      setParagraph6()
      getPatientName()
    }
  }, [])

  //Send email using emailjs
  const sendEmail = (e) => {
    console.log('s')
    e.preventDefault()
    setEmailLoading(true)
    emailjs
      .sendForm(
        'default_service',
        'template_report',
        form.current,
        '2LVOyokAkfiHqbKhb',
      )
      .then(
        (result) => {
          console.log(result.text)
          toast.success('Successfully sent email')
          setEmailLoading(false)
        },
        (error) => {
          console.log(error.text)
          toast.error('Error sending email')
          setEmailLoading(false)
        },
      )
  }

  return (
    <>
      <div style={{ display: 'none' }}>
        <ReportPrint questionnaire={questionnaire} ref={componentRef} />
      </div>
      {/* questionnaire info */}
      <h4 className="px-0 mt-0 mb-3">Quesitonnaire Info</h4>
      <div className="card round">
        <div className="card-body px-2 pt-1">
          <h6 className="mt-3">
            {'Questionnaire ID'} : <strong>{questionnaire.qId}</strong>
          </h6>
          <h6 className="mt-3">
            {'Date'} :{' '}
            <strong>
              {questionnaire.createdAt.substring(0, 10).replace(/-/g, '/')}
            </strong>
          </h6>
          <h6 className="mt-3">
            {'Location'} :{' '}
            <strong>
              {
                questionnaire.screening.sections.interviewInfo.questions[0]
                  .answer
              }
            </strong>
          </h6>
          <h6 className="mt-3">
            {'Clinition'} :{' '}
            <strong>
              {JSON.parse(localStorage.getItem('userInfo')).firstName +
                ' ' +
                JSON.parse(localStorage.getItem('userInfo')).lastName}
            </strong>
          </h6>
        </div>
      </div>
      <Divider />
      {/* patient info */}
      <h4 className="px-0 mt-0 mb-3">Patient Info</h4>
      <div className="card round">
        <div className="card-body px-2 pt-1">
          {patientInfo &&
            patientInfo.map(function (question, i) {
              if (
                question.name === 'firstName' ||
                question.name === 'lastName' ||
                question.name === 'IDNumber'
              ) {
                return (
                  <h6 className="mt-3" key={question.answer}>
                    {question.title} :{' '}
                    <strong>{cryption.decrypt(question.answer)}</strong>
                  </h6>
                )
              }
            })}
        </div>
      </div>
      <Divider />
      {/* screening/assessment info */}
      <h4 className="px-0 mt-0 mb-3">Screening/Assessment Results</h4>
      <div className="card round">
        <div className="card-body px-2">
          {/* SUD Risk  */}
          {questionnaire.screening.sections.substanceUse.result && (
            <>
              <ResultsBar
                rangeText={
                  questionnaire.screening.sections.substanceUse.result.rangeText
                }
                result={
                  questionnaire.screening.sections.substanceUse.result.value
                }
                lowRange={
                  questionnaire.screening.sections.substanceUse.result.lowRange
                }
                highRange={
                  questionnaire.screening.sections.substanceUse.result.highRange
                }
              />
              <h6
                className="pt-1 pb-2"
                style={{ fontSize: '15px', fontWeight: 'bold !important' }}
              >
                {questionnaire.screening.sections.substanceUse.result.value >
                1 ? (
                  <strong>Answers suggest patient is at risk for SUD's</strong>
                ) : (
                  <strong>
                    Answers suggest patient is not at risk for SUD's
                  </strong>
                )}
              </h6>
            </>
          )}
          {Object.keys(questionnaire.assessment).length !== 0 && (
            <>
              {/* risk self harm */}
              <ResultsDisplayReport
                result={
                  questionnaire.assessment.sections.individualRisks
                    .riskOfSelfHarm.result
                }
                divider={false}
              />
              {/* trauma */}
              <ResultsDisplayReport
                result={
                  questionnaire.assessment.sections.individualRisks.trauma
                    .result
                }
                divider={false}
              />
              {/* recognition */}
              <ResultsDisplayReport
                result={
                  questionnaire.assessment.sections.treatment.treatment.result
                    .totalRecognition
                }
                divider={false}
              />
              {/* ambivalence */}
              <ResultsDisplayReport
                result={
                  questionnaire.assessment.sections.treatment.treatment.result
                    .totalAmbivalence
                }
                divider={false}
              />
              {/* total  taking steps*/}
              <ResultsDisplayReport
                result={
                  questionnaire.assessment.sections.treatment.treatment.result
                    .totalTakingSteps
                }
                divider={false}
              />
            </>
          )}
        </div>
      </div>
      <Divider />
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-primary mt-1 mb-5 ">
            Print{' '}
            <img
              src={printIcon}
              style={{
                transform: ' translateY(-1px)',
              }}
            ></img>
          </button>
        )}
        documentTitle={'Report-' + questionnaire.qId}
        content={() => componentRef.current}
        about={false}
      />
      {/* Hidden from that gets sent for emailjs */}
      <form ref={form} onSubmit={sendEmail} className="px-0 pt-0">
        <input
          type="text"
          name="to_name"
          value={patientName}
          style={{ display: 'none' }}
        />
        <textarea name="p1" value={p1} style={{ display: 'none' }} />
        {Object.keys(questionnaire.assessment).length !== 0 && (
          <>
            <textarea name="p2" value={p2} style={{ display: 'none' }} />
            <textarea name="p3" value={p3} style={{ display: 'none' }} />
            <textarea name="p4" value={p4} style={{ display: 'none' }} />
            <textarea name="p5" value={p5} style={{ display: 'none' }} />
            <textarea name="p6" value={p6} style={{ display: 'none' }} />
          </>
        )}
        <div className="input-group mb-4 px-0 pb-4">
          <input
            type="email"
            id="emailTo"
            className="form-control"
            placeholder="hello@gmail.com"
            required
            minLength="5"
            name="user_email"
          ></input>
          <button
            className="btn btn-outline-primary"
            type="submit"
            id="button-addon2"
          >
            {emailLoading ? (
              <>
                <SpinnerCircular
                  size={20}
                  color={'#0c6efd'}
                  secondaryColor={'#fff'}
                />
              </>
            ) : (
              'Email Report'
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default Report
