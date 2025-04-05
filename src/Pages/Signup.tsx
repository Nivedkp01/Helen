import { useState, FormEvent } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [studentClass, setStudentClass] = useState<string>("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const interests = [
    "History", "Geography", "Civics", "Economics", "Ancient Civilizations",
    "World Wars", "Indian Independence", "Political Systems", "Climate Change",
    "Human Rights", "Globalization", "Cell Biology", "Human Anatomy", "Evolution",
    "Genetics", "Ecology", "Botany", "Zoology", "Microbiology", "Biotechnology",
    "Environmental Science", "Human Diseases"
  ];

  const handleAddInterest = (topic: string) => {
    if (!selectedInterests.includes(topic)) {
      setSelectedInterests([...selectedInterests, topic]);
    }
  };

  const handleRemoveInterest = (topic: string) => {
    setSelectedInterests(selectedInterests.filter((item) => item !== topic));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const interestData = selectedInterests.map((topic) => ({
      topic,
      value: Math.floor(Math.random() * 100),
    }));

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        studentClass: studentClass.trim(),
        interests: interestData,
      });

      if (response.status === 201) {
        alert("Signup successful!");
        setName("");
        setEmail("");
        setPassword("");
        setStudentClass("");
        setSelectedInterests([]);
      } else {
        alert(response.data.message || "Signup failed.");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Standard</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              required
            />
          </div>

          {/* Interests Selection */}
          <div className="mb-4">
            <label className="block text-gray-700">Select Interests</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {interests.map((topic) => (
                <div key={topic} className="flex items-center justify-between p-2 border rounded-lg bg-gray-200">
                  <span>{topic}</span>
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
                    onClick={() => handleAddInterest(topic)}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Interests */}
          {selectedInterests.length > 0 && (
            <div className="mb-4">
              <label className="block text-gray-700">Selected Interests</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedInterests.map((topic) => (
                  <div key={topic} className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg">
                    {topic}
                    <button
                      type="button"
                      className="ml-2 text-white bg-red-500 px-2 py-1 rounded-lg hover:bg-red-600"
                      onClick={() => handleRemoveInterest(topic)}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
