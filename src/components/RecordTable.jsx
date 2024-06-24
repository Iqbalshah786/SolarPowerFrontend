import formatDate from "../utils/FormatDate.js";
import formatSize from "../utils/FormateSize.js";
import { Link } from "react-router-dom";

const RecordTable = ({ metadata }) => {
  return metadata ? (
    <div className="relative overflow-x-auto mt-10 rounded">
      <table className="w-full  text-base  text-left  text-gray-200">
        <thead className=" uppercase  dark:bg-gray-700 ">
          <tr className="bg-[#374151]">
            <th scope="col" className="px-6 py-3">
              File Name
            </th>
            <th scope="col" className="px-6 py-3">
              Upload date
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              View anaylsis
            </th>
          </tr>
        </thead>
        <tbody>
          {metadata.map((record) => (
            <tr className="bg-[#1f2937] border-b   " key={record.id}>
              <td className="px-6 py-4">{record.fileName}</td>
              <td className="px-6 py-4">{formatSize(record.size)}</td>
              <td className="px-6 py-4">{formatDate(record.uploadDate)}</td>

              <td className="px-6 py-4">
                <Link to={`/view/${record.id}/${record.typeID}`}>
                  <button className="rounded py-1 px-2 text-base text-white bg-blue-500">
                    View content
                  </button>
                </Link>
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

export default RecordTable;
