import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("api/sheetmetadata/6672e92e2905b8f045e34543")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(data);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default App;
