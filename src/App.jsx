import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <section className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">React + Vite + Tailwind</h1>
        <p className="mt-2 text-slate-600">Your project is ready.</p>
        <button
          className="mt-6 rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
          onClick={() => setCount((value) => value + 1)}
        >
          Count is {count}
        </button>
      </section>
    </main>
  )
}

export default App
