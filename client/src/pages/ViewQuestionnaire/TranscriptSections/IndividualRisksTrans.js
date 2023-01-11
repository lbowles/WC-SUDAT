import DividerSmall from '../../../components/DividerSmall'

const IndividualRisksTrans = ({ individualRisks }) => {
  return (
    <>
      <h4 className="px-0 mt-0 mb-4">
        <strong>{individualRisks.name}</strong>
      </h4>

      {/* Risks Of Self Harm */}
      <h4 className="px-0 mt-0 mb-3">{individualRisks.riskOfSelfHarm.name}</h4>
      <div className="card round">
        <div className="card-body px-2">
          {/* q1 */}
          <h6 className="mt-3">
            {individualRisks.riskOfSelfHarm.questions[0].title}
          </h6>
          {individualRisks.riskOfSelfHarm.questions[0].answer ? (
            <div className="alert alert-success mb-5 d-none p-1 d-lg-block text-center">
              {individualRisks.riskOfSelfHarm.questions[0].answer.toString()}
            </div>
          ) : (
            <div className="alert alert-danger mb-5 d-none p-1 d-lg-block text-center">
              {individualRisks.riskOfSelfHarm.questions[0].answer.toString()}
            </div>
          )}
          {/* q2 */}
          <h6 className="mt-3">
            {individualRisks.riskOfSelfHarm.questions[1].title}
          </h6>
          {individualRisks.riskOfSelfHarm.questions[1].answer ? (
            <div className="alert alert-success mb-5 d-none p-1 d-lg-block text-center">
              {individualRisks.riskOfSelfHarm.questions[1].answer.toString()}
            </div>
          ) : (
            <div className="alert alert-danger mb-5 d-none p-1 d-lg-block text-center">
              {individualRisks.riskOfSelfHarm.questions[1].answer.toString()}
            </div>
          )}
          {/* q3 */}
          <h6 className="mt-3">
            {individualRisks.riskOfSelfHarm.questions[2].title}
          </h6>
          {individualRisks.riskOfSelfHarm.questions[2].answer ? (
            <>
              <div className="alert alert-success mb-3 d-none p-1 d-lg-block text-center">
                {individualRisks.riskOfSelfHarm.questions[2].answer.toString()}
              </div>
              <h6 className="mt-">
                {
                  individualRisks.riskOfSelfHarm.questions[2].subQuestions[0]
                    .title
                }
              </h6>
              <div className="alert alert-secondary mb-3 d-none p-1 d-lg-block text-left">
                {
                  individualRisks.riskOfSelfHarm.questions[2].subQuestions[0]
                    .answer
                }
              </div>
              <h6 className="mt-">
                {
                  individualRisks.riskOfSelfHarm.questions[2].subQuestions[1]
                    .title
                }
              </h6>
              <div className="alert alert-secondary mb-5 d-none p-1 d-lg-block text-left">
                {
                  individualRisks.riskOfSelfHarm.questions[2].subQuestions[1]
                    .answer
                }
              </div>
            </>
          ) : (
            <div className="alert alert-danger mb-5 d-none p-1 d-lg-block text-center">
              {individualRisks.riskOfSelfHarm.questions[2].answer.toString()}
            </div>
          )}
          {/* q4 */}
          <h6 className="mt-3">
            {individualRisks.riskOfSelfHarm.questions[3].title}
          </h6>
          {individualRisks.riskOfSelfHarm.questions[3].answer ? (
            <>
              <div className="alert alert-success mb-3 d-none p-1 d-lg-block text-center">
                {individualRisks.riskOfSelfHarm.questions[3].answer.toString()}
              </div>
              <h6 className="mt-3">
                {
                  individualRisks.riskOfSelfHarm.questions[3].subQuestions[0]
                    .title
                }
              </h6>
              <div className="alert alert-secondary mb-3 d-none p-1 d-lg-block text-left">
                {
                  individualRisks.riskOfSelfHarm.questions[3].subQuestions[0]
                    .answer
                }
              </div>
              <h6 className="mt-3">
                {
                  individualRisks.riskOfSelfHarm.questions[2].subQuestions[1]
                    .title
                }
              </h6>
              <div className="alert alert-secondary mb-5 d-none p-1 d-lg-block text-left">
                {
                  individualRisks.riskOfSelfHarm.questions[3].subQuestions[1]
                    .answer
                }
              </div>
            </>
          ) : (
            <div className="alert alert-danger mb-5 d-none p-1 d-lg-block text-center">
              {individualRisks.riskOfSelfHarm.questions[3].answer.toString()}
            </div>
          )}
          {/* q5 */}
          <h6 className="mt-3">
            {individualRisks.riskOfSelfHarm.questions[4].title}
          </h6>
          {individualRisks.riskOfSelfHarm.questions[4].answer ? (
            <>
              <div className="alert alert-success mb-3 d-none p-1 d-lg-block text-center">
                {individualRisks.riskOfSelfHarm.questions[4].answer.toString()}
              </div>
              <h6 className="mt-3">
                {
                  individualRisks.riskOfSelfHarm.questions[4].subQuestions[0]
                    .title
                }
              </h6>
              <div className="alert alert-secondary mb-3 d-none p-1 d-lg-block text-left">
                {
                  individualRisks.riskOfSelfHarm.questions[4].subQuestions[0]
                    .answer
                }
              </div>
              <h6 className="mt-3">
                {
                  individualRisks.riskOfSelfHarm.questions[4].subQuestions[1]
                    .title
                }
              </h6>
              <div className="alert alert-secondary mb-3 d-none p-1 d-lg-block text-left">
                {
                  individualRisks.riskOfSelfHarm.questions[4].subQuestions[1]
                    .answer
                }
              </div>
              <h6 className="mt-3">
                {
                  individualRisks.riskOfSelfHarm.questions[4].subQuestions[2]
                    .title
                }
              </h6>
              <div className="alert alert-secondary mb-5 d-none p-1 d-lg-block text-left">
                {
                  individualRisks.riskOfSelfHarm.questions[4].subQuestions[2]
                    .answer
                }
              </div>
            </>
          ) : (
            <div className="alert alert-danger mb-5 d-none p-1 d-lg-block text-center">
              {individualRisks.riskOfSelfHarm.questions[4].answer.toString()}
            </div>
          )}
          {/* q6 */}
          <h6 className="mt-3">
            {individualRisks.riskOfSelfHarm.questions[5].title}
          </h6>
          {individualRisks.riskOfSelfHarm.questions[5].answer ? (
            <div className="alert alert-success mb-5 d-none p-1 d-lg-block text-center">
              {individualRisks.riskOfSelfHarm.questions[5].answer.toString()}
            </div>
          ) : (
            <div className="alert alert-danger mb-0 d-none p-1 d-lg-block text-center">
              {individualRisks.riskOfSelfHarm.questions[5].answer.toString()}
            </div>
          )}
          <DividerSmall />
          <h6 className="mt-3">General Comments</h6>
          <textarea
            className="form-control mb-2"
            disabled
            style={{ resize: 'none' }}
          >
            {individualRisks.riskOfSelfHarm.generalComment}
          </textarea>
        </div>
      </div>

      {/* Risks Of Self Harm */}
      <h4 className="px-0 mt-5 mb-3">{individualRisks.trauma.name}</h4>
      <div className="card round">
        <div className="card-body px-2">
          {/* q1 */}
          <h6 className="mt-3">{individualRisks.trauma.questions[0].title}</h6>
          {individualRisks.trauma.questions[0].answer ? (
            <>
              <div className="alert alert-success mb-5 d-none p-1 d-lg-block text-center">
                {individualRisks.trauma.questions[0].answer.toString()}
              </div>
              {individualRisks.trauma.questions.map(function (question, i) {
                if (i !== 0) {
                  return (
                    <div key={individualRisks.trauma.questions[i].title}>
                      <h6 className="mt-3">
                        {individualRisks.trauma.questions[i].title}
                      </h6>
                      {individualRisks.trauma.questions[i].answer ? (
                        <div className="alert alert-success mb-5 d-none p-1 d-lg-block text-center">
                          {individualRisks.riskOfSelfHarm.questions[
                            i
                          ].answer.toString()}
                        </div>
                      ) : (
                        <div className="alert alert-danger mb-5 d-none p-1 d-lg-block text-center">
                          {individualRisks.riskOfSelfHarm.questions[
                            i
                          ].answer.toString()}
                        </div>
                      )}
                    </div>
                  )
                }
              })}
            </>
          ) : (
            <div className="alert alert-danger mb-5 d-none p-1 d-lg-block text-center">
              {individualRisks.trauma.questions[0].answer.toString()}
            </div>
          )}
          <DividerSmall />
          <h6 className="mt-3">General Comments</h6>
          <textarea
            className="form-control mb-2"
            disabled
            style={{ resize: 'none' }}
          >
            {individualRisks.riskOfSelfHarm.generalComment}
          </textarea>
        </div>
      </div>

      {/* Depression Anxiety */}
      <h4 className="px-0 mt-5 mb-3">
        {individualRisks.depressionAnxiety.name}
      </h4>
      <div className="card round">
        <div className="card-body px-2">
          <p className="fs-6 px-0 pt-1 fw-light">
            {individualRisks.depressionAnxiety.sectionA.subtext1}
          </p>
          <p className="fs-6 px-0 fw-light">
            {individualRisks.depressionAnxiety.sectionA.subtext2}
          </p>
          <p className="fs-6 px-0 pb-3 fw-light">
            {individualRisks.depressionAnxiety.sectionA.subtext3}
          </p>
          {/* q1-6 */}
          {individualRisks.depressionAnxiety.sectionA.questions.map(function (
            question,
            i,
          ) {
            return (
              <div key={question.title}>
                {' '}
                <h6 className="mt-3">{question.title}</h6>
                <div className="alert alert-secondary mb-5 d-none p-1 d-lg-block text-center">
                  {question.answer.toString()}
                </div>
              </div>
            )
          })}
          <DividerSmall />
          {/* q6-13 */}
          {individualRisks.depressionAnxiety.sectionB.questions.map(function (
            question,
            i,
          ) {
            return (
              <div key={question.title}>
                {' '}
                <h6 className="mt-3">{question.title}</h6>
                <div className="alert alert-secondary mb-5 d-none p-1 d-lg-block text-center">
                  {question.answer.toString()}
                </div>
              </div>
            )
          })}
          <DividerSmall />
          <h6 className="mt-3">General Comments</h6>
          <textarea
            className="form-control mb-2"
            disabled
            style={{ resize: 'none' }}
          >
            {individualRisks.depressionAnxiety.generalComment}
          </textarea>
        </div>
      </div>
    </>
  )
}

export default IndividualRisksTrans
