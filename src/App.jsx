import { Routes, Route } from 'react-router-dom'
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import HomePage from './pages/homepage'
import JsonReformatter from './pages/JsonReformatter'

gsap.registerPlugin(useGSAP);

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jsonreformatter" element={<JsonReformatter />} />
    </Routes>
  )
}

export default App