import React, { useState } from 'react';

// Modal component for file upload
const Modal = ({ isOpen, onClose, onUpload }: { isOpen: boolean, onClose: () => void, onUpload: (file: File, pdfName: string) => void }) => {
  const [pdfName, setPdfName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pdfName && file) {
      onUpload(file, pdfName);
      onClose(); // Close the modal after submission
    } else {
      alert('Please provide both PDF name and a file.');
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-all ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="pdfName">PDF Name</label>
            <input
              id="pdfName"
              type="text"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={pdfName}
              onChange={(e) => setPdfName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="file">Choose PDF</label>
            <input
              id="file"
              type="file"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Notes Component to display uploaded PDFs
const Notes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfs, setPdfs] = useState<{ name: string; file: File }[]>([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileUpload = (file: File, pdfName: string) => {
    const newPdf = { name: pdfName, file };
    setPdfs((prevPdfs) => [...prevPdfs, newPdf]);
  };

  const handlePdfClick = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    window.open(fileUrl, '_blank'); // Open the PDF in a new tab
  };

  return (
    <div className="p-6">
      {/* PDF Display Grid */}
      <div className="grid grid-cols-6 gap-2 mb-6">
        {pdfs.map((pdf, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out"
            onClick={() => handlePdfClick(pdf.file)}
          >
            {/* PDF Icon with Hover Enlarging Effect */}
            <div className="w-16 h-16 flex items-center justify-center mb-1">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/4726/4726010.png" // Use URL or local path here
                alt="PDF Icon"
                className="w-full h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-110" // Hover effect for enlarging
              />
            </div>
            <div className="text-xs font-medium text-gray-700 text-center">{pdf.name}</div>
          </div>
        ))}
      </div>

      {/* Floating Button */}
      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition duration-300"
      >
        <span className="text-3xl">+</span>
      </button>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} onUpload={handleFileUpload} />
    </div>
  );
};

export default Notes;
