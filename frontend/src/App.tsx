import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import StudentLogin from "./components/StudentLogin";



function FrontPage({message}: {message: string}){
  return <h1>{message || "Loading..."}</h1>
}

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hello/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <BrowserRouter>
      <nav>
        <Link to={"/"}>FrontPage</Link> | {" "}
        <Link to={"/login"}>LoginPage</Link>
      </nav>
      <Routes>
        <Route path="/" element={<FrontPage message={message}/>}/>
        <Route path="/login" element={<StudentLogin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;