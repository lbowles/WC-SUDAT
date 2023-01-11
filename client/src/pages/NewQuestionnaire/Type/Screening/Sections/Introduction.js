
/**
 * This component is used to display introductory text for the clinician udertaking the questionnaire.
 */

const Introduction = ({ answers }) => {
  return (
    <>
      <h4 className="px-0 mb-3">Introduction</h4>
      {answers.information.subText ? (
        <p className="fs-6 px-0 fw-light">{answers.information.subText}</p>
      ) : (
        <></>
      )}
      {answers.information.subText2 ? (
        <p className="fs-6 px-0 fw-light">{answers.information.subText2}</p>
      ) : (
        <></>
      )}
    </>
  )
}

export default Introduction
