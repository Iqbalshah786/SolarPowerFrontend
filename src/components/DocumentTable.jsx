const DocumentTable = ({ metadata }) => {
  return metadata ? (
    <div className="relative overflow-x-auto mt-10 rounded max-h-96 overflow-y-auto scroll-smooth">
      <table className="w-full  text-base  text-left  text-gray-200">
        <thead className="  uppercase  dark:bg-gray-700 ">
          <tr className="bg-[#374151] ">
            <th scope="col" className="px-6 py-3">
              Document Text
            </th>
            <th scope="col" className="px-6 py-3">
              Tags
            </th>
            <th scope="col" className="px-6 py-3">
              Comments
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
            <th scope="col" className="px-6 py-3">
              View Content
            </th>
          </tr>
        </thead>
        <tbody>
          {metadata.map((record) => (
            <tr
              className="bg-[#1f2937] border-b   text-gray-200"
              key={record.id}
            >
              <td className="px-6 py-4">
                {record.document ? record.document : "Not available"}
              </td>
              <td className="px-6 py-4">
                {record.tags ? record.tags : "Not available"}
              </td>
              <td className="px-6 py-4">
                {record.comments ? record.comments : "Not available"}
              </td>
              <td className="px-6 py-4">Edit</td>
              <td className="px-6 py-4">
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
  );
};

export default DocumentTable;
