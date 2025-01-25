import "./App.css";
import Navbar from "./Navbar";
import AboutUs from "./Components/AboutUs";
import Learn from "./Components/Learn";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

import Notes from "./Components/Notes";
import SpeechToTextWithResponse from "./SpeechToTextWithResponse";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<SpeechToTextWithResponse />} /> */}
        <Route path="/notes" element={<Notes />} />
        <Route path="/" element={<Learn />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
