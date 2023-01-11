import countries from '../../../../../util/countries'
import languages from '../../../../../util/languages'
import { useState, useEffect } from 'react'
import isNumber from '../../../../../util/tools'
import cryption from '../../../../../util/cryption'

/**
 * Patient info section of questionnaire. The components in the .Screening/Sections directory all
 * correspond to different sections of the screening part of the questionnaire.
 * These different sections are essentially the different determinants to screen patients
 * for the potential existence of an SUD, of the original WC-SUDAT questionnaire.
 */

const PatientInfo = ({ answers, wrapperSetAnswers }) => {
  const [answersState, setAnswersState] = useState(answers) //Parent answer object
  //Options for the drop down menus
  const housingOptions = [
    'Co-op/Community home',
    'Multifamily homes',
    'Single family home',
    'Town house (semi-detached in complex)',
    'Cluster house',
    'Flat/apartment',
    'Bachelor flat',
    'Caravan/Tent',
    'Homeless',
  ]
  const sex = ['Male', 'Famale', 'Non-binary', 'Other']
  const educations = [
    'Not studying',
    'Primary/Middle School',
    'Secondary/High School',
    'College/ Tertiary Institution',
  ]
  const criminalRecord = ['None', 'Convicted']

  //Detects change to local screening obj then updates parent screening object
  useEffect(() => {
    if (answersState) {
      //console.log(answersState)
      wrapperSetAnswers(answersState)
    }
  }, [answersState, wrapperSetAnswers])

  //Handles updating local screening obj aswers from input field
  const onAnsInput = (e, qNum, generalComment) => {
    let tempAns = answersState
    let value = e.target.value
    if (isNumber(e.target.value)) {
      value = parseInt(e.target.value)
    }
    //Encrypts sensitive patient info
    if (
      (e.target.name === 'firstName' ||
        e.target.name === 'lastName' ||
        e.target.name === 'IDNumber') &&
      value
    ) {
      value = cryption.encrypt(value)
    }
    tempAns.sections.patientInfo.questions[qNum].answer = value
    setAnswersState((answersState) => ({
      ...answersState,
      ...tempAns,
    }))
  }

  return (
    <>
      <h4 className="px-0 mt-0 mb-3">{answers.sections.patientInfo.name}</h4>
      <div className="card round">
        <div className="card-body px-2">
          <h6 className="mt-2">
            {answers.sections.patientInfo.questions[0].title}
          </h6>
          <input
            minLength="3"
            required
            type="text"
            name={answers.sections.patientInfo.questions[0].name}
            placeholder={answers.sections.patientInfo.questions[0].placeholder}
            className="form-control mb-2"
            onInput={(e) => {
              onAnsInput(e, 0)
            }}
          />
          <h6 className="mt-3">
            {answers.sections.patientInfo.questions[1].title}
          </h6>
          <input
            minLength="3"
            required
            type="text"
            name={answers.sections.patientInfo.questions[1].name}
            placeholder={answers.sections.patientInfo.questions[1].placeholder}
            className="form-control mb-2"
            onInput={(e) => {
              onAnsInput(e, 1)
            }}
          />
          <h6 className="mt-3">
            {answers.sections.patientInfo.questions[2].title}
          </h6>
          <input
            required
            type="number"
            minLength="13"
            name={answers.sections.patientInfo.questions[2].name}
            placeholder={answers.sections.patientInfo.questions[2].placeholder}
            className="form-control mb-2"
            onInput={(e) => {
              onAnsInput(e, 2)
            }}
          />
          <h6 className="mt-3">
            {answers.sections.patientInfo.questions[3].title}
          </h6>
          <input
            required
            type="number"
            name={answers.sections.patientInfo.questions[3].name}
            placeholder={answers.sections.patientInfo.questions[3].placeholder}
            className="form-control mb-2 w-25"
            step="0"
            onInput={(e) => {
              onAnsInput(e, 3)
            }}
          />
          <h6 className="mt-3">
            {answers.sections.patientInfo.questions[4].title}
          </h6>
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            name={answers.sections.patientInfo.questions[4].name}
            onInput={(e) => {
              onAnsInput(e, 4)
            }}
          >
            {sex.map(function (sexOption, i) {
              // Import countries for select menu
              return (
                <option value={sexOption} key={sexOption}>
                  {sexOption}
                </option>
              )
            })}
          </select>
          <h6 className="mt-3">
            {answers.sections.patientInfo.questions[5].title}
          </h6>
          <select
            className="form-select mb-2"
            aria-label="Default select example"
            name={answers.sections.patientInfo.questions[5].name}
            onInput={(e) => {
              onAnsInput(e, 5)
            }}
          >
            {countries.map(function (country, i) {
              // Import countries for select menu
              return (
                <option value={country.name} key={country.name}>
                  {country.name}
                </option>
              )
            })}
          </select>
          <h6 className="mt-3">
            {answers.sections.patientInfo.questions[6].title}
          </h6>
          <input
            required
            type="text"
            name={answers.sections.patientInfo.questions[6].name}
            placeholder={answers.sections.patientInfo.questions[6].placeholder}
            className="form-control mb-2"
            onInput={(e) => {
              onAnsInput(e, 6)
            }}
          />
          <h6 className="mt-3">
            {answers.sections.patientInfo.questions[7].title}
          </h6>
          <select
            className="form-select mb-2"
            aria-label="Default select example"
            name={answers.sections.patientInfo.questions[7].name}
            onInput={(e) => {
              onAnsInput(e, 7)
            }}
          >
            {languages.map(function (language, i) {
              // Import languages for select menu
              return (
                <option value={language.name} key={language.name}>
                  {language.name}
                </option>
              )
            })}
          </select>
          <h6 className="mt-3">
            {answers.sections.patientInfo.questions[8].title}
          </h6>
          <select
            className="form-select mb-2"
            aria-label="Default select example"
            name={answers.sections.patientInfo.questions[8].name}
            onInput={(e) => {
              onAnsInput(e, 8)
            }}
          >
            {housingOptions.map(function (option, i) {
              // Import housing options for select menu
              return (
                <option value={option} key={option}>
                  {option}
                </option>
              )
            })}
          </select>
          <h6 className="mt-3">
            {answers.sections.patientInfo.questions[9].title}
          </h6>
          <select
            className="form-select mb-2"
            aria-label="Default select example"
            name={answers.sections.patientInfo.questions[9].name}
            onInput={(e) => {
              onAnsInput(e, 9)
            }}
          >
            {educations.map(function (level, i) {
              // Import education level options for select menu
              return (
                <option value={level} key={level}>
                  {level}
                </option>
              )
            })}
          </select>
          <h6 className="mt-3">
            {answers.sections.patientInfo.questions[10].title}
          </h6>
          <select
            className="form-select mb-2"
            aria-label="Default select example"
            name={answers.sections.patientInfo.questions[10].name}
            onInput={(e) => {
              onAnsInput(e, 10)
            }}
          >
            {criminalRecord.map(function (record, i) {
              // Import education level options for select menu
              return (
                <option value={record} key={record}>
                  {record}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    </>
  )
}

export default PatientInfo
