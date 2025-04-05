import React, { useState, useEffect } from "react";
import axios from "axios";

const TopicList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestedTopics, setSuggestedTopics] = useState([]);
  const [relatedTopics, setRelatedTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      axios
        .post("http://localhost:5000/search-topics", { query: searchTerm })
        .then((res) => setSuggestedTopics(res.data.suggestedTopics || []))
        .catch((err) => console.error("Error fetching topics:", err));
    } else {
      setSuggestedTopics([]);
      setRelatedTopics([]);
      setSelectedTopic(null);
    }
  }, [searchTerm]);

  const fetchRelatedTopics = (topic) => {
    setSelectedTopic(topic);
    axios
      .post("http://localhost:5000/get-related-topics", { topic })
      .then((res) => setRelatedTopics(res.data.relatedTopics || []))
      .catch((err) => console.error("Error fetching related topics:", err));
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Topics List</h2>
      <div className="interestTopics">
        
      </div>
      <input
        type="text"
        placeholder="Search topics..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {suggestedTopics.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Suggested Topics:</h3>
          <ul className="list-disc pl-5">
            {suggestedTopics.map((topic, index) => (
              <li
                key={index}
                className="mb-2 text-lg cursor-pointer text-blue-600 hover:underline"
                onClick={() => fetchRelatedTopics(topic)}
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTopic && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Related Topics for "{selectedTopic}":</h3>
          <ul className="list-disc pl-5">
            {relatedTopics.length > 0 ? (
              relatedTopics.map((topic, index) => (
                <li key={index} className="mb-2 text-lg">{topic}</li>
              ))
            ) : (
              <p className="text-gray-500">No related topics found.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopicList;
