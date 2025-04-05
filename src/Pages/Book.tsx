import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Subjects with chapters listed individually
const subjectsByClass: {
    [key: string]: { name: string; chapters: string[] }[];
} = {
    "1": [{ name: "Math", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] },
    { name: "English", chapters: ["Chapter 1", "Chapter 2"] },
    { name: "EVS", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] }],

    "2": [{ name: "Math", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"] },
    { name: "English", chapters: ["Chapter 1", "Chapter 2"] },
    { name: "EVS", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] }],

    "3": [{ name: "Math", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"] },
    { name: "English", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] },
    { name: "Science", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] },
    { name: "Social Studies", chapters: ["Chapter 1", "Chapter 2"] },
    { name: "Hindi", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] }],

    "4": [{ name: "Math", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"] },
    { name: "English", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"] },
    { name: "Science", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] },
    { name: "Social Studies", chapters: ["Chapter 1", "Chapter 2"] },
    { name: "Hindi", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] }],

    "5": [{ name: "Math", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6"] },
    { name: "English", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"] },
    { name: "Science", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"] },
    { name: "Social Studies", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] },
    { name: "Hindi", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] }],

    "6": [{ name: "Math", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7"] },
    { name: "English", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"] },
    { name: "Science", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"] },
    { name: "Social Studies", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] },
    { name: "Hindi", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] },
    { name: "Computer Science", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] }],

    "7": [{ name: "Math", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"] },
    { name: "English", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"] },
    { name: "Science", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"] },
    { name: "Social Studies", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"] },
    { name: "Hindi", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] },
    { name: "Computer Science", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] }],

    "8": [{ name: "Math", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"] },
    { name: "English", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"] },
    { name: "Science", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6"] },
    { name: "Social Studies", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"] },
    { name: "Hindi", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] },
    { name: "Computer Science", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] }],

    "9": [{ name: "Math", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9"] },
    { name: "English", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6"] },
    { name: "Science", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7"] },
    { name: "Social Studies", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"] },
    { name: "Hindi", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] },
    { name: "Computer Science", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] }],

    "10": [{ name: "Math", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10"] },
    { name: "English", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6"] },
    { name: "Science", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"] },
    { name: "Social", chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6"] },
    { name: "Hindi", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] },
    { name: "Computer Science", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] }]
};


const Book = () => {
    const [userData, setUserData] = useState<{ Standard?: string } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUsername = localStorage.getItem("username");

            if (!storedUsername) {
                console.error("No username found in localStorage");
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/user?username=${storedUsername}`);
                const data = await response.json();
                console.log("Fetched user data:", data); // ✅ Debugging step
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);



    const handleClick = (classname: string, subject: string, chapter: string) => {
        const subjectData = subjectsByClass[classname]?.find(sub => sub.name === subject);

        if (!subjectData) {
            console.error("Subject not found");
            return;
        }

        const chapterIndex = subjectData.chapters.indexOf(chapter);

        if (chapterIndex === -1) {
            console.error("Chapter not found");
            return;
        }

        // Add 1 to chapterIndex to make it 1-based
        const chapterNumber = chapterIndex + 1;

        navigate(`/learn/${classname}/${subject}/${chapterNumber}`);
    };



    return (
        <div className="p-6">
            {userData ? (
                <div className="space-y-6">
                    {subjectsByClass[userData.Standard || ""]?.map((subject, index) => (
                        <div key={index}>
                            <h2 className="text-xl font-semibold mb-2">{subject.name}</h2>
                            <div className="flex overflow-x-auto space-x-4 p-2 border-b pb-3">
                                {subject.chapters.map((chapter, chapterIndex) => (
                                    <div
                                        key={chapterIndex}
                                        onClick={() => handleClick(userData.Standard || "", subject.name, chapter)}
                                        className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md w-40 min-w-[150px] border border-gray-300 cursor-pointer"
                                    >
                                        <FaBook className="text-blue-500 text-3xl mb-2" />
                                        <span className="text-sm font-medium">{chapter}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Book;
