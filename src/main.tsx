import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import { NotFound } from '@/components/NotFound'
import { AppShell } from '@/layouts/AppShell'
import { JobBoardPage } from '@/features/job-board/pages/JobBoardPage'
import { JobDetailPage } from '@/features/job-board/pages/JobDetailPage'

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { index: true, element: <JobBoardPage /> },
      { path: 'jobs/:jobId', element: <JobDetailPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
