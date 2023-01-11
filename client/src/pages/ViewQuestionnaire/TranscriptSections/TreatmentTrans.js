import DividerSmall from '../../../components/DividerSmall'

const TreatmentTrans = ({ treatment }) => {
  return (
    <>
      <h4 className="px-0 mt-5 mb-4">
        <strong>{treatment.name}</strong>
      </h4>
      <p className="fs-6 px-0 fw-light">{treatment.subtext1}</p>
      <p className="fs-6 px-0 pb-4 fw-light mb-0">{treatment.subtext2}</p>
      <div className="card round ">
        <div className="card-body px-2 ">
          {treatment.treatment.questions.map(function (question, i) {
            return (
              <div key={question.title}>
                <h6 className="mt-3" key={'treat' + i}>
                  {question.title}
                </h6>
                <div className="alert alert-secondary mb-5 d-none p-1 d-lg-block text-center">
                  {question.answer}
                </div>
              </div>
            )
          })}
          <DividerSmall />
          <h6 className="mt-3 ">General Comments</h6>
          <textarea
            className="form-control mb-2"
            disabled
            style={{ resize: 'none' }}
          >
            {treatment.treatment.generalComment}
          </textarea>
        </div>
      </div>
      <div className="pb-5"> </div>
    </>
  )
}

export default TreatmentTrans
