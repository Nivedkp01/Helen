import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Learn = () => {
  const { classname, subject, chapter } = useParams<{ classname: string; subject: string; chapter: string }>();

  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(`${classname}${subject}${chapter}`);
  const [note, setNote] = useState("");
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const textAreaRef = useRef(null);

  const storedUsername = localStorage.getItem("username") || "";
  const title = `${selectedPdf}${storedUsername}`;

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pdfs");
        setPdfs(response.data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
        alert("Failed to load PDFs.");
      }
    };
    fetchPdfs();
  }, []);

  const handleBackClick = () => {
    setSelectedPdf(null);
    setNote("");
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5000/saveNote", { title, note });
      alert("Note saved successfully");
    } catch (error) {
      alert("Failed to save note. Please try again.");
      console.error("Error saving note:", error);
    }
  };

  const handleDownload = () => {
    if (!note) {
      alert("No note to download!");
      return;
    }
    const blob = new Blob([note], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSearch = async () => {
    if (!textAreaRef.current) return;
    const selectedText = textAreaRef.current.value.substring(
      textAreaRef.current.selectionStart || 0,
      textAreaRef.current.selectionEnd || 0
    ).trim();

    if (!selectedText) {
      alert("Please select text to search.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/process", {
        text: selectedText,
        pdfName: selectedPdf || "nil",
      });
      setNote((prev) => prev + "\n" + response.data.reply);
    } catch (error) {
      alert("Error fetching search results. Try again.");
      console.error("Error processing input:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-2/3 p-6 relative overflow-hidden">
        {selectedPdf && (
          <button
            onClick={handleBackClick}
            className="absolute top-4 left-4 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-300"
          >
            &lt;
          </button>
        )}

        {selectedPdf && (
          <iframe
            src={`http://localhost:5000/uploads/${selectedPdf}`}
            width="100%"
            height="100%"
            title="PDF Viewer"
            frameBorder="0"
            className="h-full w-full"
          />
        )}
      </div>

      <div className="w-1/2 p-6 border-l flex flex-col">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Notes</h2>
          <button onClick={handleSave} className="bg-black mr-10 text-white px-4 py-2 rounded hover:bg-gray-300 hover:text-black">
            Save
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4"
          >
            Download Note
          </button>
        </div>

        <textarea
          ref={textAreaRef}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-4 bg-white w-full h-64 p-2 border rounded"
        />

        <button
          onClick={handleSearch}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search Selected Text
        </button>
      </div>
    </div>
  );
};

export default Learn;
