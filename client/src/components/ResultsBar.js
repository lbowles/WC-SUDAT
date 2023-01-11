import { useState, useEffect } from 'react'
import resultRangeCal from '../util/resultRange'

/**
 * This component displays a value and a progress bar that shows the % in its range.
 * The progress bars color changes from green to red depending on the % in its range.
 * In this instance, Green meaning low risk and Red meaning high risk for a particular risk factor.
 */

const ResultsBar = ({ rangeText, result, lowRange, highRange }) => {
  const [resultRange, setResultRange] = useState([]) //Store the result range

  //Update range progress bar when result changes
  useEffect(() => {
    setResultRange(resultRangeCal.calculateRange(result, lowRange, highRange))
  }, [result])

  return (
    <>
      <p>{rangeText}</p>
      <div className="flex d-flex justify-content-center">
        <h1>{result}</h1>
        <div
          className="progress align-self-center"
          style={{ width: '100%', marginLeft: '20px', height: '22px' }}
        >
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-label="Animated striped example"
            aria-valuenow="75"
            aria-valuemin="0"
            style={{
              width: `${resultRange[1]}`,
              backgroundColor: resultRange[0],
            }}
          ></div>
        </div>
      </div>
    </>
  )
}

export default ResultsBar
