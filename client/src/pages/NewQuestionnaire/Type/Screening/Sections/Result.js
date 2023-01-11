import saveIconBlue from '../../../../../img/saveBlue.svg'
import nextIcon from '../../../../../img/next.svg'

/**
 * Depending on the results it will display if patient is at risk and questionnaire should continue,
 * if the results says patient isn't at risk then it will display a message saying they are not at risk but 
 * gives the clinican to option to still override to the assessment
 */

const Result = ({ screening, risk, loading, continueToAssessmentPage }) => {
  
  //The buttons will show a loading spinner when the form is being submitted
  return (
    <>
      <h4 className="px-0 mt-0 mb-3">{screening.results.title}</h4>
      {risk ? (
        <>
          <p className="fs-6 px-0 fw-light">
            {screening.results.isAtRisk.subText}
          </p>
          <button
            type="submit"
            className="btn btn-primary col-12 mb-2"
            onClick={continueToAssessmentPage}
            disabled={loading}
          >
            {loading ? (
              'Loading...'
            ) : (
              <>
                {screening.results.isAtRisk.primaryBtnText}{' '}
                <img
                  src={nextIcon}
                  style={{
                    transform: ' translateY(-2px)',
                  }}
                ></img>
              </>
            )}
          </button>
          <button
            type="submit"
            className="btn  btn-outline-primary col-12 mb-2 mt-3"
            disabled={loading}
          >
            {loading ? (
              'Loading...'
            ) : (
              <>
                {screening.results.isAtRisk.secondaryBtnText}{' '}
                <img
                  src={saveIconBlue}
                  style={{
                    transform: ' translateY(-2px)',
                  }}
                ></img>
              </>
            )}
          </button>
        </>
      ) : (
        <>
          <p className="fs-6 px-0 fw-light">
            {screening.results.isNotAtRisk.subText}
          </p>
          <button
            type="submit"
            className="btn btn-primary col-12 mb-2"
            onClick={continueToAssessmentPage}
          >
            {loading ? (
              'Loading...'
            ) : (
              <>
                {screening.results.isNotAtRisk.primaryBtnText}{' '}
                <img
                  src={nextIcon}
                  style={{
                    transform: ' translateY(-2px)',
                  }}
                ></img>
              </>
            )}
          </button>
          <button
            type="submit"
            className="btn  btn-outline-primary col-12 mb-2 mt-3"
          >
            {loading ? (
              'Loading...'
            ) : (
              <>
                {screening.results.isNotAtRisk.secondaryBtnText}{' '}
                <img
                  src={saveIconBlue}
                  style={{
                    transform: ' translateY(-2px)',
                  }}
                ></img>{' '}
              </>
            )}
          </button>
        </>
      )}
    </>
  )
}

export default Result
