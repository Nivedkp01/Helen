import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Share() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!selectedClass || !selectedSubject || !selectedChapter) {
      alert("Please select all fields.");
      return;
    }
    navigate(`/sharenotes/${selectedClass}/${selectedSubject}/${selectedChapter}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Select Class, Subject, and Chapter</h2>

      <div className="flex space-x-4 mb-4">
        {/* Class Dropdown */}
        <div>
          <label className="block font-medium">Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Class</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
          </select>
        </div>

        {/* Subject Dropdown */}
        <div>
          <label className="block font-medium">Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
          </select>
        </div>

        {/* Chapter Dropdown */}
        <div>
          <label className="block font-medium">Chapter:</label>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Chapter</option>
            <option value="1">Chapter 1</option>
            <option value="2">Chapter 2</option>
            <option value="3">Chapter 3</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
}

export default Share;
