import Divider from '../../../components/Divider'
import DividerSmall from '../../../components/DividerSmall'

const ScreeningTrans = ({ screening }) => {
  return (
    <>
      <h2 className="font-weight-bold px-0 pb-3">Screening</h2>
      {/* Substance Use Questions */}
      <h4 className="px-0 mt-0 mb-3">{screening.substanceUse.name}</h4>
      <p className="fs-6 px-0 mt-0 fw-light">
        {screening.substanceUse.subText}
      </p>
      <p className="fs-6 px-0 fw-light">{screening.substanceUse.subText2}</p>
      <div className="card round">
        <div className="card-body px-2">
          {screening.substanceUse.sectionA.questions.map(function (
            question,
            i,
          ) {
            return (
              <div key={question.title}>
                <h6 className="mt-3" key={'SUD' + i}>
                  {question.title}
                </h6>
                <div className="alert alert-secondary mb-5 d-none p-1 d-lg-block text-center">
                  {question.answer}
                </div>
              </div>
            )
          })}
          <DividerSmall />
          {screening.substanceUse.sectionB.questions.map(function (
            question,
            i,
          ) {
            if (question.answer) {
              return (
                <div key={question.title}>
                  <h6 className="mt-3" key={'SUD' + i}>
                    {question.title}
                  </h6>
                  <div className="alert alert-success mb-5 d-none p-1 d-lg-block text-center">
                    {question.answer.toString()}
                  </div>
                </div>
              )
            } else {
              return (
                <div key={question.title}>
                  <h6 className="mt-3" key={'SUD' + i}>
                    {question.title}
                  </h6>
                  <div className="alert alert-danger mb-5 d-none p-1 d-lg-block text-center">
                    {question.answer.toString()}
                  </div>
                </div>
              )
            }
          })}
          <h6 className="mt-3">General Comments</h6>
          <textarea
            className="form-control mb-2"
            disabled
            style={{ resize: 'none' }}
          >
            {screening.substanceUse.generalComment}
          </textarea>
        </div>
      </div>
    </>
  )
}

export default ScreeningTrans
