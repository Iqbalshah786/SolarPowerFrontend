import formatDate from "../utils/FormatDate.js";
import formatSize from "../utils/FormateSize.js";
// eslint-disable-next-line react/prop-types
const RecordTable = ({ metadata }) => {
  const { id, fileName, size, uploadDate, fileId } = metadata || {};

  return metadata ? (
    <div className="relative overflow-x-auto mt-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              File Name
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Upload Date
            </th>
            <th scope="col" className="px-6 py-3">
              File ID
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {id}
            </td>
            <td className="px-6 py-4">{fileName}</td>
            <td className="px-6 py-4">{formatSize(size)}</td>
            <td className="px-6 py-4">{formatDate(uploadDate)}</td>
            <td className="px-6 py-4">{fileId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-lg text-center">No records...</p>
  );
};

export default RecordTable;
