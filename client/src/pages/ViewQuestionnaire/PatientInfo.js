import cryption from '../../util/cryption'

const PatientInfo = ({ questionnaire }) => {
  const patientInfo = questionnaire.screening.sections.patientInfo.questions

  return (
    <>
      <h4 className="px-0 mt-0 mb-3">Patient Info</h4>
      <div className="card round">
        <div className="card-body px-2 pt-2">
          {patientInfo &&
            patientInfo.map(function (question, i) {
              if (question.answer) {
                if (
                  question.name === 'firstName' ||
                  question.name === 'lastName' ||
                  question.name === 'IDNumber'
                ) {
                  return (
                    <h6 className="mt-3" key={question.answer + i}>
                      {question.title} :{' '}
                      <strong>{cryption.decrypt(question.answer)}</strong>
                    </h6>
                  )
                } else {
                  return (
                    <h6 className="mt-3" key={question.answer + i}>
                      {question.title} : <strong>{question.answer}</strong>
                    </h6>
                  )
                }
              }
            })}
        </div>
      </div>
    </>
  )
}

export default PatientInfo
