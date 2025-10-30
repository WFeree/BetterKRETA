import { useEffect, useState } from "react";
import NewStudent from "./components/newStudent";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hello/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <NewStudent/>
    </div>
  );
}

export default App;