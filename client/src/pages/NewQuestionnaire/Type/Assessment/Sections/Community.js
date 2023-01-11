import { useState, useEffect } from 'react'
import DividerSmall from '../../../../../components/DividerSmall'
import isNumber from '../../../../../util/tools'

/**
 * Community section of questionnaire. The components in the ./Sections directory all
 * correspond to different sections of the assessment part of the questionnaire.
 * These different sections are essentially the different risk factors of the original WC-SUDAT questionnaire.
 */

const Community = ({ answers, wrapperSetAnswers }) => {
  const [answersState, setAnswersState] = useState(answers) //Current answers obj
  const questions = answers.sections.familyCommunity.community.questions //Community questions

  //Detects change to local assessment obj then updates parent assessment object
  useEffect(() => {
    if (answersState) {
      //console.log(answersState)
      wrapperSetAnswers(answersState)
    }
  }, [answersState, wrapperSetAnswers])

  //Handles updating local assessment obj answers when any change to an input field is made
  const onAnsInput = (e, qNum, name, isSub, comment) => {
    if (answersState) {
      let tempAns = answersState
      //If it is a comment answer
      if (comment) {
        tempAns.sections.familyCommunity.community.generalComment =
          e.target.value
        setAnswersState((answersState) => ({
          ...answersState,
          ...tempAns,
        }))
      } else {
        //If it not a comment answer
        //Checks if true or false is being toggled
        //This is used to check if the question has subquestions
        if (!isSub) {
          if (document.querySelector('input[name="' + name + '"]:checked')) {
            let value = document.querySelector(
              'input[name="' + name + '"]:checked',
            ).value
            var isTrue = value === 'true'
            //Sets true false value ot obj
            tempAns.sections.familyCommunity.community.questions[
              qNum
            ].answerBool = isTrue
            setAnswersState((answersState) => ({
              ...answersState,
              ...tempAns,
            }))
            //Resets the question if they answer false
            if (!isTrue) {
              tempAns.sections.familyCommunity.community.questions[
                qNum
              ].answer = null
              setAnswersState((answersState) => ({
                ...answersState,
                ...tempAns,
              }))
            }
          }
        } else {
          //Saves sub question data
          let value
          if (isNumber(e.target.value)) {
            value = parseInt(e.target.value)
          }
          tempAns.sections.familyCommunity.community.questions[
            qNum
          ].answer = value
          setAnswersState((answersState) => ({
            ...answersState,
            ...tempAns,
          }))
        }
      }
    }
  }

  return (
    <>
      <h4 className="px-0 mt-5 mb-3">
        {answers.sections.familyCommunity.community.name}
      </h4>
      <div className="card round">
        <div className="card-body px-2">
          {/* Maps and renders every question for the questionn array */}
          {questions.map(function (question, i) {
            return (
              <>
                {/* True/false question */}
                <h6 className="mt-3" key={question.title}>
                  {question.title}
                </h6>
                <div
                  className="btn-group w-100 mt-2 mb-2"
                  role="group"
                  id={question.name}
                  key={question.name}
                  aria-label={'Basic radio toggle button group'}
                  onChange={(e) => {
                    onAnsInput(e, i, question.name, false)
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
                {/* Sub questions */}
                {/* Checks to see if no/yes question is yes to expand sub question*/}
                {document.querySelector(
                  'input[name="' + question.name + '"]:checked',
                ) && (
                  <>
                    {document.querySelector(
                      'input[name="' + question.name + '"]:checked',
                    ).value === 'true' && (
                      <>
                        <div>
                          <div
                            className="btn-group w-100 mt-2 mb-2"
                            role="group"
                            id={question.name}
                            key={'d' + (i + 1)}
                            aria-label={'Basic radio toggle button group'}
                            onChange={(e) => {
                              onAnsInput(e, i, question.name + 'sub', true)
                            }}
                          >
                            <input
                              type="radio"
                              className="btn-check"
                              name={question.name + 'sub'}
                              id={question.title + 'radio0' + (i + 1)}
                              autocomplete="off"
                              value={1}
                              required
                            ></input>
                            <label
                              className="btn btn-outline-secondary"
                              for={question.title + 'radio0' + (i + 1)}
                            >
                              1
                            </label>
                            <input
                              type="radio"
                              className="btn-check"
                              name={question.name + 'sub'}
                              id={question.title + 'radio1' + (i + 1)}
                              autocomplete="off"
                              value={2}
                            ></input>
                            <label
                              className="btn btn-outline-secondary"
                              for={question.title + 'radio1' + (i + 1)}
                            >
                              2
                            </label>
                            <input
                              type="radio"
                              className="btn-check"
                              name={question.name + 'sub'}
                              id={question.title + 'radio2' + (i + 1)}
                              autocomplete="off"
                              value={3}
                            ></input>
                            <label
                              className="btn btn-outline-secondary"
                              for={question.title + 'radio2' + (i + 1)}
                            >
                              3
                            </label>
                            <input
                              type="radio"
                              className="btn-check"
                              name={question.name + 'sub'}
                              id={question.title + 'radio3' + (i + 1)}
                              autocomplete="off"
                              value={4}
                            ></input>
                            <label
                              className="btn btn-outline-secondary"
                              for={question.title + 'radio3' + (i + 1)}
                            >
                              4
                            </label>
                            <input
                              type="radio"
                              className="btn-check"
                              name={question.name + 'sub'}
                              id={question.title + 'radio4' + (i + 1)}
                              autocomplete="off"
                              value={5}
                            ></input>
                            <label
                              className="btn btn-outline-secondary"
                              for={question.title + 'radio4' + (i + 1)}
                            >
                              5
                            </label>
                            <input
                              type="radio"
                              className="btn-check"
                              name={question.name + 'sub'}
                              id={question.title + 'radio5' + (i + 1)}
                              autocomplete="off"
                              value={6}
                            ></input>
                            <label
                              className="btn btn-outline-secondary"
                              for={question.title + 'radio5' + (i + 1)}
                            >
                              6
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
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
              onAnsInput(e, 0, 'General Comment', false, true)
            }}
          ></textarea>
        </div>
      </div>
    </>
  )
}

export default Community
