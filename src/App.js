import React, { useState } from 'react'
import './App.css'
// import Table from './pages/Table'
import ScrollTable from './pages/ScrollTable'

function App() {
  const [language, setLanguage] = useState('spanish')

  const languageChanged = (language) => {
    setLanguage(language)
  }

  return (
    <div className="App">
      {/* <Table language={language} languageChanged={languageChanged} /> */}
      <ScrollTable language={language} languageChanged={languageChanged}/>
    </div>
  )
}

export default App
