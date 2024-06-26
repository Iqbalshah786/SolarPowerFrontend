import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const Modal = ({ show, onClose, currentRecord, onFormSubmit }) => {
  const [document, setDocument] = useState(currentRecord.document || "");
  const [tags, setTags] = useState(currentRecord.tags || "");
  const [comments, setComments] = useState(currentRecord.comments || "");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (currentRecord) {
      setDocument(currentRecord.document || "");
      setTags(currentRecord.tags || "");
      setComments(currentRecord.comments || "");
    }
  }, [currentRecord]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      id: currentRecord.id,
      document,
      tags,
      comments,
    };

    try {
      const res = await axios.post(
        "https://solarpower-backend-2f0d59f7581f.herokuapp.com/api/DocumentDeepSearch/UpdateDocumentData",
        data
      );
      setResponse(res.data);
      onFormSubmit();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg relative w-1/2">
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl mb-6">Edit Document</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Document:
            </label>
            <textarea
              className="shadow appearance-none h-16 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              required
              style={{height:"300px",minHeight:"300px",maxHeight:"300px",overflowY:"auto"}}
            />
          </div>
          <div className="mb-4 flex gap-4 items-center">
          <label className="block text-gray-700 text-sm font-bold mb-2">
              Comments:
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full h-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              required
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tags:
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full h-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>
          <div className="w-1/2 flex items-center gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              Submit
            </button>
            {loading && (
              <ClipLoader color="#4A90E2" loading={loading} size={35} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
