import React, { useState, useEffect } from "react";
import axios from "axios";

function Analysis() {
    const [classNumber, setClassNumber] = useState("");
    const [subject, setSubject] = useState("");
    const [mcqs, setMcqs] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [correctCount, setCorrectCount] = useState(0);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [testHistory, setTestHistory] = useState([]);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes countdown
    const [timeTaken, setTimeTaken] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        let timer;
        if (timerRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setTimerRunning(false);
            handleSubmitAnswers(); // Auto-submit when timer reaches 0
        }
        return () => clearInterval(timer);
    }, [timerRunning, timeLeft]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMcqs([]);
        setUserAnswers({});
        setCorrectCount(0);
        setSubmitted(false);
        setTimeLeft(600);
        setTimeTaken(0);
        setTimerRunning(false);

        try {
            const response = await axios.post("http://localhost:5000/generate-mcq", {
                classNumber,
                subject,
            });
            setMcqs(response.data.reply.mcqs);
            setStartTime(Date.now()); // Store start time
            setTimerRunning(true);
        } catch (error) {
            setError(error.response?.data.reply || "Error fetching MCQs");
        }
    };

    const handleAnswerSelect = (mcqIndex, selectedOption) => {
        setUserAnswers((prev) => ({ ...prev, [mcqIndex]: selectedOption }));
    };

    const handleSubmitAnswers = async () => {
        let correctCount = 0;

        mcqs.forEach((mcq, index) => {
            if (userAnswers[index] === mcq.correct_answer) {
                correctCount++;
            }
        });

        const timeSpent = (Date.now() - startTime) / 1000; // Time in seconds
        setCorrectCount(correctCount);
        setTimeTaken(timeSpent);
        setSubmitted(true);
        setTimerRunning(false);

        // Store test results in history
        const updatedTestHistory = [
            ...testHistory,
            { correct: correctCount, time: timeSpent },
        ];
        setTestHistory(updatedTestHistory);

        // Send data to backend for efficiency calculation
        try {
            const response = await axios.post("http://localhost:5000/calculate-efficiency", {
                classNumber,
                subject,
                mcqs,
                timeTaken,
                userAnswers
            });
        
            console.log("Efficiency Calculation Response:", response.data);
        } catch (error) {
            console.error("Error calculating efficiency:", error.response?.data || error.message);
        }
        
    };

  
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Analysis</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Class Number:
                    </label>
                    <input
                        type="text"
                        value={classNumber}
                        onChange={(e) => setClassNumber(e.target.value)}
                        placeholder="Enter class number"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Subject:
                    </label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter subject name"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Generate MCQs
                </button>
            </form>

            {error && <p className="text-red-600 text-center mt-4">{error}</p>}

            {mcqs.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Generated MCQs:
                    </h3>

                    <p className="text-red-500 font-semibold text-center mb-2">
                        Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
                        {timeLeft % 60}
                    </p>

                    <ul className="space-y-4">
                        {mcqs.map((mcq, index) => (
                            <li key={index} className="p-4 bg-white border rounded-md shadow-sm">
                                <p className="font-semibold">{mcq.question}</p>
                                <div className="mt-2 space-y-2">
                                    {mcq.options.map((option, optionIndex) => (
                                        <button
                                            key={optionIndex}
                                            onClick={() => handleAnswerSelect(index, option)}
                                            className={`w-full text-left px-4 py-2 border rounded-md transition duration-300 ${userAnswers[index] === option
                                                    ? "bg-gray-800 text-white"
                                                    : "bg-gray-200"
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={handleSubmitAnswers}
                        className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                    >
                        Submit Answers
                    </button>

                    {submitted && (
                        <p className="mt-6 text-lg font-semibold text-center">
                            Correct Answers: {correctCount} / {mcqs.length} <br />
                            Time Taken: {Math.floor(timeTaken / 60)} min {Math.floor(timeTaken % 60)} sec
                        </p>
                    )}
                </div>
            )}


        </div>
    );
}

export default Analysis;
