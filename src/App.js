import React, { useState } from 'react'
import './App.css'
import ScrollTable from './components/ScrollTable'

function App() {
  const [language, setLanguage] = useState('spanish')

  const languageChanged = (language) => {
    setLanguage(language)
  }

  return (
    <div className="App">
      <ScrollTable language={language} languageChanged={languageChanged} />
    </div>
  )
}

export default App
