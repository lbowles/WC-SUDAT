import { useState, useEffect } from 'react'
import DividerSmall from '../../../../../components/DividerSmall'
import ResultsBar from '../../../../../components/ResultsBar'
import ResultsDisplay from '../../../../../components/ResultsDisplay'

/**
 * Trauma section of questionnaire. The components in the ./Sections directory all
 * correspond to different sections of the assessment part of the questionnaire.
 * These different sections are essentially the different risk factors of the original WC-SUDAT questionnaire.
 */


const Trauma = ({ answers, wrapperSetAnswers }) => {
  const [answersState, setAnswersState] = useState(answers) //Current answers obj
  const [resultValue, setResultValue] = useState(null) //Realtime results value
  const [q1Expand, setQ1Expand] = useState(false) //Toggles subquestions if q1 answered yes

  let section1Questions = answers.sections.individualRisks.trauma.questions //Questions array

  //Detects change to local assessment obj then updates parent screening object
  useEffect(() => {
    if (answersState) {
      //console.log(answersState)
      wrapperSetAnswers(answersState)
      setResultValue(answersState.sections.individualRisks.trauma.result.value)
    }
  }, [answersState, wrapperSetAnswers])

  //Handles updating local screening obj aswers from input field
  const onAnsInput = (e, qNum, comment) => {
    if (answersState) {
      let tempAns = answersState
      if (comment) {
        tempAns.sections.individualRisks.trauma.generalComment = e.target.value
        setAnswersState((answersState) => ({
          ...answersState,
          ...tempAns,
        }))
      } else {
        //Finds value of selected radio button
        let value = e.target.value
        var isTrue = value === 'true'
        //Checks if q1 subquestions should be expanded
        if (qNum == 0) {
          if (isTrue) {
            setQ1Expand(true)
          } else {
            setQ1Expand(false)
          }
        }
        tempAns.sections.individualRisks.trauma.questions[qNum].answer = isTrue
        calculateRiskResults(tempAns)
        setAnswersState((answersState) => ({
          ...answersState,
          ...tempAns,
        }))
      }
    }
  }

  //Calculate results
  const calculateRiskResults = (Ans) => {
    let positiveCount = 0
    Ans.sections.individualRisks.trauma.questions.forEach((question, i) => {
      if (question.answer === true) {
        positiveCount++
      }
    })
    //save results to questionnaire
    let tempAns = answersState
    tempAns.sections.individualRisks.trauma.result.value = positiveCount
    setAnswersState((answersState) => ({
      ...answersState,
      ...tempAns,
    }))
    //Choose selected Text
    if (positiveCount < 2) {
      selectedResultText(0)
    }
    if ((1 < positiveCount) & (positiveCount < 4)) {
      selectedResultText(1)
    }
    if ((3 < positiveCount) & (0 !== positiveCount)) {
      selectedResultText(2)
    }
  }

  //Saves selected text to display in report
  const selectedResultText = (val) => {
    let tempAns = answersState
    tempAns.sections.individualRisks.trauma.result.selectedText = val
    setAnswersState((answersState) => ({
      ...answersState,
      ...tempAns,
    }))
  }

  return (
    <>
      <h4 className="px-0 mt-5 mb-3">
        {answers.sections.individualRisks.trauma.name}
      </h4>
      <div className="card round">
        <div className="card-body px-2">
          {/* Question 1 */}
          <h6 className="mt-3" key={0}>
            {section1Questions[0].title}
          </h6>
          <div
            className="btn-group w-100 mt-2 mb-2"
            role="group"
            id={section1Questions[0].name}
            aria-label={'Basic radio toggle button group'}
            onChange={(e) => {
              onAnsInput(e, 0)
            }}
          >
            <input
              type="radio"
              className="btn-check"
              name={section1Questions[0].name}
              id={section1Questions[0].title + 'radio0' + 0}
              autocomplete="off"
              value={false}
              required
            ></input>
            <label
              className="btn btn-outline-secondary"
              for={section1Questions[0].title + 'radio0' + 0}
            >
              No
            </label>
            <input
              type="radio"
              className="btn-check"
              name={section1Questions[0].name}
              id={section1Questions[0].title + 'radio1' + 0}
              autocomplete="off"
              value={true}
            ></input>
            <label
              className="btn btn-outline-secondary"
              for={section1Questions[0].title + 'radio1' + 0}
            >
              Yes
            </label>
          </div>
          {/* Questions 2-5 */}
          {q1Expand &&
            section1Questions.map(function (question, i) {
              if (i > 0) {
                return (
                  <>
                    <h6 className="mt-3" key={question.title}>
                      {question.title}
                    </h6>
                    <div
                      className="btn-group w-100 mt-2 mb-2"
                      role="group"
                      key={question.name}
                      id={question.name}
                      aria-label={'Basic radio toggle button group'}
                      onChange={(e) => {
                        onAnsInput(e, i)
                      }}
                    >
                      <input
                        type="radio"
                        className="btn-check"
                        name={question.name}
                        id={question.title + 'radio0' + 0}
                        autocomplete="off"
                        value={false}
                        required
                      ></input>
                      <label
                        className="btn btn-outline-secondary"
                        for={question.title + 'radio0' + 0}
                      >
                        No
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name={question.name}
                        id={question.title + 'radio1' + 0}
                        autocomplete="off"
                        value={true}
                      ></input>
                      <label
                        className="btn btn-outline-secondary"
                        for={question.title + 'radio1' + 0}
                      >
                        Yes
                      </label>
                    </div>
                  </>
                )
              }
            })}
          <ResultsDisplay
            result={answers.sections.individualRisks.trauma.result}
            divider={true}
          />
          <DividerSmall />
          {/* General comment */}
          <h6 className="mt-3 mb-3">General Comments</h6>
          <textarea
            className="form-control mb-1"
            style={{ height: '100px' }}
            aria-label="With textarea"
            onChange={(e) => {
              onAnsInput(e, 0, true)
            }}
          ></textarea>
        </div>
      </div>
    </>
  )
}

export default Trauma
