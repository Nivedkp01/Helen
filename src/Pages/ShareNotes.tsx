import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FileText, File } from "lucide-react"; // Import icons

const ShareNotes = () => {
  const { classname, subject, chapter } = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [fileList, setFileList] = useState<string[]>([]);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/up/${classname}/${subject}/${chapter}`
        );
        setFileList(response.data.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [classname, subject, chapter]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file to upload");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `http://localhost:5000/uploads/${classname}/${subject}/${chapter}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUploadMessage(response.data.message);
      setFileList((prevList) => [...prevList, selectedFile.name]);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadMessage("Upload failed");
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-6">
      {/* File List and Upload Section */}
      <div className="flex">
        {/* Left Section - List of Files */}
        <div className="w-1/2 border-r p-4">
          <h2 className="text-lg font-semibold mb-2">Available Files</h2>
          {fileList.length > 0 ? (
            <ul className="space-y-2">
              {fileList.map((file, index) => {
                const fileUrl = `http://localhost:5000/uploads/${classname}/${subject}/${chapter}/${file}`;
                const isPdf = file.endsWith(".pdf");
                const fileNameWithoutExt = file.replace(/\.[^/.]+$/, ""); // Remove extension

                return (
                  <li key={index} className="flex items-center space-x-2">
                    {/* Clickable PDF or TXT icon */}
                    <button
                      onClick={() => setSelectedFileUrl(file)} // Set full filename
                      className="flex items-center space-x-2"
                    >
                      {isPdf ? (
                        <File className="text-red-500 w-6 h-6 cursor-pointer" />
                      ) : (
                        <FileText className="text-gray-500 w-6 h-6 cursor-pointer" />
                      )}
                      <span className="text-blue-600 hover:underline cursor-pointer">
                        {fileNameWithoutExt}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No files available</p>
          )}
        </div>

        {/* Right Section - File Upload */}
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-4">
            Upload Notes for Class {classname}, {subject}, Chapter {chapter}
          </h2>

          {/* File Input */}
          <input type="file" onChange={handleFileChange} className="border p-2 rounded" />

          {/* Upload Button */}
          <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded ml-2">
            Upload
          </button>

          {/* Upload Message */}
          {uploadMessage && <p className="mt-2">{uploadMessage}</p>}
        </div>
      </div>

      {/* File Preview Section */}
      {selectedFileUrl && (
        <div className="border p-4">
          <h2 className="text-lg font-semibold mb-2">File Preview</h2>
          <iframe
            src={`http://localhost:5000/uploads/${classname}/${subject}/${chapter}/${selectedFileUrl}`}
            className="w-full h-[500px] border"
            title="File Preview"
          />
        </div>
      )}
    </div>
  );
};

export default ShareNotes;
