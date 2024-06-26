const DocumentTable = ({ metadata, onEditClick }) => {
  return (
    <>
      {metadata && metadata.length > 0 ? (
        <div className="relative overflow-x-auto mt-5 rounded max-h-96 overflow-y-auto scroll-smooth   w-3/4">
          <table className="w-full text-base text-left text-gray-200">
            <thead className="uppercase dark:bg-gray-700 sticky top-0 bg-[#374151]">
              <tr>
                <th scope="col" className="px-4 py-3 w-[35%]">
                  Document Text
                </th>
                <th scope="col" className="px-4 py-3 w-[10%]">
                  Tags
                </th>
                <th scope="col" className="px-4 py-3 w-[10%] ">
                  Comments
                </th>
                <th scope="col" className="px-4 py-3 w-[5%]">
                  Edit
                </th>
                <th scope="col" className="px-4 py-3 w-[10%]">
                  View Content
                </th>
              </tr>
            </thead>
            <tbody>
              {metadata.map((record) => (
                <tr
                  className="bg-[#1f2937] border-b text-gray-200"
                  key={record.id}
                >
                  <td className="px-4 py-2 text-wrap  ">
                    {record.document ? record.document : "Not available"}
                  </td>
                  <td className="px-4 py-2 text-wrap ">
                    {record.tags ? record.tags : "Not available"}
                  </td>
                  <td className="px-4 py-2  text-justify">
                    {record.comments ? record.comments : "Not available"}
                  </td>
                  <td className="px-6 py-4 ">
                    <button
                      className="text-blue-500"
                      onClick={() => onEditClick(record)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4 ">
                    <button className="rounded py-1 px-2 text-base text-white bg-blue-500">
                      View content
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-lg text-center">No records...</p>
      )}
    </>
  );
};

export default DocumentTable;
