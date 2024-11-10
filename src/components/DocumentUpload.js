import React, { useState } from 'react';
import { summarizeDocument, answerQuestion } from '../api/openAiApi';
const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      setError('File size should not exceed 50MB');
      setFile(null);
      return;
    }
    setError('');
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      try {
        const summaryText = await summarizeDocument(text);
        setSummary(summaryText);
        setSuccessMessage('File uploaded and summarized successfully!');
      } catch (err) {
        setError('Failed to summarize the document: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!summary) {
      setError('Please upload and summarize a document first.');
      return;
    }
    try {
      const questionResponse = await answerQuestion(summary, question);
      setAnswer(questionResponse);
    } catch (err) {
      setError('Failed to get an answer: ' + err.message);
    }
  };

  return (
    <div className="max-w-md mt-2 mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl  font-sans font-bold mb-4">Upload Document</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm  font-sans font-medium text-gray-700">
            Select Document (max 50MB)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="mt-2 block w-full"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
      {summary && (
        <div className="mt-4">
          <h3 className="  font-sans font-bold">Summary:</h3>
          <p>{summary}</p>
          <form onSubmit={handleQuestionSubmit} className="mt-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about the document..."
              className="border p-2 rounded w-full"
            />
            <button
              type="submit"
              className="mt-2 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Ask Question
            </button>
          </form>
          {answer && <p className="mt-2 text-blue-500">Answer: {answer}</p>}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
