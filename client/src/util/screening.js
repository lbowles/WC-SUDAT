/**
 * Skeleton object for the screening section of the questionnaire. Consists of subseqeunt sections 
 * and their questions.
 */

const screening = {
  information: {
    subText: `Introduction (Please read to client) Hi, I’m Luke nice to meet you. The following questions ask about your experience of using alcohol, tobacco products and
    other substances across your lifetime and in the past three months. These substances can be smoked, swallowed, snorted, inhaled or injected. Some of the substances listed may be prescribed by a doctor (like amphetamines, sedatives, pain medications). We also want to know more about your mental and emotional health. Lastly, we will be asking you questions about your family history and personal life experiences as it
    pertains to SUD’s. This information will help us in assisting you with providing any service/s and treatment that you might need.`,
    subText2: `While we are interested in knowing more about you, please be assured that information provided will be treated as strictly confidential.`,
  },
  sections: {
    interviewInfo: {
      name: 'Interview Information',
      questions: [
        {
          title: 'Interview Location',
          name: 'interviewLocation',
          placeholder: 'UCT',
          answer: '',
        },
      ],
    },
    patientInfo: {
      name: 'Patient Information',
      questions: [
        {
          title: 'First Name',
          name: 'firstName',
          placeholder: 'John',
          answer: '',
        },
        {
          title: 'Last Name',
          name: 'lastName',
          placeholder: 'Doe',
          answer: '',
        },
        {
          title: 'ID Number',
          name: 'IDNumber',
          placeholder: '0222933884428',
          answer: '',
        },
        { title: 'Age', name: 'age', placeholder: 21, answer: null },
        { title: 'Sex', name: 'sex', placeholder: 'Male', answer: '' },
        {
          title: 'Country Of Origin',
          name: 'countryOfOrigin',
          placeholder: 'South Africa',
          answer: '',
        },
        {
          title: 'Community or Place Of Residence',
          name: 'placeOfResidence',
          placeholder: 'The Haven Night Shelter',
          answer: '',
        },
        {
          title: 'Primary Language',
          name: 'primaryLang',
          placeholder: 'English',
          answer: '',
        },
        {
          title: 'Current Housing Situation',
          name: 'housingSituation',
          placeholder: 'Community Home',
          answer: '',
        },
        {
          title: 'Highest Level Education',
          name: 'highestLvlEducation',
          placeholder: 'High School',
          answer: '',
        },
        {
          title: 'Criminal Record',
          name: 'criminalRecord',
          placeholder: 'None',
          answer: '',
        },
      ],
      generalComment: '',
    },
    substanceUse: {
      name: 'Substance Use Quesitons',
      subText: `During the PAST 3 MONTHS, how often did the client
      do the following:`,
      subText2: `Put “0” if Never, “1” if Once or Twice, “2” if Monthly,
      “3” if Weekly & “4”is Daily or Almost Daily.`,
      sectionA: {
        questions: [
          {
            title:
              '1. Drink more than a few sips of beer, wine, or any drink containing alcohol?',
            name: 'SUA1',
            placeholder: 0,
            answer: 0,
          },
          {
            title:
              '2. Use any marijuana (weed, oil, wax, or hash by smoking, vaping, dabbing, or in food) or “synthetic marijuana” (like “K2,” “Spice”)? ',
            name: 'SUA2',
            placeholder: 0,
            answer: 0,
          },
          {
            title:
              '3. Use anything else to get high (like other illegal drugs, prescription or over-the-counter medications, and things that you sniff, huff, vape, or inject)? ',
            name: 'SUA3',
            placeholder: 0,
            answer: 0,
          },
          {
            title:
              '4. Use any tobacco or nicotine products (for example, cigarettes, e-cigarettes, hookahs or smokeless tobacco)? ',
            name: 'SUA4',
            placeholder: 0,
            answer: 0,
          },
        ],
      },
      sectionB: {
        questions: [
          {
            title:
              '5. Have you ever ridden in a CAR driven by someone (including yourself) who was “high” or had been using alcohol or drugs? ',
            name: 'SUB1',
            placeholder: 0,
            answer: false,
          },
          {
            title:
              '6. Do you ever use alcohol or drugs to RELAX, feel better about yourself, or fit in',
            name: 'SUB2',
            placeholder: 0,
            answer: 0,
          },
          {
            title:
              '7. Do you ever use alcohol or drugs while you are by yourself, or ALONE?',
            name: 'SUB3',
            placeholder: 0,
            answer: 0,
          },
          {
            title:
              '8. Do you ever FORGET things you did while using alcohol or drugs?  ',
            name: 'SUB4',
            placeholder: 0,
            answer: 0,
          },
          {
            title:
              '9. Do your FAMILY or FRIENDS ever tell you that you should cut down on your drinking or drug use?  ',
            name: 'SUB5',
            placeholder: 0,
            answer: 0,
          },
          {
            title:
              '10. Have you ever gotten into TROUBLE while you were using alcohol or drugs ',
            name: 'SUB6',
            placeholder: 0,
            answer: 0,
          },
        ],
      },
      generalComment: '',
      result: {
        value: 0,
        rangeText: 'Risk Of SUD (0-6)',
        lowRange: 0,
        highRange: 6,
        text: 'Two or more “Yes” answers suggest Risk for SUD’s',
        atRisk: false,
      },
    },
  },
  results: {
    title: 'Result',
    isAtRisk: {
      subText: 'The questionnaire suggests the patient is  at risk of SUD’s.',
      primaryBtnText: 'Continue To Assessment',
      secondaryBtnText: 'End Questionnaire',
    },
    isNotAtRisk: {
      subText:
        'The questionnaire suggests the patient is not at risk of SUD’s. There is an option to overide this and continue with the full assessment.',
      primaryBtnText: 'Overide To Assessment',
      secondaryBtnText: 'End Questionnaire',
    },
  },
}

export default screening
