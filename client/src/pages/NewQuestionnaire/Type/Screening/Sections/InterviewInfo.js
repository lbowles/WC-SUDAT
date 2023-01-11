import { useEffect, useRef, useState } from 'react'

/**
 * Interview info section of questionnaire. The components in the .Screening/Sections directory all
 * correspond to different sections of the screening part of the questionnaire.
 * This section stores information regarding the current interview e.g. clinicnan and place.
 */

const InterviewInfo = ({ answers, wrapperSetAnswers }) => {
  const answersRef = useRef()
  const [answersState, setAnswersState] = useState(answers) //Current answers obj

  //Detects change to local screening obj then updates parent screening object
  useEffect(() => {
    if (answersState) {
      wrapperSetAnswers(answersState)
    }
  }, [answersState, wrapperSetAnswers])

  return (
    <>
      <h4 className="px-0 mt-0 mb-3">{answers.sections.interviewInfo.name}</h4>
      <div className="card round">
        <div className="card-body px-2">
          <h6 className="mt-2">
            {answers.sections.interviewInfo.questions[0].title}
          </h6>
          <input
            //Updates answer state obj with changes
            onInput={(e) => {
              if (answersState) {
                let tempAns = answersState
                tempAns.sections.interviewInfo.questions[0].answer =
                  e.target.value
                setAnswersState((answersState) => ({
                  ...answersState,
                  ...tempAns,
                }))
              }
            }}
            required
            ref={answersRef}
            type="text"
            name={answers.sections.interviewInfo.questions[0].name}
            placeholder={
              answers.sections.interviewInfo.questions[0].placeholder
            }
            className="form-control mb-2 "
          />
        </div>
      </div>
    </>
  )
}

export default InterviewInfo
