import Divider from '../../components/Divider'
import DividerSmall from '../../components/DividerSmall'
import ScreeningTrans from './TranscriptSections/ScreeningTrans'
import IndividualRisksTrans from './TranscriptSections/IndividualRisksTrans'
import FamilyCommunityTrans from './TranscriptSections/FamilyCommunityTrans'
import ProtectiveTrans from './TranscriptSections/ProtectiveTrans'
import TreatmentTrans from './TranscriptSections/TreatmentTrans'

const Transcript = ({ questionnaire }) => {
  let screening = questionnaire.screening.sections
  let assessment = questionnaire.assessment.sections
  return (
    <>
      {questionnaire && (
        <>
          {/* Screening */}
          <ScreeningTrans screening={screening} />
          {assessment && (
            <>
              <Divider />
              {/* Assessment */}
              <h2 className="font-weight-bold px-0 pb-4">Assessment</h2>
              {/* Induvidual Risks */}
              <IndividualRisksTrans
                individualRisks={assessment.individualRisks}
              />
              {/* Family and Community */}
              <FamilyCommunityTrans
                familyCommunity={assessment.familyCommunity}
              />
              {/* Protecitve Factors */}
              <ProtectiveTrans protective={assessment.protectiveFactors} />
              {/* Change Readiness */}
              <TreatmentTrans treatment={assessment.treatment} />
            </>
          )}
        </>
      )}
    </>
  )
}

export default Transcript
