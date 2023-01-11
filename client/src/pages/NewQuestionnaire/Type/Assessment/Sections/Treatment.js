import { useState, useEffect } from 'react'
import DividerSmall from '../../../../../components/DividerSmall'
import ResultsBar from '../../../../../components/ResultsBar'
import ResultsDisplay from '../../../../../components/ResultsDisplay'
import isNumber from '../../../../../util/tools'

/**
 * Treatment section of questionnaire. The components in the ./Sections directory all
 * correspond to different sections of the assessment part of the questionnaire.
 * The treatment section uses results of all other sections to determine possible measures for the patients.
 * It gives them scores for Total Recognition and Ambivalence.
 */




const Treatment = ({ answers, wrapperSetAnswers }) => {
  //Results of each section
  const [totalRecognitionResult, setTotalRecognitionResult] = useState(null)
  const [totalAmbivalenceResult, setTotalAmbivalenceResult] = useState(null)
  const [totalTakingStepsResult, setTotalTakingStepsResult] = useState(null)
  const [answersState, setAnswersState] = useState(answers)
  const questions = answers.sections.treatment.treatment.questions //Questions array

  //Detects change to local assessment obj then updates parent assessment object
  useEffect(() => {
    if (answersState) {
      //console.log(answersState)
      wrapperSetAnswers(answersState)
      //Sets the results to use for each section
      setTotalRecognitionResult(
        answersState.sections.treatment.treatment.result.totalRecognition.value,
      )
      setTotalAmbivalenceResult(
        answersState.sections.treatment.treatment.result.totalAmbivalence.value,
      )
      setTotalTakingStepsResult(
        answersState.sections.treatment.treatment.result.totalTakingSteps.value,
      )
    }
  }, [answersState, wrapperSetAnswers])

  //Handles updating local assessment obj answers from input field
  const onAnsInput = (e, qNum, comment) => {
    if (answersState) {
      let tempAns = answersState
      if (comment) {
        tempAns.sections.treatment.treatment.generalComment = e.target.value
        setAnswersState((answersState) => ({
          ...answersState,
          ...tempAns,
        }))
      } else {
        //saves answer
        let value
        if (isNumber(e.target.value)) {
          value = parseInt(e.target.value)
        }
        tempAns.sections.treatment.treatment.questions[qNum].answer = value
        calculateRiskResults(tempAns)
        setAnswersState((answersState) => ({
          ...answersState,
          ...tempAns,
        }))
      }
    }
  }

  //Get result from range in questions
  const getTotalResultFromRange = (selectedQuestions, questions) => {
    let result = 0
    selectedQuestions.map(function (i) {
      result = result + questions[i].answer
    })
    return result
  }
  //Calculate results Total Recognition
  const calculateRiskResults = (Ans) => {
    let tempAns = answersState
    let treatmentQuestions = Ans.sections.treatment.treatment.questions

    //calculate result for recognition range
    let recognitionResults = getTotalResultFromRange(
      [0, 2, 6, 9, 11, 14, 16],
      treatmentQuestions,
    )
    if (recognitionResults < 21) {
      tempAns.sections.treatment.treatment.result.totalRecognition.selectedText = 1
    } else {
      tempAns.sections.treatment.treatment.result.totalRecognition.selectedText = 0
    }
    //calculate result for ambivalence range
    let ambivalenceResults = getTotalResultFromRange(
      [1, 5, 10, 15],
      treatmentQuestions,
    )
    if (ambivalenceResults < 12) {
      tempAns.sections.treatment.treatment.result.totalAmbivalence.selectedText = 1
    } else {
      tempAns.sections.treatment.treatment.result.totalAmbivalence.selectedText = 0
    }
    //calculate result for taking steps range
    let totalTakingStepsResults = getTotalResultFromRange(
      [3, 4, 7, 8, 12, 13, 17, 18],
      treatmentQuestions,
    )
    if (totalTakingStepsResults < 24) {
      tempAns.sections.treatment.treatment.result.totalTakingSteps.selectedText = 1
    } else {
      tempAns.sections.treatment.treatment.result.totalTakingSteps.selectedText = 0
    }

    //save results to questionnaire
    tempAns.sections.treatment.treatment.result.totalRecognition.value = recognitionResults
    tempAns.sections.treatment.treatment.result.totalAmbivalence.value = ambivalenceResults
    tempAns.sections.treatment.treatment.result.totalTakingSteps.value = totalTakingStepsResults
    setAnswersState((answersState) => ({
      ...answersState,
      ...tempAns,
    }))
  }

  return (
    <>
      <h4 className="px-0 mt-4  ">
        {answers.sections.treatment.treatment.name}
      </h4>
      <div className="card round">
        <div className="card-body px-2">
          {questions.map(function (question, i) {
            return (
              <>
                {/* true/false question */}
                <h6 className="mt-3" key={question.title}>
                  {question.title}
                </h6>
                <div>
                  <div
                    className="btn-group w-100 mt-2 mb-2"
                    role="group"
                    id={question.name}
                    key={question.name}
                    aria-label={'Basic radio toggle button group'}
                    onChange={(e) => {
                      onAnsInput(e, i, false)
                    }}
                  >
                    <input
                      type="radio"
                      className="btn-check"
                      name={question.name + 'sub'}
                      id={question.title + 'radio0' + i}
                      autocomplete="off"
                      value={1}
                      required
                    ></input>
                    <label
                      className="btn btn-outline-secondary"
                      for={question.title + 'radio0' + i}
                    >
                      1
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name={question.name + 'sub'}
                      id={question.title + 'radio1' + i}
                      autocomplete="off"
                      value={2}
                    ></input>
                    <label
                      className="btn btn-outline-secondary"
                      for={question.title + 'radio1' + i}
                    >
                      2
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name={question.name + 'sub'}
                      id={question.title + 'radio2' + i}
                      autocomplete="off"
                      value={3}
                    ></input>
                    <label
                      className="btn btn-outline-secondary"
                      for={question.title + 'radio2' + i}
                    >
                      3
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name={question.name + 'sub'}
                      id={question.title + 'radio3' + i}
                      autocomplete="off"
                      value={4}
                    ></input>
                    <label
                      className="btn btn-outline-secondary"
                      for={question.title + 'radio3' + i}
                    >
                      4
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name={question.name + 'sub'}
                      id={question.title + 'radio4' + i}
                      autocomplete="off"
                      value={5}
                    ></input>
                    <label
                      className="btn btn-outline-secondary"
                      for={question.title + 'radio4' + i}
                    >
                      5
                    </label>
                  </div>
                </div>
              </>
            )
          })}
          {totalRecognitionResult !== null && (
            <ResultsDisplay
              result={
                answers.sections.treatment.treatment.result.totalRecognition
              }
              divider={true}
            />
          )}
          {totalAmbivalenceResult !== null && (
            <ResultsDisplay
              result={
                answers.sections.treatment.treatment.result.totalAmbivalence
              }
              divider={true}
            />
          )}
          {totalTakingStepsResult !== null && (
            <ResultsDisplay
              result={
                answers.sections.treatment.treatment.result.totalTakingSteps
              }
              divider={true}
            />
          )}

          <DividerSmall />
          {/* General comments */}
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

export default Treatment
