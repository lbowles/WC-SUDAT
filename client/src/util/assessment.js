// Assessment skeleton object
/**
 * Assessment skeleton object. It consists of nested objects for the Assessment part of the questionnaire and its
 * subsequent subsections and their questions.
 */

const assessment = {
  sections: {
    individualRisks: {
      name: 'Individual Risks',
      riskOfSelfHarm: {
        name: 'Risk of Self Harm',
        questions: [
          {
            title: '1. In the past few weeks, have you wished you were dead?',
            name: 'isSuicidal',
            answer: false,
          },
          {
            title:
              '2. In the past few weeks, have you felt that you or your family would be better off you were dead?',
            name: 'isFeelBetterOffDeadBecauseFamily',
            answer: false,
          },
          {
            title:
              '3. In the past week, have you been having thoughts about killing yourself?',
            name: 'isSuicidalThoughts',
            answer: false,
            subQuestions: [
              {
                title: '3.1 Do you have a plan for taking your own life?',
                name: 'hasSuicidePlan',
                answer: '',
              },
              {
                title: '3.2 Do you have the means of taking your life? ',
                name: 'hasSuicideMeans',
                answer: '',
              },
            ],
          },
          {
            title:
              '4. In the past few weeks have you noticed a significant increase in your substance use? ',
            name: 'increaseSubUse',
            answer: false,
            subQuestions: [
              {
                title:
                  '4.1 Did you find yourself engaging in potentially harmful situations?',
                name: '4.2 isInHarmfulSituations',
                answer: '',
              },
              {
                title:
                  '4.3 Did you find yourself engaging in potentially harmful behaviors? ',
                name: 'isInHarmfulBehaviors',
                answer: '',
              },
            ],
          },
          {
            title: '5. Have you ever tried to kill yourself? ',
            name: 'haveAttemptSuicide',
            answer: false,
            subQuestions: [
              {
                title: '5.1 How',
                name: 'ihaveAttemptSuicideHow',
                answer: '',
              },
              {
                title: '5.2 Where',
                name: 'ihaveAttemptSuicideWhere',
                answer: '',
              },
              {
                title: '5.3 When',
                name: 'ihaveAttemptSuicideWhen',
                answer: '',
              },
            ],
          },
          {
            title: '6. Would you say that you able to take care of yourself?',
            name: 'canTakeCare',
            answer: false,
          },
        ],
        generalComment: '',
        result: {
          value: 0,
          rangeText: 'Risk Of Self Harm (0-6)',
          lowRange: 0,
          highRange: 6,
          text: [
            '0 = Low risk of harm: No indication of suicidal thoughts or impulses, no history of suicidalideation, and no indication of significant distress. Clear ability to care for self now and inthe past',
            '1 – 3 = Moderate risk of harm: Significant current suicidal ideation without intent or conscious plan and without history. No active suicidal ideation, but extreme distress and/or a history of suicidal/homicidal behaviour exists. Some evidence of self-neglect and/or compromise in ability to care for oneself in current environment',
            '4 – 6 = Serious risk of harm: Current suicidal ideation with expressed intentions and/or past history of carrying out such behaviour but without means for carrying out the behaviour, or with some expressed inability or aversion to doing so, or with ability to contract for safety. Recent pattern of excessive substance use resulting in disinhibition and clearly harmful behaviors with no demonstrated ability to abstain from use. Clear compromise of ability to care adequately for oneself or to be aware adequately of environment',
          ],
          selectedText: null,
        },
      },
      trauma: {
        name: 'Trauma',
        questions: [
          {
            title:
              '1. Have you ever in your lifetime experienced anything that has been especially horrific, frightening or traumatic?',
            name: 'experiencedTrauma',
            answer: false,
          },
          {
            title:
              '2. Was the experience so horrific, frightening or upsetting that in the past 30 days you had nightmares about it or thought about it when you did not want to?',
            name: 'experiencedNightmares',
            answer: false,
          },
          {
            title:
              '3. Was the experience so horrific, frightening or upsetting that in the past 30 days you tried not to think about it or went out of your way to avoid situations that remind you of your experience?',
            name: 'experiencedUpsetting',
            answer: false,
          },
          {
            title:
              '4. Was the experience so horrific, frightening or upsetting that in the past 30 days you were constantly on guard, watchful or easily startled?',
            name: 'experiencedOnEdge',
            answer: false,
          },
          {
            title:
              '5. Was the experience so horrific, frightening or upsetting that in the past 30 days you felt numb or detached from others, activities, or your surroundings related to your experience',
            name: 'experiencedOnDetached',
            answer: false,
          },
        ],
        generalComment: '',
        result: {
          value: null,
          rangeText: 'Risk Of Truama (0-5)',
          lowRange: 0,
          highRange: 5,
          text: [
            '0 - 1 = Some Trauma',
            '2– 3 = Mild to Moderrate Trauma',
            '4 - 5 = Severe Trauma',
          ],
          selectedText: null,
        },
      },
      depressionAnxiety: {
        name: 'Depression and Anxiety',
        sectionA: {
          subtext1: '1 = Yes, this describes me exactly',
          subtext2: '2 = Somewhat describes me',
          subtext3: '3 = Doesn’t describe me at all',
          questions: [
            { title: '1. I like who I am', name: 'likeWhoIAm', answer: 0 },
            {
              title: '2. I am not an easy person to get along with.',
              name: 'personGetAlongWith',
              answer: 0,
            },
            {
              title: '3. I give up too easily.',
              name: 'giveUpTooEasy',
              answer: 0,
            },
            {
              title: '4. I have difficulty concentrating. ',
              name: 'difficultyConcentrating',
              answer: 0,
            },
            {
              title: '5. I am happy with my family relationships. ',
              name: 'happyWithFamily',
              answer: 0,
            },
            {
              title: '6. I am comfortable being around others. ',
              name: 'comfortableBeingAroundOthers',
              answer: 0,
            },
          ],
        },
        sectionB: {
          subtext1: '1 = None',
          subtext2: '2 = Some',
          subtext3: '3 = A lot',
          questions: [
            {
              title:
                '7. During the past week, how much trouble have you had with sleeping?',
              name: 'sleepTrouble',
              answer: 0,
            },
            {
              title:
                '8. During the past week, how much trouble have you had with getting tired easily?',
              name: 'tiredTrouble',
              answer: 0,
            },
            {
              title:
                '9. During the past week, how much trouble have you had with feeling depressed or sad?',
              name: 'howSad',
              answer: 0,
            },
            {
              title:
                '10. During the past week, how much trouble have you had with feeling nervous or anxious?',
              name: 'anxiousTrouble',
              answer: 0,
            },
            {
              title:
                '11. During the past week, how often did you socialise with others (talk with, visit with friends and relatives)?',
              name: 'amountSolialise',
              answer: 0,
            },
            {
              title:
                '12. During the past week, how often did you take part in social, religious and recreational activities (sports, meetings, religious meetings & parties)?',
              name: 'amountActivities',
              answer: 0,
            },
          ],
        },
        generalComment: '',
      },
    },
    familyCommunity: {
      name: 'Family & Community Risk Factors',
      subtext1:
        'Family & Community Risk Factors are aspects of a person (or group) and environment and life experiences that make it more likely (risk factors) that people will develop a given SUD problem or achieve an undesirable outcome.',
      subtext2:
        'Following each quesiton ask on a scale of 1 – 6 where 1 = I Strongly Disagree and 6 = I Strongly Agree, how would you rate your choice to use or abuse substances being influenced by the above?',
      familyPeer: {
        name: 'Family & Peer Risk Factors',
        questions: [
          {
            title:
              '1. Does your family have a history of substance use or abuse?',
            name: 'familySUDHistory',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '2. Would you say that your parents have favourable attitudes towards substance use or abuse?',
            name: 'parentsFavourableAttitudesSUD',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '3. Would you say that growing up your parents monitored your behaviour poorly?',
            name: 'parentsPoorlyMonitored',
            answerBool: false,
            answer: null,
          },
          {
            title: '4. Do your parents have a history of substance use?',
            name: 'parentsSUDHistory',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '5. Did you ever feel rejected by your family for your sexual orientation or gender identity?',
            name: 'familyRejectedSecualOrientation',
            answerBool: false,
            answer: null,
          },
          {
            title: '6. Did you ever associate with substance using peers?',
            name: 'associatedWithSUDPeers',
            answerBool: false,
            answer: null,
          },
        ],
        generalComment: '',
      },
      school: {
        name: 'School Risk Factors',
        questions: [
          {
            title:
              '1. Growing up did you ever feel a lack of school connectedness? (Belief held by learners that adults and peers in the school care about their learning as well as about them as individuals)?',
            name: 'lackSchoolConnectedness',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '2. Would you describe your overall academic achievement as low?',
            name: 'lowAcademics',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '3. Did you ever drop out of school, leave or stay away from school for extended periods of time?',
            name: 'dropOutSchool',
            answerBool: false,
            answer: null,
          },
        ],
        generalComment: '',
      },
      community: {
        name: 'Community Risk Factors',
        questions: [
          {
            title:
              '1. Is your community characterised by low sense of belonging where it feels like people don’t care about others?',
            name: 'communityLowSenseBelonging',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '2. Would you say that drugs & alcohol are freely available and easy to get in your community?',
            name: 'communityDrugUse',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '3. Would you say that your community is marked by high levels of violence, poverty and unemployment?',
            name: 'communityUnemployment',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '4. Would you say that your community have norms and laws that are favourable toward drug use, firearms, and crime?',
            name: 'communityDrugUseFirearmsCrime',
            answerBool: false,
            answer: null,
          },
        ],
        generalComment: '',
      },
    },
    protectiveFactors: {
      name: "Protective Factors For SUD's",
      subtext1:
        'Protective factors are conditions or attributes (skills, strengths, resources, supports or coping strategies) in individuals, families, communities or the larger society that help people deal more effectively with stressful events and mitigate or eliminate risk in families and communities.',
      subtext2:
        'Following each quesiton ask on a scale of 1 – 6 where 1 = I Strongly Disagree and 6 = I Strongly Agree, how would you rate your choice to use or abuse substances being influenced by the above?',
      familyProtective: {
        name: 'Family Protective Factors',
        questions: [
          {
            title:
              '1. Growing up did you feel that your parent/s or family were involved with you showing an interest in your well-being?',
            name: 'familyInterestWellBeing',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '2. Growing up did you feel that to your parent/s and family supported healthy attitudes, behaviors, and a positive living environment?',
            name: 'familySupoortHealthyAttitudes',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '3. Growing up did you feel that your parent/s showed disapproval for substance use?',
            name: 'familyDisapprovalSUD',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '4. Growing up did you feel that your parent/s helped you to build trusting relationships with others to talk about sensitive issues such as sexual and mental health, substance use, and safety from bullying?',
            name: 'familyTrustRelationships',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '5. Growing up did you feel that your parent/s used effective monitoring practices to help you make healthy decisions and avoid risky behaviors? (For example, unprotected sex, underage drinking and smoking)?',
            name: 'familyEncourageHealthyDecisions',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '6. Do you mostly associate with positive peers and friends?',
            name: 'familyPositivePeers',
            answerBool: false,
            answer: null,
          },
        ],
        generalComment: '',
      },
      communityProtective: {
        name: 'Community Protective Factors',
        questions: [
          {
            title: '1. Would you describe your community as safe?',
            name: 'isAreaSafe',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '2. Do you feel that people in your community and neighbourhood are supportive and connected to each other?',
            name: 'communitySupportive',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '3. Do you feel that there are a range of opportunities in the community for meaningful youth engagement?',
            name: 'communityOpportunitiesYouthEngagement',
            answerBool: false,
            answer: null,
          },
          {
            title:
              '4. Do you think that there are policies and practices in your community that support healthy norms and lifestyle choices?',
            name: 'communitySupportiveCulture',
            answerBool: false,
            answer: null,
          },
        ],
      },
    },
    treatment: {
      name: 'Stages Of Change Readiness & Treatment Eagerness Scale',
      subtext1:
        'Please listen to the following statements carefully. Each one describes a way that you might (or might not) feel about your substance/alcohol use. For each statement, circle one number from 1 to 5, to indicate how much you agree or disagree with it right now. Please circle one and only one number for every statement.',
      subtext2:
        '1 = No! Strongly Disagree. 2 = No Disagree. 3 = Undecided or Unsure. 4 = Yes Agree. 5 = YES! Strongly Agree.',
      treatment: {
        questions: [
          {
            title:
              '1. I really want to make changes in my use of drugs/alcohol.',
            name: 'makeChangesSUD',
            answer: null,
          },
          {
            title: '2. Sometimes I wonder if I am an addict.',
            name: 'wonderIfAddict',
            answer: null,
          },
          {
            title:
              "3. If I don't change my drug/alcohol use soon, my problems are going to get worse.",
            name: 'ifDontChangeSUDGetWorse',
            answer: null,
          },
          {
            title:
              '4. I have already started making some changes in my use of drugs/alcohol.',
            name: 'startedMakingChanges',
            answer: null,
          },
          {
            title:
              "5. I was using drugs/alcohol too much at one time, but I've managed to change that.",
            name: 'changeUsingTooMuchDrugsAtTime',
            answer: null,
          },
          {
            title:
              '6. Sometimes I wonder if my drug/alcohol use is hurting other people.',
            name: 'SUDHurtingOthers',
            answer: null,
          },
          {
            title: '7. I have a drug/alcohol problem.',
            name: 'iHaveSUDProblem',
            answer: null,
          },
          {
            title:
              "8. I'm not just thinking about changing my drug/alcohol use, I'm already doing something about it.",
            name: 'startedMakingCHangesNotJustThinking',
            answer: null,
          },
          {
            title:
              '9. I have already changed my drug/alcohol use, and I am looking for ways to keep from slipping back to my old pattern.',
            name: 'preventingSlippingBackToOldPattern',
            answer: null,
          },
          {
            title: '10. I have serious problems with drugs/alcohol.',
            name: 'iHaveSeriousSUDProblems',
            answer: null,
          },
          {
            title:
              '11. Sometimes I wonder if I am in control of my drug/alcohol use.',
            name: 'questionIfInControlOfSUD',
            answer: null,
          },
          {
            title: '12. My drug/alcohol use is causing a lot of harm.',
            name: 'SUDCausingALotHarm',
            answer: null,
          },
          {
            title:
              '13. I am actively doing things now to cut down or stop my use of drugs/alcohol.',
            name: 'activelyDoingThingsToCutDownSUD',
            answer: null,
          },
          {
            title:
              '14. I want help to keep from going back to the drug/alcohol problems that I had before.',
            name: 'needHelpTreatSUD',
            answer: null,
          },
          {
            title: '15. I know that I have a drug/alcohol problem.',
            name: 'iKnowHaveSUDProblem',
            answer: null,
          },
          {
            title:
              '16. There are times when I wonder if I use drugs/alcohol too much.',
            name: 'timesWonderIfUseTooMuchDrugs',
            answer: null,
          },
          {
            title: '17. I am a drug/alcohol addict.',
            name: 'iAmAddict',
            answer: null,
          },
          {
            title: '18. I am working hard to change my drug/alcohol use.',
            name: 'workingHardChangeSUD',
            answer: null,
          },
          {
            title:
              '19. I have made some changes in my drug/alcohol use, and I want some help to keep from going back to the way I used before.',
            name: 'madeChangesPreventGoingBackToHowUsedBefore',
            answer: null,
          },
        ],
        generalComment: '',
        result: {
          totalRecognition: {
            value: null,
            rangeText: 'Total Recognition Results (7-35)',
            lowRange: 7,
            highRange: 35,
            text: [
              'HIGH scorers directly acknowledge that they arehaving problems related to their using/drinking, tending to express a desire for change and to perceive that harm will continue if they do not change.',
              'LOW scorers deny that using/alcohol is causing them serious problems, reject diagnostic labels such as “problem drinker or user” and “alcoholic or addict” and do not express a desire for change',
            ],
            selectedText: null,
          },
          totalAmbivalence: {
            value: null,
            rangeText: 'Total Ambivalence Results (4-20)',
            lowRange: 4,
            highRange: 20,
            text: [
              'HIGH scorers say that they sometimes wonder if they are in control of their using/drinking, are using/drinking too much, are hurting other people, and/or are addicted/alcoholic. Thus, a high score reflects ambivalence or uncertainty. A high score here reflects some openness to reflection, as might be particularly expected in the contemplation stage of change.',
              'LOW scorers say that they do not wonder whether they use/drink too much, are in control, are hurting others, or are addicted/alcoholic. Note that a person may score low on ambivalence either because they “know” their using/drinking is causing problems (high Recognition), or because they “know” that they do not have drinking problems (low Recognition). Thus, a low Ambivalence score should be interpreted in relation to the Recognition score.',
            ],
            selectedText: null,
          },
          totalTakingSteps: {
            value: null,
            rangeText: 'Total Taking Steps Results (8-40)',
            lowRange: 8,
            highRange: 40,
            text: [
              'HIGH scorers report that they are already doing things to make a positive change in their using/drinking and may have experienced some success in this regard. Change is underway, and they may want help to persist or to prevent backsliding. A high score on this scale has been found to be predictive',
              'LOW scorers report that they are not currently doing things to change their using/drinking and have not made such changes recently',
            ],
            selectedText: null,
          },
        },
      },
    },
  },
}

export default assessment
