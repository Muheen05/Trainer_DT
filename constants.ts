import { RidePillar, ScoringCriteria, DecisionTree } from './types';

export const APP_NAME = "R.I.D.E. CX Framework";
export const TAGLINE = "Every Interaction is a Ride Experience.";

export const PILLARS: RidePillar[] = [
  {
    id: 'R',
    name: 'Reassure',
    meaning: 'Build immediate trust and emotional safety',
    purpose: 'Acknowledge emotion before solving the issue.',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    subParameters: [
      {
        id: 'r1',
        name: 'Emotional Acknowledgment',
        description: 'Recognize how the customer feels and validate it.',
        weight: 12.5,
        checklist: [
          'Read first 2-3 messages to sense tone.',
          'Quickly and naturally acknowledge emotion.',
          'Use validating phrases ("I understand how that must feel").'
        ],
        positiveIndicators: ['Calm tone', 'Steady language', 'Closure with reassurance'],
        negativeIndicators: ['Defensive', 'Irritated', 'Rushed tone']
      },
      {
        id: 'r2',
        name: 'Psychological Safety',
        description: 'Use calming, confident tone to assure resolution.',
        weight: 12.5,
        checklist: [
          'Assess if message restores calm.',
          'Check for assurance language ("I\'ve got this checked").',
          'Ensure tone is steady and professional.'
        ],
        positiveIndicators: ['"Rest assured"', '"You\'re in good hands"'],
        negativeIndicators: ['"If possible"', '"Can\'t promise"', '"As per policy"']
      }
    ]
  },
  {
    id: 'I',
    name: 'Identify',
    meaning: 'Understand the real issue clearly',
    purpose: 'Verify facts, don’t assume.',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    subParameters: [
      {
        id: 'i1',
        name: 'Problem Clarity',
        description: 'Restate issue accurately to confirm understanding.',
        weight: 12.5,
        checklist: [
          'Did agent restate in their own words?',
          'Understood context, not just symptom?',
          'Confirmed understanding before action?'
        ],
        positiveIndicators: ['"Just to clarify..."', '"So you\'re saying..."'],
        negativeIndicators: ['Focuses on problem or blame', 'Assumptions']
      },
      {
        id: 'i2',
        name: 'Diagnostic Ownership',
        description: 'Verify information before replying; avoid guesswork.',
        weight: 12.5,
        checklist: [
          'Validate claim using system data/policy.',
          'Avoid assumptions.',
          'Take accountability to check further if data unclear.'
        ],
        positiveIndicators: ['Evidence-based phrasing', 'Data validation'],
        negativeIndicators: ['"We\'ll see"', '"I\'ll try to check"', 'Guesswork']
      }
    ]
  },
  {
    id: 'D',
    name: 'Deliver',
    meaning: 'Resolve with accuracy, clarity, and accountability',
    purpose: 'Provide complete solutions and timelines.',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    subParameters: [
      {
        id: 'd1',
        name: 'Solution Accuracy',
        description: 'Ensure resolution aligns with SOP and customer context.',
        weight: 12.5,
        checklist: [
          'Info/action correct per SOP?',
          'Solution relevant to specific query?',
          'Resolution completely closes the issue?'
        ],
        positiveIndicators: ['Complete resolution', 'Context aware'],
        negativeIndicators: ['Contradictory statements', 'Misleading info']
      },
      {
        id: 'd2',
        name: 'Assurance & Timeliness',
        description: 'Provide clear timelines and next steps for resolution.',
        weight: 12.5,
        checklist: [
          'Clearly state next step.',
          'Specify realistic timeline (TAT).',
          'Reassure customer of follow-up.'
        ],
        positiveIndicators: ['"Within 2 hours"', '"By tomorrow"', '"I\'ll ensure..."'],
        negativeIndicators: ['"Soon"', '"Shortly"', 'Vague timelines']
      }
    ]
  },
  {
    id: 'E',
    name: 'Elevate',
    meaning: 'End on a positive, human note',
    purpose: 'Reinforces trust and loyalty.',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    subParameters: [
      {
        id: 'e1',
        name: 'Human Closure',
        description: 'End with gratitude, warmth, and empathy.',
        weight: 12.5,
        checklist: [
          'Thank/acknowledge customer time.',
          'Close loop warmly, not abruptly.',
          'Sincere and human tone.'
        ],
        positiveIndicators: ['Gratitude', 'Warmth', 'Empathy'],
        negativeIndicators: ['Robotic', 'Templated', 'Abrupt']
      },
      {
        id: 'e2',
        name: 'Follow-Through Commitment',
        description: 'Show ongoing ownership or prevention actions.',
        weight: 12.5,
        checklist: [
          'Indicate ownership beyond this reply.',
          'Mention preventive/corrective action.',
          'Avoid passing the buck.'
        ],
        positiveIndicators: ['"I\'ll monitor"', '"I\'ve escalated and will confirm"'],
        negativeIndicators: ['"Someone else will do it"', 'Deflection']
      }
    ]
  }
];

export const SCORING_LEGEND: ScoringCriteria[] = [
  {
    score: 5,
    label: 'Excellent / Model Behavior',
    description: 'Fully meets R.I.D.E. standards with empathy, ownership, and clarity.',
    genericExample: 'Personalized gratitude, explicit prevention/monitoring, "Gold Ride Experience".'
  },
  {
    score: 4,
    label: 'Strong Application',
    description: 'Meets all key expectations; minor improvements possible.',
    genericExample: 'Accurate and polite, but perhaps slightly less warm or proactive than a 5.'
  },
  {
    score: 3,
    label: 'Meets Minimum Expectation',
    description: 'Solved issue, but tone or closure lacked empathy.',
    genericExample: 'Generic timeline, robotic closure, assumes facts without restating.'
  },
  {
    score: 2,
    label: 'Needs Improvement',
    description: 'Missed empathy or unclear explanation.',
    genericExample: 'Partial verification, vague assumptions, handing off without ownership.'
  },
  {
    score: 1,
    label: 'Poor / No Application',
    description: 'Robotic or incorrect, no empathy or ownership.',
    genericExample: 'Rude, abrupt, incorrect information, total mismatch of issue.'
  }
];

// Decision Trees based on "Decision Rules for Choosing the Right Score" pages
export const DECISION_TREES: Record<string, DecisionTree> = {
  // Reassure - Emotional Ack & Psych Safety (Combining logic for simplicity in demo)
  'r1': {
    subParameterId: 'r1',
    startNodeId: 'start',
    nodes: {
      'start': {
        id: 'start',
        question: 'Did the agent acknowledge the customer\'s emotion?',
        yesNext: 'check_timing',
        noNext: 'is_rude'
      },
      'check_timing': {
        id: 'check_timing',
        question: 'Was the acknowledgment early in the conversation and natural?',
        yesNext: 'check_calming',
        noNext: 'score_4'
      },
      'check_calming': {
        id: 'check_calming',
        question: 'Did the response go beyond confidence to actually emotionally calm the customer?',
        yesNext: 'score_5',
        noNext: 'score_4'
      },
      'is_rude': {
        id: 'is_rude',
        question: 'Was the tone rude, robotic, or dismissive?',
        yesNext: 'score_1',
        noNext: 'score_2' // Just missing empathy
      },
      'score_5': { id: 'score_5', question: '', outcomeScore: 5, outcomeText: 'Excellent: Genuine, early empathy that calms the customer.' },
      'score_4': { id: 'score_4', question: '', outcomeScore: 4, outcomeText: 'Strong: Consistent tone, but maybe not deep emotional connection.' },
      'score_2': { id: 'score_2', question: '', outcomeScore: 2, outcomeText: 'Needs Improvement: Flat or unsure tone.' },
      'score_1': { id: 'score_1', question: '', outcomeScore: 1, outcomeText: 'Poor: Creates tension or fear.' },
    }
  },
  // Identify - Problem Clarity
  'i1': {
    subParameterId: 'i1',
    startNodeId: 'start',
    nodes: {
      'start': {
        id: 'start',
        question: 'Did the agent restate or paraphrase the customer\'s issue?',
        yesNext: 'check_confirm',
        noNext: 'check_alignment'
      },
      'check_confirm': {
        id: 'check_confirm',
        question: 'Did the agent explicitly confirm this understanding with the customer?',
        yesNext: 'score_5',
        noNext: 'score_4'
      },
      'check_alignment': {
        id: 'check_alignment',
        question: 'Did the agent assume the issue without restating?',
        yesNext: 'score_3',
        noNext: 'check_relevance'
      },
      'check_relevance': {
        id: 'check_relevance',
        question: 'Was the response even relevant to the issue?',
        yesNext: 'score_2', // Misaligned
        noNext: 'score_1' // No relevant connection
      },
      'score_5': { id: 'score_5', question: '', outcomeScore: 5, outcomeText: 'Excellent: Confirmed full understanding.' },
      'score_4': { id: 'score_4', question: '', outcomeScore: 4, outcomeText: 'Strong: Restated accurately but didn\'t explicit confirm.' },
      'score_3': { id: 'score_3', question: '', outcomeScore: 3, outcomeText: 'Satisfactory: Assumed correctly, but risk of error exists.' },
      'score_2': { id: 'score_2', question: '', outcomeScore: 2, outcomeText: 'Needs Improvement: Misaligned response.' },
      'score_1': { id: 'score_1', question: '', outcomeScore: 1, outcomeText: 'Poor: Total mismatch.' },
    }
  },
  // Deliver - Accuracy
  'd1': {
    subParameterId: 'd1',
    startNodeId: 'start',
    nodes: {
      'start': {
        id: 'start',
        question: 'Was the resolution factually correct according to SOP?',
        yesNext: 'check_completeness',
        noNext: 'check_misleading'
      },
      'check_completeness': {
        id: 'check_completeness',
        question: 'Was the resolution complete and tailored to the context?',
        yesNext: 'score_5',
        noNext: 'check_generic'
      },
      'check_generic': {
        id: 'check_generic',
        question: 'Was it a minor omission or just vague/generic?',
        yesNext: 'score_4', // Minor omission
        noNext: 'score_3' // Generic
      },
      'check_misleading': {
        id: 'check_misleading',
        question: 'Was the information explicitly wrong or misleading?',
        yesNext: 'score_1',
        noNext: 'score_2' // Inaccurate but maybe not malicious
      },
      'score_5': { id: 'score_5', question: '', outcomeScore: 5, outcomeText: 'Excellent: Complete, contextual, and accurate.' },
      'score_4': { id: 'score_4', question: '', outcomeScore: 4, outcomeText: 'Strong: Tailored but minor omission.' },
      'score_3': { id: 'score_3', question: '', outcomeScore: 3, outcomeText: 'Satisfactory: Generic resolution.' },
      'score_2': { id: 'score_2', question: '', outcomeScore: 2, outcomeText: 'Needs Improvement: Inaccurate.' },
      'score_1': { id: 'score_1', question: '', outcomeScore: 1, outcomeText: 'Poor: Misleading or total misunderstanding.' },
    }
  },
    // Elevate - Ownership
    'e2': {
      subParameterId: 'e2',
      startNodeId: 'start',
      nodes: {
        'start': {
          id: 'start',
          question: 'Did the agent demonstrate ownership of the problem?',
          yesNext: 'check_prevention',
          noNext: 'check_handoff'
        },
        'check_prevention': {
          id: 'check_prevention',
          question: 'Did they explicitly show prevention steps or follow-up monitoring?',
          yesNext: 'score_5',
          noNext: 'score_4'
        },
        'check_handoff': {
          id: 'check_handoff',
          question: 'Did they mention a next step at all?',
          yesNext: 'score_3',
          noNext: 'check_deflection'
        },
        'check_deflection': {
          id: 'check_deflection',
          question: 'Did they explicitly pass the buck or deflect blame?',
          yesNext: 'score_1',
          noNext: 'score_2' // Hand-off/Passive
        },
        'score_5': { id: 'score_5', question: '', outcomeScore: 5, outcomeText: 'Excellent: Explicit prevention and monitoring.' },
        'score_4': { id: 'score_4', question: '', outcomeScore: 4, outcomeText: 'Strong: Accurate next steps mentioned.' },
        'score_3': { id: 'score_3', question: '', outcomeScore: 3, outcomeText: 'Satisfactory: Basic next step mentioned.' },
        'score_2': { id: 'score_2', question: '', outcomeScore: 2, outcomeText: 'Needs Improvement: Passive hand-off.' },
        'score_1': { id: 'score_1', question: '', outcomeScore: 1, outcomeText: 'Poor: Deflection or blame.' },
      }
    }
};