import React from 'react'
import ResultsDisplayReport from '../../components/ResultsDisplayReport'
import ResultsBar from '../../components/ResultsBar'
import cryption from '../../util/cryption'

const ReportPrint = React.forwardRef(({ questionnaire }, ref) => {
  const patientInfo = questionnaire.screening.sections.patientInfo.questions
  const getPageMargins = () => {
    return `@page { margin: 30px !important; }`
  }

  return (
    <div ref={ref}>
      <style>{getPageMargins()}</style>
      {/* questionnaire info */}
      <h4 className="px-0 mt-0 mb-3">Quesitonnaire Info</h4>
      <div className="card round">
        <div className="card-body px-3 pt-1">
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
      <div style={{ height: '30px' }}></div>
      {/* Patient info */}
      <h4 className="px-0 mt-0 mb-3">Patient Info</h4>
      <div className="card round">
        <div className="card-body px-3 pt-1">
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
      <div style={{ height: '30px' }}></div>
      {/* screening/assessment info */}
      <h4 className="px-0 mt-0 mb-3">Screening/Assessment Results</h4>
      <div className="card round">
        <div className="card-body px-3">
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
                divider={true}
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
    </div>
  )
})

export default ReportPrint
