import DividerSmall from '../../../components/DividerSmall'
import BoolAnsDisplay from './components/BoolAnsDisplay'

const FamilyCommunityTrans = ({ familyCommunity }) => {
  return (
    <>
      <h4 className="px-0 mt-5 mb-4">
        <strong>{familyCommunity.name}</strong>
      </h4>
      <p className="fs-6 px-0 fw-light">{familyCommunity.subtext1}</p>
      <p className="fs-6 px-0 fw-light mb-0">{familyCommunity.subtext2}</p>
      {/* Peer Family */}
      <h4 className="px-0 mt-4 mb-3">{familyCommunity.familyPeer.name}</h4>
      <div className="card round">
        <div className="card-body px-2">
          <BoolAnsDisplay questions={familyCommunity.familyPeer.questions} />
          <DividerSmall />
          <h6 className="mt-3">General Comments</h6>
          <textarea
            className="form-control mb-2"
            disabled
            style={{ resize: 'none' }}
          >
            {familyCommunity.familyPeer.generalComment}
          </textarea>
        </div>
      </div>

      {/* School */}
      <h4 className="px-0 mt-5 mb-3">{familyCommunity.school.name}</h4>
      <div className="card round">
        <div className="card-body px-2">
          <BoolAnsDisplay questions={familyCommunity.school.questions} />
          <DividerSmall />
          <h6 className="mt-3">General Comments</h6>
          <textarea
            className="form-control mb-2"
            disabled
            style={{ resize: 'none' }}
          >
            {familyCommunity.school.generalComment}
          </textarea>
        </div>
      </div>

      {/* Community */}
      <h4 className="px-0 mt-5 mb-3">{familyCommunity.community.name}</h4>
      <div className="card round">
        <div className="card-body px-2">
          <BoolAnsDisplay questions={familyCommunity.community.questions} />
          <DividerSmall />
          <h6 className="mt-3">General Comments</h6>
          <textarea
            className="form-control mb-2"
            disabled
            style={{ resize: 'none' }}
          >
            {familyCommunity.community.generalComment}
          </textarea>
        </div>
      </div>
    </>
  )
}

export default FamilyCommunityTrans
