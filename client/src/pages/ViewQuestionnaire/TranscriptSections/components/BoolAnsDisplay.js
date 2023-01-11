const BoolAnsDisplay = ({ questions }) => {
  return (
    <>
      {questions && (
        <>
          {questions.map(function (question, i) {
            return (
              <div key={question.title}>
                <h6 className="mt-3">{question.title}</h6>
                {question.answerBool ? (
                  <>
                    <div className="alert alert-success mb-2 d-none p-1 d-lg-block text-center">
                      {question.answerBool.toString()}
                    </div>
                    {question.answer !== null && (
                      <div className="alert alert-secondary mb-5 d-none p-1 d-lg-block text-center">
                        {question.answer.toString()}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="alert alert-danger mb-5 d-none p-1 d-lg-block text-center">
                    {question.answerBool.toString()}
                  </div>
                )}
              </div>
            )
          })}
        </>
      )}
    </>
  )
}

export default BoolAnsDisplay
