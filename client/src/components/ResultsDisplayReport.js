import DividerSmall from './DividerSmall'
import ResultsBar from './ResultsBar'

/**
 * This is an adaptation of the results display component, which works when viewing a completed questionnaire
 */

const ResultsDisplayReport = ({ result, divider }) => {
  return (
    <>
      {result && (
        <>
          <DividerSmall />
          <ResultsBar
            rangeText={result.rangeText}
            result={result.value}
            lowRange={result.lowRange}
            highRange={result.highRange}
          />
          {/* only displays text corresponding to result  */}
          {result.text.map(function (textString, index) {
            if (result.selectedText === index) {
              return (
                <h6
                  className="pt-1 pb-2"
                  style={{ fontSize: '15px' }}
                  key={textString}
                >
                  <strong>{textString}</strong>
                </h6>
              )
            }
          })}
        </>
      )}
    </>
  )
}

export default ResultsDisplayReport
