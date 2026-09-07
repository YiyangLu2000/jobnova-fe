/**
 * Detail-only mock content, layered onto `rawJobs` / `companies` by `getJob`.
 * Kept separate from `fixtures.ts` so the list-view data stays lean.
 */

import type {
  BenefitItem,
  Company,
  CompanyProfile,
  EducationLevel,
  Job,
  JobDetail,
} from '@/features/job-board/types'

export type CompanyProfileExtras = Omit<CompanyProfile, keyof Company>
export type JobDetailExtras = Omit<JobDetail, keyof Job>

const QUALIFICATION_INTRO =
  'Discover how your skills align with the requirements of this position. ' +
  'Below is a detailed list of the essential skills needed for the role.'

const BENEFITS_INTRO =
  "We believe happy team members create amazing work. Here's what we offer " +
  'to make that happen:'

export const DEFAULT_BENEFITS: BenefitItem[] = [
  {
    icon: '🏡',
    label: 'Remote Flexibility',
    text: "Work from wherever you're most productive and happy.",
  },
  {
    icon: '📈',
    label: 'Equity Options',
    text: 'Become a shareholder through our stock options plan after 6 months.',
  },
  {
    icon: '🍽️',
    label: 'Meal Stipend',
    text: 'A $12/day meal stipend to make your lunch break even better.',
  },
  {
    icon: '🍝',
    label: 'Lunch at the Office',
    text: "If you're in the office, lunch is on us.",
  },
  {
    icon: '🩺',
    label: 'Health Coverage',
    text: 'Comprehensive medical, dental, and vision support for you and your family.',
  },
  {
    icon: '🎂',
    label: 'Birthday Bliss',
    text: 'Celebrate your day with an extra day off, just for you.',
  },
  {
    icon: '🧠',
    label: 'Mental Wellness',
    text: 'Free access to a psychological support platform whenever you need it.',
  },
  {
    icon: '🌍',
    label: 'International Environment',
    text: 'Grow your language skills while working with a diverse, global team.',
  },
]

export const companyProfiles: Record<string, CompanyProfileExtras> = {
  'co-google': {
    foundedYear: 1998,
    headquarters: 'Mountain View, California, US',
    employeeRange: '10,000+ employees',
    websiteUrl: 'https://careers.google.com',
    socials: {
      x: 'https://x.com/google',
      linkedin: 'https://www.linkedin.com/company/google',
    },
    about:
      "Google organizes the world's information and makes it universally " +
      'accessible and useful. Teams here build products used by billions, ' +
      'with an emphasis on scale, reliability, and thoughtful design.',
  },
  'co-cursor': {
    foundedYear: 2022,
    headquarters: 'San Francisco, California, US',
    employeeRange: '51–200 employees',
    websiteUrl: 'https://cursor.com',
    socials: {
      x: 'https://x.com/cursor_ai',
      linkedin: 'https://www.linkedin.com/company/anysphere',
    },
    about:
      'Cursor builds an AI-native code editor used by engineers at fast-moving ' +
      'companies. The team is small, senior, and ships quickly.',
  },
  'co-backd': {
    foundedYear: 2018,
    headquarters: 'Charlotte, North Carolina, US',
    employeeRange: '51–200 employees',
    websiteUrl: 'https://www.backd.com',
    socials: {
      linkedin: 'https://www.linkedin.com/company/backd',
    },
    about:
      'Backd Business Funding provides fast, flexible working capital to small ' +
      'and mid-sized businesses across the US.',
  },
  'co-simons': {
    foundedYear: 1994,
    headquarters: 'New York, New York, US',
    employeeRange: '501–1,000 employees',
    websiteUrl: 'https://www.simonsfoundation.org',
    socials: {
      x: 'https://x.com/simonsfdn',
      linkedin: 'https://www.linkedin.com/company/simons-foundation',
    },
    about:
      'The Simons Foundation advances research in mathematics and the basic ' +
      'sciences, and builds software and infrastructure for its research ' +
      'institutes.',
  },
}

type RoleFamily = 'software' | 'design' | 'data' | 'research'

const FAMILY_CONTENT: Record<
  RoleFamily,
  { required: string[]; preferred: string[]; responsibilities: string[] }
> = {
  software: {
    required: [
      '3+ years building and shipping production software',
      'Strong proficiency with a modern language and framework relevant to the role',
      "Experience writing tests and reviewing peers' code",
      'A track record of owning features from design through rollout',
    ],
    preferred: [
      'Experience operating services in production, including on-call',
      'Familiarity with CI/CD and infrastructure-as-code',
    ],
    responsibilities: [
      'Design, build, and ship features across the stack in close partnership with product and design',
      'Uphold code quality through reviews, tests, and clear technical documentation',
      'Investigate and resolve production issues, improving observability as you go',
      'Mentor teammates and contribute to team-wide engineering practices',
    ],
  },
  design: {
    required: [
      '3+ years of product design experience',
      '3+ years delivering design solutions as a UX or interaction designer',
      'An available online portfolio',
      'Experience prototyping in Figma or comparable tools',
    ],
    preferred: [
      '2+ years of mass-market consumer web / mobile product experience',
      'Experience working directly with engineers to implement designs',
    ],
    responsibilities: [
      'Own end-to-end product flows from research through polished, shippable interaction design',
      'Set and evolve UX guidelines and contribute to the shared design system',
      'Communicate design decisions clearly across varying levels of the organization',
      'Partner with product managers to turn research and data into opportunities',
    ],
  },
  data: {
    required: [
      '3+ years building data or ML systems in production',
      'Strong SQL and proficiency with Python',
      'Experience with a modern orchestration or pipeline framework',
      'Comfort reasoning about data quality, lineage, and cost',
    ],
    preferred: [
      'Experience with distributed compute (Spark, Ray, or similar)',
      'Exposure to MLOps: training infrastructure, evaluation, and rollout',
    ],
    responsibilities: [
      'Build and maintain the pipelines that turn raw data into query-ready, well-modeled tables',
      'Partner with analysts and scientists to make data trustworthy and discoverable',
      'Own data quality, monitoring, and incident response for your domain',
      'Improve the performance and cost efficiency of the data platform',
    ],
  },
  research: {
    required: [
      '5+ years turning research code into maintainable software',
      'Strong C++ and Python, with experience on HPC or numerical workloads',
      'Familiarity with parallel computing (MPI, OpenMP, or similar)',
      'Experience collaborating closely with domain scientists',
    ],
    preferred: [
      'Contributions to open-source scientific software',
      'Experience profiling and optimizing compute-bound code',
    ],
    responsibilities: [
      'Partner with computational scientists to turn prototypes into fast, reliable software',
      'Own performance, correctness, and reproducibility of core numerical libraries',
      'Maintain build and test infrastructure for code that runs on HPC clusters',
      'Document and support internal users of the tools you build',
    ],
  },
}

const QUALIFICATION_SKILLS: Record<RoleFamily, string[]> = {
  software: [
    'REST APIs',
    'Git',
    'Unit Testing',
    'CI/CD',
    'System Design',
    'Docker',
    'Agile',
    'Code Review',
  ],
  design: [
    'Figma',
    'Prototyping',
    'User Research',
    'Wireframing',
    'Design Systems',
    'Usability Testing',
    'Accessibility',
    'Interaction Design',
  ],
  data: [
    'SQL',
    'Python',
    'ETL',
    'Data Modeling',
    'Airflow',
    'Spark',
    'Data Warehousing',
    'Analytics',
  ],
  research: [
    'C++',
    'Python',
    'Numerical Methods',
    'MPI',
    'Linux',
    'Performance Profiling',
    'Scientific Computing',
    'Algorithms',
  ],
}

const FAMILY: Record<string, RoleFamily> = {
  'job-001': 'software',
  'job-002': 'software',
  'job-003': 'software',
  'job-004': 'software',
  'job-005': 'software',
  'job-006': 'design',
  'job-007': 'data',
  'job-008': 'data',
  'job-009': 'software',
  'job-010': 'software',
  'job-011': 'software',
  'job-012': 'research',
}

const MIN_EDUCATION: Record<string, EducationLevel> = {
  'job-001': 'bachelor',
  'job-002': 'bachelor',
  'job-003': 'bachelor',
  'job-004': 'bachelor',
  'job-005': 'bachelor',
  'job-006': 'bachelor',
  'job-007': 'master',
  'job-008': 'master',
  'job-009': 'high-school',
  'job-010': 'associate',
  'job-011': 'associate',
  'job-012': 'doctorate',
}

export const jobDetailExtras: Record<string, JobDetailExtras> =
  Object.fromEntries(
    Object.entries(FAMILY).map(([id, family]) => {
      const content = FAMILY_CONTENT[family]
      const extras: JobDetailExtras = {
        country: 'United States',
        minEducation: MIN_EDUCATION[id] ?? 'bachelor',
        qualificationIntro: QUALIFICATION_INTRO,
        qualificationSkills: [...QUALIFICATION_SKILLS[family]],
        requirements: {
          required: [...content.required],
          preferred: [...content.preferred],
        },
        responsibilities: [...content.responsibilities],
        benefitsIntro: BENEFITS_INTRO,
        benefits: DEFAULT_BENEFITS,
      }
      return [id, extras]
    }),
  )
