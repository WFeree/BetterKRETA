import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import StudentLogin from "./components/StudentLogin";
import NewStudent from "./components/newStudent";
import AdminStudents from "./components/adminStudents";


function FrontPage(){
  return <h1>Frontpage</h1>
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to={"/"}>FrontPage</Link> | {" "}
        <Link to={"/login"}>LoginPage</Link> | {" "}
        <Link to={"/newStudent"}>newStudent</Link> | {" "}
        <Link to={"/students/statistics/"}>StudentStatistics</Link>
      </nav>
      <Routes>
        <Route path="/" element={<FrontPage />}/>
        <Route path="/login" element={<StudentLogin/>}/>
        <Route path="/newStudent" element={<NewStudent/>}/>
        <Route path="/students/statistics/" element={<AdminStudents/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;