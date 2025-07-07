import { useState } from 'react'
import './App.css'
import UploadForm from './components/UploadForm'
import AnalyticsDashboard from './components/AnalyticsBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <UploadForm />
     <AnalyticsDashboard />
    </>
  )
}

export default App
