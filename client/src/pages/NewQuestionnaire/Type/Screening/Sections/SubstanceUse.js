import { useState, useEffect } from 'react'
import DividerSmall from '../../../../../components/DividerSmall'
import ResultsBar from '../../../../../components/ResultsBar'
import isNumber from '../../../../../util/tools'

/**
 * The Substance Use section of questionnaire. The components in the .Screening/Sections directory all
 * correspond to different sections of the screening part of the questionnaire.
 * These different sections are essentially the different determinants to screen patients
 * for the potential existence of an SUD, of the original WC-SUDAT questionnaire.
 */


const SubstanceUse = ({ answers, wrapperSetAnswers, setRisk }) => {
  const [answersState, setAnswersState] = useState(answers)
  const [showSecB, setShowSecB] = useState(false)
  let screeningTempA = answers.sections.substanceUse.sectionA.questions
  let screeningTempB = answers.sections.substanceUse.sectionB.questions

  //Detects change to local screening obj then updates parent screening object
  useEffect(() => {
    if (answersState) {
      //console.log(answersState)
      wrapperSetAnswers(answersState)
    }
  }, [answersState, wrapperSetAnswers])

  //Handles updating local screening obj aswers from input field
  const onAnsInput = (e, qNum, section, name) => {
    if (answersState) {
      let tempAns = answersState
      //Checks what subsction of the question it is in
      if (section === 'A') {
        //Finds value of selected radio button
        let value = document.querySelector('input[name="' + name + '"]:checked')
          .value
        if (isNumber(value)) {
          value = parseInt(e.target.value)
        } // check results after every input
        tempAns.sections.substanceUse.sectionA.questions[qNum].answer = value
        calculateResultsSecA(tempAns)
        setAnswersState((answersState) => ({
          ...answersState,
          ...tempAns,
        }))
      }
      if (section === 'B') {
        //Finds value of selected radio button
        let value = document.querySelector('input[name="' + name + '"]:checked')
          .value
        var isTrue = value === 'true'
        tempAns.sections.substanceUse.sectionB.questions[qNum].answer = isTrue
        calculateRiskResults(tempAns)
        setAnswersState((answersState) => ({
          ...answersState,
          ...tempAns,
        }))
      }
      if (section === 'C') {
        let value = e.target.value
        tempAns.sections.substanceUse.generalComment = value
        setAnswersState((answersState) => ({
          ...answersState,
          ...tempAns,
        }))
      }
    }
  }

  //Calculate results to determin if sec B should show
  const calculateResultsSecA = (ans) => {
    let positiveCount = 0
    ans.sections.substanceUse.sectionA.questions.forEach((question, i) => {
      if (question.answer > 0) {
        positiveCount++
      }
    })
    if (positiveCount > 0) {
      setShowSecB(true)
    } else {
      setShowSecB(false)
    }
  }

  //Calculate results to determin whether at risk
  const calculateRiskResults = (Ans) => {
    let positiveCount = 0
    let tempAns = answersState
    Ans.sections.substanceUse.sectionB.questions.forEach((question, i) => {
      if (question.answer === true) {
        positiveCount++
      }
    })
    //If 2 or more yes answers in the true false section then patient is at risk
    if (positiveCount >= 2) {
      tempAns.sections.substanceUse.result.atRisk = true
      setRisk(true)
    } else {
      tempAns.sections.substanceUse.result.atRisk = false
      setRisk(false)
    }
    //save results to questionnaire

    tempAns.sections.substanceUse.result.value = positiveCount
    setAnswersState((answersState) => ({
      ...answersState,
      ...tempAns,
    }))
  }

  return (
    <>
      <h4 className="px-0 mt-0 mb-3">{answers.sections.substanceUse.name}</h4>
      {answers.sections.substanceUse.subText ? (
        <p className="fs-6 px-0 fw-light">
          {answers.sections.substanceUse.subText}
        </p>
      ) : (
        <></>
      )}
      {answers.sections.substanceUse.subText2 ? (
        <p className="fs-6 px-0 fw-light">
          {answers.sections.substanceUse.subText2}
        </p>
      ) : (
        <></>
      )}
      <div className="card round">
        <div className="card-body px-2">
          {/* Section A questions */}
          {screeningTempA.map(function (question, i) {
            return (
              <div key={question.title}>
                <h6 className="mt-3">{question.title}</h6>
                <div
                  className="btn-group w-100 mt-2 mb-2"
                  role="group"
                  id={question.name}
                  aria-label={'Basic radio toggle button group'}
                  onChange={(e) => {
                    onAnsInput(e, i, 'A', question.name)
                  }}
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name={question.name}
                    id={question.title + 'radio0' + i}
                    autocomplete="off"
                    value={0}
                    required
                  ></input>
                  <label
                    className="btn btn-outline-secondary"
                    for={question.title + 'radio0' + i}
                  >
                    0
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name={question.name}
                    id={question.title + 'radio1' + i}
                    autocomplete="off"
                    value={1}
                  ></input>
                  <label
                    className="btn btn-outline-secondary"
                    for={question.title + 'radio1' + i}
                  >
                    1
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name={question.name}
                    id={question.title + 'radio2' + i}
                    autocomplete="off"
                    value={2}
                  ></input>
                  <label
                    className="btn btn-outline-secondary"
                    for={question.title + 'radio2' + i}
                  >
                    2
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name={question.name}
                    id={question.title + 'radio3' + i}
                    autocomplete="off"
                    value={3}
                  ></input>
                  <label
                    className="btn btn-outline-secondary"
                    for={question.title + 'radio3' + i}
                  >
                    3
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name={question.name}
                    id={question.title + 'radio4' + i}
                    autocomplete="off"
                    value={4}
                  ></input>
                  <label
                    className="btn btn-outline-secondary"
                    for={question.title + 'radio4' + i}
                  >
                    4
                  </label>
                </div>
              </div>
            )
          })}
          {showSecB && (
            <>
              <DividerSmall />
              {/* Section B questions */}
              {screeningTempB.map(function (question, i) {
                return (
                  <div key={question.title}>
                    <h6 className="mt-3">{question.title}</h6>
                    <div
                      className="btn-group w-100 mt-2 mb-2"
                      role="group"
                      id={question.name}
                      aria-label={'Basic radio toggle button group'}
                      onChange={(e) => {
                        onAnsInput(e, i, 'B', question.name)
                      }}
                    >
                      <input
                        type="radio"
                        className="btn-check"
                        name={question.name}
                        id={question.title + 'radio0' + i}
                        autocomplete="off"
                        value={false}
                        required
                      ></input>
                      <label
                        className="btn btn-outline-secondary"
                        for={question.title + 'radio0' + i}
                      >
                        No
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name={question.name}
                        id={question.title + 'radio1' + i}
                        autocomplete="off"
                        value={true}
                      ></input>
                      <label
                        className="btn btn-outline-secondary"
                        for={question.title + 'radio1' + i}
                      >
                        Yes
                      </label>
                    </div>
                  </div>
                )
              })}
              {answers.sections.substanceUse.result.value !== null && (
                <>
                  <DividerSmall />
                  <ResultsBar
                    rangeText={answers.sections.substanceUse.result.rangeText}
                    result={answers.sections.substanceUse.result.value}
                    lowRange={answers.sections.substanceUse.result.lowRange}
                    highRange={answers.sections.substanceUse.result.highRange}
                  />
                  <h6
                    className="pt-1 pb-2"
                    style={{ fontSize: '15px', fontWeight: 'bold !important' }}
                  >
                    <strong>{answers.sections.substanceUse.result.text}</strong>
                  </h6>
                </>
              )}
            </>
          )}

          <DividerSmall />
          <>
            <h6 className="mt-3 mb-3">General Comments</h6>
            <textarea
              className="form-control mb-1"
              style={{ height: '100px' }}
              aria-label="With textarea"
              onChange={(e) => {
                onAnsInput(e, 0, 'C', '')
              }}
            ></textarea>
          </>
        </div>
      </div>
    </>
  )
}

export default SubstanceUse
