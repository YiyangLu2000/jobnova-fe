/**
 * Mock data for the job-board feature.
 *
 * Jobs are stored without a `matchScore` (see `RawJob`); the api layer attaches
 * one against the active reference job. Only four companies appear, reused
 * across listings; their logos are static files under `public/logos/`.
 */

import type { Company, Job, ReferenceJob } from '@/features/job-board/types'

/** A job fixture before the api layer attaches a match score. */
export type RawJob = Omit<Job, 'matchScore'>

export const companies = {
  google: {
    id: 'co-google',
    name: 'Google',
    logoUrl: '/logos/google.svg',
  },
  cursor: {
    id: 'co-cursor',
    name: 'Cursor',
    logoUrl: '/logos/cursor.svg',
  },
  backd: {
    id: 'co-backd',
    name: 'Backd Business Funding',
    logoUrl: '/logos/backd.svg',
  },
  simons: {
    id: 'co-simons',
    name: 'Simons Foundation',
    logoUrl: '/logos/simons.svg',
  },
} satisfies Record<string, Company>

export const referenceJobs: ReferenceJob[] = [
  {
    id: 'ref-frontend',
    title: 'Senior Frontend Engineer',
    skills: [
      'React',
      'TypeScript',
      'CSS',
      'Accessibility',
      'GraphQL',
      'Design Systems',
    ],
    seniority: 'senior',
    experienceYears: 5,
  },
  {
    id: 'ref-fullstack',
    title: 'Full-Stack Engineer',
    skills: [
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'AWS',
      'REST APIs',
    ],
    seniority: 'mid',
    experienceYears: 4,
  },
  {
    id: 'ref-designer',
    title: 'Product Designer',
    skills: [
      'Figma',
      'User Research',
      'Prototyping',
      'Interaction Design',
      'Design Systems',
      'Usability Testing',
    ],
    seniority: 'mid',
    experienceYears: 4,
  },
]

export const rawJobs: RawJob[] = [
  {
    id: 'job-001',
    title: 'Web Application Developer',
    company: companies.google,
    location: 'Austin, Texas Metropolitan Area',
    workArrangement: 'on-site',
    employmentType: 'full-time',
    seniority: 'mid',
    experienceYears: 3,
    salary: { min: 110000, max: 150000, currency: 'USD', period: 'year' },
    skills: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'CSS'],
    postedAt: '2026-09-06T12:00:00.000Z',
    applicantCount: 25,
    description:
      'Build and ship customer-facing web applications across the full ' +
      'front-end stack, partnering closely with design and platform teams to ' +
      'deliver fast, accessible experiences.',
  },
  {
    id: 'job-002',
    title: 'Software Engineer, Network Infrastructure',
    company: companies.cursor,
    location: 'Sunnyvale, CA',
    workArrangement: 'on-site',
    employmentType: 'full-time',
    seniority: 'mid',
    experienceYears: 5,
    salary: { min: 161000, max: 239000, currency: 'USD', period: 'year' },
    skills: [
      'Go',
      'Kubernetes',
      'Linux',
      'Networking',
      'gRPC',
      'Distributed Systems',
    ],
    postedAt: '2026-09-06T09:00:00.000Z',
    applicantCount: 25,
    description:
      'Design and operate the network control plane that connects our ' +
      'inference fleet, focusing on throughput, isolation, and reliability at ' +
      'scale.',
  },
  {
    id: 'job-003',
    title: 'Full-Stack Software Engineer (Web Developer)',
    company: companies.simons,
    location: 'New York, NY',
    workArrangement: 'hybrid',
    employmentType: 'full-time',
    seniority: 'senior',
    experienceYears: 5,
    salary: { min: 125000, max: 140000, currency: 'USD', period: 'year' },
    skills: ['React', 'TypeScript', 'Python', 'PostgreSQL', 'GraphQL', 'AWS'],
    postedAt: '2026-09-05T15:00:00.000Z',
    applicantCount: 41,
    description:
      'Own web tools used by research scientists end to end, from the React ' +
      'front end through the Python services and data stores behind them.',
  },
  {
    id: 'job-004',
    title: 'Frontend Engineer, Design Systems',
    company: companies.cursor,
    location: 'Remote (US)',
    workArrangement: 'remote',
    employmentType: 'full-time',
    seniority: 'mid',
    experienceYears: 4,
    salary: { min: 140000, max: 180000, currency: 'USD', period: 'year' },
    skills: [
      'React',
      'TypeScript',
      'Storybook',
      'Accessibility',
      'CSS',
      'Design Systems',
    ],
    postedAt: '2026-09-04T10:00:00.000Z',
    applicantCount: 63,
    description:
      'Grow our component library and design tokens so every product team ' +
      'ships consistent, accessible UI without reinventing the basics.',
  },
  {
    id: 'job-005',
    title: 'Senior Backend Engineer',
    company: companies.backd,
    location: 'Charlotte, NC',
    workArrangement: 'hybrid',
    employmentType: 'full-time',
    seniority: 'senior',
    experienceYears: 8,
    salary: { min: 150000, max: 185000, currency: 'USD', period: 'year' },
    skills: [
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'Kafka',
      'AWS',
      'Microservices',
    ],
    postedAt: '2026-09-02T08:00:00.000Z',
    applicantCount: 18,
    description:
      'Lead the services that power our lending decisions and disbursements, ' +
      'setting the bar for correctness, observability, and on-call health.',
  },
  {
    id: 'job-006',
    title: 'Product Designer (UX)',
    company: companies.google,
    location: 'Mountain View, CA',
    workArrangement: 'hybrid',
    employmentType: 'full-time',
    seniority: 'mid',
    experienceYears: 4,
    salary: { min: 130000, max: 170000, currency: 'USD', period: 'year' },
    skills: [
      'Figma',
      'User Research',
      'Prototyping',
      'Interaction Design',
      'Design Systems',
    ],
    postedAt: '2026-09-01T13:00:00.000Z',
    applicantCount: 52,
    description:
      'Shape end-to-end product flows for a consumer surface used by ' +
      'millions, from early research through polished, shippable interaction ' +
      'design.',
  },
  {
    id: 'job-007',
    title: 'Data Engineer',
    company: companies.simons,
    location: 'New York, NY',
    workArrangement: 'on-site',
    employmentType: 'full-time',
    seniority: 'mid',
    experienceYears: 3,
    salary: { min: 120000, max: 155000, currency: 'USD', period: 'year' },
    skills: ['Python', 'SQL', 'Airflow', 'Spark', 'dbt', 'AWS'],
    postedAt: '2026-08-30T09:00:00.000Z',
    applicantCount: 29,
    description:
      'Build the pipelines that turn large scientific datasets into ' +
      'well-modeled, query-ready tables for research teams.',
  },
  {
    id: 'job-008',
    title: 'Machine Learning Engineer',
    company: companies.google,
    location: 'Remote (US)',
    workArrangement: 'remote',
    employmentType: 'full-time',
    seniority: 'senior',
    experienceYears: 6,
    salary: { min: 180000, max: 250000, currency: 'USD', period: 'year' },
    skills: ['Python', 'PyTorch', 'TensorFlow', 'MLOps', 'Kubernetes', 'NLP'],
    postedAt: '2026-08-28T16:00:00.000Z',
    applicantCount: 74,
    description:
      'Take models from research notebooks to production services, owning ' +
      'training infrastructure, evaluation, and rollout.',
  },
  {
    id: 'job-009',
    title: 'Software Engineering Intern',
    company: companies.cursor,
    location: 'San Francisco, CA',
    workArrangement: 'on-site',
    employmentType: 'internship',
    seniority: 'intern',
    experienceYears: null,
    salary: { min: 45, max: 55, currency: 'USD', period: 'hour' },
    skills: ['JavaScript', 'React', 'Git', 'Data Structures'],
    postedAt: '2026-08-25T11:00:00.000Z',
    applicantCount: 118,
    description:
      'Spend a summer shipping real features alongside a small product team, ' +
      'with a mentor and a scoped project of your own.',
  },
  {
    id: 'job-010',
    title: 'DevOps Engineer (Contract)',
    company: companies.backd,
    location: 'Remote (US)',
    workArrangement: 'remote',
    employmentType: 'contract',
    seniority: 'mid',
    experienceYears: 5,
    salary: { min: 70, max: 95, currency: 'USD', period: 'hour' },
    skills: ['Terraform', 'AWS', 'CI/CD', 'Docker', 'Kubernetes', 'Bash'],
    postedAt: '2026-08-22T14:00:00.000Z',
    applicantCount: 12,
    description:
      'Six-month engagement to harden our deployment pipeline and ' +
      'infrastructure-as-code before a platform migration.',
  },
  {
    id: 'job-011',
    title: 'Junior Frontend Developer',
    company: companies.backd,
    location: 'Charlotte, NC',
    workArrangement: 'on-site',
    employmentType: 'full-time',
    seniority: 'junior',
    experienceYears: 1,
    salary: { min: 80000, max: 100000, currency: 'USD', period: 'year' },
    skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Git'],
    postedAt: '2026-08-20T09:00:00.000Z',
    applicantCount: 47,
    description:
      'Join the web team to build internal dashboards and customer screens, ' +
      'with room to grow into larger front-end work.',
  },
  {
    id: 'job-012',
    title: 'Research Software Engineer',
    company: companies.simons,
    location: 'New York, NY',
    workArrangement: 'hybrid',
    employmentType: 'full-time',
    seniority: 'senior',
    experienceYears: 7,
    salary: null,
    skills: ['C++', 'Python', 'HPC', 'Numerical Methods', 'MPI', 'Linux'],
    postedAt: '2026-08-18T10:00:00.000Z',
    applicantCount: 9,
    description:
      'Partner with computational scientists to turn research code into fast, ' +
      'maintainable software that runs on our HPC clusters.',
  },
]
