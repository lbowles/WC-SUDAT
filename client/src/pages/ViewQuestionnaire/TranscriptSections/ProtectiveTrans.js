import DividerSmall from '../../../components/DividerSmall'
import BoolAnsDisplay from './components/BoolAnsDisplay'

const ProtectiveTrans = ({ protective }) => {
  return (
    <>
      <h4 className="px-0 mt-5 mb-4">
        <strong>{protective.name}</strong>
      </h4>
      <p className="fs-6 px-0 fw-light">{protective.subtext1}</p>
      <p className="fs-6 px-0 fw-light mb-0">{protective.subtext2}</p>
      {/* Family Protective */}
      <h4 className="px-0 mt-4 mb-3">{protective.familyProtective.name}</h4>
      <div className="card round">
        <div className="card-body px-2">
          <BoolAnsDisplay questions={protective.familyProtective.questions} />
          <DividerSmall />
          <h6 className="mt-3">General Comments</h6>
          <textarea
            className="form-control mb-2"
            disabled
            style={{ resize: 'none' }}
          >
            {protective.familyProtective.generalComment}
          </textarea>
        </div>
      </div>

      {/* Community Protective */}
      <h4 className="px-0 mt-5 mb-3">{protective.communityProtective.name}</h4>
      <div className="card round">
        <div className="card-body px-2">
          <BoolAnsDisplay
            questions={protective.communityProtective.questions}
          />
          <DividerSmall />
          <h6 className="mt-3">General Comments</h6>
          <textarea
            className="form-control mb-2"
            disabled
            style={{ resize: 'none' }}
          >
            {protective.communityProtective.generalComment}
          </textarea>
        </div>
      </div>
    </>
  )
}

export default ProtectiveTrans
