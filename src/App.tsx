import './App.css'

import Home from './components/Home'
import PdfViewer from './components/PdfViewer'
import Navbar from './Navbar'

import Learn from './Pages/Learn'
import Notes from './Pages/Notes'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Analysis from './Pages/Analysis'
import Streak from './Pages/Streak'
import Share from './Pages/Share'
// import SpeechToTextWithResponse from './SpeechToTextWithResponse'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Test from './Pages/Test'
import Book from './Pages/Book'
import Explore from './Pages/Explore'
import ShareNotes from './Pages/ShareNotes'
import Retest from './Pages/Retest'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* <Route path="/" element={<SpeechToTextWithResponse />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/learn/:classname/:subject/:chapter" element={<Learn />} />
        <Route path='/sharenotes/:classname/:subject/:chapter' element={<ShareNotes/>} />
        <Route path="/test" element={<Test />} />
        <Route path="/pdf-viewer/:pdfPath" element={<PdfViewer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/analysis' element={<Analysis />} />
        <Route path='/streak' element={<Streak />} />
        {/* <Route path='/share' element={<Share />} /> */}
        <Route path='/book' element={<Book />}></Route>
        <Route path='/explore' element={<Explore/>}></Route>
        <Route path='/re' element={<Retest/>}></Route>

      </Routes>
    </Router>
  )
}

export default App
