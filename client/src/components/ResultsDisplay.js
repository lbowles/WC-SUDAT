import DividerSmall from './DividerSmall'
import ResultsBar from './ResultsBar'


/**
 * Larger components that displays the results bar and the corresponding text which correlates to the
 * result used to display real time results when filling out the questionnaire.
 */

const ResultsDisplay = ({ result, divider }) => {
  return (
    <>
      {result.value !== null && (
        <>
          <DividerSmall />
          {/* uses result bar */}
          <ResultsBar
            rangeText={result.rangeText}
            result={result.value}
            lowRange={result.lowRange}
            highRange={result.highRange}
          />
          {/* displays possible text options */}
          {result.text.map(function (textString, index) {
            if (result.selectedText === index) {
              //Bolds the text if it corresponds to the result
              return (
                <h6
                  className="pt-1 pb-2"
                  style={{ fontSize: '15px' }}
                  key={textString}
                >
                  <strong>{textString}</strong>
                </h6>
              )
            } else {
              return (
                <h6
                  className="pt-1 pb-2"
                  style={{ fontSize: '15px', color: '#717171' }}
                  key={textString}
                >
                  {textString}
                </h6>
              )
            }
          })}
        </>
      )}
    </>
  )
}

export default ResultsDisplay
