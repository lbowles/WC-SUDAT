import { useState, useEffect } from 'react'
import DividerSmall from '../../../../../components/DividerSmall'
import isNumber from '../../../../../util/tools'

/**
 * DepressionAnxiety section of questionnaire. The components in the ./Sections directory all
 * correspond to different sections of the assessment part of the questionnaire.
 * These different sections are essentially the different risk factors of the original WC-SUDAT questionnaire.
 */

const DepressionAnxiety = ({ answers, wrapperSetAnswers }) => {
  const [answersState, setAnswersState] = useState(answers) //Current answers obj
  const sectionA = answers.sections.individualRisks.depressionAnxiety.sectionA //Seciton A of the obj
  const sectionB = answers.sections.individualRisks.depressionAnxiety.sectionB //Seciton A of the obj

  //Detects change to local assessment obj then updates parent screening object
  useEffect(() => {
    if (answersState) {
      //console.log(answersState)
      wrapperSetAnswers(answersState)
    }
  }, [answersState, wrapperSetAnswers])

  //Handles updating local screening obj aswers from input field
  //Different sections are used as the types or answers are different
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
        }
        tempAns.sections.individualRisks.depressionAnxiety.sectionA.questions[
          qNum
        ].answer = value
        setAnswersState((answersState) => ({
          ...answersState,
          ...tempAns,
        }))
      }
      if (section === 'B') {
        //Finds value of selected radio button
        let value = document.querySelector('input[name="' + name + '"]:checked')
          .value
        if (isNumber(value)) {
          value = parseInt(e.target.value)
        }
        tempAns.sections.individualRisks.depressionAnxiety.sectionB.questions[
          qNum
        ].answer = value
        setAnswersState((answersState) => ({
          ...answersState,
          ...tempAns,
        }))
      }
      //If section c answers
      if (section === 'C') {
        let value = e.target.value
        tempAns.sections.individualRisks.depressionAnxiety.generalComment = value
        setAnswersState((answersState) => ({
          ...answersState,
          ...tempAns,
        }))
      }
    }
  }

  return (
    <>
      <h4 className="px-0 mt-5 mb-3">
        {answers.sections.individualRisks.depressionAnxiety.name}
      </h4>
      <div className="card round">
        <div className="card-body px-2">
          <p className="fs-6 px-0 fw-light">{sectionA.subtext1}</p>
          <p className="fs-6 px-0 fw-light">{sectionA.subtext2}</p>
          <p className="fs-6 px-0 fw-light">{sectionA.subtext3}</p>
          {/* Section A question */}
          {sectionA.questions.map(function (question, i) {
            return (
              <>
                <div key={question.title}>
                  <h6 className="mt-3">{question.title}</h6>
                  <div
                    className="btn-group w-100 mt-2 mb-2"
                    role="group"
                    id={question.name}
                    key={'d' + i}
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
                      name={question.name}
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
                      name={question.name}
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
                  </div>
                </div>
              </>
            )
          })}
          <DividerSmall />
          {/* Section B question */}
          <p className="fs-6 px-0 pt-1 fw-light">{sectionB.subtext1}</p>
          <p className="fs-6 px-0 fw-light">{sectionB.subtext2}</p>
          <p className="fs-6 px-0 fw-light">{sectionB.subtext3}</p>
          {sectionB.questions.map(function (question, i) {
            return (
              <>
                <div key={question.title}>
                  <h6 className="mt-3" key={i + 6}>
                    {question.title}
                  </h6>
                  <div
                    className="btn-group w-100 mt-2 mb-2"
                    role="group"
                    id={question.name}
                    key={'d' + i + 6}
                    aria-label={'Basic radio toggle button group'}
                    onChange={(e) => {
                      onAnsInput(e, i, 'B', question.name)
                    }}
                  >
                    <input
                      type="radio"
                      className="btn-check"
                      name={question.name}
                      id={question.title + 'radio0' + i + 6}
                      autocomplete="off"
                      value={0}
                      required
                    ></input>
                    <label
                      className="btn btn-outline-secondary"
                      for={question.title + 'radio0' + i + 6}
                    >
                      1
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name={question.name}
                      id={question.title + 'radio1' + i + 6}
                      autocomplete="off"
                      value={1}
                    ></input>
                    <label
                      className="btn btn-outline-secondary"
                      for={question.title + 'radio1' + i + 6}
                    >
                      2
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name={question.name}
                      id={question.title + 'radio2' + i + 6}
                      autocomplete="off"
                      value={2}
                    ></input>
                    <label
                      className="btn btn-outline-secondary"
                      for={question.title + 'radio2' + i + 6}
                    >
                      3
                    </label>
                  </div>
                </div>
              </>
            )
          })}
          <DividerSmall />
          {/* General comments */}
          <h6 className="mt-3 mb-3">General Comments</h6>
          <textarea
            className="form-control mb-1"
            style={{ height: '100px' }}
            aria-label="With textarea"
            onChange={(e) => {
              onAnsInput(e, 0, 'C', '')
            }}
          ></textarea>
        </div>
      </div>
    </>
  )
}

export default DepressionAnxiety
