import { useParams } from "react-router-dom";
import LineChart from "./LineChart.jsx";
import StackBarChart from "./StackBarChart.jsx";
const View = () => {
  const { id, content } = useParams();

  return (
    <div className="flex flex-col gap-4 p-4 justify-center items-center">
      {content?.toLocaleLowerCase() == "segment" ? (
        <StackBarChart id={id} />
      ) : (
        <LineChart id={id} />
      )}
    </div>
  );
};

export default View;
