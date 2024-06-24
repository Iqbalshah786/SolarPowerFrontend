import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const DocumentForm = () => {
  const [document, setDocument] = useState("");
  const [tags, setTags] = useState("");
  const [comments, setComments] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      id: "",
      document: document,
      tags: tags,
      comments: comments,
    };

    try {
      const res = await axios.post(
        "https://solarpower-backend-2f0d59f7581f.herokuapp.com/api/DocumentDeepSearch/CreateDocumentData",
        data
      );
      setResponse(res.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10  w-1/2">
      <h2 className="text-2xl mb-6">Add Document</h2>
      <form onSubmit={handleSubmit} className=" w-full ">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Document:
          </label>
          <textarea
            className="shadow appearance-none  h-16 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            required
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
          {response && <h3 className="text-xl text-green-500">Submitted</h3>}
        </div>
      </form>
    </div>
  );
};

export default DocumentForm;
