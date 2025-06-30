import { useState } from 'react'
import './App.css'
import UploadForm from './components/UploadForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <UploadForm />
    </>
  )
}

export default App
