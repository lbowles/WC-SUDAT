import { useState, useEffect } from 'react'
import DividerSmall from '../../../../../components/DividerSmall'
import ResultsBar from '../../../../../components/ResultsBar'
import ResultsDisplay from '../../../../../components/ResultsDisplay'

/**
 * Risk of Self Harm section of questionnaire. The components in the ./Sections directory all
 * correspond to different sections of the assessment part of the questionnaire.
 * These different sections are essentially the different risk factors of the original WC-SUDAT questionnaire.
 */

const RiskOfSelfHarm = ({ answers, wrapperSetAnswers }) => {
  const [answersState, setAnswersState] = useState(answers) //Current answer obj
  const [resultValue, setResultValue] = useState(null) //Realtime results value
  const [q3Expand, setQ3Expand] = useState(false) //Toggles subquestions if q3 answered yes
  const [q4Expand, setQ4Expand] = useState(false) //Toggles subquestions if q4 answered yes
  const [q5Expand, setQ5Expand] = useState(false) //Toggles subquestions if q5 answered yes

  //variables for question sections
  const section1Questions =
    answers.sections.individualRisks.riskOfSelfHarm.questions
  const q3 = answers.sections.individualRisks.riskOfSelfHarm.questions[2]
  const q4 = answers.sections.individualRisks.riskOfSelfHarm.questions[3]
  const q5 = answers.sections.individualRisks.riskOfSelfHarm.questions[4]
  const q6 = answers.sections.individualRisks.riskOfSelfHarm.questions[5]

  //Detects change to local assessment obj then updates parent screening object
  useEffect(() => {
    if (answersState) {
      //console.log(answersState)
      wrapperSetAnswers(answersState)
      setResultValue(
        answersState.sections.individualRisks.riskOfSelfHarm.result.value,
      )
    }
  }, [answersState, wrapperSetAnswers])

  //Handles updating local assessment obj aswers from input field
  const onAnsInput = (e, qNum, name, qSubNum, comment) => {
    if (answersState) {
      let tempAns = answersState
      if (comment) {
        tempAns.sections.individualRisks.riskOfSelfHarm.generalComment =
          e.target.value
        setAnswersState((answersState) => ({
          ...answersState,
          ...tempAns,
        }))
      } else {
        //checks if true or false is being toggled
        if (document.querySelector('input[name="' + name + '"]:checked')) {
          let value = document.querySelector(
            'input[name="' + name + '"]:checked',
          ).value
          var isTrue = value === 'true'
          //toggle sub questions
          if (name === q3.name) {
            if (isTrue === true) {
              setQ3Expand(true)
            } else {
              setQ3Expand(false)
            }
          }
          if (name === q4.name) {
            if (isTrue === true) {
              setQ4Expand(true)
            } else {
              setQ4Expand(false)
            }
          }
          if (name === q5.name) {
            if (isTrue === true) {
              setQ5Expand(true)
            } else {
              setQ5Expand(false)
            }
          }
          //sets true false value
          tempAns.sections.individualRisks.riskOfSelfHarm.questions[
            qNum
          ].answer = isTrue
          calculateRiskResults(tempAns)
          setAnswersState((answersState) => ({
            ...answersState,
            ...tempAns,
          }))
        } else {
          //Saves subsection data
          tempAns.sections.individualRisks.riskOfSelfHarm.questions[
            qNum
          ].subQuestions[qSubNum].answer = e.target.value
          setAnswersState((answersState) => ({
            ...answersState,
            ...tempAns,
          }))
        }
      }
    }
  }

  //Calculate results to determin whether at risk
  const calculateRiskResults = (Ans) => {
    let positiveCount = 0
    Ans.sections.individualRisks.riskOfSelfHarm.questions.forEach(
      (question, i) => {
        if (question.answer === true) {
          positiveCount++
        }
      },
    )
    //save results to questionnaire
    let tempAns = answersState
    tempAns.sections.individualRisks.riskOfSelfHarm.result.value = positiveCount
    setAnswersState((answersState) => ({
      ...answersState,
      ...tempAns,
    }))
    //choose selected Text
    if (positiveCount === 0) {
      selectedResultText(0)
    }
    if ((positiveCount > 0) & (positiveCount < 4)) {
      selectedResultText(1)
    }
    if ((3 < positiveCount) & (0 !== positiveCount)) {
      selectedResultText(2)
    }
  }

  //saves selected text to display in report
  const selectedResultText = (val) => {
    let tempAns = answersState
    tempAns.sections.individualRisks.riskOfSelfHarm.result.selectedText = val
    setAnswersState((answersState) => ({
      ...answersState,
      ...tempAns,
    }))
  }

  return (
    <>
      <h4 className="px-0 mt-0 mb-3">
        {answers.sections.individualRisks.riskOfSelfHarm.name}
      </h4>
      <div className="card round">
        <div className="card-body px-2">
          {/* creates first 2 questions */}
          {[...Array(2)].map(function (question, i) {
            return (
              <>
                <h6 className="mt-3" key={section1Questions[i].title}>
                  {section1Questions[i].title}
                </h6>
                <div
                  key={section1Questions[i].name}
                  className="btn-group w-100 mt-2 mb-2"
                  role="group"
                  id={section1Questions[i].name}
                  aria-label={'Basic radio toggle button group'}
                  onChange={(e) => {
                    onAnsInput(e, i, section1Questions[i].name)
                  }}
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name={section1Questions[i].name}
                    id={section1Questions[i].title + 'radio0' + 0}
                    autocomplete="off"
                    value={false}
                    required
                  ></input>
                  <label
                    className="btn btn-outline-secondary"
                    for={section1Questions[i].title + 'radio0' + 0}
                  >
                    No
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name={section1Questions[i].name}
                    id={section1Questions[i].title + 'radio1' + 0}
                    autocomplete="off"
                    value={true}
                  ></input>
                  <label
                    className="btn btn-outline-secondary"
                    for={section1Questions[i].title + 'radio1' + 0}
                  >
                    Yes
                  </label>
                </div>
              </>
            )
          })}

          {/* Question 3 */}
          <h6 className="mt-3" key={2}>
            {q3.title}
          </h6>
          <div
            className="btn-group w-100 mt-2 mb-2"
            role="group"
            id={q3.name}
            aria-label={'Basic radio toggle button group'}
            onChange={(e) => {
              onAnsInput(e, 2, q3.name)
            }}
          >
            <input
              type="radio"
              className="btn-check"
              name={q3.name}
              id={q3.title + 'radio0' + 0}
              autocomplete="off"
              value={false}
              required
            ></input>
            <label
              className="btn btn-outline-secondary"
              for={q3.title + 'radio0' + 0}
            >
              No
            </label>
            <input
              type="radio"
              className="btn-check"
              name={q3.name}
              id={q3.title + 'radio1' + 0}
              autocomplete="off"
              value={true}
            ></input>
            <label
              className="btn btn-outline-secondary"
              for={q3.title + 'radio1' + 0}
            >
              Yes
            </label>
          </div>
          {q3Expand && (
            <>
              {/* Subquestion 1 */}
              <h6 className="mt-3">{q3.subQuestions[0].title}</h6>
              <textarea
                className="form-control mb-1"
                style={{ height: '60px' }}
                aria-label="With textarea"
                name={q3.subQuestions[0].name}
                onChange={(e) => {
                  onAnsInput(e, 2, q3.subQuestions[0].name, 0)
                }}
              ></textarea>
              {/* Subquestion 2 */}
              <h6 className="mt-3">{q3.subQuestions[1].title}</h6>
              <textarea
                className="form-control mb-1"
                style={{ height: '60px' }}
                aria-label="With textarea"
                name={q3.subQuestions[1].name}
                onChange={(e) => {
                  onAnsInput(e, 2, q3.subQuestions[1].name, 1)
                }}
              ></textarea>
            </>
          )}
          {/* Question 4 */}
          <h6 className="mt-3" key={3}>
            {q4.title}
          </h6>
          <div
            className="btn-group w-100 mt-2 mb-2"
            role="group"
            id={q4.name}
            aria-label={'Basic radio toggle button group'}
            onChange={(e) => {
              onAnsInput(e, 3, q4.name)
            }}
          >
            <input
              type="radio"
              className="btn-check"
              name={q4.name}
              id={q4.title + 'radio0' + 0}
              autocomplete="off"
              value={false}
              required
            ></input>
            <label
              className="btn btn-outline-secondary"
              for={q4.title + 'radio0' + 0}
            >
              No
            </label>
            <input
              type="radio"
              className="btn-check"
              name={q4.name}
              id={q4.title + 'radio1' + 0}
              autocomplete="off"
              value={true}
            ></input>
            <label
              className="btn btn-outline-secondary"
              for={q4.title + 'radio1' + 0}
            >
              Yes
            </label>
          </div>
          {q4Expand && (
            <>
              {/* Subquestion 1 */}
              <h6 className="mt-3">{q4.subQuestions[0].title}</h6>
              <textarea
                className="form-control mb-1"
                style={{ height: '60px' }}
                aria-label="With textarea"
                name={q3.subQuestions[0].name}
                onChange={(e) => {
                  onAnsInput(e, 2, q4.subQuestions[0].name, 0)
                }}
              ></textarea>
              {/* Subquestion 2 */}
              <h6 className="mt-3">{q4.subQuestions[1].title}</h6>
              <textarea
                className="form-control mb-1"
                style={{ height: '60px' }}
                aria-label="With textarea"
                name={q4.subQuestions[1].name}
                onChange={(e) => {
                  onAnsInput(e, 3, q4.subQuestions[1].name, 1)
                }}
              ></textarea>
            </>
          )}
          {/* Question 5 */}
          <h6 className="mt-3" key={4}>
            {q5.title}
          </h6>
          <div
            className="btn-group w-100 mt-2 mb-2"
            role="group"
            id={q5.name}
            aria-label={'Basic radio toggle button group'}
            onChange={(e) => {
              onAnsInput(e, 4, q5.name)
            }}
          >
            <input
              type="radio"
              className="btn-check"
              name={q5.name}
              id={q5.title + 'radio0' + 0}
              autocomplete="off"
              value={false}
              required
            ></input>
            <label
              className="btn btn-outline-secondary"
              for={q5.title + 'radio0' + 0}
            >
              No
            </label>
            <input
              type="radio"
              className="btn-check"
              name={q5.name}
              id={q5.title + 'radio1' + 0}
              autocomplete="off"
              value={true}
            ></input>
            <label
              className="btn btn-outline-secondary"
              for={q5.title + 'radio1' + 0}
            >
              Yes
            </label>
          </div>
          {q5Expand && (
            <>
              {/* Subquestion 1 */}
              <h6 className="mt-3">{q5.subQuestions[0].title}</h6>
              <textarea
                className="form-control mb-1"
                style={{ height: '60px' }}
                aria-label="With textarea"
                name={q5.subQuestions[0].name}
                onChange={(e) => {
                  onAnsInput(e, 4, q5.subQuestions[0].name, 0)
                }}
              ></textarea>
              {/* Subquestion 2 */}
              <h6 className="mt-3">{q5.subQuestions[1].title}</h6>
              <textarea
                className="form-control mb-1"
                style={{ height: '60px' }}
                aria-label="With textarea"
                name={q5.subQuestions[0].name}
                onChange={(e) => {
                  onAnsInput(e, 4, q5.subQuestions[1].name, 1)
                }}
              ></textarea>
              {/* Subquestion 3 */}
              <h6 className="mt-3">{q5.subQuestions[2].title}</h6>
              <input
                className="form-control mb-2"
                aria-label="With textarea"
                name={q5.subQuestions[0].name}
                onChange={(e) => {
                  onAnsInput(e, 4, q5.subQuestions[2].name, 1)
                }}
              ></input>
            </>
          )}
          {/* Question 6 */}
          <h6 className="mt-3" key={5}>
            {q6.title}
          </h6>
          <div
            className="btn-group w-100 mt-2 mb-2"
            role="group"
            id={q6.name}
            aria-label={'Basic radio toggle button group'}
            onChange={(e) => {
              onAnsInput(e, 5, q6.name)
            }}
          >
            <input
              type="radio"
              className="btn-check"
              name={q6.name}
              id={q6.title + 'radio0' + 0}
              autocomplete="off"
              value={false}
              required
            ></input>
            <label
              className="btn btn-outline-secondary"
              for={q6.title + 'radio0' + 0}
            >
              No
            </label>
            <input
              type="radio"
              className="btn-check"
              name={q6.name}
              id={q6.title + 'radio1' + 0}
              autocomplete="off"
              value={true}
            ></input>
            <label
              className="btn btn-outline-secondary"
              for={q6.title + 'radio1' + 0}
            >
              Yes
            </label>
          </div>
          <ResultsDisplay
            result={answers.sections.individualRisks.riskOfSelfHarm.result}
            divider={true}
          />
          {/* General comment */}
          <DividerSmall />
          <h6 className="mt-3 mb-3">General Comments</h6>
          <textarea
            className="form-control mb-1"
            style={{ height: '100px' }}
            aria-label="With textarea"
            onChange={(e) => {
              onAnsInput(e, 0, 'General Comment', 0, true)
            }}
          ></textarea>
        </div>
      </div>
    </>
  )
}

export default RiskOfSelfHarm
