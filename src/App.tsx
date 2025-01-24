import './App.css'
import Navbar from './Navbar'
import AboutUs from './Pages/AboutUs'
import Learn from './Pages/Learn'
import Notes from './Pages/Notes'
import SpeechToTextWithResponse from './SpeechToTextWithResponse'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'



function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>

        {/* <Route path="/" element={<SpeechToTextWithResponse />} /> */}
        <Route path="/notes" element={<Notes />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  )
}

export default App
