import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-950 text-slate-100">
      <h1 className="text-4xl font-semibold tracking-tight">
        Vite + React + TS + Tailwind
      </h1>
      <p className="text-slate-400">Scaffold is running.</p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-400"
      >
        count is {count}
      </button>
    </div>
  )
}

export default App
