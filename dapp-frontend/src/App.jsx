import React from 'react'
import Hero from './components/Hero'

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-900 via-indigo-800 to-violet-900 text-white overflow-hidden relative">
     <div className="absolute w-96 h-96 bg-purple-600 opacity-30 rounded-full blur-3xl top-[-10%] left-[-10%] animate-pulse"></div>
     <div className="absolute w-96 h-96 bg-indigo-400 opacity-20 rounded-full blur-2xl bottom-[-10%] right-[-10%] animate-spin-slow"></div>
     <Hero />
    </div>

  )
}

export default App
